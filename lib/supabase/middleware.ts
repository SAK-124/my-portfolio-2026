import { createServerClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { tryGetSupabaseClientEnv } from './config'

export async function refreshAuthSession(
  request: NextRequest,
): Promise<{ response: NextResponse; user: User | null; configured: boolean }> {
  const env = tryGetSupabaseClientEnv()
  let response = NextResponse.next({ request })
  if (!env) {
    return { response, user: null, configured: false }
  }
  const { url, anonKey } = env

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { response, user, configured: true }
}
