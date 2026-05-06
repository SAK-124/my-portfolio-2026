import type { MetadataRoute } from 'next'
import { publishedBlogPosts } from '@/data/blog'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { topicPages } from '@/data/topics'
import { publicTools } from '@/data/tools'
import { absoluteUrl } from '@/lib/schema'

type SitemapEntry = MetadataRoute.Sitemap[number]
const SITE_LAST_MODIFIED = new Date('2026-04-24T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: SitemapEntry[] = [
    route('/', SITE_LAST_MODIFIED, 'weekly', 1, ['/saboor-ali-khan-profile.jpg']),
    route('/about', SITE_LAST_MODIFIED, 'monthly', 0.95, ['/saboor-ali-khan-profile.jpg']),
    route('/experience', SITE_LAST_MODIFIED, 'monthly', 0.9),
    route('/projects', SITE_LAST_MODIFIED, 'weekly', 0.9),
    route('/tools', SITE_LAST_MODIFIED, 'weekly', 0.9),
    route('/education', SITE_LAST_MODIFIED, 'yearly', 0.8),
    route('/certifications', SITE_LAST_MODIFIED, 'monthly', 0.8),
    route('/faq', SITE_LAST_MODIFIED, 'monthly', 0.7),
    route('/contact', SITE_LAST_MODIFIED, 'yearly', 0.7),
    route('/blog', SITE_LAST_MODIFIED, 'weekly', 0.85),
  ]

  const experienceRoutes = profile.experience.map((entry) =>
    route(`/experience/${entry.slug}`, SITE_LAST_MODIFIED, 'monthly', 0.85),
  )

  const projectRoutes = projects.map((project) =>
    route(
      `/projects/${project.slug}`,
      SITE_LAST_MODIFIED,
      project.visibility === 'public' ? 'monthly' : 'weekly',
      project.featured ? 0.88 : 0.8,
      project.screenshots.map((screenshot) => screenshot.src),
    ),
  )

  const topicRoutes = topicPages.map((topic) => route(topic.path, SITE_LAST_MODIFIED, 'monthly', 0.84))
  const toolRoutes = publicTools.map((tool) =>
    route(
      tool.path,
      SITE_LAST_MODIFIED,
      'weekly',
      0.88,
      tool.screenshots.map((screenshot) => screenshot.src),
    ),
  )

  const blogRoutes = publishedBlogPosts.map((post) => {
    const entry: SitemapEntry = {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.dateModified ? new Date(post.dateModified) : new Date(post.datePublished),
      changeFrequency: 'monthly',
      priority: 0.82,
    }
    if (post.coverImage) {
      entry.images = [absoluteUrl(post.coverImage)]
    }
    return entry
  })

  return [
    ...staticRoutes,
    ...experienceRoutes,
    ...projectRoutes,
    ...topicRoutes,
    ...toolRoutes,
    ...blogRoutes,
  ]
}

function route(
  path: string,
  lastModified: Date,
  changeFrequency: SitemapEntry['changeFrequency'],
  priority: number,
  images: string[] = [],
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    images: images.map((image) => absoluteUrl(image)),
  }
}
