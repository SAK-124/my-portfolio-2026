export function tryGetSupabaseClientEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null
  return { url, anonKey }
}

export function hasSupabaseClientEnv(): boolean {
  return Boolean(tryGetSupabaseClientEnv())
}

export function getSupabaseClientEnv(): { url: string; anonKey: string } {
  const env = tryGetSupabaseClientEnv()
  if (!env) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }
  return env
}
