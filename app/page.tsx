import { ArrowRight, BriefcaseMetal, GraduationCap, MapPin, SealCheck, EnvelopeSimple, LinkedinLogo, GithubLogo, Lightning, MagnifyingGlass, ChartLineUp, Code, Sparkle, Browsers } from '@phosphor-icons/react/dist/ssr'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagneticButton } from '@/components/magnetic-button'
import { RevealList } from '@/components/reveal-list'
import { TypewriterPill } from '@/components/typewriter-pill'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 6)
  const currentRole = profile.experience[0]
  const ambassadorRole = profile.experience[1]
  const primaryEducation = profile.education[0]
  const secondaryEducation = profile.education[1]
  const certification = profile.certifications[0]

  return (
    <div className="container py-10 md:py-20">
      {/* HERO */}
      <section className="pb-14 md:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14">
          <div>
            <p className="section-eyebrow">Portfolio</p>

            {/* Mobile-first compact header: avatar + name inline */}
            <div className="mt-5 flex items-center gap-4 md:hidden">
              <div className="hero-avatar">
                <Image
                  src="/profile-saboor.jpg"
                  alt={profile.name}
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

            {/* Desktop name block */}
            <h1 className="mt-4 hidden text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.035em] text-[var(--ink)] md:block md:text-[3.75rem] md:leading-[0.94] md:tracking-[-0.04em] lg:text-[4.25rem]">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-[34ch] text-lg font-medium leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:mt-5 md:max-w-[30ch] md:text-2xl">
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
              <span className="signal-row">
                <span className="pulse-dot" />
                <span>{profile.availability}</span>
              </span>
            </div>
          </div>

          {/* Desktop / tablet info card with large image */}
          <aside className="card-bezel hidden self-start md:block">
            <div className="card-bezel-inner grid gap-5">
              <figure className="overflow-hidden rounded-[calc(2.25rem-11px)] border border-[var(--line)]/50">
                <Image
                  src="/profile-saboor.jpg"
                  alt="Saboor Ali Khan — BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan"
                  title="Saboor Ali Khan"
                  width={800}
                  height={822}
                  priority
                  className="h-auto w-full object-cover"
                />
                <figcaption className="sr-only">
                  Saboor Ali Khan, BBA Marketing student at the Institute of Business Administration, Karachi, and Digital Marketing Intern at 10Pearls Pakistan.
                </figcaption>
              </figure>

              <div className="grid gap-4 border-t border-[var(--line)] pt-4">
                <ProfileFact icon={<MapPin size={16} weight="bold" />} title="Karachi, Pakistan">
                  Based in Karachi and currently studying and working in marketing operations.
                </ProfileFact>
                <ProfileFact icon={<GraduationCap size={16} weight="bold" />} title="Institute of Business Administration">
                  BBA, Marketing
                </ProfileFact>
                <ProfileFact icon={<BriefcaseMetal size={16} weight="bold" />} title="10Pearls Pakistan">
                  Digital Marketing Intern
                </ProfileFact>
                <div className="flex items-start gap-3">
                  <span className="profile-icon-chip">
                    <SealCheck size={16} weight="bold" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Current focus</p>
                    <TypewriterPill />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile-only info card: slim strip, no giant image below */}
        <div className="mt-8 grid gap-3 md:hidden">
          <ProfileFact icon={<GraduationCap size={16} weight="bold" />} title="Institute of Business Administration">
            BBA, Marketing
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

      {/* FOCUS AREAS */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader eyebrow="Focus" title="What I focus on" lead={profile.currentFocus} />
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
                  <span className="toolkit-cell-icon"><Icon size={18} weight="bold" /></span>
                  <span className="project-index">0{index + 1}</span>
                </div>
                <h3 className="text-xl tracking-tight text-[var(--ink)]">{area.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{area.copy}</p>
              </article>
            )
          })}
        </RevealList>
      </section>

      {/* EXPERIENCE — timeline style */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Experience"
          title="Where I'm working"
          lead="Interning on the digital marketing team at 10Pearls in Karachi, with a short campus engagement earlier this year."
        />

        <div className="mt-8 md:mt-10">
          <div className="timeline">
            {/* Current role */}
            <div className="timeline-item">
              <span className="timeline-dot" />
              <article className="card-elevated p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {currentRole.organization}
                  </p>
                  <p className="text-xs font-medium tracking-wide text-[var(--muted)]">
                    {currentRole.startLabel} — {currentRole.endLabel} · {currentRole.location}
                  </p>
                </div>
                <h3 className="mt-2 text-2xl tracking-tight text-[var(--ink)] md:text-[1.6rem]">{currentRole.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  {currentRole.summary}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {currentRole.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[var(--muted)]">
                      <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Ambassador role */}
            <div className="timeline-item">
              <span className="timeline-dot" />
              <article className="card-soft p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {ambassadorRole.organization}
                  </p>
                  <p className="text-xs font-medium tracking-wide text-[var(--muted)]">
                    {ambassadorRole.startLabel} · {ambassadorRole.location}
                  </p>
                </div>
                <h3 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{ambassadorRole.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{ambassadorRole.summary}</p>
              </article>
            </div>
          </div>
        </div>

        <Link
          href="/experience"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px] md:mt-8"
        >
          Read the full experience timeline
          <ArrowRight size={16} weight="bold" />
        </Link>
      </section>

      {/* SELECTED WORK */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Selected Work"
          title="Selected work"
          lead="Every project here was designed and built by me. Professional systems are shown by summary; personal repositories link directly to source."
        />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.name}
              className="stagger-item project-card flex flex-col gap-3"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="inline-chip">{project.visibility === 'private' ? 'Confidential' : 'Sole Author'}</span>
              </div>
              <h3 className="text-lg tracking-tight text-[var(--ink)] md:text-xl">{project.name}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {project.stack.map((item) => (
                  <span key={`${project.name}-${item}`} className="inline-chip">
                    {item}
                  </span>
                ))}
              </div>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px]"
                >
                  Open repository
                  <ArrowRight size={16} weight="bold" />
                </a>
              ) : null}
            </article>
          ))}
        </RevealList>
      </section>

      {/* TOOLS — warm doppelrand */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Toolkit"
          title="What I reach for"
          lead="The tools I keep coming back to when building automation, SEO workflows, and small web tools."
        />
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

      {/* EDUCATION */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader eyebrow="Education & Credentials" title="Education and credentials" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          <EduCard
            institution={primaryEducation.institution}
            credential={primaryEducation.credential}
            range={`${primaryEducation.startLabel} – ${primaryEducation.endLabel}`}
          />
          <EduCard
            institution={secondaryEducation.institution}
            credential={secondaryEducation.credential}
            range={`${secondaryEducation.startLabel} – ${secondaryEducation.endLabel}`}
          />
          <article className="card-elevated p-5 md:col-span-2 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Certification
              </p>
              <p className="text-xs font-medium tracking-wide text-[var(--muted)]">Issued {certification.year}</p>
            </div>
            <h3 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{certification.name}</h3>
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

      {/* CONTACT */}
      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHeader
          eyebrow="Contact"
          title="Let's work together"
          lead="If you are hiring for marketing operations, SEO, workflow automation, or related digital work, reach out on any of these."
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

const FOCUS_ICONS = [Lightning, MagnifyingGlass, ChartLineUp] as const
const TOOL_ICONS = [Lightning, MagnifyingGlass, Code] as const

function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-[44rem]">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {lead ? <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">{lead}</p> : null}
    </div>
  )
}

function ProfileFact({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
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

function EduCard({ institution, credential, range }: { institution: string; credential: string; range: string }) {
  return (
    <article className="card-elevated p-5 md:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Education</p>
      <h3 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{institution}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{credential}</p>
      <p className="mt-3 text-xs font-medium tracking-wide text-[var(--muted)]">{range}</p>
    </article>
  )
}
