import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE_NAME, getConfiguredPassword, verifyCookieToken } from '@/lib/tools/auth/middleware-helpers'

export const config = {
  matcher: ['/tools/:path*'],
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/tools/login' || pathname.startsWith('/tools/login/')) {
    return NextResponse.next()
  }

  const password = getConfiguredPassword()
  if (!password) {
    const url = request.nextUrl.clone()
    url.pathname = '/tools/login'
    url.searchParams.set('error', 'unconfigured')
    return NextResponse.redirect(url)
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  const ok = await verifyCookieToken(token, password)
  if (ok) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/tools/login'
  url.searchParams.set('from', pathname + search)
  return NextResponse.redirect(url)
}
