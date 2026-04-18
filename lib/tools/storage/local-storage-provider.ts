import type { Collection, CollectionDump, SchemaEnvelope, StorageProvider } from './provider'

const PREFIX = 'tools.'
const storageKey = (key: Collection) => `${PREFIX}${key}`

const allCollections: Collection[] = ['portfolio', 'resumeConfigs', 'preferences']

export class LocalStorageProvider implements StorageProvider {
  async get<T>(key: Collection): Promise<SchemaEnvelope<T> | null> {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(storageKey(key))
    if (!raw) return null
    try {
      return JSON.parse(raw) as SchemaEnvelope<T>
    } catch {
      return null
    }
  }

  async set<T>(key: Collection, value: SchemaEnvelope<T>): Promise<void> {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey(key), JSON.stringify(value))
  }

  async delete(key: Collection): Promise<void> {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(storageKey(key))
  }

  subscribe(key: Collection, cb: () => void): () => void {
    if (typeof window === 'undefined') return () => {}
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey(key)) cb()
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }

  async exportAll(): Promise<Partial<CollectionDump>> {
    const out: Partial<CollectionDump> = {}
    for (const key of allCollections) {
      const v = await this.get(key)
      if (v) out[key] = v
    }
    return out
  }

  async importAll(dump: Partial<CollectionDump>): Promise<void> {
    for (const key of allCollections) {
      const v = dump[key]
      if (v) await this.set(key, v)
    }
  }
}
