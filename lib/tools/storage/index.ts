import { hasSupabaseClientEnv } from '@/lib/supabase/config'
import { LocalStorageProvider } from './local-storage-provider'
import type { StorageProvider } from './provider'
import { SupabaseStorageProvider } from './supabase-storage-provider'

let instance: StorageProvider | null = null

export function getProvider(): StorageProvider {
  if (instance) return instance

  if (typeof window !== 'undefined' && hasSupabaseClientEnv()) {
    instance = new SupabaseStorageProvider()
    return instance
  }

  instance = new LocalStorageProvider()
  return instance
}

export type { Collection, SchemaEnvelope, StorageProvider, CollectionDump } from './provider'
