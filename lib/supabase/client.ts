'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseClientEnv } from './config'

let client: SupabaseClient | null = null

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!client) {
    const { url, anonKey } = getSupabaseClientEnv()
    client = createBrowserClient(url, anonKey)
  }
  return client
}
