import Link from 'next/link'
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import { navItems, siteConfig } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)]/80 bg-[color-mix(in_srgb,var(--bg)_88%,white_12%)]/95 backdrop-blur-md">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-[var(--ink)] md:text-base">
            {siteConfig.name}
          </Link>

          <div className="flex items-center gap-1">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.98]"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.98]"
            >
              <LinkedinLogo size={18} weight="bold" />
            </a>
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-transparent px-3 py-1.5 text-sm text-[var(--muted)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.98]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
