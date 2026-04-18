import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { tryGetSupabaseClientEnv } from '@/lib/supabase/config'

function sanitizeNextPath(next: string | null): string {
  if (!next) return '/tools'
  return next.startsWith('/tools') ? next : '/tools'
}

export async function GET(request: NextRequest) {
  const env = tryGetSupabaseClientEnv()
  const next = sanitizeNextPath(request.nextUrl.searchParams.get('next'))
  if (!env) {
    const fallback = new URL('/tools/login', request.url)
    fallback.searchParams.set('error', 'unconfigured')
    fallback.searchParams.set('from', next)
    return NextResponse.redirect(fallback)
  }
  const { url, anonKey } = env
  const cookieStore = await cookies()

  const supabase = createServerClient(url, anonKey, {
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

  const callbackUrl = new URL('/auth/callback', request.url)
  callbackUrl.searchParams.set('next', next)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error || !data.url) {
    const fallback = new URL('/tools/login', request.url)
    fallback.searchParams.set('error', 'oauth')
    fallback.searchParams.set('from', next)
    return NextResponse.redirect(fallback)
  }

  return NextResponse.redirect(data.url)
}
