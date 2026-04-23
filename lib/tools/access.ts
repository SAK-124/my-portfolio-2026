import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { tryGetSupabaseClientEnv } from '@/lib/supabase/config'
import {
  TOOLS_LOCAL_ADMIN_EMAIL,
  TOOLS_LOCAL_AUTH_COOKIE,
  TOOLS_LOCAL_AUTH_VALUE,
} from '@/lib/tools/local-auth/shared'

export async function getToolsUser() {
  const cookieStore = await cookies()

  if (cookieStore.get(TOOLS_LOCAL_AUTH_COOKIE)?.value === TOOLS_LOCAL_AUTH_VALUE) {
    return { email: TOOLS_LOCAL_ADMIN_EMAIL }
  }

  const env = tryGetSupabaseClientEnv()
  if (!env) {
    return null
  }

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function requireToolsUser(nextPath: string) {
  const user = await getToolsUser()

  if (!user) {
    redirect(`/tools/login?from=${encodeURIComponent(nextPath)}`)
  }

  return user
}
