'use client'

import { Trash, Copy, Pencil, Plus } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import type { Portfolio, ResumeConfig, ResumeConfigsState } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { defaultResumeConfig } from '@/lib/tools/resume/seed'

export function ConfigList({
  portfolio,
  configs,
  updateConfigs,
}: {
  portfolio: Portfolio
  configs: ResumeConfigsState
  updateConfigs: (updater: (prev: ResumeConfigsState) => ResumeConfigsState) => void
}) {
  const [renameId, setRenameId] = useState<string | null>(null)
  const active = configs.configs.find((config) => config.id === configs.activeId) ?? configs.configs[0]

  const addConfig = () => {
    const base = defaultResumeConfig(portfolio)
    base.id = newId()
    base.name = 'New resume'
    updateConfigs((prev) => ({ activeId: base.id, configs: [...prev.configs, base] }))
  }

  const duplicate = (config: ResumeConfig) => {
    const copy: ResumeConfig = {
      ...config,
      id: newId(),
      name: `${config.name} copy`,
      updatedAt: new Date().toISOString(),
    }
    updateConfigs((prev) => ({ activeId: copy.id, configs: [...prev.configs, copy] }))
  }

  const remove = (id: string) => {
    if (configs.configs.length <= 1) return
    updateConfigs((prev) => {
      const next = prev.configs.filter((config) => config.id !== id)
      return { activeId: next[0]?.id ?? null, configs: next }
    })
  }

  const rename = (id: string, name: string) =>
    updateConfigs((prev) => ({
      ...prev,
      configs: prev.configs.map((config) =>
        config.id === id ? { ...config, name, updatedAt: new Date().toISOString() } : config,
      ),
    }))

  const setActive = (id: string) => updateConfigs((prev) => ({ ...prev, activeId: id }))

  return (
    <div className="tools-rail-card">
      <div className="tools-module__header">
        <div>
          <p className="tools-group-label">Resume configs</p>
          <h3 className="tools-module__title mt-2">Config rail</h3>
        </div>
        <button type="button" onClick={addConfig} className="tools-cta tools-cta--ghost tools-cta--compact">
          <Plus size={12} weight="bold" />
          New
        </button>
      </div>

      <div className="tools-config-stack">
        {configs.configs.map((config) => (
          <div
            key={config.id}
            className={`tools-config-entry ${active?.id === config.id ? 'tools-config-entry--active' : ''}`}
          >
            {renameId === config.id ? (
              <input
                autoFocus
                value={config.name}
                onChange={(event) => rename(config.id, event.target.value)}
                onBlur={() => setRenameId(null)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') setRenameId(null)
                }}
                className="tools-config-entry__input"
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(config.id)}
                className="tools-config-entry__label"
              >
                {config.name}
              </button>
            )}
            <button
              type="button"
              aria-label="Rename"
              onClick={() => setRenameId(config.id)}
              className="tools-icon-action"
            >
              <Pencil size={12} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Duplicate"
              onClick={() => duplicate(config)}
              className="tools-icon-action"
            >
              <Copy size={12} weight="bold" />
            </button>
            {configs.configs.length > 1 ? (
              <button
                type="button"
                aria-label="Delete"
                onClick={() => remove(config.id)}
                className="tools-icon-action tools-icon-action--danger"
              >
                <Trash size={12} weight="bold" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
