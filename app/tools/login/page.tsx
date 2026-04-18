import Link from 'next/link'

export const metadata = {
  title: 'Saboor Ali Khan · Tools Sign in',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ from?: string; error?: string }>

function safeFrom(from: string | undefined): string {
  if (!from) return '/tools'
  return from.startsWith('/tools') ? from : '/tools'
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { from, error } = await searchParams
  const nextPath = safeFrom(from)

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <p className="section-eyebrow mb-3">Tools</p>
        <h1 className="section-title mb-2">Saboor Ali Khan Tools</h1>
        <p className="text-[var(--muted)] mb-8">
          Sign in with Google to access your private workspace.
        </p>

        <div className="card-elevated p-6 flex flex-col gap-4">
          {error === 'oauth' && (
            <p className="auth-alert">
              Couldn&apos;t complete sign-in. Please try again.
            </p>
          )}
          {error === 'unconfigured' && (
            <p className="auth-alert">
              Sign-in is temporarily unavailable. Please try again shortly.
            </p>
          )}
          <Link
            href={`/auth/login?next=${encodeURIComponent(nextPath)}`}
            className="google-auth-button"
          >
            <span className="google-auth-button__icon" aria-hidden="true">G</span>
            <span>Continue with Google</span>
            <span className="google-auth-button__chevron" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
