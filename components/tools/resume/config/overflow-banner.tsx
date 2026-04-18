'use client'

import { WarningCircle, CheckCircle, CircleNotch } from '@phosphor-icons/react/dist/ssr'
import type { ResumeConfig } from '@/lib/tools/resume/types'

type Patch = (partial: Partial<ResumeConfig>) => void

export function OverflowBanner({
  config,
  estimatedPages,
  authoritativePages,
  status,
  patch,
}: {
  config: ResumeConfig
  estimatedPages: number
  authoritativePages: number | null
  status: 'idle' | 'estimating' | 'ready' | 'error'
  patch: Patch
}) {
  const shown = authoritativePages ?? estimatedPages
  const overflowing = shown > config.targetPages

  if (status === 'estimating' && authoritativePages === null) {
    return (
      <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)]">
        <CircleNotch size={14} weight="bold" className="animate-spin" />
        Estimating page count…
      </div>
    )
  }

  if (!overflowing) {
    return (
      <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]">
        <CheckCircle size={14} weight="bold" />
        Fits in {shown} page{shown !== 1 ? 's' : ''}
        {status === 'estimating' && (
          <CircleNotch size={12} weight="bold" className="animate-spin text-[var(--muted)]" />
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[color:var(--accent)] bg-[var(--surface)] p-3 text-sm flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[var(--ink)] font-medium">
        <WarningCircle size={14} weight="bold" className="text-[color:var(--accent)]" />
        Overflows target — currently {shown} pages, target {config.targetPages}.
      </div>
      <div className="flex flex-wrap gap-2">
        {config.density !== 'compact' && (
          <button
            type="button"
            onClick={() => patch({ density: 'compact' })}
            className="inline-chip hover:border-[var(--line-strong)]"
          >
            Switch to compact density
          </button>
        )}
        {config.targetPages < 2 && (
          <button
            type="button"
            onClick={() => patch({ targetPages: 2 })}
            className="inline-chip hover:border-[var(--line-strong)]"
          >
            Raise target to 2 pages
          </button>
        )}
      </div>
    </div>
  )
}
