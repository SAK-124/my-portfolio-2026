'use client'

import type { Portfolio, ResumeConfig, ResumeConfigsState } from '@/lib/tools/resume/types'
import { ConfigList } from '../config/config-list'
import { TemplateAndDensityControls } from '../config/density-controls'
import { ItemPicker } from '../config/item-picker'

export function ConfigPane({
  portfolio,
  configs,
  activeConfig,
  updateConfigs,
}: {
  portfolio: Portfolio
  configs: ResumeConfigsState
  activeConfig: ResumeConfig | null
  updateConfigs: (u: (prev: ResumeConfigsState) => ResumeConfigsState) => void
}) {
  const patchActive = (partial: Partial<ResumeConfig>) => {
    if (!activeConfig) return
    updateConfigs((prev) => ({
      ...prev,
      configs: prev.configs.map((c) =>
        c.id === activeConfig.id
          ? { ...c, ...partial, updatedAt: new Date().toISOString() }
          : c,
      ),
    }))
  }

  return (
    <div className="flex flex-col gap-5">
      <ConfigList portfolio={portfolio} configs={configs} updateConfigs={updateConfigs} />
      {activeConfig && (
        <>
          <TemplateAndDensityControls config={activeConfig} patch={patchActive} />
          <ItemPicker portfolio={portfolio} config={activeConfig} patch={patchActive} />
        </>
      )}
    </div>
  )
}
