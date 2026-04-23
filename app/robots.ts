import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const DISALLOWED_FOR_EVERYONE = [
  '/api/private/',
  '/_next/webpack-hmr',
  '/tools/login',
  '/tools/resume-builder/app',
]

const DISALLOWED_FOR_AI = ['/tools/login', '/tools/resume-builder/app']

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Amazonbot',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: '/',
      disallow: DISALLOWED_FOR_EVERYONE,
    },
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/tools/login', '/tools/resume-builder/app'],
    },
    ...AI_CRAWLERS.map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow: DISALLOWED_FOR_AI,
    })),
  ]

  // Note: no `Host:` directive. It is a Yandex-only extension that Bing,
  // Google, and most validators reject as invalid syntax. Canonical host is
  // expressed via the sitemap URL and per-page canonical tags instead.
  return {
    rules,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
