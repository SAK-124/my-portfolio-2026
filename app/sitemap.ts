import type { MetadataRoute } from 'next'
import { publishedBlogPosts } from '@/data/blog'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { topicPages } from '@/data/topics'
import { publicTools } from '@/data/tools'
import { absoluteUrl } from '@/lib/schema'

type SitemapEntry = MetadataRoute.Sitemap[number]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: SitemapEntry[] = [
    route('/', now, 'weekly', 1, ['/saboor-ali-khan-profile.jpg']),
    route('/about', now, 'monthly', 0.95, ['/saboor-ali-khan-profile.jpg']),
    route('/experience', now, 'monthly', 0.9),
    route('/projects', now, 'weekly', 0.9),
    route('/tools', now, 'weekly', 0.9),
    route('/education', now, 'yearly', 0.8),
    route('/certifications', now, 'monthly', 0.8),
    route('/faq', now, 'monthly', 0.7),
    route('/contact', now, 'yearly', 0.7),
    route('/blog', now, 'weekly', 0.85),
  ]

  const experienceRoutes = profile.experience.map((entry) =>
    route(`/experience/${entry.slug}`, now, 'monthly', 0.85),
  )

  const projectRoutes = projects.map((project) =>
    route(
      `/projects/${project.slug}`,
      now,
      project.visibility === 'public' ? 'monthly' : 'weekly',
      project.featured ? 0.88 : 0.8,
      project.screenshots.map((screenshot) => screenshot.src),
    ),
  )

  const topicRoutes = topicPages.map((topic) => route(topic.path, now, 'monthly', 0.84))
  const toolRoutes = publicTools.map((tool) =>
    route(
      tool.path,
      now,
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
