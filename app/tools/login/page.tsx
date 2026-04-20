import { LoginCard } from '@/components/tools/login/login-card'
import { loginWithPassword, signupWithPassword } from './actions'

export const metadata = {
  title: 'Saboor Ali Khan - Tools Sign in',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ from?: string; error?: string; success?: string }>

function safeFrom(from: string | undefined): string {
  if (!from) return '/tools'
  return from.startsWith('/tools') ? from : '/tools'
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { from, error, success } = await searchParams
  const nextPath = safeFrom(from)
  const errorMessage =
    error === 'missing_fields'
      ? 'Email and password are required.'
      : error === 'invalid_credentials'
        ? 'Invalid email or password.'
        : error === 'email_taken'
          ? 'That email is already registered. Sign in instead.'
          : error === 'signup_failed'
            ? 'Could not create your account. Please try again.'
            : error === 'unconfigured'
              ? 'Sign-in is temporarily unavailable. Please try again shortly.'
              : error === 'disabled'
                ? 'Google sign-in has been removed. Use email and password instead.'
                : null
  const successMessage =
    success === 'account_created'
      ? 'Account created. Sign in with your email and password.'
      : null

  return <LoginCard
    nextPath={nextPath}
    errorMessage={errorMessage}
    successMessage={successMessage}
    loginAction={loginWithPassword}
    signupAction={signupWithPassword}
  />
}
