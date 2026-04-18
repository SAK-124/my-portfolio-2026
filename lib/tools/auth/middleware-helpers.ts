export const COOKIE_NAME = 'tools-auth'
const SALT = 'tools'

export function getConfiguredPassword(): string | undefined {
  const raw = process.env.TOOLS_PASSWORD
  if (!raw) return undefined
  const normalized = raw.trim()
  return normalized.length > 0 ? normalized : undefined
}

async function hmacSha256Hex(key: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data))
  const bytes = new Uint8Array(sig)
  let out = ''
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0')
  return out
}

export async function computeAuthToken(password: string): Promise<string> {
  return hmacSha256Hex(password, SALT)
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyCookieToken(cookieValue: string | undefined, password: string | undefined): Promise<boolean> {
  if (!cookieValue || !password) return false
  const expected = await computeAuthToken(password)
  return timingSafeEqual(cookieValue, expected)
}
