import Link from 'next/link'

export const metadata = {
  title: 'Tools · Sign in',
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
        <h1 className="section-title mb-2">Private workspace</h1>
        <p className="text-[var(--muted)] mb-8">
          Sign in with Google to access your personal tools profile.
        </p>

        <div className="card-elevated p-6 flex flex-col gap-4">
          {error === 'oauth' && (
            <p className="text-sm text-[color:var(--accent)]">
              Google sign-in failed. Please try again.
            </p>
          )}
          {error === 'unconfigured' && (
            <p className="text-sm text-[color:var(--accent)]">
              Missing Supabase config. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
            </p>
          )}
          <Link
            href={`/auth/login?next=${encodeURIComponent(nextPath)}`}
            className="contact-row justify-center font-medium"
          >
            Continue with Google
          </Link>
        </div>
      </div>
    </div>
  )
}
