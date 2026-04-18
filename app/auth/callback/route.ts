import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

function sanitizeNextPath(next: string | null): string {
  if (!next) return '/tools'
  return next.startsWith('/tools') ? next : '/tools'
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = sanitizeNextPath(request.nextUrl.searchParams.get('next'))

  if (code) {
    try {
      const supabase = await createSupabaseServerClient()
      await supabase.auth.exchangeCodeForSession(code)
    } catch {
      const fallback = new URL('/tools/login', request.url)
      fallback.searchParams.set('error', 'unconfigured')
      fallback.searchParams.set('from', next)
      return NextResponse.redirect(fallback)
    }
  }

  const redirectUrl = new URL(next, request.url)
  return NextResponse.redirect(redirectUrl)
}
