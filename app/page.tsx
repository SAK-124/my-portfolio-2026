import {
  ArrowRight,
  BriefcaseMetal,
  ChartLineUp,
  Code,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  Lightning,
  LinkedinLogo,
  MagnifyingGlass,
  MapPin,
  SealCheck,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { MagneticButton } from '@/components/magnetic-button'
import { RevealList } from '@/components/reveal-list'
import { TypewriterPill } from '@/components/typewriter-pill'
import { featuredProjects } from '@/data/projects'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'
import { buildFeaturedWorkSchema, buildWebsiteSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Saboor Ali Khan | Marketing Automation, Technical SEO, and Workflow Tools',
  description:
    'Official portfolio of Saboor Ali Khan, a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan focused on marketing automation, technical SEO, marketing operations, AI workflows, and workflow tools.',
  path: '/',
  image: profile.profileImage,
  keywords: [
    'Saboor Ali Khan',
    'Saboor marketing',
    'Saboor 10Pearls',
    'Saboor automation',
    'Saboor AI',
    'Saboor portfolio',
    'Saboor GitHub',
    'Saboor tools',
    'marketing automation',
    'technical SEO',
    'marketing operations',
    'AI workflows',
  ],
})

const homeSchemas = [buildWebsiteSchema(), buildFeaturedWorkSchema(featuredProjects.slice(0, 8))]
const FOCUS_ICONS = [Lightning, MagnifyingGlass, ChartLineUp] as const
const TOOL_ICONS = [Lightning, MagnifyingGlass, Code] as const
const HOME_VALUE_CARDS = [
  {
    eyebrow: 'Crossover',
    title: 'Marketing with a systems mindset',
    copy: 'I sit at the overlap between marketing execution and the systems that make that execution repeatable.',
  },
  {
    eyebrow: 'Where I work',
    title: '10Pearls Pakistan',
    copy: 'My current work is inside digital marketing operations, marketing automation, and technical SEO workflows.',
  },
  {
    eyebrow: 'What I build',
    title: 'Tools, not just ideas',
    copy: 'Public products, internal systems, and workflow layers that a teammate can actually pick up and run.',
  },
  {
    eyebrow: 'Background',
    title: 'BBA Marketing at IBA Karachi',
    copy: 'The marketing foundation comes from IBA; the way I work pulls toward operations, structure, and shipping.',
  },
] as const

