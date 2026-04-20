import { TOOLS_LOCAL_ADMIN_EMAIL, TOOLS_LOCAL_AUTH_COOKIE, TOOLS_LOCAL_AUTH_VALUE } from './shared'

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const prefix = `${name}=`
  const hit = document.cookie
    .split('; ')
    .find((part) => part.startsWith(prefix))
  return hit ? decodeURIComponent(hit.slice(prefix.length)) : null
}

export function hasLocalToolsSession(): boolean {
  return readCookie(TOOLS_LOCAL_AUTH_COOKIE) === TOOLS_LOCAL_AUTH_VALUE
}

export function getLocalToolsAuthenticatedEmail(): string | null {
  return hasLocalToolsSession() ? TOOLS_LOCAL_ADMIN_EMAIL : null
}
