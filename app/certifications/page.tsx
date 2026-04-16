import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Certifications',
  description: 'Certification details for Saboor Ali Khan, including Google Analytics certification.',
  path: '/certifications',
})

export default function CertificationsPage() {
  return (
    <div className="container py-10 md:py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Certifications', href: '/certifications' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:pb-16">
        <div>
          <p className="section-eyebrow">Certifications</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Certification details</h1>
        </div>
        <p className="max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          This page is intentionally narrow. For the broader academic background, use the education page.
        </p>
      </div>

      <section className="grid gap-5 py-12 md:py-16">
        {profile.certifications.map((certification) => (
          <article key={certification.name} className="grid gap-2 border-t border-[var(--line)] pt-5">
            <h2 className="text-2xl tracking-tight text-[var(--ink)]">{certification.name}</h2>
            <p className="text-sm text-[var(--muted)]">Issuer: {certification.issuer}</p>
            <p className="text-sm text-[var(--muted)]">Year: {certification.year}</p>
            <p className="text-sm text-[var(--muted)]">Source file reference: {certification.fileHint}</p>
          </article>
        ))}
        <Link href="/education" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[1px]">
          Return to education and credentials
        </Link>
      </section>
    </div>
  )
}
