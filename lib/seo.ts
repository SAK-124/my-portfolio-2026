import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type MetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
}

export function buildMetadata({ title, description, path, keywords, image }: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString()
  const previewImage = image ?? siteConfig.ogImage

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: previewImage,
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
      images: [previewImage],
    },
  }
}
