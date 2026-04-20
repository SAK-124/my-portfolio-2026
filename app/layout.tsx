import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'
import { RouteShell } from '@/components/route-shell'
import { faq, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'

const display = Outfit({ subsets: ['latin'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: '%s | Saboor Ali Khan',
  },
  description: siteConfig.description,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  keywords: [
    'Saboor Ali Khan',
    'Saboor Ali Khan IBA',
    'Saboor Ali Khan 10Pearls',
    'Saboor Ali Khan portfolio',
    'Saboor Ali Khan digital marketing',
    'Saboor Ali Khan GitHub',
    'Saboor Khan Karachi',
    'SAK-124',
    'IBA Marketing student',
    'IBA Karachi marketing',
    'Digital Marketing Intern 10Pearls',
    'Marketing automation Pakistan',
    'Technical SEO specialist Pakistan',
    'Marketing operations IBA',
    'AAMD Portal',
    'iba-ta-hub',
    'Workflow automation developer Pakistan',
    'SEO workflow builder',
    'Marketing automation developer',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
    jobTitle: 'Digital Marketing Intern & Marketing Automation Developer',
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
          author: {
            '@type': 'Person',
            name: profile.name,
          },
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
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={projectSchema} />
        <JsonLd data={faqSchema} />

        <RouteShell>{children}</RouteShell>
      </body>
    </html>
  )
}
