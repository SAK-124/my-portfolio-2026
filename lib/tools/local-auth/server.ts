import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { TOOLS_LOCAL_ADMIN_EMAIL, TOOLS_LOCAL_AUTH_COOKIE, TOOLS_LOCAL_AUTH_VALUE } from './shared'

const LOCAL_ADMIN_PASSWORD = process.env.LOCAL_TOOLS_ADMIN_PASSWORD ?? 'Saboor12124'

export function isLocalToolsAuthEnabled(): boolean {
  return process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOCAL_TOOLS_AUTH === 'true'
}

export function matchesLocalAdminCredentials(email: string, password: string): boolean {
  if (!isLocalToolsAuthEnabled()) return false
  return email === TOOLS_LOCAL_ADMIN_EMAIL && password === LOCAL_ADMIN_PASSWORD
}

export function getLocalToolsUserFromRequest(request: NextRequest): { email: string } | null {
  if (!isLocalToolsAuthEnabled()) return null
  const value = request.cookies.get(TOOLS_LOCAL_AUTH_COOKIE)?.value
  if (value !== TOOLS_LOCAL_AUTH_VALUE) return null
  return { email: TOOLS_LOCAL_ADMIN_EMAIL }
}

export async function setLocalToolsSession(): Promise<void> {
  if (!isLocalToolsAuthEnabled()) return
  const cookieStore = await cookies()
  cookieStore.set(TOOLS_LOCAL_AUTH_COOKIE, TOOLS_LOCAL_AUTH_VALUE, {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function clearLocalToolsSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(TOOLS_LOCAL_AUTH_COOKIE)
}
