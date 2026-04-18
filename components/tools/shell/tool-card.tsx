import Link from 'next/link'
import type { ToolDef } from '@/lib/tools/registry'

export function ToolCard({ tool }: { tool: ToolDef }) {
  const Icon = tool.icon
  const isSoon = tool.status === 'soon'
  const content = (
    <div className="card-elevated p-6 h-full flex flex-col gap-4 transition-colors">
      <div className="flex items-center gap-3">
        <span className="profile-icon-chip">
          <Icon size={18} weight="bold" />
        </span>
        <h3 className="text-lg font-medium tracking-tight text-[var(--ink)]">{tool.title}</h3>
        {isSoon && <span className="inline-chip ml-auto">Coming soon</span>}
      </div>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{tool.blurb}</p>
      <p className="mt-auto text-sm text-[var(--ink)]">
        {isSoon ? 'Not yet available' : 'Open tool →'}
      </p>
    </div>
  )
  if (isSoon) return <div className="opacity-60">{content}</div>
  return (
    <Link href={tool.href} className="block">
      {content}
    </Link>
  )
}
