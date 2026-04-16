'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div className="container py-16">
          <div className="card-refraction rounded-3xl p-6 md:p-8">
            <p className="section-eyebrow">Error State</p>
            <h2 className="mt-3 text-3xl tracking-tight">Something interrupted this page render.</h2>
            <p className="mt-4 text-sm text-[var(--muted)]">{error.message || 'Unexpected runtime issue.'}</p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 inline-flex rounded-full border border-transparent bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