export default function HomePage() {
  const currentRole = profile.experience[0]
  const ambassadorRole = profile.experience[1]
  const primaryEducation = profile.education[0]
  const secondaryEducation = profile.education[1]
  const certification = profile.certifications[0]

  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={homeSchemas} />

      <section className="pb-14 md:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14">
          <div>
            <p className="section-eyebrow">Portfolio</p>

            <div className="mt-5 flex items-center gap-4 md:hidden">
              <div className="hero-avatar">
                <Image
                  src={profile.profileImage}
                  alt="Saboor Ali Khan, marketing automation and technical SEO professional in Karachi"
                  width={160}
                  height={160}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-[1.9rem] font-semibold leading-[1] tracking-[-0.03em] text-[var(--ink)]">
                  {profile.name}
                </h1>
                <p className="mt-1 text-sm text-[var(--muted)]">{profile.location}</p>
              </div>
            </div>

            <h1 className="mt-4 hidden text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.035em] text-[var(--ink)] md:block md:text-[3.75rem] md:leading-[0.94] md:tracking-[-0.04em] lg:text-[4.25rem]">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-[34ch] text-lg font-medium leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:max-w-[30ch] md:text-2xl">
              {profile.headline}
            </p>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[var(--muted)] md:mt-5 md:text-base">
              {profile.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton href="/experience">View Experience</MagneticButton>
              <MagneticButton href="/projects" variant="ghost">
                See Projects
              </MagneticButton>
            </div>

            <div className="mt-6">
              <span className="availability-chip">
                <span className="availability-chip__bar" />
                <span className="availability-chip__label">Available</span>
                <span className="availability-chip__divider" />
                <span className="availability-chip__text">{profile.availability}</span>
              </span>
            </div>
          </div>

          <aside className="card-bezel hidden self-start md:block">
            <div className="card-bezel-inner grid gap-5">
              <figure className="overflow-hidden rounded-[calc(2.25rem-11px)] border border-[var(--line)]/50">
                <Image
                  src={profile.profileImage}
                  alt="Saboor Ali Khan, BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan"
                  title="Saboor Ali Khan"
                  width={800}
                  height={822}
                  priority
                  className="h-auto w-full object-cover"
                />
                <figcaption className="sr-only">
                  Saboor Ali Khan, BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan.
                </figcaption>
              </figure>

              <div className="grid gap-4 border-t border-[var(--line)] pt-4">
                <ProfileFact icon={<MapPin size={16} weight="bold" />} title="Karachi, Pakistan">
                  Based in Karachi and building marketing automation, technical SEO, and workflow tools.
                </ProfileFact>
                <ProfileFact icon={<GraduationCap size={16} weight="bold" />} title="Institute of Business Administration">
                  BBA, Marketing at IBA Karachi
                </ProfileFact>
                <ProfileFact icon={<BriefcaseMetal size={16} weight="bold" />} title="10Pearls Pakistan">
                  Digital Marketing Intern
                </ProfileFact>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="profile-icon-chip">
                      <SealCheck size={16} weight="bold" />
                    </span>
                    <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Current focus</p>
                  </div>
                  <TypewriterPill />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-3 md:hidden">
          <ProfileFact icon={<GraduationCap size={16} weight="bold" />} title="Institute of Business Administration">
            BBA, Marketing at IBA Karachi
          </ProfileFact>
          <ProfileFact icon={<BriefcaseMetal size={16} weight="bold" />} title="10Pearls Pakistan">
            Digital Marketing Intern
          </ProfileFact>
          <div className="flex items-start gap-3">
            <span className="profile-icon-chip">
              <SealCheck size={16} weight="bold" />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Current focus</p>
              <TypewriterPill />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Approach"
          title="Marketing with a systems mindset"
          lead="I work on the operational side of digital marketing — the workflows, automation, and tooling that turn one-off campaigns into repeatable execution."
        />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-4">
          {HOME_VALUE_CARDS.map((card, index) => (
            <article
              key={card.title}
              className="stagger-item card-elevated flex flex-col gap-3 p-5 md:p-6"
              style={{ '--index': index } as CSSProperties}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{card.eyebrow}</p>
              <h2 className="text-xl tracking-tight text-[var(--ink)]">{card.title}</h2>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{card.copy}</p>
            </article>
          ))}
        </RevealList>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader eyebrow="Focus" title="Current focus areas" lead={profile.currentFocus} />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3">
          {profile.focusAreas.map((area, index) => {
            const Icon = FOCUS_ICONS[index] ?? Sparkle
            return (
              <article
                key={area.title}
                className="stagger-item focus-card flex flex-col gap-4"
                style={{ '--index': index } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="toolkit-cell-icon">
                    <Icon size={18} weight="bold" />
                  </span>
                  <span className="project-index">0{index + 1}</span>
                </div>
                <h2 className="text-xl tracking-tight text-[var(--ink)]">{area.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{area.copy}</p>
              </article>
            )
          })}
        </RevealList>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Experience"
          title="Where I am working"
          lead="Interning on the digital marketing team at 10Pearls Pakistan, with earlier campus-facing work at the IBA Career Fair for P&G."
        />

        <div className="mt-8 md:mt-10">
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-dot" />
              <article className="card-elevated p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {currentRole.organization}
                  </p>
                  <p className="text-xs font-medium tracking-wide text-[var(--muted)]">
                    {currentRole.startLabel} - {currentRole.endLabel} · {currentRole.location}
                  </p>
                </div>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--ink)] md:text-[1.6rem]">{currentRole.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">{currentRole.summary}</p>
                <ul className="mt-4 grid gap-2.5">
                  {currentRole.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[var(--muted)]">
                      <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/experience/${currentRole.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[2px]"
                >
                  Open the 10Pearls case study
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </article>
            </div>

            <div className="timeline-item">
              <span className="timeline-dot timeline-dot--muted" />
              <article className="card-muted p-4 md:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {ambassadorRole.organization}
                  </p>
                  <p className="text-[11px] font-medium tracking-wide text-[var(--muted)]">
                    {ambassadorRole.startLabel} · {ambassadorRole.location}
                  </p>
                </div>
                <h2 className="mt-1.5 text-base tracking-tight text-[var(--ink)]">{ambassadorRole.title}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{ambassadorRole.summary}</p>
              </article>
            </div>
          </div>
        </div>

        <Link
          href="/experience"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[2px] md:mt-8"
        >
          View full experience timeline
          <ArrowRight size={16} weight="bold" />
        </Link>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Work"
          title="Selected projects"
          lead="Public GitHub work plus private case studies from 10Pearls Pakistan — outreach automation, SEO monitoring, marketing-ops orchestration, and the portfolio and tools that live on this site."
        />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const primaryLink = project.links[0]

            return (
              <article
                key={project.slug}
                className="stagger-item project-card flex flex-col gap-3"
                style={{ '--index': index } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="inline-chip">{project.visibility === 'private' ? 'Confidential' : 'Public work'}</span>
                </div>
                <h2 className="text-lg tracking-tight text-[var(--ink)] md:text-xl">{project.name}</h2>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((item) => (
                    <span key={`${project.slug}-${item}`} className="inline-chip">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[2px]"
                  >
                    Open case study
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                  {primaryLink ? (
                    <a
                      href={primaryLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                    >
                      {primaryLink.label}
                    </a>
                  ) : null}
                </div>
              </article>
            )
          })}
        </RevealList>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Toolkit"
          title="What I reach for"
          lead="The tools I keep coming back to when building automation, SEO workflows, internal systems, and small web products."
        />
        <div className="card-bezel mt-8 md:mt-10">
          <div className="card-bezel-inner">
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {profile.toolGroups.map((group, index) => {
                const Icon = TOOL_ICONS[index] ?? Sparkle
                return (
                  <div key={group.title} className="toolkit-cell flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="toolkit-cell-icon">
                        <Icon size={18} weight="bold" />
                      </span>
                      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        {group.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={`${group.title}-${item}`} className="inline-chip">
                          {item}
                        </span>
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
        <SectionHeader eyebrow="Education & Credentials" title="Education and credentials" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          <EduCard
            institution={primaryEducation.institution}
            credential={primaryEducation.credential}
            range={`${primaryEducation.startLabel} - ${primaryEducation.endLabel}`}
          />
          <EduCard
            institution={secondaryEducation.institution}
            credential={secondaryEducation.credential}
            range={`${secondaryEducation.startLabel} - ${secondaryEducation.endLabel}`}
            muted
          />
          <article className="card-elevated p-5 md:col-span-2 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Certification
              </p>
              <p className="text-xs font-medium tracking-wide text-[var(--muted)]">Issued {certification.year}</p>
            </div>
            <h2 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{certification.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{certification.issuer}</p>
            <Link
              href="/education"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[1px]"
            >
              View all credentials
              <ArrowRight size={16} weight="bold" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Contact"
          title="Let us work together"
          lead="If you are hiring for marketing operations, technical SEO, workflow automation, or adjacent digital work, these are the best places to reach me."
        />
        <div className="mt-8 grid gap-3 md:mt-10 md:max-w-[40rem]">
          <a href={`mailto:${siteConfig.email}`} className="contact-row">
            <div className="flex min-w-0 items-center gap-3">
              <span className="profile-icon-chip">
                <EnvelopeSimple size={16} weight="bold" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Email</p>
                <p className="truncate text-sm font-medium tracking-tight text-[var(--ink)]">{siteConfig.email}</p>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="shrink-0 text-[var(--muted)]" />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="contact-row">
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
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="contact-row">
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
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-[44rem]">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {lead ? <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">{lead}</p> : null}
    </div>
  )
}

function ProfileFact({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="profile-icon-chip">{icon}</span>
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-medium tracking-tight text-[var(--ink)]">{title}</p>
        <p className="text-sm text-[var(--muted)]">{children}</p>
      </div>
    </div>
  )
}

function EduCard({
  institution,
  credential,
  range,
  muted = false,
}: {
  institution: string
  credential: string
  range: string
  muted?: boolean
}) {
  return (
    <article className={muted ? 'card-muted p-4 md:p-5' : 'card-elevated p-5 md:p-6'}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${muted ? 'text-[var(--muted)]' : 'text-[var(--accent)]'}`}>
        Education
      </p>
      <h2 className={`mt-2 ${muted ? 'text-lg' : 'text-xl'} tracking-tight text-[var(--ink)]`}>{institution}</h2>
      <p className={`mt-2 ${muted ? 'text-[13px]' : 'text-sm'} leading-relaxed text-[var(--muted)]`}>{credential}</p>
      <p className="mt-3 text-xs font-medium tracking-wide text-[var(--muted)]">{range}</p>
    </article>
  )
}

