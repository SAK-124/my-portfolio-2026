import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { PageHeader } from '@/components/page-header'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'
import { buildExperienceListSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Experience',
  description:
    'Experience timeline for Saboor Ali Khan, including 10Pearls Pakistan, P&G, and the systems-oriented work tied to marketing automation, technical SEO, and recurring execution.',
  path: '/experience',
  keywords: ['Saboor 10Pearls', 'Saboor P&G', 'Saboor experience', '10Pearls Pakistan experience'],
})

const experienceListSchema = buildExperienceListSchema()

export default function ExperiencePage() {
  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={experienceListSchema} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Experience', href: '/experience' }]} />
      <PageHeader
        eyebrow="Experience"
        title="Roles and work history"
        lead="Digital Marketing Intern at 10Pearls Pakistan (current) — marketing automation, technical SEO, and internal systems. Before that, Brand Ambassador for P&G at the IBA Career Fair."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="timeline">
          {profile.experience.map((entry, index) => {
            const isCurrent = index === 0
            return (
              <div key={`${entry.organization}-${entry.title}`} className="timeline-item">
                <span className={`timeline-dot ${isCurrent ? '' : 'timeline-dot--muted'}`} />
                <article className={isCurrent ? 'card-elevated p-5 md:p-6' : 'card-muted p-4 md:p-5'}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className={`${isCurrent ? 'text-[11px] text-[var(--accent)]' : 'text-[10px] text-[var(--muted)]'} font-semibold uppercase tracking-[0.14em]`}>
                      {entry.organization}
                    </p>
                    <p className={`${isCurrent ? 'text-xs' : 'text-[11px]'} font-medium tracking-wide text-[var(--muted)]`}>
                      {entry.startLabel} - {entry.endLabel} · {entry.location}
                    </p>
                  </div>
                  <h2 className={`${isCurrent ? 'mt-2 text-2xl md:text-[1.6rem]' : 'mt-1.5 text-lg'} tracking-tight text-[var(--ink)]`}>
                    {entry.title}
                  </h2>
                  <p className={`${isCurrent ? 'mt-3 text-sm md:text-base' : 'mt-1.5 text-[13px]'} leading-relaxed text-[var(--muted)]`}>
                    {entry.summary}
                  </p>
                  {isCurrent && entry.bullets.length > 0 ? (
                    <ul className="mt-4 grid gap-2.5">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[var(--muted)]">
                          <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href={`/experience/${entry.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[2px]"
                  >
                    Open experience page
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </article>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
