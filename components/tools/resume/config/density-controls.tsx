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
  { id: 'muzaina', label: 'Muzaina', hint: 'Serif, dense, single-page classic.' },
]

export function TemplateAndDensityControls({ config, patch }: { config: ResumeConfig; patch: Patch }) {
  return (
    <div className="tools-rail-card">
      <div className="tools-stack">
        <div className="tools-module">
          <div>
            <p className="tools-group-label">Template</p>
            <h3 className="tools-module__title mt-2">Output styling</h3>
          </div>
          <div className="grid gap-2">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => patch({ templateId: template.id })}
                className={`tools-option-card ${config.templateId === template.id ? 'tools-option-card--active' : ''}`}
              >
                <p className="tools-option-card__title">{template.label}</p>
                <p className="tools-option-card__hint">{template.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="tools-module">
          <p className="tools-group-label">Density</p>
          <div className="tools-switch">
            {DENSITIES.map((density) => (
              <button
                key={density.id}
                type="button"
                onClick={() => patch({ density: density.id })}
                className={`tools-switch__tab ${config.density === density.id ? 'tools-switch__tab--active' : ''}`}
              >
                {density.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tools-module">
          <p className="tools-group-label">Target pages</p>
          <div className="tools-switch">
            {[1, 2].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => patch({ targetPages: count as 1 | 2 })}
                className={`tools-switch__tab ${config.targetPages === count ? 'tools-switch__tab--active' : ''}`}
              >
                {count} page{count > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
