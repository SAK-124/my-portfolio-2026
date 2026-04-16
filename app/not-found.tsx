import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-16">
      <p className="section-eyebrow">Not Found</p>
      <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">This page does not exist.</h1>
      <p className="mt-4 kicker">Use the primary navigation to return to the portfolio sections.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full border border-transparent bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
      >
        Go to home
      </Link>
    </div>
  )
}
