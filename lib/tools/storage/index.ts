import { LocalStorageProvider } from './local-storage-provider'
import type { StorageProvider } from './provider'

let instance: StorageProvider | null = null

export function getProvider(): StorageProvider {
  if (!instance) instance = new LocalStorageProvider()
  return instance
}

export type { Collection, SchemaEnvelope, StorageProvider, CollectionDump } from './provider'
