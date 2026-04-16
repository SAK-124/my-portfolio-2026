import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { faq, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'

const display = Outfit({ subsets: ['latin'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Saboor Ali Khan',
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    'Saboor Ali Khan',
    'Saboor Ali Khan IBA',
    'Saboor Ali Khan 10Pearls',
    'IBA Marketing student',
    'Digital Marketing Intern 10Pearls',
    'Marketing automation',
    'Technical SEO',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Saboor Ali Khan portfolio overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Digital Marketing Intern',
    description: profile.intro,
    url: siteConfig.url,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Institute of Business Administration',
      sameAs: 'https://www.iba.edu.pk',
    },
    worksFor: {
      '@type': 'Organization',
      name: '10Pearls Pakistan',
    },
    hasCredential: profile.certifications.map((certification) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: certification.issuer,
      },
      name: certification.name,
    })),
    knowsAbout: [
      'Marketing automation',
      'Technical SEO',
      'Reporting workflows',
      'Execution systems',
      ...profile.toolGroups.flatMap((group) => group.items),
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected Projects by Saboor Ali Khan',
    itemListElement: projects
      .filter((project) => project.featured)
      .map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          url: project.href || `${siteConfig.url}/projects`,
        },
      })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  }

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-[var(--font-body)] antialiased`}>
        <div className="mesh-bg" />
        <div className="grain" />

        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={projectSchema} />
        <JsonLd data={faqSchema} />

        <div className="site-shell flex min-h-[100dvh] flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
