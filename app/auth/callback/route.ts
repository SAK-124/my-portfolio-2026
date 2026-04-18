import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { tryGetSupabaseClientEnv } from '@/lib/supabase/config'

function sanitizeNextPath(next: string | null): string {
  if (!next) return '/tools'
  return next.startsWith('/tools') ? next : '/tools'
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = sanitizeNextPath(request.nextUrl.searchParams.get('next'))
  const fallback = new URL('/tools/login', request.url)
  fallback.searchParams.set('error', 'oauth')
  fallback.searchParams.set('from', next)

  const env = tryGetSupabaseClientEnv()
  if (!env) return NextResponse.redirect(fallback)
  const { url, anonKey } = env

  if (!code) return NextResponse.redirect(fallback)

  const redirectUrl = new URL(next, request.url)
  const response = NextResponse.redirect(redirectUrl)
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) return NextResponse.redirect(fallback)

  return response
}
