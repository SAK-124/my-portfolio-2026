'use client'

import { Trash, Copy, Pencil, Plus } from '@phosphor-icons/react/dist/ssr'
import type { Portfolio, ResumeConfig, ResumeConfigsState } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { defaultResumeConfig } from '@/lib/tools/resume/seed'
import { useState } from 'react'

export function ConfigList({
  portfolio,
  configs,
  updateConfigs,
}: {
  portfolio: Portfolio
  configs: ResumeConfigsState
  updateConfigs: (u: (prev: ResumeConfigsState) => ResumeConfigsState) => void
}) {
  const [renameId, setRenameId] = useState<string | null>(null)
  const active = configs.configs.find((c) => c.id === configs.activeId) ?? configs.configs[0]

  const addConfig = () => {
    const base = defaultResumeConfig(portfolio)
    base.id = newId()
    base.name = 'New resume'
    updateConfigs((prev) => ({ activeId: base.id, configs: [...prev.configs, base] }))
  }

  const duplicate = (c: ResumeConfig) => {
    const copy: ResumeConfig = {
      ...c,
      id: newId(),
      name: `${c.name} copy`,
      updatedAt: new Date().toISOString(),
    }
    updateConfigs((prev) => ({ activeId: copy.id, configs: [...prev.configs, copy] }))
  }

  const remove = (id: string) => {
    if (configs.configs.length <= 1) return
    updateConfigs((prev) => {
      const next = prev.configs.filter((c) => c.id !== id)
      return { activeId: next[0]?.id ?? null, configs: next }
    })
  }

  const rename = (id: string, name: string) =>
    updateConfigs((prev) => ({
      ...prev,
      configs: prev.configs.map((c) => (c.id === id ? { ...c, name, updatedAt: new Date().toISOString() } : c)),
    }))

  const setActive = (id: string) => updateConfigs((prev) => ({ ...prev, activeId: id }))

  return (
    <div className="card-elevated p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="section-eyebrow">Resume configs</p>
        <button type="button" onClick={addConfig} className="inline-chip hover:border-[var(--line-strong)]">
          <Plus size={12} weight="bold" /> New
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {configs.configs.map((c) => (
          <div
            key={c.id}
            className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${
              active?.id === c.id ? 'border-[var(--line-strong)] bg-[var(--surface)]' : 'border-[var(--line)]'
            }`}
          >
            {renameId === c.id ? (
              <input
                autoFocus
                value={c.name}
                onChange={(e) => rename(c.id, e.target.value)}
                onBlur={() => setRenameId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setRenameId(null)
                }}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(c.id)}
                className="flex-1 text-left text-sm text-[var(--ink)]"
              >
                {c.name}
              </button>
            )}
            <button
              type="button"
              aria-label="Rename"
              onClick={() => setRenameId(c.id)}
              className="text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <Pencil size={12} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Duplicate"
              onClick={() => duplicate(c)}
              className="text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <Copy size={12} weight="bold" />
            </button>
            {configs.configs.length > 1 && (
              <button
                type="button"
                aria-label="Delete"
                onClick={() => remove(c.id)}
                className="text-[var(--muted)] hover:text-[color:var(--accent)]"
              >
                <Trash size={12} weight="bold" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
