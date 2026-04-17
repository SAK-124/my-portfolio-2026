import type { Metadata } from 'next'
import { ArrowRight, EnvelopeSimple, LinkedinLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { ContactForm } from '@/app/contact/contact-form'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader, SectionHead } from '@/components/page-header'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Saboor Ali Khan',
  description: 'Contact Saboor Ali Khan for internships, collaborations, and execution-focused digital marketing work.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        lead="The easiest way to reach me is by email or LinkedIn. I am open to internships, collaborations, and digital marketing work with a strong execution focus."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
          <div>
            <SectionHead eyebrow="Direct" title="Reach me directly" />
            <div className="mt-6 grid gap-3 md:mt-8">
              <a href={`mailto:${siteConfig.email}`} className="contact-row">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="profile-icon-chip"><EnvelopeSimple size={16} weight="bold" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Email</p>
                    <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">{siteConfig.email}</p>
                  </div>
                </div>
                <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="contact-row">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="profile-icon-chip"><LinkedinLogo size={16} weight="bold" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">LinkedIn</p>
                    <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">sabooralikhan</p>
                  </div>
                </div>
                <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
              </a>
              <a href={siteConfig.github} target="_blank" rel="noreferrer" className="contact-row">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="profile-icon-chip"><GithubLogo size={16} weight="bold" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">GitHub</p>
                    <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">SAK-124</p>
                  </div>
                </div>
                <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
              </a>
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Form" title="Send a message" />
            <div className="mt-6 md:mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
