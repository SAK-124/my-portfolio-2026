import { NextResponse, type NextRequest } from 'next/server'

function sanitizeNextPath(next: string | null): string {
  if (!next) return '/tools'
  return next.startsWith('/tools') ? next : '/tools'
}

export async function GET(request: NextRequest) {
  const next = sanitizeNextPath(request.nextUrl.searchParams.get('next'))
  const fallback = new URL('/tools/login', request.url)
  fallback.searchParams.set('error', 'disabled')
  fallback.searchParams.set('from', next)
  return NextResponse.redirect(fallback)
}
