import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['', '/about', '/experience', '/projects', '/education', '/certifications', '/faq', '/contact']

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/experience' || route === '/education' ? 0.9 : 0.8,
  }))
}
