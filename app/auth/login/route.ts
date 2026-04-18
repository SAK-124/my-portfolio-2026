import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { tryGetSupabaseClientEnv } from '@/lib/supabase/config'

function sanitizeNextPath(next: string | null): string {
  if (!next) return '/tools'
  return next.startsWith('/tools') ? next : '/tools'
}

function getCallbackBaseUrl(request: NextRequest): string {
  const host = request.nextUrl.hostname.toLowerCase()
  const isLocal = host === 'localhost' || host === '127.0.0.1'
  if (isLocal) return 'http://localhost:3000'

  const isCanonical = host === 'www.sabooralikhan.com' || host === 'sabooralikhan.com'
  if (isCanonical) return 'https://www.sabooralikhan.com'

  return request.nextUrl.origin
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

  const callbackUrl = new URL('/auth/callback', getCallbackBaseUrl(request))
  callbackUrl.searchParams.set('next', next)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: 'offline',
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
