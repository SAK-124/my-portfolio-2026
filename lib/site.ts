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

export type NavChild = {
  href: string
  label: string
  description?: string
}

export type NavItem = {
  href?: string
  label: string
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/experience',
    label: 'Experience',
    children: [
      { href: '/experience', label: 'All experience', description: 'Timeline of roles and work history.' },
      { href: '/experience/10pearls-pakistan', label: '10Pearls Pakistan', description: 'Digital Marketing Intern — current role.' },
      { href: '/experience/procter-and-gamble', label: 'P&G Brand Ambassador', description: 'IBA Career Fair, 2025.' },
    ],
  },
  {
    href: '/projects',
    label: 'Projects',
    children: [
      { href: '/projects', label: 'All projects', description: 'Index of every case study and public build.' },
      { href: '/projects/10pearls-outreach-automation', label: '10Pearls Outreach Automation' },
      { href: '/projects/10pearls-seo-monitoring-workflow', label: '10Pearls SEO Monitoring Workflow' },
      { href: '/projects/10pearls-marketing-operations-orchestrator', label: '10Pearls Marketing Ops Orchestrator' },
      { href: '/projects/10pearls-kwanzoo-workflow-integrations', label: '10Pearls Kwanzoo Integrations' },
      { href: '/projects/my-portfolio-2026', label: 'my-portfolio-2026' },
      { href: '/projects/iba-ta-hub', label: 'iba-ta-hub' },
      { href: '/projects/ultimate-tictactoe-android', label: 'ultimate-tictactoe-android' },
      { href: '/projects/nebula-stack-enterprise-tech', label: 'nebula-stack-enterprise-tech' },
      { href: '/projects/corporate-service-website-demo', label: 'corporate-service-website-demo' },
      { href: '/projects/voxel-parkour-shadow-runs', label: 'voxel-parkour-shadow-runs' },
    ],
  },
  {
    href: '/blog',
    label: 'Blog',
    children: [
      { href: '/blog', label: 'All posts' },
      { href: '/blog/wikidata-modern-seo-entity-ranking', label: 'The Wikidata Lever for Modern SEO' },
      { href: '/blog/marketing-automation-as-an-iba-marketing-student', label: 'Marketing Automation as an IBA Student' },
      { href: '/blog/n8n-vs-zapier-vs-make-marketing-automation-2026', label: 'n8n vs Zapier vs Make (2026)' },
      { href: '/blog/ai-workflows-for-marketing-operations', label: 'AI Workflows for Marketing Operations' },
      { href: '/blog/building-resume-builder-nextjs-supabase', label: 'Vibe-Coding a Resume Builder' },
    ],
  },
  {
    label: 'Topics',
    children: [
      { href: '/marketing-automation', label: 'Marketing Automation', description: 'Outreach, campaign ops, repeatable execution.' },
      { href: '/technical-seo', label: 'Technical SEO', description: 'Monitoring, reporting, search-readiness.' },
      { href: '/marketing-operations', label: 'Marketing Operations', description: 'Workflow design and reporting systems.' },
      { href: '/ai-workflows', label: 'AI Workflows', description: 'LLM-assisted workflow design and tooling.' },
    ],
  },
  {
    href: '/tools',
    label: 'Tools',
    children: [
      { href: '/tools', label: 'All tools' },
      { href: '/tools/resume-builder', label: 'Resume Builder', description: 'ATS-friendly resume with live PDF preview.' },
    ],
  },
  {
    label: 'More',
    children: [
      { href: '/education', label: 'Education', description: 'IBA Karachi and The International School.' },
      { href: '/certifications', label: 'Certifications', description: 'Google Analytics and other credentials.' },
      { href: '/faq', label: 'FAQ', description: 'Quick answers about Saboor Ali Khan.' },
    ],
  },
  { href: '/contact', label: 'Contact' },
]
