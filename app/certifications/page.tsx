import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, SealCheck } from '@phosphor-icons/react/dist/ssr'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader } from '@/components/page-header'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Certifications',
  description: 'Certification details for Saboor Ali Khan, including Google Analytics certification.',
  path: '/certifications',
})

export default function CertificationsPage() {
  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Certifications', href: '/certifications' }]} />
      <PageHeader
        eyebrow="Certifications"
        title="Certification details"
        lead="Professional certifications held by Saboor Ali Khan, with issuer and year."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-4">
          {profile.certifications.map((certification) => (
            <article key={certification.name} className="card-elevated flex flex-col gap-4 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="profile-icon-chip"><SealCheck size={18} weight="bold" /></span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Credential</p>
                  <h2 className="mt-1 text-xl tracking-tight text-[var(--ink)] md:text-2xl">{certification.name}</h2>
                </div>
              </div>
              <dl className="grid gap-3 border-t border-[var(--line)] pt-4 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Issuer</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{certification.issuer}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Year</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{certification.year}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Source</dt>
                  <dd className="mt-1 truncate text-sm font-medium text-[var(--ink)]" title={certification.fileHint}>{certification.fileHint}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <Link href="/education" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[1px]">
          Return to education and credentials
          <ArrowRight size={16} weight="bold" />
        </Link>
      </section>
    </div>
  )
}
