import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
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
    <div className="container py-16 md:py-24">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]} />
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-16 md:grid-cols-[0.72fr_1.28fr] md:pb-24">
        <div>
          <p className="section-eyebrow">Projects</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">Selected projects by Saboor Ali Khan</h1>
        </div>
        <p className="max-w-[66ch] text-base leading-relaxed text-[var(--muted)] md:text-[1.03rem]">
          All work shown here was designed, built, and owned by me. Professional projects are shown by summary due to confidentiality. Public repositories link directly to the source.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <div>
          <p className="section-eyebrow">Professional Work</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Systems I designed and built at 10Pearls.</h2>
        </div>
        <div className="grid gap-5">
          {professionalProjects.map((project) => (
            <article key={project.name} className="grid gap-4 border-t border-[var(--line)] pt-5 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="text-2xl tracking-tight text-[var(--ink)]">{project.name}</h3>
                <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={`${project.name}-${item}`} className="inline-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <span className="inline-chip">Confidential</span>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-t border-[var(--line)] py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16">
        <div>
          <p className="section-eyebrow">Public Projects</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] text-[var(--ink)] md:text-4xl">Personal projects built entirely by me.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {publicProjects.map((project) => (
            <article key={project.name} className="card-elevated p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-2xl tracking-tight text-[var(--ink)]">{project.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-chip">Sole Author</span>
                  <span className="inline-chip">Public</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
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
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-[2px]"
                >
                  Open repository
                  <ArrowRight size={16} weight="bold" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
