import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Education and credentials',
  description: 'Education and credentials of Saboor Ali Khan, including IBA, The International School, and Google Analytics certification.',
  path: '/education',
})

export default function EducationPage() {
  return (
    <div className="container py-10 md:py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Education', href: '/education' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:pb-16">
        <div>
          <p className="section-eyebrow">Education</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Education and credentials</h1>
        </div>
        <p className="max-w-[64ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          My formal background is in marketing, and most of my practical work has centered on digital operations, SEO, and execution systems.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-8 py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16">
        <div>
          <p className="section-eyebrow">Academic background</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Education that supports the current work.</h2>
        </div>
        <div className="grid gap-6">
          {profile.education.map((entry) => (
            <article key={`${entry.institution}-${entry.credential}`} className="grid gap-3 border-t border-[var(--line)] pt-5">
              <h2 className="text-2xl tracking-tight text-[var(--ink)]">{entry.institution}</h2>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{entry.credential}</p>
              <p className="text-sm text-[var(--muted)]">{entry.startLabel} – {entry.endLabel}</p>
              {entry.notes?.length ? (
                <div className="flex flex-wrap gap-2">
                  {entry.notes.map((note) => (
                    <span key={`${entry.institution}-${note}`} className="inline-chip">
                      {note}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16">
        <div>
          <p className="section-eyebrow">Credentials</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Relevant certification.</h2>
        </div>
        <div className="grid gap-5">
          {profile.certifications.map((certification) => (
            <article key={certification.name} className="grid gap-2 border-t border-[var(--line)] pt-5">
              <h3 className="text-2xl tracking-tight text-[var(--ink)]">{certification.name}</h3>
              <p className="text-sm text-[var(--muted)]">{certification.issuer}</p>
              <p className="text-sm text-[var(--muted)]">Issued {certification.year}</p>
              <p className="text-sm text-[var(--muted)]">Source reference: {certification.fileHint}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
