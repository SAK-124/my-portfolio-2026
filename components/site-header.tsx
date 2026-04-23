'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CaretDown, GithubLogo, LinkedinLogo, Toolbox } from '@phosphor-icons/react'
import { navItems, siteConfig, type NavChild, type NavItem } from '@/lib/site'

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === '/') return pathname === '/'
  if (item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))) {
    return true
  }
  if (item.children) {
    return item.children.some(
      (child) => pathname === child.href || pathname.startsWith(child.href + '/'),
    )
  }
  return false
}

type DropdownLayout = 'compact' | 'wide'

function dropdownLayoutFor(item: NavItem): DropdownLayout {
  return (item.children?.length ?? 0) >= 6 ? 'wide' : 'compact'
}

export function SiteHeader() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!openMenu) return
      const menuEl = menuRefs.current[openMenu]
      if (menuEl && !menuEl.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }
    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [openMenu])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close any open menu whenever the user navigates.
  useEffect(() => {
    setOpenMenu(null)
  }, [pathname])

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

          <nav
            aria-label="Primary"
            className="relative mt-2 flex justify-center gap-1 overflow-x-auto overflow-y-visible pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] md:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {navItems.map((item) => {
              const active = isItemActive(item, pathname)
              const hasChildren = (item.children?.length ?? 0) > 0

              if (!hasChildren && item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] ${
                      active
                        ? 'border-[color-mix(in_srgb,var(--accent)_30%,var(--line)_70%)] bg-[color-mix(in_srgb,var(--accent)_9%,var(--surface)_91%)] text-[var(--accent)]'
                        : 'border-transparent text-[var(--muted)] hover:-translate-y-[1px] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <NavDropdown
                  key={item.label}
                  item={item}
                  active={active}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onClose={() => setOpenMenu(null)}
                  setRef={(el) => {
                    menuRefs.current[item.label] = el
                  }}
                />
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

type NavDropdownProps = {
  item: NavItem
  active: boolean
  open: boolean
  onOpen: () => void
  onClose: () => void
  setRef: (el: HTMLDivElement | null) => void
}

function NavDropdown({ item, active, open, onOpen, onClose, setRef }: NavDropdownProps) {
  const layout = dropdownLayoutFor(item)
  const pillClasses = `inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] ${
    active
      ? 'border-[color-mix(in_srgb,var(--accent)_30%,var(--line)_70%)] bg-[color-mix(in_srgb,var(--accent)_9%,var(--surface)_91%)] text-[var(--accent)]'
      : 'border-transparent text-[var(--muted)] hover:-translate-y-[1px] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
  }`

  const panelWidth = layout === 'wide' ? 'w-[20rem] md:w-[22rem]' : 'w-[15rem]'

  return (
    <div
      ref={setRef}
      className="relative pb-3"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null
        if (!event.currentTarget.contains(next)) onClose()
      }}
    >
      {item.href ? (
        <Link
          href={item.href}
          className={pillClasses}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={onClose}
        >
          {item.label}
          <CaretDown
            size={12}
            weight="bold"
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </Link>
      ) : (
        <button
          type="button"
          className={pillClasses}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => (open ? onClose() : onOpen())}
        >
          {item.label}
          <CaretDown
            size={12}
            weight="bold"
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      )}

      {/* Hover bridge so the menu does not close when crossing the gap. */}
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-full z-20 h-4 w-[18rem] -translate-x-1/2 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      <div
        role="menu"
        aria-label={`${item.label} submenu`}
        className={`absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 ${panelWidth} rounded-[1rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_96%,white_4%)] p-2 shadow-[0_18px_50px_rgba(26,23,20,0.12)] transition-all duration-200 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <ul className="grid gap-0.5">
          {item.children?.map((child) => (
            <NavDropdownItem key={child.href} child={child} onNavigate={onClose} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function NavDropdownItem({ child, onNavigate }: { child: NavChild; onNavigate: () => void }) {
  return (
    <li>
      <Link
        href={child.href}
        role="menuitem"
        onClick={onNavigate}
        className="block rounded-[0.85rem] border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-[var(--line)] hover:bg-[var(--surface)]"
      >
        <p className="text-sm font-medium tracking-tight text-[var(--ink)]">{child.label}</p>
        {child.description ? (
          <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--muted)]">{child.description}</p>
        ) : null}
      </Link>
    </li>
  )
}
