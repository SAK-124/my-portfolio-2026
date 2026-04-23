import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageHeader, SectionHead } from '@/components/page-header'
import { getProject } from '@/data/projects'
import { getExperience } from '@/data/profile'
import type { TopicPage } from '@/data/topics'

export function TopicPageView({ topic }: { topic: TopicPage }) {
  const relatedProjects = topic.relatedProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
  const relatedExperience = topic.relatedExperienceSlugs
    .map((slug) => getExperience(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))

  return (
    <div className="container py-10 md:py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: topic.title, href: topic.path }]} />
      <PageHeader eyebrow={topic.eyebrow} title={topic.title} lead={topic.lead} />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Overview" title={`How ${topic.title.toLowerCase()} shows up in my work`} lead={topic.description} />
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {topic.sections.map((section, index) => (
            <article key={section.title} className="card-soft p-5 md:p-6">
              <p className="project-index">0{index + 1}</p>
              <h2 className="mt-2 text-xl tracking-tight text-[var(--ink)]">{section.title}</h2>
              <div className="mt-4 grid gap-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-[var(--line)] py-14 md:py-20">
          <SectionHead eyebrow="Related Projects" title="Projects connected to this topic" />
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="card-soft p-5 transition-all duration-300 hover:-translate-y-[1px]">
                <h2 className="text-xl tracking-tight text-[var(--ink)]">{project.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                  Open case study
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {relatedExperience.length > 0 ? (
        <section className="border-t border-[var(--line)] py-14 md:py-20">
          <SectionHead eyebrow="Related Experience" title="Experience pages connected to this topic" />
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {relatedExperience.map((entry) => (
              <Link key={entry.slug} href={`/experience/${entry.slug}`} className="card-soft p-5 transition-all duration-300 hover:-translate-y-[1px]">
                <h2 className="text-xl tracking-tight text-[var(--ink)]">{entry.organization}</h2>
                <p className="mt-1 text-sm font-medium text-[var(--ink)]">{entry.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{entry.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                  Open experience page
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
