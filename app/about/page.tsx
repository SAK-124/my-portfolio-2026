import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Saboor Ali Khan',
  description: 'About Saboor Ali Khan, an IBA Marketing student and Digital Marketing Intern at 10Pearls focused on marketing automation and technical SEO.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-16 md:grid-cols-[0.72fr_1.28fr] md:pb-24">
        <div>
          <p className="section-eyebrow">About</p>
          <h1 className="mt-4 max-w-[14ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">About Saboor Ali Khan</h1>
        </div>
        <p className="max-w-[68ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">{profile.aboutLead}</p>
      </div>

      <section className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div>
          <p className="section-eyebrow">Profile</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">About me</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {profile.aboutSections.map((section) => (
            <article key={section.title} className="border-t border-[var(--line)] pt-4">
              <h3 className="text-xl tracking-tight text-[var(--ink)]">{section.title}</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-t border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div>
          <p className="section-eyebrow">Tools I use</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Tools I use</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {profile.toolGroups.map((group) => (
            <article key={group.title} className="border-t border-[var(--line)] pt-4">
              <h3 className="text-lg tracking-tight text-[var(--ink)]">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={`${group.title}-${item}`} className="inline-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-t border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div>
          <p className="section-eyebrow">Profiles</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Profiles</h2>
        </div>
        <div className="grid gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-2">
          <a href="https://www.linkedin.com/in/sabooralikhan/" target="_blank" rel="noreferrer" className="card-elevated p-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] active:scale-[0.98]">
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">LinkedIn</p>
            <p className="mt-2 text-base font-medium tracking-tight text-[var(--ink)]">sabooralikhan</p>
            <p className="mt-1 text-sm text-[var(--muted)]">linkedin.com/in/sabooralikhan</p>
          </a>
          <a href="https://github.com/SAK-124" target="_blank" rel="noreferrer" className="card-elevated p-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] active:scale-[0.98]">
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">GitHub</p>
            <p className="mt-2 text-base font-medium tracking-tight text-[var(--ink)]">SAK-124</p>
            <p className="mt-1 text-sm text-[var(--muted)]">github.com/SAK-124</p>
          </a>
        </div>
      </section>
    </div>
  )
}
