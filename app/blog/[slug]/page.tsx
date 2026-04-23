import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { LinkifyText } from '@/components/linkify-text'
import { getBlogPost, visibleBlogPosts } from '@/data/blog'
import { buildBlogPostingSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return visibleBlogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post || post.status === 'hidden') {
    return {}
  }

  const meta = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.coverImage,
  })

  if (post.status === 'draft') {
    meta.robots = {
      index: false,
      follow: true,
    }
  }

  return meta
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post || post.status === 'hidden') {
    notFound()
  }

  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={buildBlogPostingSchema(post)} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="pb-10 md:pb-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-chip">{post.category}</span>
          {post.status === 'draft' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
              Draft · not yet indexed
            </span>
          ) : (
            <span className="text-xs font-medium tracking-wide text-[var(--muted)]">
              {formatDate(post.datePublished)} · {post.readingTimeMinutes} min read
            </span>
          )}
        </div>
        <h1 className="mt-4 max-w-[22ch] text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl md:text-[3.5rem] md:leading-[0.98] md:tracking-[-0.04em] lg:text-[3.75rem]">
          {post.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:mt-6 md:text-[1.05rem]">
          <LinkifyText text={post.lead} />
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          By{' '}
          <a
            href="/about"
            className="font-medium text-[var(--ink)] underline decoration-[color-mix(in_srgb,var(--accent)_45%,transparent)] decoration-1 underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)]"
          >
            Saboor Ali Khan
          </a>
        </p>
      </article>

      <section className="border-t border-[var(--line)] py-10 md:py-14">
        <div className="mx-auto grid max-w-[44rem] gap-10">
          {post.sections.map((section, index) => (
            <div key={section.heading ?? `section-${index}`} className="grid gap-4">
              {section.heading ? (
                <h2 className="text-xl tracking-tight text-[var(--ink)] md:text-2xl">{section.heading}</h2>
              ) : null}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={`${section.heading ?? 'p'}-${pIndex}`}
                  className="text-sm leading-relaxed text-[var(--muted)] md:text-base"
                >
                  <LinkifyText text={paragraph} />
                </p>
              ))}
              {section.list ? (
                <ul className="grid gap-2.5">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-[var(--muted)] md:text-base"
                    >
                      <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>
                        <LinkifyText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
