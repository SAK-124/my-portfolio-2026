'use client'

import type { Density, ResumeConfig, TemplateId } from '@/lib/tools/resume/types'

type Patch = (partial: Partial<ResumeConfig>) => void

const DENSITIES: { id: Density; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'standard', label: 'Standard' },
  { id: 'spacious', label: 'Spacious' },
]

const TEMPLATES: { id: TemplateId; label: string; hint: string }[] = [
  { id: 'editorial', label: 'Editorial', hint: 'Warm accent, portfolio match.' },
  { id: 'ats-classic', label: 'ATS-Classic', hint: 'Pure B&W, parser-friendly.' },
]

export function TemplateAndDensityControls({ config, patch }: { config: ResumeConfig; patch: Patch }) {
  return (
    <div className="card-soft p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="section-eyebrow">Template</p>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => patch({ templateId: t.id })}
              className={`text-left rounded-2xl border px-3 py-2.5 transition-colors ${
                config.templateId === t.id
                  ? 'border-[var(--line-strong)] bg-[var(--surface)]'
                  : 'border-[var(--line)] hover:border-[var(--line-strong)]'
              }`}
            >
              <div className="text-sm font-medium text-[var(--ink)]">{t.label}</div>
              <div className="text-xs text-[var(--muted)]">{t.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="section-eyebrow">Density</p>
        <div className="flex gap-2">
          {DENSITIES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => patch({ density: d.id })}
              className={`inline-chip flex-1 justify-center ${
                config.density === d.id ? 'border-[var(--line-strong)] text-[var(--ink)]' : ''
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="section-eyebrow">Target pages</p>
        <div className="flex gap-2">
          {[1, 2].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => patch({ targetPages: n as 1 | 2 })}
              className={`inline-chip flex-1 justify-center ${
                config.targetPages === n ? 'border-[var(--line-strong)] text-[var(--ink)]' : ''
              }`}
            >
              {n} page{n > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
