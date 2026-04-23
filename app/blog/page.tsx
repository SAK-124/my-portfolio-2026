import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { PageHeader, SectionHead } from '@/components/page-header'
import { RevealList } from '@/components/reveal-list'
import { blogPosts, publishedBlogPosts } from '@/data/blog'
import { buildBlogIndexSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Essays by Saboor Ali Khan on marketing automation, technical SEO, marketing operations, AI workflows, and the workflow tools behind recurring execution.',
  path: '/blog',
  keywords: [
    'Saboor Ali Khan blog',
    'Saboor Ali Khan essays',
    'marketing automation blog Pakistan',
    'technical SEO writing',
    'AI workflow essays',
  ],
})

const blogSchema = buildBlogIndexSchema(publishedBlogPosts)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export default function BlogIndexPage() {
  const allPosts = [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished))

  return (
    <div className="container py-10 md:py-20">
      <JsonLd data={blogSchema} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }]} />
      <PageHeader
        eyebrow="Writing"
        title="Notes on marketing automation, technical SEO, and AI workflows"
        lead="Short essays from Saboor Ali Khan on how marketing automation, technical SEO, marketing operations, and AI workflows actually play out in real work — informed by IBA Karachi, 10Pearls Pakistan, and the public tools on this site."
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          eyebrow="All posts"
          title="Posts"
          lead="Drafts are shown with a label until they are approved and promoted to the public index."
        />
        <RevealList className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {allPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="stagger-item card-soft flex flex-col gap-3 p-5 transition-all duration-300 hover:-translate-y-[1px] md:p-6"
              style={{ '--index': index } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-chip">{post.category}</span>
                {post.status === 'draft' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                    Draft
                  </span>
                ) : (
                  <span className="text-[11px] font-medium tracking-wide text-[var(--muted)]">
                    {formatDate(post.datePublished)} · {post.readingTimeMinutes} min read
                  </span>
                )}
              </div>
              <h2 className="text-lg tracking-tight text-[var(--ink)] md:text-xl">{post.title}</h2>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Read post
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
          ))}
        </RevealList>
      </section>
    </div>
  )
}
