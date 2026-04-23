import { ArrowRight, LockKey } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { SectionHead } from '@/components/page-header'
import { getProject, projects } from '@/data/projects'
import { buildMetadata } from '@/lib/seo'
import { buildProjectSchema } from '@/lib/schema'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {}
  }

  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/projects/${project.slug}`,
    image: project.screenshots[0]?.src,
    keywords: project.keywords,
  })
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={buildProjectSchema(project)} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name, href: `/projects/${project.slug}` },
        ]}
      />

      <div className="pb-10 md:pb-14">
        <p className="section-eyebrow">Project</p>
        <h1 className="mt-4 max-w-[22ch] text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl md:text-[3.5rem] md:leading-[0.98] md:tracking-[-0.04em] lg:text-[4rem]">
          {project.name}
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:mt-6 md:text-[1.05rem]">
          {project.tagline}
        </p>
      </div>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div className="grid gap-5">
            {project.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="card-bezel">
                <div className="card-bezel-inner">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1600}
                    height={900}
                    unoptimized={screenshot.src.endsWith('.svg')}
                    className="h-auto w-full rounded-[calc(2.25rem-11px)] object-cover"
                  />
                  {screenshot.caption ? (
                    <figcaption className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{screenshot.caption}</figcaption>
                  ) : null}
                </div>
              </figure>
            ))}
          </div>

          <aside className="grid gap-4 self-start">
            <article className="card-soft p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Summary</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
            </article>

            <article className="card-soft p-5 md:p-6">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Visibility</p>
                {project.visibility === 'private' ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
                    <LockKey size={11} weight="bold" />
                    Confidential
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span key={`${project.slug}-${item}`} className="inline-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {project.links.length > 0 ? (
              <article className="card-soft p-5 md:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Links</p>
                <div className="mt-4 grid gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:translate-x-[2px]"
                    >
                      {link.label}
                      <ArrowRight size={16} weight="bold" />
                    </a>
                  ))}
                </div>
              </article>
            ) : null}

            {project.relatedTopics.length > 0 ? (
              <article className="card-soft p-5 md:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Related Topics</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.relatedTopics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/${topic}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)] transition-all duration-300 hover:text-[var(--ink)]"
                    >
                      {topic.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </article>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Context" title="What this project covers" />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {project.longDescription.map((paragraph, index) => (
            <article key={`${project.slug}-description-${index}`} className="card-soft p-5 md:p-6">
              <p className="project-index">0{index + 1}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Impact" title="What mattered most" />
        <div className="mt-8 grid gap-3 md:mt-10">
          {project.impact.map((item, index) => (
            <article key={item} className="card-soft p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">{item}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
