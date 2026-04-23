import { ArrowRight, GithubLogo, LockKey } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { PageHeader, SectionHead } from '@/components/page-header'
import { RevealList } from '@/components/reveal-list'
import { professionalProjects, projects, publicProjects } from '@/data/projects'
import { buildMetadata } from '@/lib/seo'
import { buildProjectListSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'Project hub for Saboor Ali Khan, covering 10Pearls Pakistan case studies, public GitHub projects, workflow tools, portfolio work, and product-style builds.',
  path: '/projects',
  keywords: ['Saboor projects', 'Saboor GitHub', '10Pearls case study', 'AAMD Portal', 'iba-ta-hub'],
})

const projectsListSchema = buildProjectListSchema(
  projects,
  'Projects by Saboor Ali Khan',
  '/projects',
)

export default function ProjectsPage() {
  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={projectsListSchema} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]} />
      <PageHeader
        eyebrow="Projects"
        title="Selected projects"
        lead="This is the proof library. Start here when you want the strongest output: case studies, shipped builds, public repos, and the work samples that best show how I think and execute."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          eyebrow="Professional"
          title="Systems built at 10Pearls Pakistan"
          lead="Private internal systems scoped, designed, built, and documented independently. The public pages stay intentionally high level because the underlying work is confidential."
        />
        <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {professionalProjects.map((project, index) => (
            <article
              key={project.slug}
              className="stagger-item project-card flex flex-col gap-3"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                  <LockKey size={11} weight="bold" /> Confidential
                </span>
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
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px]"
              >
                Open case study
                <ArrowRight size={16} weight="bold" />
              </Link>
            </article>
          ))}
        </RevealList>
      </section>

      {publicProjects.length > 0 ? (
        <section className="border-t border-[var(--line)] py-14 md:py-20">
          <SectionHead
            eyebrow="Public"
            title="Public GitHub projects"
            lead="Built entirely from scratch across architecture, UI, and shipping. Each card links to a detailed portfolio page first, then out to the repo or live build."
          />
          <RevealList className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
            {publicProjects.map((project, index) => (
              <article
                key={project.slug}
                className="stagger-item project-card flex flex-col gap-3"
                style={{ '--index': index } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                    <GithubLogo size={11} weight="bold" /> Public
                  </span>
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
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px]"
                  >
                    Open case study
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                  {project.links[0] ? (
                    <a
                      href={project.links[0].href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                    >
                      {project.links[0].label}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </RevealList>
        </section>
      ) : null}
    </div>
  )
}
