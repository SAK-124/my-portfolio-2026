import { ArrowRight, BriefcaseMetal, GraduationCap, MapPin, SealCheck } from '@phosphor-icons/react/dist/ssr'
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
    <div className="container py-16 md:py-24">
      <section className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-16 md:grid-cols-[1.2fr_0.8fr] md:gap-14 md:pb-24">
        <div>
          <p className="section-eyebrow">Portfolio</p>
          <h1 className="mt-4 text-[2.75rem] leading-[0.93] tracking-[-0.045em] text-[var(--ink)] md:text-7xl">
            <span className="block">{profile.name}</span>
            <span className="mt-1 block max-w-[13ch] text-[var(--muted)]">{profile.headline}</span>
          </h1>
          <p className="mt-6 max-w-[66ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/experience">View Experience</MagneticButton>
            <MagneticButton href="/projects" variant="ghost">
              See Projects
            </MagneticButton>
          </div>

          <div className="mt-10 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
            {[
              `Based in ${profile.location}`,
              'BBA Marketing, IBA',
              '10Pearls Digital Marketing Intern',
              'Google Analytics Certified',
              profile.availability,
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="card-bezel self-start">
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
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-[var(--accent)]" weight="bold" />
              <div>
                <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Karachi, Pakistan</p>
                <p className="text-sm text-[var(--muted)]">Based in Karachi and currently studying and working in marketing operations.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap size={18} className="mt-0.5 text-[var(--accent)]" weight="bold" />
              <div>
                <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Institute of Business Administration</p>
                <p className="text-sm text-[var(--muted)]">BBA, Marketing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BriefcaseMetal size={18} className="mt-0.5 text-[var(--accent)]" weight="bold" />
              <div>
                <p className="text-sm font-medium tracking-tight text-[var(--ink)]">10Pearls Pakistan</p>
                <p className="text-sm text-[var(--muted)]">Digital Marketing Intern</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <SealCheck size={18} className="mt-0.5 text-[var(--accent)]" weight="bold" />
              <div>
                <p className="text-sm font-medium tracking-tight text-[var(--ink)]">Current focus</p>
                <TypewriterPill />
              </div>
            </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">Current Focus</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">What I focus on</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[var(--muted)]">{profile.currentFocus}</p>
        </div>
        <RevealList className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_0.9fr]">
          {profile.focusAreas.map((area, index) => (
            <article key={area.title} className="stagger-item grid gap-3 border-t border-[var(--line)] pt-4" style={{ '--index': index } as CSSProperties}>
              <h3 className="text-xl tracking-tight text-[var(--ink)]">{area.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{area.copy}</p>
            </article>
          ))}
        </RevealList>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-[var(--line)] py-16 md:grid-cols-[0.78fr_1.22fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">Current experience</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Current experience</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[var(--muted)]">
            I work as a Digital Marketing Intern at 10Pearls Pakistan, where I independently design and build the automation and SEO systems used by the marketing team, while completing my BBA in Marketing at IBA.
          </p>
        </div>
        <div className="grid gap-5">
          <article className="card-elevated p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">{currentRole.organization}</p>
                <h3 className="mt-2 text-2xl tracking-tight text-[var(--ink)]">{currentRole.title}</h3>
              </div>
              <div className="text-right text-sm text-[var(--muted)]">
                <p>{currentRole.startLabel} – {currentRole.endLabel}</p>
                <p>{currentRole.location}</p>
              </div>
            </div>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[var(--muted)]">{currentRole.summary}</p>
          </article>

          <div className="grid gap-3 border-t border-[var(--line)] pt-4 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="text-base font-medium tracking-tight text-[var(--ink)]">{ambassadorRole.title}, {ambassadorRole.organization}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{ambassadorRole.summary}</p>
            </div>
            <p className="text-sm text-[var(--muted)]">{ambassadorRole.startLabel}</p>
          </div>

          <Link href="/experience" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px]">
            Read the full experience timeline
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">Selected work</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Selected work</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[var(--muted)]">
            Every project here was designed and built by me. Professional systems are shown by summary; personal repositories link directly to source.
          </p>
        </div>
        <RevealList className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.name}
              className="stagger-item card-elevated grid gap-4 p-5"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl tracking-tight text-[var(--ink)]">{project.name}</h3>
                <span className="inline-chip">{project.visibility === 'private' ? 'Confidential' : 'Sole Author'}</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
              <div className="flex flex-wrap gap-2">
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

      <section className="grid grid-cols-1 gap-8 border-b border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">Education &amp; Credentials</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Education and credentials</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <article className="border-t border-[var(--line)] pt-4">
            <p className="text-xl tracking-tight text-[var(--ink)]">{primaryEducation.institution}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{primaryEducation.credential}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{primaryEducation.startLabel} – {primaryEducation.endLabel}</p>
          </article>
          <article className="border-t border-[var(--line)] pt-4">
            <p className="text-xl tracking-tight text-[var(--ink)]">{secondaryEducation.institution}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{secondaryEducation.credential}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{secondaryEducation.startLabel} – {secondaryEducation.endLabel}</p>
          </article>
          <article className="border-t border-[var(--line)] pt-4 md:col-span-2">
            <p className="text-xl tracking-tight text-[var(--ink)]">{certification.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{certification.issuer}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Issued {certification.year}</p>
            <Link href="/education" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[1px]">
              View education and credentials
              <ArrowRight size={16} weight="bold" />
            </Link>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-[var(--line)] py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">What I Work With</p>
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

      <section className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div className="section-label">
          <p className="section-eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Contact</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[var(--muted)]">
            If you are hiring for marketing operations, SEO, workflow automation, or related digital work, feel free to reach out.
          </p>
        </div>
        <div className="grid gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-2">
          <a href={`mailto:${siteConfig.email}`} className="card-elevated p-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] active:scale-[0.98]">
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">Email</p>
            <p className="mt-2 text-base font-medium tracking-tight text-[var(--ink)]">{siteConfig.email}</p>
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="card-elevated p-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] active:scale-[0.98]">
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">LinkedIn</p>
            <p className="mt-2 text-base font-medium tracking-tight text-[var(--ink)]">sabooralikhan</p>
            <p className="mt-1 text-sm text-[var(--muted)]">linkedin.com/in/sabooralikhan</p>
          </a>
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="card-elevated p-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] active:scale-[0.98] sm:col-span-2">
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">GitHub</p>
            <p className="mt-2 text-base font-medium tracking-tight text-[var(--ink)]">SAK-124</p>
            <p className="mt-1 text-sm text-[var(--muted)]">github.com/SAK-124</p>
          </a>
        </div>
      </section>
    </div>
  )
}
