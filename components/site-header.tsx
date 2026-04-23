'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CaretDown, GithubLogo, LinkedinLogo, Toolbox } from '@phosphor-icons/react'
import { navItems, siteConfig } from '@/lib/site'

const toolsMenuItems = [
  {
    href: '/tools/resume-builder',
    label: 'Resume Builder',
  },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const toolsMenuRef = useRef<HTMLDivElement | null>(null)
  const isToolsActive = pathname === '/tools' || pathname.startsWith('/tools/')

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!toolsMenuRef.current?.contains(event.target as Node)) {
        setToolsMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-20 px-4 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-[1.25rem] border border-[var(--line)]/70 bg-[color-mix(in_srgb,var(--bg)_88%,white_12%)]/90 px-4 py-3 backdrop-blur-xl md:px-5">
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
              <Link
                href="/tools"
                aria-label="Tools"
                className={`rounded-full p-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[var(--surface)] hover:text-[var(--ink)] active:scale-[0.97] ${
                  pathname === '/tools' || pathname.startsWith('/tools/')
                    ? 'text-[var(--ink)] bg-[var(--surface)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                <Toolbox size={17} weight="bold" />
              </Link>
            </div>
          </div>

          <nav className="relative mt-2 flex justify-center gap-1 overflow-x-auto overflow-y-visible pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              if (item.href === '/tools') {
                return (
                  <div
                    key={item.href}
                    ref={toolsMenuRef}
                    className="relative pb-3"
                    onMouseEnter={() => setToolsMenuOpen(true)}
                    onMouseLeave={() => setToolsMenuOpen(false)}
                    onFocus={() => setToolsMenuOpen(true)}
                    onBlur={(event) => {
                      const nextTarget = event.relatedTarget as Node | null
                      if (!event.currentTarget.contains(nextTarget)) {
                        setToolsMenuOpen(false)
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] ${
                        isToolsActive
                          ? 'border-[color-mix(in_srgb,var(--accent)_30%,var(--line)_70%)] bg-[color-mix(in_srgb,var(--accent)_9%,var(--surface)_91%)] text-[var(--accent)]'
                          : 'border-transparent text-[var(--muted)] hover:-translate-y-[1px] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
                      }`}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      {item.label}
                      <CaretDown
                        size={12}
                        weight="bold"
                        className={`transition-transform duration-300 ${toolsMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    <div
                      aria-hidden="true"
                      className={`absolute right-0 top-full z-20 h-5 w-[13rem] ${
                        toolsMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                    />

                    <div
                      className={`absolute right-0 top-full z-30 mt-2 w-[13rem] rounded-[1rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_96%,white_4%)] p-2 shadow-[0_18px_50px_rgba(26,23,20,0.12)] transition-all duration-200 ${
                        toolsMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                      }`}
                    >
                      {toolsMenuItems.map((menuItem) => (
                        <Link
                          key={menuItem.href}
                          href={menuItem.href}
                          className="block rounded-[0.85rem] border border-transparent px-3 py-2.5 text-sm font-medium tracking-tight text-[var(--ink)] transition-all duration-200 hover:border-[var(--line)] hover:bg-[var(--surface)]"
                          onClick={() => setToolsMenuOpen(false)}
                        >
                          {menuItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

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
