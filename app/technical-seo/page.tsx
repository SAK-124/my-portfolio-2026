import type { Metadata } from 'next'
import { TopicPageView } from '@/components/topic-page-view'
import { getTopicPage } from '@/data/topics'
import { buildMetadata } from '@/lib/seo'

const topic = getTopicPage('technical-seo')!

export const metadata: Metadata = buildMetadata({
  title: topic.seoTitle,
  description: topic.seoDescription,
  path: topic.path,
  keywords: topic.keywords,
})

export default function TechnicalSeoPage() {
  return <TopicPageView topic={topic} />
}
