import { loginWithPassword, signupWithPassword } from './actions'

export const metadata = {
  title: 'Saboor Ali Khan · Tools Sign in',
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

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <p className="section-eyebrow mb-3">Tools</p>
        <h1 className="section-title mb-2">Saboor Ali Khan Tools</h1>
        <p className="text-[var(--muted)] mb-8">
          Sign in with email and password to access your private workspace.
        </p>

        <div className="card-elevated p-6 flex flex-col gap-5">
          {errorMessage && <p className="auth-alert">{errorMessage}</p>}
          {successMessage && <p className="auth-alert auth-alert--success">{successMessage}</p>}

          <form action={loginWithPassword} className="auth-form">
            <input type="hidden" name="next" value={nextPath} />
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="auth-form__input"
                placeholder="saboor12124@gmail.com"
              />
            </div>
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="auth-form__input"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="google-auth-button">
              <span>Sign in</span>
              <span className="google-auth-button__chevron" aria-hidden="true">→</span>
            </button>
          </form>

          <div className="auth-divider" aria-hidden="true">
            <span />
            <p>Create a new account</p>
            <span />
          </div>

          <form action={signupWithPassword} className="auth-form">
            <input type="hidden" name="next" value={nextPath} />
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="auth-form__input"
                placeholder="you@example.com"
              />
            </div>
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="auth-form__input"
                placeholder="At least 8 characters"
              />
            </div>
            <button type="submit" className="google-auth-button">
              <span>Create account</span>
              <span className="google-auth-button__chevron" aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
