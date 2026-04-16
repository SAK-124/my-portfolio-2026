import type { Metadata } from 'next'
import { ContactForm } from '@/app/contact/contact-form'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Saboor Ali Khan',
  description: 'Contact Saboor Ali Khan for internships, collaborations, and execution-focused digital marketing work.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="container py-10 md:py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:pb-16">
        <div>
          <p className="section-eyebrow">Contact</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Contact Saboor Ali Khan</h1>
        </div>
        <p className="max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          The easiest way to reach me is by email or LinkedIn. I am open to internships, collaborations, and digital marketing work with a strong execution focus.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-8 py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16">
        <div className="grid gap-4 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
          <p>
            Email: <a href={`mailto:${siteConfig.email}`} className="font-medium text-[var(--ink)]">{siteConfig.email}</a>
          </p>
          <p>
            LinkedIn: <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="font-medium text-[var(--ink)]">{siteConfig.linkedin}</a>
          </p>
          <p>
            GitHub: <a href={siteConfig.github} target="_blank" rel="noreferrer" className="font-medium text-[var(--ink)]">{siteConfig.github}</a>
          </p>
          <p>LinkedIn handle: <span className="font-medium text-[var(--ink)]">sabooralikhan</span></p>
          <p>GitHub handle: <span className="font-medium text-[var(--ink)]">SAK-124</span></p>
        </div>
        <ContactForm />
      </section>
    </div>
  )
}
