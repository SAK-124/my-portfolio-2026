import Link from 'next/link'
import { navItems, siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)]/90 py-8">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="text-sm font-medium tracking-tight text-[var(--ink)]">{siteConfig.name}</p>
          <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-[var(--muted)]">
            BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan. Focused on marketing automation,
            technical SEO, and execution systems.
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">Based in {siteConfig.location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)] md:justify-end">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[var(--ink)]">
              {item.label}
            </Link>
          ))}
          <Link href="/certifications" className="transition-colors hover:text-[var(--ink)]">
            Certifications
          </Link>
          <Link href="/faq" className="transition-colors hover:text-[var(--ink)]">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  )
}
