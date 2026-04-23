import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { SectionHead } from '@/components/page-header'
import { getProject } from '@/data/projects'
import { getExperience, profile } from '@/data/profile'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/schema'

type ExperiencePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return profile.experience.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getExperience(slug)

  if (!entry) {
    return {}
  }

  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/experience/${entry.slug}`,
    image: profile.profileImage,
    keywords: entry.keywords,
  })
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params
  const entry = getExperience(slug)

  if (!entry) {
    notFound()
  }

  const relatedProjects = entry.relatedProjectSlugs
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: entry.seoTitle,
    description: entry.seoDescription,
    url: absoluteUrl(`/experience/${entry.slug}`),
    about: entry.keywords,
  }

  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={schema} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Experience', href: '/experience' },
          { label: entry.organization, href: `/experience/${entry.slug}` },
        ]}
      />

      <div className="pb-10 md:pb-14">
        <p className="section-eyebrow">Experience</p>
        <h1 className="mt-4 max-w-[22ch] text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl md:text-[3.5rem] md:leading-[0.98] md:tracking-[-0.04em] lg:text-[4rem]">
          {entry.organization}
        </h1>
        <p className="mt-3 text-lg font-medium tracking-tight text-[var(--ink)]">{entry.title}</p>
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:mt-6 md:text-[1.05rem]">
          {entry.summary}
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {entry.startLabel} - {entry.endLabel} · {entry.location}
        </p>
      </div>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {entry.longDescription.map((paragraph, index) => (
            <article key={`${entry.slug}-description-${index}`} className="card-soft p-5 md:p-6">
              <p className="project-index">0{index + 1}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="What I worked on" title="Responsibilities and recurring work" />
        <div className="mt-8 grid gap-3 md:mt-10">
          {entry.bullets.map((bullet, index) => (
            <article key={bullet} className="card-soft p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">{bullet}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead eyebrow="Highlights" title="What stands out from this experience" />
        <div className="mt-8 grid gap-3 md:mt-10">
          {entry.highlights.map((highlight) => (
            <article key={highlight} className="card-soft p-5 md:p-6">
              <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">{highlight}</p>
            </article>
          ))}
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-[var(--line)] py-14 md:py-20">
          <SectionHead eyebrow="Connected Case Studies" title="Related project pages" />
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
    </div>
  )
}
