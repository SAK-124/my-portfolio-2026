import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Experience',
  description: 'Experience timeline for Saboor Ali Khan, including 10Pearls Pakistan and P&G brand ambassador work.',
  path: '/experience',
})

export default function ExperiencePage() {
  return (
    <div className="container py-10 md:py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Experience', href: '/experience' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:pb-16">
        <div>
          <p className="section-eyebrow">Experience</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Experience of Saboor Ali Khan</h1>
        </div>
        <p className="max-w-[64ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          Current work is centered on marketing automation, SEO-related operations, and the systems that support recurring execution inside real teams.
        </p>
      </div>

      <section className="py-12 md:py-16">
        <div className="grid gap-8">
          {profile.experience.map((entry) => (
            <article key={`${entry.organization}-${entry.title}`} className="grid grid-cols-1 gap-5 border-t border-[var(--line)] pt-6 md:grid-cols-[180px_1fr] md:gap-8">
              <div className="text-sm text-[var(--muted)]">
                <p>{entry.startLabel} – {entry.endLabel}</p>
                <p className="mt-1">{entry.location}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">{entry.organization}</p>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--ink)]">{entry.title}</h2>
                <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[var(--muted)]">{entry.summary}</p>
                <ul className="mt-5 grid gap-3">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--muted)]">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
