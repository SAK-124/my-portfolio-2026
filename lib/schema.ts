import type { BlogPost } from '@/data/blog'
import type { Project } from '@/data/projects'
import { faq, profile } from '@/data/profile'
import type { PublicTool } from '@/data/tools'
import { siteConfig } from '@/lib/site'

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return path.startsWith('/') ? `${siteConfig.url}${path}` : `${siteConfig.url}/${path}`
}

const SITE_LAUNCH_DATE = '2025-10-01'

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: profile.name,
    givenName: 'Saboor',
    familyName: 'Ali Khan',
    additionalName: 'Saboor',
    alternateName: [
      'Saboor Khan',
      'Saboor Ali Khan marketing',
      'Saboor Ali Khan 10Pearls',
      'Saboor Ali Khan IBA',
      'SAK-124',
    ],
    description: profile.shortBio,
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: absoluteUrl(profile.profileImage),
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.instagram,
      'https://github.com/SAK-124',
      'https://www.linkedin.com/in/sabooralikhan/',
    ],
    gender: 'Male',
    nationality: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
    },
    workLocation: {
      '@type': 'Place',
      name: 'Karachi, Pakistan (Hybrid)',
    },
    email: `mailto:${siteConfig.email}`,
    jobTitle: 'Digital Marketing Intern',
    worksFor: {
      '@type': 'Organization',
      name: '10Pearls Pakistan',
      url: 'https://10pearls.com',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Institute of Business Administration, Karachi',
        sameAs: 'https://www.iba.edu.pk',
      },
      {
        '@type': 'School',
        name: 'The International School',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Business Administration (BBA), Marketing',
        educationalLevel: 'Bachelor',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Institute of Business Administration, Karachi',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certificate',
        name: 'Google Analytics Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google Skillshop',
        },
      },
    ],
    knowsAbout: [
      'Marketing automation',
      'Technical SEO',
      'Marketing operations',
      'AI workflows',
      'Workflow tools',
      'Outreach automation',
      'Campaign operations',
      'SEO monitoring',
      'Workflow design',
      'Internal tooling',
      'Next.js',
      'TypeScript',
      'Supabase',
      'n8n',
      'HubSpot',
      'Kwanzoo',
      'Ahrefs',
      'Google Analytics',
      ...profile.toolGroups.flatMap((group) => group.items),
    ],
    knowsLanguage: ['en', 'ur'],
    seeks: {
      '@type': 'Demand',
      name: 'Full-time roles in marketing operations, technical SEO, and workflow automation',
    },
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: 'Saboor Ali Khan Portfolio',
    url: siteConfig.url,
    logo: absoluteUrl('/android-chrome-512x512.png'),
    image: absoluteUrl(profile.profileImage),
    description: siteConfig.description,
    founder: {
      '@id': `${siteConfig.url}/#person`,
    },
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.email,
      contactType: 'Hiring and collaboration inquiries',
      availableLanguage: ['en'],
    },
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: [
      'Saboor Ali Khan portfolio',
      'Saboor Khan portfolio',
      'sabooralikhan.com',
    ],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en',
    image: absoluteUrl(siteConfig.profileImage),
    publisher: { '@id': `${siteConfig.url}/#person` },
    author: { '@id': `${siteConfig.url}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildSiteNavigationSchema() {
  const navItems: Array<{ name: string; path: string }> = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Education', path: '/education' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Tools', path: '/tools' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Marketing Automation', path: '/marketing-automation' },
    { name: 'Technical SEO', path: '/technical-seo' },
    { name: 'Marketing Operations', path: '/marketing-operations' },
    { name: 'AI Workflows', path: '/ai-workflows' },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Primary site navigation for Saboor Ali Khan portfolio',
    itemListElement: navItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}

export function buildFeaturedWorkSchema(items: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured work by Saboor Ali Khan',
    itemListElement: items.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name,
      url: absoluteUrl(`/projects/${project.slug}`),
      description: project.description,
    })),
  }
}

export function buildProjectListSchema(items: Project[], listName: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/projects/${project.slug}`),
      name: project.name,
      description: project.description,
    })),
  }
}

export function buildExperienceListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Experience timeline of Saboor Ali Khan',
    url: absoluteUrl('/experience'),
    numberOfItems: profile.experience.length,
    itemListElement: profile.experience.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/experience/${entry.slug}`),
      name: `${entry.title} at ${entry.organization}`,
      description: entry.summary,
    })),
  }
}

export function buildProfilePageSchema(options: {
  path: string
  title: string
  description: string
  dateModified?: string
}) {
  const now = options.dateModified ?? new Date().toISOString()
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: options.title,
    description: options.description,
    url: absoluteUrl(options.path),
    dateCreated: SITE_LAUNCH_DATE,
    dateModified: now,
    inLanguage: 'en',
    mainEntity: buildPersonSchema(),
    about: { '@id': `${siteConfig.url}/#person` },
  }
}

export function buildFaqSchema() {
  return {
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
}

export function buildProjectSchema(project: Project) {
  const repoLink = project.links.find((link) => link.kind === 'repo')?.href
  const liveLink = project.links.find((link) => link.kind === 'live')?.href
  const shared = {
    '@context': 'https://schema.org',
    '@type': project.schemaType,
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
    keywords: project.keywords.join(', '),
    creator: { '@id': `${siteConfig.url}/#person` },
    author: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en',
  }

  if (project.schemaType === 'SoftwareApplication') {
    return {
      ...shared,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      codeRepository: repoLink,
      downloadUrl: liveLink,
    }
  }

  return {
    ...shared,
    about: project.relatedTopics.map((topic) => absoluteUrl(`/${topic}`)),
  }
}

export function buildToolSchema(tool: PublicTool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.summary,
    url: absoluteUrl(tool.path),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    creator: { '@id': `${siteConfig.url}/#person` },
    author: { '@id': `${siteConfig.url}/#person` },
    image: tool.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
    featureList: tool.featureList.map((feature) => feature.title),
    keywords: tool.keywords.join(', '),
  }
}

export function buildBlogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    image: absoluteUrl(post.coverImage ?? profile.profileImage),
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.wordCount,
    author: { '@id': `${siteConfig.url}/#person` },
    publisher: { '@id': `${siteConfig.url}/#person` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    inLanguage: 'en',
  }
}

export function buildBlogIndexSchema(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteConfig.url}/blog#blog`,
    name: 'Saboor Ali Khan blog',
    description:
      'Essays by Saboor Ali Khan on marketing automation, technical SEO, AI workflows, marketing operations, and workflow tools.',
    url: absoluteUrl('/blog'),
    inLanguage: 'en',
    author: { '@id': `${siteConfig.url}/#person` },
    publisher: { '@id': `${siteConfig.url}/#person` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.datePublished,
      author: { '@id': `${siteConfig.url}/#person` },
    })),
  }
}
