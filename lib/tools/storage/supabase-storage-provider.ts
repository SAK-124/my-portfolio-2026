import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Collection, CollectionDump, SchemaEnvelope, StorageProvider } from './provider'

const allCollections: Collection[] = ['portfolio', 'resumeConfigs', 'preferences']

const columnByCollection: Record<Collection, string> = {
  portfolio: 'portfolio',
  resumeConfigs: 'resume_configs',
  preferences: 'preferences',
}

interface ResumeProfilesRow {
  portfolio: unknown
  resume_configs: unknown
  preferences: unknown
}

export class SupabaseStorageProvider implements StorageProvider {
  private readonly supabase = getSupabaseBrowserClient()

  private async getUserId(): Promise<string | null> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser()

    if (error || !user) return null
    return user.id
  }

  async get<T>(key: Collection): Promise<SchemaEnvelope<T> | null> {
    const userId = await this.getUserId()
    if (!userId) return null

    const column = columnByCollection[key] as keyof ResumeProfilesRow
    const { data, error } = await this.supabase
      .from('resume_profiles')
      .select('portfolio, resume_configs, preferences')
      .eq('user_id', userId)
      .maybeSingle()

    if (error || !data) return null

    const envelope = (data as unknown as ResumeProfilesRow)[column]
    if (!envelope || typeof envelope !== 'object') return null

    return envelope as SchemaEnvelope<T>
  }

  async set<T>(key: Collection, value: SchemaEnvelope<T>): Promise<void> {
    const userId = await this.getUserId()
    if (!userId) return

    const column = columnByCollection[key]
    const payload: Record<string, unknown> = {
      user_id: userId,
      [column]: value,
      updated_at: new Date().toISOString(),
    }

    const { error } = await this.supabase
      .from('resume_profiles')
      .upsert(payload, { onConflict: 'user_id' })

    if (error) {
      throw error
    }
  }

  async delete(key: Collection): Promise<void> {
    const userId = await this.getUserId()
    if (!userId) return

    const column = columnByCollection[key]
    const { error } = await this.supabase
      .from('resume_profiles')
      .update({ [column]: null, updated_at: new Date().toISOString() })
      .eq('user_id', userId)

    if (error) {
      throw error
    }
  }

  async exportAll(): Promise<Partial<CollectionDump>> {
    const out: Partial<CollectionDump> = {}
    for (const key of allCollections) {
      const value = await this.get(key)
      if (value) out[key] = value
    }
    return out
  }

  async importAll(dump: Partial<CollectionDump>): Promise<void> {
    for (const key of allCollections) {
      const value = dump[key]
      if (value) await this.set(key, value)
    }
  }
}
