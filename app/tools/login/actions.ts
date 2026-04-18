'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function sanitizeNextPath(next: FormDataEntryValue | null): string {
  if (typeof next !== 'string' || !next.startsWith('/tools')) return '/tools'
  return next
}

function sanitizeEmail(email: FormDataEntryValue | null): string {
  return typeof email === 'string' ? email.trim().toLowerCase() : ''
}

function sanitizePassword(password: FormDataEntryValue | null): string {
  return typeof password === 'string' ? password : ''
}

export async function logout() {
  try {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  } catch {
    // If Supabase env is unavailable, still clear access via login redirect.
  }
  redirect('/tools/login')
}

export async function loginWithPassword(formData: FormData) {
  const next = sanitizeNextPath(formData.get('next'))
  const email = sanitizeEmail(formData.get('email'))
  const password = sanitizePassword(formData.get('password'))

  if (!email || !password) {
    redirect(`/tools/login?error=missing_fields&from=${encodeURIComponent(next)}`)
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      redirect(`/tools/login?error=invalid_credentials&from=${encodeURIComponent(next)}`)
    }
  } catch {
    redirect(`/tools/login?error=invalid_credentials&from=${encodeURIComponent(next)}`)
  }

  redirect(next)
}

export async function signupWithPassword(formData: FormData) {
  const next = sanitizeNextPath(formData.get('next'))
  const email = sanitizeEmail(formData.get('email'))
  const password = sanitizePassword(formData.get('password'))

  if (!email || !password) {
    redirect(`/tools/login?error=missing_fields&from=${encodeURIComponent(next)}`)
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    })

    if (error) {
      const nextError = error.message.toLowerCase().includes('already')
        ? 'email_taken'
        : 'signup_failed'
      redirect(`/tools/login?error=${nextError}&from=${encodeURIComponent(next)}`)
    }

    if (data.session) {
      redirect(next)
    }
  } catch {
    redirect(`/tools/login?error=signup_failed&from=${encodeURIComponent(next)}`)
  }

  redirect(`/tools/login?success=account_created&from=${encodeURIComponent(next)}`)
}
