import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader } from '@/components/page-header'
import { RevealList } from '@/components/reveal-list'
import { faq } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Common questions about Saboor Ali Khan, his education, internship, and professional focus.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Quick answers to the basic identity and background questions people often search for."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <RevealList className="grid gap-3 md:gap-4">
          {faq.map((entry, index) => (
            <article
              key={entry.q}
              className="stagger-item card-soft flex flex-col gap-3 p-5 md:flex-row md:gap-6 md:p-6"
              style={{ '--index': index } as CSSProperties}
            >
              <span className="project-index md:min-w-[3rem] md:pt-1">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg tracking-tight text-[var(--ink)] md:text-xl">{entry.q}</h2>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[var(--muted)] md:text-base">{entry.a}</p>
              </div>
            </article>
          ))}
        </RevealList>
      </section>
    </div>
  )
}
