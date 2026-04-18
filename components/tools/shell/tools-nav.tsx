'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tools } from '@/lib/tools/registry'
import { logout } from '@/app/tools/login/actions'

export function ToolsNav() {
  const pathname = usePathname()
  if (pathname?.startsWith('/tools/login')) return null
  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-5">
      <Link
        href="/tools"
        className={`inline-chip ${pathname === '/tools' ? 'border-[var(--line-strong)]' : ''}`}
      >
        All tools
      </Link>
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={tool.href}
          className={`inline-chip ${pathname.startsWith(tool.href) ? 'border-[var(--line-strong)]' : ''}`}
        >
          {tool.title}
        </Link>
      ))}
      <form action={logout} className="ml-auto">
        <button type="submit" className="inline-chip hover:border-[var(--line-strong)]">
          Sign out
        </button>
      </form>
    </nav>
  )
}
