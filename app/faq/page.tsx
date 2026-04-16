import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { faq } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Common questions about Saboor Ali Khan, his education, internship, and professional focus.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <div className="container py-10 md:py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:pb-16">
        <div>
          <p className="section-eyebrow">FAQ</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Frequently asked questions</h1>
        </div>
        <p className="max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          This page supports branded search clarity and answers the basic identity and background questions people often look for.
        </p>
      </div>

      <section className="grid gap-5 py-12 md:py-16">
        {faq.map((entry) => (
          <article key={entry.q} className="grid gap-3 border-t border-[var(--line)] pt-5">
            <h2 className="text-2xl tracking-tight text-[var(--ink)]">{entry.q}</h2>
            <p className="max-w-[62ch] text-sm leading-relaxed text-[var(--muted)]">{entry.a}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
