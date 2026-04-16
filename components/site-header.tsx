'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { navItems, siteConfig } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 px-4 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-[1.4rem] border border-[var(--line)]/55 bg-[color-mix(in_srgb,var(--bg)_90%,white_10%)]/94 px-4 py-3 shadow-[0_2px_24px_-4px_color-mix(in_srgb,var(--accent)_8%,rgba(26,23,20,0.09)),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl md:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-tight text-[var(--ink)] transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-70 md:text-base"
            >
              {siteConfig.name}
            </Link>

            <div className="flex items-center gap-0.5">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="rounded-full p-2 text-[var(--muted)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.97]"
              >
                <GithubLogo size={17} weight="bold" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-full p-2 text-[var(--muted)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.97]"
              >
                <LinkedinLogo size={17} weight="bold" />
              </a>
            </div>
          </div>

          <nav className="mt-2 flex gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] ${
                    isActive
                      ? 'border-[color-mix(in_srgb,var(--accent)_30%,var(--line)_70%)] bg-[color-mix(in_srgb,var(--accent)_9%,var(--surface)_91%)] text-[var(--accent)]'
                      : 'border-transparent text-[var(--muted)] hover:-translate-y-[1px] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
