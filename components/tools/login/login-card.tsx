'use client'

import { useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
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
    <div className="tools-auth-panel">
      <p className="tools-auth-panel__eyebrow">Workspace access</p>
      <h1 className="tools-auth-panel__title">
        <span>SAK</span>{' '}
        <span className="login-brand__slash">/ Tools</span>{' '}
        <span className="login-brand__divider" aria-hidden="true">|</span>{' '}
        <InlineTypewriter words={VERBS} className="login-brand__verb" />
      </h1>
      <p className="tools-auth-panel__copy">
        Sign in to open the private workspace and continue into the tools shell.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {errorMessage ? <p className="tools-message tools-message--error">{errorMessage}</p> : null}
        {successMessage ? <p className="tools-message tools-message--success">{successMessage}</p> : null}

        {!showSignup ? (
          <>
            <form action={loginAction} className="tools-auth-form">
              <input type="hidden" name="next" value={nextPath} />
              <div className="tools-auth-form__group">
                <label className="tools-auth-form__label" htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="tools-auth-form__input"
                  placeholder="you@email.com"
                />
              </div>
              <div className="tools-auth-form__group">
                <label className="tools-auth-form__label" htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="tools-auth-form__input"
                  placeholder="Your password"
                />
              </div>
              <button type="submit" className="tools-cta tools-cta--primary tools-cta--full">
                <span>Sign in</span>
                <span className="tools-cta__glyph" aria-hidden="true">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </button>
            </form>

            <p className="tools-auth-switch">
              Don&apos;t have an account?{' '}
              <button type="button" className="tools-text-button" onClick={() => setShowSignup(true)}>
                Create one
              </button>
            </p>
          </>
        ) : (
          <>
            <form action={signupAction} className="tools-auth-form">
              <input type="hidden" name="next" value={nextPath} />
              <div className="tools-auth-form__group">
                <label className="tools-auth-form__label" htmlFor="signup-email">Email</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="tools-auth-form__input"
                  placeholder="you@email.com"
                />
              </div>
              <div className="tools-auth-form__group">
                <label className="tools-auth-form__label" htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="tools-auth-form__input"
                  placeholder="At least 8 characters"
                />
              </div>
              <button type="submit" className="tools-cta tools-cta--primary tools-cta--full">
                <span>Create account</span>
                <span className="tools-cta__glyph" aria-hidden="true">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </button>
            </form>

            <p className="tools-auth-switch">
              Already have an account?{' '}
              <button type="button" className="tools-text-button" onClick={() => setShowSignup(false)}>
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
