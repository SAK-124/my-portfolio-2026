import Link from 'next/link'
import { navItems, siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#111009]">
      <div className="container py-10 md:py-14">
        {/* Top: name/bio + nav grid */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/8 pb-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-tight text-white/90">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-white/45">
              BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan. I independently design and build the automation and SEO systems used by the marketing team.
            </p>
            <p className="mt-3 text-xs text-white/30">Based in {siteConfig.location}</p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/40 transition-colors duration-200 hover:text-white/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/certifications"
              className="text-sm text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              Certifications
            </Link>
            <Link
              href="/faq"
              className="text-sm text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              FAQ
            </Link>
          </nav>
        </div>

        {/* Bottom: copyright + contact */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Saboor Ali Khan. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/35">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors duration-200 hover:text-white/70"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-white/70"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-white/70"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
