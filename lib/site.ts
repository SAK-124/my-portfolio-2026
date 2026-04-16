export const siteConfig = {
  name: 'Saboor Ali Khan',
  title: 'Saboor Ali Khan | IBA Marketing Student and Digital Marketing Intern at 10Pearls',
  description:
    'Official portfolio of Saboor Ali Khan, BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan. Focused on marketing automation, technical SEO, and execution systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sabooralikhan.com',
  github: 'https://github.com/SAK-124',
  linkedin: 'https://www.linkedin.com/in/sabooralikhan/',
  instagram: 'https://instagram.com/saboor.a.khan',
  email: 'contact@sabooralikhan.com',
  location: 'Karachi, Pakistan',
  ogImage: '/og-default.svg',
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
  { href: '/education', label: 'Education' },
  { href: '/contact', label: 'Contact' },
]
