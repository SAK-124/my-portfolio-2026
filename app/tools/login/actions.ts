'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, computeAuthToken, timingSafeEqual } from '@/lib/tools/auth/middleware-helpers'

export async function login(formData: FormData) {
  const password = process.env.TOOLS_PASSWORD
  if (!password) {
    redirect('/tools/login?error=unconfigured')
  }

  const submitted = String(formData.get('password') ?? '')
  if (!timingSafeEqual(submitted, password)) {
    redirect('/tools/login?error=invalid')
  }

  const token = await computeAuthToken(password)
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  const from = String(formData.get('from') ?? '/tools')
  redirect(from && from.startsWith('/tools') ? from : '/tools')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
  redirect('/tools/login')
}
