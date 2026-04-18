import { NextResponse, type NextRequest } from 'next/server'
import { refreshAuthSession } from '@/lib/supabase/middleware'

export const config = {
  matcher: ['/', '/tools/:path*'],
}

function isToolsLoginPath(pathname: string): boolean {
  return pathname === '/tools/login' || pathname.startsWith('/tools/login/')
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/') {
    const hasAuthError =
      request.nextUrl.searchParams.has('error') &&
      request.nextUrl.searchParams.has('error_code')

    if (hasAuthError) {
      const url = request.nextUrl.clone()
      url.pathname = '/tools/login'
      url.search = '?error=oauth'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  const { response, user, configured } = await refreshAuthSession(request)

  if (!configured) {
    const url = request.nextUrl.clone()
    url.pathname = '/tools/login'
    url.searchParams.set('error', 'unconfigured')
    return NextResponse.redirect(url)
  }

  if (isToolsLoginPath(pathname)) {
    if (user) {
      const from = request.nextUrl.searchParams.get('from')
      const url = request.nextUrl.clone()
      url.pathname = from && from.startsWith('/tools') ? from : '/tools'
      url.search = ''
      return NextResponse.redirect(url)
    }
    return response
  }

  if (user) {
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = '/tools/login'
  url.searchParams.set('from', pathname + search)
  return NextResponse.redirect(url)
}
