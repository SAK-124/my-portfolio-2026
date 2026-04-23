const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://sabooralikhan.com'
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '')

export const siteConfig = {
  name: 'Saboor Ali Khan',
  title: 'Saboor Ali Khan | Marketing Automation, Technical SEO, and Workflow Tools',
  description:
    'Official portfolio of Saboor Ali Khan, a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan. Focused on marketing automation, technical SEO, AI workflows, and workflow tools.',
  url: normalizedSiteUrl,
  github: 'https://github.com/SAK-124',
  linkedin: 'https://www.linkedin.com/in/sabooralikhan/',
  instagram: 'https://instagram.com/saboor.a.khan',
  email: 'contact@sabooralikhan.com',
  location: 'Karachi, Pakistan',
  profileImage: '/saboor-ali-khan-profile.jpg',
  ogImage: '/opengraph-image',
}

export type NavItem = {
  href: string
  label: string
}

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/education', label: 'Education' },
  { href: '/tools', label: 'Tools' },
  { href: '/contact', label: 'Contact' },
]
