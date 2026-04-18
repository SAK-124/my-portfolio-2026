import type { Collection, SchemaEnvelope, StorageProvider } from './provider'

export interface Migration<_T = unknown> {
  from: number
  to: number
  migrate: (data: unknown) => unknown
}

const migrationsByCollection: Record<Collection, Migration[]> = {
  portfolio: [],
  resumeConfigs: [],
  preferences: [],
}

export const CURRENT_VERSION: Record<Collection, number> = {
  portfolio: 1,
  resumeConfigs: 1,
  preferences: 1,
}

export function applyMigrations<T>(key: Collection, envelope: SchemaEnvelope<unknown>): SchemaEnvelope<T> {
  let version = envelope.version
  let data = envelope.data
  const list = migrationsByCollection[key]
  while (version < CURRENT_VERSION[key]) {
    const m = list.find((x) => x.from === version)
    if (!m) break
    data = m.migrate(data)
    version = m.to
  }
  return { version, data: data as T }
}

export async function loadCollection<T>(
  provider: StorageProvider,
  key: Collection,
): Promise<SchemaEnvelope<T> | null> {
  const envelope = await provider.get<unknown>(key)
  if (!envelope) return null
  const migrated = applyMigrations<T>(key, envelope)
  if (migrated.version !== envelope.version) {
    await provider.set(key, migrated)
  }
  return migrated
}

export async function saveCollection<T>(
  provider: StorageProvider,
  key: Collection,
  data: T,
): Promise<void> {
  await provider.set<T>(key, { version: CURRENT_VERSION[key], data })
}
