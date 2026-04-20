'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, FileText, House, SignOut } from '@phosphor-icons/react/dist/ssr'
import { logout } from '@/app/tools/login/actions'

export function ToolsRouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname?.startsWith('/tools/login')
  const isResume = pathname?.startsWith('/tools/resume')

  if (isLogin) {
    return (
      <div className="tools-app">
        <div className="tools-auth-shell">
          <div className="tools-auth-shell__chrome">
            <Link href="/" className="tools-sidebar__back">
              <ArrowLeft size={14} weight="bold" />
              Back to portfolio
            </Link>
            <div className="tools-auth-shell__brand">
              <p className="tools-auth-shell__title">sak / tools</p>
            </div>
          </div>
          <div className="tools-auth-shell__canvas">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="tools-app">
      <div className="tools-shell">
        <aside className="tools-sidebar">
          <Link href="/" className="tools-sidebar__back">
            <ArrowLeft size={14} weight="bold" />
            Back to portfolio
          </Link>

          <div className="tools-sidebar__brand">
            <span className="tools-sidebar__brand-mark" aria-hidden="true" />
            <div>
              <p className="tools-sidebar__title">sak / tools</p>
            </div>
          </div>

          <div className="tools-sidebar__section">
            <p className="tools-sidebar__section-title">Workspace</p>
            <nav className="tools-navlist">
              <SidebarLink
                href="/tools"
                active={pathname === '/tools'}
                icon={House}
                label="Overview"
                meta=""
              />
              <SidebarLink
                href="/tools/resume"
                active={Boolean(isResume)}
                icon={FileText}
                label="Resume builder"
                meta=""
              />
            </nav>
          </div>

          <div className="tools-sidebar__footer">
            <form action={logout}>
              <button type="submit" className="tools-cta tools-cta--ghost tools-cta--full">
                <SignOut size={14} weight="bold" />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="tools-main">
          <div className="tools-mobilebar">
            <div className="tools-mobilebar__row">
              <Link href="/" className="tools-mobilebar__back">
                <ArrowLeft size={14} weight="bold" />
                Portfolio
              </Link>
              <div className="tools-mobilebar__brand">
                <p className="tools-mobilebar__title">sak / tools</p>
              </div>
            </div>
            <nav className="tools-mobilebar__rail">
              <SidebarLink
                href="/tools"
                active={pathname === '/tools'}
                icon={House}
                label="Overview"
                meta="Workspace"
                mobile
              />
              <SidebarLink
                href="/tools/resume"
                active={Boolean(isResume)}
                icon={FileText}
                label="Resume builder"
                meta="Editor"
                mobile
              />
            </nav>
            <div className="tools-mobilebar__actions">
              <form action={logout} className="w-full">
                <button type="submit" className="tools-cta tools-cta--ghost tools-cta--full">
                  <SignOut size={14} weight="bold" />
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <div className="tools-main__inner">{children}</div>
        </div>
      </div>
    </div>
  )
}

function SidebarLink({
  href,
  active,
  icon: IconComponent,
  label,
  meta,
  mobile = false,
}: {
  href: string
  active: boolean
  icon: typeof House
  label: string
  meta: string
  mobile?: boolean
}) {
  return (
    <Link
      href={href}
      className={`tools-navlist__link ${active ? 'tools-navlist__link--active' : ''} ${mobile ? 'tools-navlist__link--mobile' : ''}`}
    >
      <span className="tools-navlist__icon">
        <IconComponent size={15} weight="regular" />
      </span>
      <div className="tools-navlist__content">
        <p className="tools-navlist__label">{label}</p>
        <p className="tools-navlist__meta">{meta}</p>
      </div>
    </Link>
  )
}

