'use client'

import { useState } from 'react'
import { InlineTypewriter } from './inline-typewriter'

interface Props {
  nextPath: string
  errorMessage: string | null
  successMessage: string | null
  loginAction: (formData: FormData) => void | Promise<void>
  signupAction: (formData: FormData) => void | Promise<void>
}

const VERBS = ['Build', 'Create', 'Design', 'Automate', 'Ship']

export function LoginCard({
  nextPath,
  errorMessage,
  successMessage,
  loginAction,
  signupAction,
}: Props) {
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="mx-auto max-w-md">
      <p className="section-eyebrow mb-3">Tools</p>
      <h1 className="login-brand mb-2">
        <span className="login-brand__mark">SAK</span>
        <span className="login-brand__slash">/Tools</span>
        <span className="login-brand__divider" aria-hidden="true">|</span>
        <InlineTypewriter words={VERBS} className="login-brand__verb" />
      </h1>
      <p className="text-[var(--muted)] mb-8">
        Sign in with email and password to access your private workspace.
      </p>

      <div className="card-elevated p-6 flex flex-col gap-5">
        {errorMessage && <p className="auth-alert">{errorMessage}</p>}
        {successMessage && <p className="auth-alert auth-alert--success">{successMessage}</p>}

        {!showSignup ? (
          <>
            <form action={loginAction} className="auth-form">
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
                  placeholder="you@email.com"
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
                  placeholder="Your password"
                />
              </div>
              <button type="submit" className="google-auth-button">
                <span>Sign in</span>
                <span className="google-auth-button__chevron" aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <button type="button" className="auth-switch__link" onClick={() => setShowSignup(true)}>
                Create one
              </button>
            </p>
          </>
        ) : (
          <>
            <form action={signupAction} className="auth-form">
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
                  placeholder="you@email.com"
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

            <p className="auth-switch">
              Already have an account?{' '}
              <button type="button" className="auth-switch__link" onClick={() => setShowSignup(false)}>
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
