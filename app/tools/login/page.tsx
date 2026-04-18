import { login } from './actions'

export const metadata = {
  title: 'Tools · Sign in',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ from?: string; error?: string }>

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { from = '/tools', error } = await searchParams

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <p className="section-eyebrow mb-3">Tools</p>
        <h1 className="section-title mb-2">Private workspace</h1>
        <p className="text-[var(--muted)] mb-8">
          Enter the shared password to continue.
        </p>

        <form action={login} className="card-elevated p-6 flex flex-col gap-4">
          <input type="hidden" name="from" value={from} />
          <label className="flex flex-col gap-2">
            <span className="section-eyebrow">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="border border-[var(--line)] rounded-full px-4 py-2.5 bg-[var(--surface)] outline-none focus:border-[var(--line-strong)] text-[var(--ink)]"
            />
          </label>
          {error === 'invalid' && (
            <p className="text-sm text-[color:var(--accent)]">That password is not right.</p>
          )}
          {error === 'unconfigured' && (
            <p className="text-sm text-[color:var(--accent)]">
              Server missing TOOLS_PASSWORD env var.
            </p>
          )}
          <button
            type="submit"
            className="contact-row justify-center font-medium"
          >
            Unlock tools
          </button>
        </form>
      </div>
    </div>
  )
}
