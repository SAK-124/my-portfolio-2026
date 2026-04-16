import Link from 'next/link'
import { navItems, siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: 'color-mix(in srgb, var(--bg) 88%, var(--line) 12%)',
        borderTop: '2px solid color-mix(in srgb, var(--accent) 25%, var(--line) 75%)',
      }}
    >
      <div className="container py-10 md:py-14">
        {/* Top row: name/bio + nav */}
        <div className="grid grid-cols-1 gap-8 border-b border-[var(--line)] pb-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-tight text-[var(--ink)]">{siteConfig.name}</p>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--muted)]">
              BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan. I independently design and build the automation and SEO systems used by the marketing team.
            </p>
            <p className="mt-3 text-xs text-[var(--muted)]">Based in {siteConfig.location}</p>
          </div>

          <nav
            aria-label="Site navigation"
            className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/certifications"
              className="text-sm text-[var(--muted)] transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--ink)]"
            >
              Certifications
            </Link>
            <Link
              href="/faq"
              className="text-sm text-[var(--muted)] transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--ink)]"
            >
              FAQ
            </Link>
          </nav>
        </div>

        {/* Bottom row: copyright + contact links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Saboor Ali Khan. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[var(--muted)]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors duration-200 hover:text-[var(--ink)]"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-[var(--ink)]"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-[var(--ink)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
