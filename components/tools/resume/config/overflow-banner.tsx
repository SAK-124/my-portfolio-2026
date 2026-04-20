'use client'

import { Info, CheckCircle, CircleNotch } from '@phosphor-icons/react/dist/ssr'
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
      <div className="tools-alert tools-alert--quiet">
        <CircleNotch size={14} weight="bold" className="animate-spin" />
        Estimating page count
      </div>
    )
  }

  if (!overflowing) {
    return (
      <div className="tools-alert tools-alert--info">
        <CheckCircle size={14} weight="bold" />
        Fits in {shown} page{shown !== 1 ? 's' : ''}
        {status === 'estimating' ? (
          <CircleNotch size={12} weight="bold" className="animate-spin" />
        ) : null}
      </div>
    )
  }

  return (
    <>
      <div className="tools-alert tools-alert--info">
        <Info size={14} weight="bold" />
        <span>Overflows target &mdash; currently {shown} pages, target {config.targetPages}.</span>
      </div>
      {config.density !== 'compact' ? (
        <button
          type="button"
          onClick={() => patch({ density: 'compact' })}
          className="tools-cta tools-cta--accent tools-cta--compact"
        >
          Switch to compact
        </button>
      ) : null}
      {config.targetPages < 2 ? (
        <button
          type="button"
          onClick={() => patch({ targetPages: 2 })}
          className="tools-cta tools-cta--accent tools-cta--compact"
        >
          Raise target to 2 pages
        </button>
      ) : null}
    </>
  )
}
