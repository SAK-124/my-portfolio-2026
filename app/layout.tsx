import type { Metadata, Viewport } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'
import { RouteShell } from '@/components/route-shell'
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildSiteNavigationSchema,
} from '@/lib/schema'
import { siteConfig } from '@/lib/site'

const display = Outfit({ subsets: ['latin'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })

export const viewport: Viewport = {
  themeColor: '#141716',
}

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
    'Saboor Ali Khan marketing automation',
    'Saboor Ali Khan technical SEO',
    'Saboor Ali Khan resume builder',
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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

const globalSchemas = [
  buildPersonSchema(),
  buildOrganizationSchema(),
  buildSiteNavigationSchema(),
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-[var(--font-body)] antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <JsonLd data={globalSchemas} />
        <RouteShell>{children}</RouteShell>
      </body>
    </html>
  )
}
