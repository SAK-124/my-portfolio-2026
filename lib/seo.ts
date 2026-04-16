import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type MetadataInput = {
  title: string
  description: string
  path: string
}

export function buildMetadata({ title, description, path }: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString()

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}
