import Link from 'next/link'
import { siteConfig } from '@/lib/site'

type FooterGroup = {
  main: { href: string; label: string }
  subs?: { href: string; label: string }[]
}

type FooterColumn = {
  title: string
  groups: FooterGroup[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Work',
    groups: [
      {
        main: { href: '/projects', label: 'Projects' },
        subs: [
          { href: '/projects/10pearls-outreach-automation', label: '10Pearls Outreach Automation' },
          { href: '/projects/10pearls-seo-monitoring-workflow', label: '10Pearls SEO Monitoring Workflow' },
          { href: '/projects/10pearls-marketing-operations-orchestrator', label: '10Pearls Marketing Ops Orchestrator' },
          { href: '/projects/10pearls-kwanzoo-workflow-integrations', label: '10Pearls Kwanzoo Integrations' },
          { href: '/projects/my-portfolio-2026', label: 'my-portfolio-2026' },
          { href: '/projects/iba-ta-hub', label: 'iba-ta-hub' },
        ],
      },
      {
        main: { href: '/experience', label: 'Experience' },
        subs: [
          { href: '/experience/10pearls-pakistan', label: '10Pearls Pakistan' },
          { href: '/experience/procter-and-gamble', label: 'P&G Brand Ambassador' },
        ],
      },
    ],
  },
  {
    title: 'Writing',
    groups: [
      {
        main: { href: '/blog', label: 'Blog' },
        subs: [
          { href: '/blog/wikidata-modern-seo-entity-ranking', label: 'The Wikidata Lever for Modern SEO' },
          { href: '/blog/n8n-vs-zapier-vs-make-marketing-automation-2026', label: 'n8n vs Zapier vs Make (2026)' },
          { href: '/blog/ai-workflows-for-marketing-operations', label: 'AI Workflows for Marketing Ops' },
          { href: '/blog/marketing-automation-as-an-iba-marketing-student', label: 'Marketing Automation as an IBA Student' },
          { href: '/blog/building-resume-builder-nextjs-supabase', label: 'Vibe-Coding a Resume Builder' },
        ],
      },
      {
        main: { href: '/marketing-automation', label: 'Topics' },
        subs: [
          { href: '/marketing-automation', label: 'Marketing Automation' },
          { href: '/technical-seo', label: 'Technical SEO' },
          { href: '/marketing-operations', label: 'Marketing Operations' },
          { href: '/ai-workflows', label: 'AI Workflows' },
        ],
      },
    ],
  },
  {
    title: 'About Saboor',
    groups: [
      {
        main: { href: '/about', label: 'About' },
        subs: [
          { href: '/education', label: 'Education' },
          { href: '/certifications', label: 'Certifications' },
          { href: '/faq', label: 'FAQ' },
        ],
      },
      {
        main: { href: '/contact', label: 'Contact' },
      },
    ],
  },
  {
    title: 'Products',
    groups: [
      {
        main: { href: '/tools', label: 'Tools' },
        subs: [{ href: '/tools/resume-builder', label: 'Resume Builder' }],
      },
    ],
  },
]

const MAIN_LABEL_CLASS = 'text-sm font-semibold tracking-tight'
const SUB_LABEL_CLASS = 'text-[13px] leading-[1.45]'

export function SiteFooter() {
  return (
    <footer className="mt-auto" style={{ background: '#111009' }}>
      <div className="container py-12 md:py-16">
        <div
          className="grid gap-10 pb-10 md:grid-cols-[1.3fr_2.7fr] md:gap-12"
          style={{ borderBottom: '1px solid #2a2520' }}
        >
          <div>
            <p className="text-base font-semibold tracking-tight" style={{ color: '#ede8e1' }}>
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-[44ch] text-sm leading-relaxed" style={{ color: '#9a938a' }}>
              BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan — focused on
              marketing automation, technical SEO, marketing operations, AI workflows, and workflow tools.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em]" style={{ color: '#5a554e' }}>
              Based in {siteConfig.location}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#b8b0a6' }}
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#b8b0a6' }}
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#b8b0a6' }}
              >
                GitHub
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer sitemap"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: '#b8865d' }}
                >
                  {column.title}
                </p>
                <ul className="mt-4 grid gap-4">
                  {column.groups.map((group) => (
                    <li key={group.main.href + group.main.label}>
                      <Link
                        href={group.main.href}
                        className={`${MAIN_LABEL_CLASS} transition-opacity duration-200 hover:opacity-80`}
                        style={{ color: '#ede8e1' }}
                      >
                        {group.main.label}
                      </Link>
                      {group.subs && group.subs.length > 0 ? (
                        <ul className="mt-2 grid gap-1.5 border-l pl-3" style={{ borderColor: '#2a2520' }}>
                          {group.subs.map((sub) => (
                            <li key={sub.href + sub.label}>
                              <Link
                                href={sub.href}
                                className={`${SUB_LABEL_CLASS} transition-opacity duration-200 hover:opacity-80`}
                                style={{ color: '#8e887e' }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs" style={{ color: '#5a554e' }}>
            © {new Date().getFullYear()} Saboor Ali Khan. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs" style={{ color: '#5e5850' }}>
            <Link
              href="/sitemap.xml"
              className="transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#7a746c' }}
            >
              Sitemap
            </Link>
            <Link
              href="/robots.txt"
              className="transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#7a746c' }}
            >
              Robots
            </Link>
            <Link
              href="/llms.txt"
              className="transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#7a746c' }}
            >
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
