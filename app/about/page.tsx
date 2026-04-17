import type { Metadata } from 'next'
import { ArrowRight, Compass, LinkedinLogo, GithubLogo, Lightning, MagnifyingGlass, Code, Sparkle } from '@phosphor-icons/react/dist/ssr'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader, SectionHead } from '@/components/page-header'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Saboor Ali Khan',
  description: 'About Saboor Ali Khan, an IBA Marketing student and Digital Marketing Intern at 10Pearls focused on marketing automation and technical SEO.',
  path: '/about',
})

const TOOL_ICONS = [Lightning, MagnifyingGlass, Code] as const

export default function AboutPage() {
  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />
      <PageHeader eyebrow="About" title="About Saboor Ali Khan" lead={profile.aboutLead} />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Profile" title="How I approach the work" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {profile.aboutSections.map((section, index) => (
            <article key={section.title} className="card-soft p-5 md:p-6">
              <p className="project-index">0{index + 1}</p>
              <h3 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{section.title}</h3>
              <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-[var(--muted)]">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Toolkit" title="What I reach for" />
        <div className="card-bezel mt-8 md:mt-10">
          <div className="card-bezel-inner">
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {profile.toolGroups.map((group, i) => {
                const Icon = TOOL_ICONS[i] ?? Sparkle
                return (
                  <div key={group.title} className="toolkit-cell flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="toolkit-cell-icon"><Icon size={18} weight="bold" /></span>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={`${group.title}-${item}`} className="inline-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Profiles" title="Where to find me" />
        <div className="mt-8 grid gap-3 md:mt-10 md:max-w-[40rem]">
          <a href="https://www.linkedin.com/in/sabooralikhan/" target="_blank" rel="noreferrer" className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip"><LinkedinLogo size={16} weight="bold" /></span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">LinkedIn</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">linkedin.com/in/sabooralikhan</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </a>
          <a href="https://github.com/SAK-124" target="_blank" rel="noreferrer" className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip"><GithubLogo size={16} weight="bold" /></span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">GitHub</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">github.com/SAK-124</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </a>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="card-elevated flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="profile-icon-chip"><Compass size={18} weight="bold" /></span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Next</p>
              <h3 className="mt-1 text-xl tracking-tight text-[var(--ink)] md:text-2xl">Explore the work</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">See the systems I&rsquo;ve designed and built.</p>
            </div>
          </div>
          <a href="/projects" className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line)_60%)]">
            View projects <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </section>
    </div>
  )
}
