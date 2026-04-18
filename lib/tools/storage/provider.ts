export type Collection = 'portfolio' | 'resumeConfigs' | 'preferences'

export interface SchemaEnvelope<T> {
  version: number
  data: T
}

export type CollectionDump = Record<Collection, SchemaEnvelope<unknown>>

export interface StorageProvider {
  get<T>(key: Collection): Promise<SchemaEnvelope<T> | null>
  set<T>(key: Collection, value: SchemaEnvelope<T>): Promise<void>
  delete(key: Collection): Promise<void>
  subscribe?(key: Collection, cb: () => void): () => void
  exportAll(): Promise<Partial<CollectionDump>>
  importAll(dump: Partial<CollectionDump>): Promise<void>
}
