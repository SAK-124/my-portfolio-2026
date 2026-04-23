import type { Metadata } from 'next'
import { GraduationCap, SealCheck } from '@phosphor-icons/react/dist/ssr'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader, SectionHead } from '@/components/page-header'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Education and credentials',
  description: 'Education and credentials of Saboor Ali Khan, including IBA, The International School, and Google Analytics certification.',
  path: '/education',
})

export default function EducationPage() {
  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Education', href: '/education' }]} />
      <PageHeader
        eyebrow="Education"
        title="Education and credentials"
        lead="BBA Marketing at the Institute of Business Administration (IBA) Karachi, preceded by the International Baccalaureate Diploma at The International School. Google Analytics certified via Google Skillshop."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Academic" title="Academic background" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {profile.education.map((entry, index) => {
            const isCurrent = index === 0
            return (
              <article
                key={`${entry.institution}-${entry.credential}`}
                className={`${isCurrent ? 'card-elevated p-5 md:p-6' : 'card-muted p-4 md:p-5'} flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="profile-icon-chip"><GraduationCap size={16} weight="bold" /></span>
                  <p className="project-index">0{index + 1}</p>
                </div>
                <h2 className={`${isCurrent ? 'mt-1 text-xl md:text-2xl' : 'mt-1 text-lg'} tracking-tight`}>
                  {entry.institution}
                </h2>
                <p className={`${isCurrent ? 'text-sm' : 'text-[13px]'} leading-relaxed text-[var(--muted)]`}>
                  {entry.credential}
                </p>
                <p className="text-xs font-medium tracking-wide text-[var(--muted)]">{entry.startLabel} – {entry.endLabel}</p>
                {entry.notes?.length ? (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {entry.notes.map((note) => (
                      <span key={`${entry.institution}-${note}`} className="inline-chip">{note}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Credentials" title="Certifications" />
        <div className="mt-8 grid gap-4 md:mt-10">
          {profile.certifications.map((certification) => (
            <article key={certification.name} className="card-elevated flex flex-col gap-3 p-5 md:flex-row md:items-start md:justify-between md:p-6">
              <div className="flex items-start gap-3">
                <span className="profile-icon-chip"><SealCheck size={18} weight="bold" /></span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Certification</p>
                  <h3 className="mt-1 text-xl tracking-tight text-[var(--ink)] md:text-2xl">{certification.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{certification.issuer}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:items-end md:text-right">
                <p className="text-xs font-medium tracking-wide text-[var(--muted)]">Issued {certification.year}</p>
                <p className="text-xs text-[var(--muted)]">Source: {certification.fileHint}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
