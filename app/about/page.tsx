import { ArrowRight, Compass, GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { PageHeader, SectionHead } from '@/components/page-header'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'
import { buildPersonSchema, buildProfilePageSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'About Saboor Ali Khan',
  description:
    'About Saboor Ali Khan, a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan focused on marketing automation, technical SEO, marketing operations, AI workflows, and workflow tools.',
  path: '/about',
  image: profile.profileImage,
  keywords: [
    'Saboor Ali Khan',
    'Saboor Ali Khan about',
    'Saboor 10Pearls',
    'Saboor IBA Karachi',
    'Saboor marketing automation',
    'Saboor technical SEO',
  ],
})

const profileSchemas = [
  buildProfilePageSchema({
    path: '/about',
    title: 'About Saboor Ali Khan',
    description: profile.aboutLead,
  }),
  buildPersonSchema(),
]

const JOURNEY_CARDS = [
  {
    eyebrow: '10Pearls Pakistan',
    title: 'Where the work became operational',
    copy: '10Pearls pushed my interests toward marketing automation, technical SEO, documentation, and repeatable execution systems instead of one-off output.',
    href: '/experience/10pearls-pakistan',
  },
  {
    eyebrow: 'IBA Karachi',
    title: 'Where the marketing lens sharpened',
    copy: 'IBA gave me the business and marketing context, but it also made it clearer that I enjoy the operating side of execution just as much as the strategy.',
    href: '/education',
  },
  {
    eyebrow: 'Earlier foundation',
    title: 'Communication, structure, and adaptability',
    copy: 'The International School and campus-facing work like the P&G career-fair role helped build the communication and presentation layer that now supports the systems work.',
    href: '/experience',
  },
] as const

const NEXT_PAGES = [
  {
    title: 'Experience',
    copy: 'Read the 10Pearls and P&G context in more detail.',
    href: '/experience',
  },
  {
    title: 'Projects',
    copy: 'See the case studies and the public work that best show the output.',
    href: '/projects',
  },
  {
    title: 'Tools',
    copy: 'Open the public tools surface, including the resume builder.',
    href: '/tools',
  },
] as const

export default function AboutPage() {
  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={profileSchemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />
      <PageHeader eyebrow="About" title="About Saboor Ali Khan" lead={profile.aboutLead} />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-10">
          <div className="card-soft p-4 md:hidden">
            <div className="flex items-center gap-4">
              <div className="hero-avatar">
                <Image
                  src={profile.profileImage}
                  alt="Saboor Ali Khan, marketing automation and technical SEO professional at 10Pearls Pakistan in Karachi"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">Saboor Ali Khan</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                  BBA Marketing at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan.
                </p>
              </div>
            </div>
          </div>

          <figure className="card-bezel hidden self-start md:block">
            <div className="card-bezel-inner">
              <Image
                src={profile.profileImage}
                alt="Saboor Ali Khan, marketing automation and technical SEO professional at 10Pearls Pakistan in Karachi"
                width={900}
                height={888}
                className="h-auto w-full rounded-[calc(2.25rem-11px)] object-cover"
                priority
              />
              <figcaption className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Saboor Ali Khan, a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan working on marketing automation, technical SEO, marketing operations, and AI workflows.
              </figcaption>
            </div>
          </figure>

          <div className="grid gap-6">
            <div className="card-soft p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Short Version</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">{profile.shortBio}</p>
            </div>

            <article className="card-soft p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">What This Page Is For</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                The homepage is the quick pitch. This page is the fuller background: how I got pulled toward systems work, what shaped the way I operate, and where each part of the portfolio fits.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Path" title="What shaped the way I work" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          {JOURNEY_CARDS.map((card) => (
            <Link key={card.title} href={card.href} className="card-soft p-5 transition-all duration-300 hover:-translate-y-[1px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{card.eyebrow}</p>
              <h2 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{card.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Open page
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Working Style" title="How I approach the work" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {profile.aboutSections.map((section, index) => (
            <article key={section.title} className="card-soft p-5 md:p-6">
              <p className="project-index">0{index + 1}</p>
              <h2 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{section.title}</h2>
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
        <SectionHead eyebrow="Next Pages" title="Where to go after this" />
        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3">
          {NEXT_PAGES.map((item) => (
            <Link key={item.href} href={item.href} className="card-soft p-5 transition-all duration-300 hover:-translate-y-[1px]">
              <h2 className="text-xl tracking-tight text-[var(--ink)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Open page
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Profiles" title="Where to find me" />
        <div className="mt-8 grid gap-3 md:mt-10 md:max-w-[44rem]">
          <a href="https://www.linkedin.com/in/sabooralikhan/" target="_blank" rel="noreferrer" className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip">
                <LinkedinLogo size={16} weight="bold" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">LinkedIn</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">linkedin.com/in/sabooralikhan</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </a>
          <a href="https://github.com/SAK-124" target="_blank" rel="noreferrer" className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip">
                <GithubLogo size={16} weight="bold" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">GitHub</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">github.com/SAK-124</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </a>
          <Link href="/tools" className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip">
                <Compass size={16} weight="bold" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Tools</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">Public tools and resume builder pages</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="card-elevated flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="profile-icon-chip">
              <Compass size={18} weight="bold" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Next</p>
              <h2 className="mt-1 text-xl tracking-tight text-[var(--ink)] md:text-2xl">Explore the work</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">See the systems, tools, and public case studies connected to Saboor Ali Khan.</p>
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line)_60%)]"
          >
            View projects <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </div>
  )
}
