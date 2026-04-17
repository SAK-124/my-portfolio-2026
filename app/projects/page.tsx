import { ArrowRight, LockKey, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader, SectionHead } from '@/components/page-header'
import { RevealList } from '@/components/reveal-list'
import { projects } from '@/data/projects'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description: 'Projects by Saboor Ali Khan, covering professional marketing systems and public workflow-focused web projects.',
  path: '/projects',
})

export default function ProjectsPage() {
  const professionalProjects = projects.filter((project) => project.category === 'professional')
  const publicProjects = projects.filter((project) => project.category === 'public')

  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]} />
      <PageHeader
        eyebrow="Projects"
        title="Selected projects"
        lead="All work shown here was designed, built, and owned by me. Professional projects are shown by summary due to confidentiality. Public repositories link directly to the source."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          eyebrow="Professional"
          title="Systems built at 10Pearls"
          lead="Private internal systems — scoped, designed, built, and documented independently."
        />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {professionalProjects.map((project, index) => (
            <article
              key={project.name}
              className="stagger-item project-card flex flex-col gap-3"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                  <LockKey size={11} weight="bold" /> Confidential
                </span>
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
            </article>
          ))}
        </RevealList>
      </section>

      {publicProjects.length > 0 ? (
        <section className="border-t border-[var(--line)] py-14 md:py-20">
          <SectionHead
            eyebrow="Public"
            title="Personal projects"
            lead="Built entirely from scratch — architecture, UI, and deployment."
          />
          <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
            {publicProjects.map((project, index) => (
              <article
                key={project.name}
                className="stagger-item project-card flex flex-col gap-3"
                style={{ '--index': index } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                    <GithubLogo size={11} weight="bold" /> Public
                  </span>
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
      ) : null}
    </div>
  )
}
