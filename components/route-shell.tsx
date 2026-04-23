'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isToolsRoute = pathname === '/tools' || pathname?.startsWith('/tools/')

  if (isToolsRoute) {
    return (
      <main id="main-content" className="min-h-[100dvh]">
        {children}
      </main>
    )
  }

  return (
    <>
      <div className="mesh-bg" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="site-shell flex min-h-[100dvh] flex-col">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
