'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { DownloadSimple, UploadSimple } from '@phosphor-icons/react/dist/ssr'
import { usePortfolioState } from '@/lib/tools/resume/hooks/use-portfolio'
import { getProvider } from '@/lib/tools/storage'
import type { CollectionDump } from '@/lib/tools/storage/provider'
import { validatePortfolio } from '@/lib/tools/resume/validation'
import { LibraryPane } from './panes/library-pane'
import { ConfigPane } from './panes/config-pane'
import { PreviewPane } from './panes/preview-pane'

type LeftTab = 'library' | 'resume'
type MobileTab = 'library' | 'resume' | 'preview'

export function BuilderShell() {
  const { state, activeConfig, updatePortfolio, updateConfigs } = usePortfolioState()
  const [leftTab, setLeftTab] = useState<LeftTab>('resume')
  const [mobileTab, setMobileTab] = useState<MobileTab>('resume')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const patchActive = useCallback(
    (partial: Partial<NonNullable<typeof activeConfig>>) => {
      if (!activeConfig) return
      updateConfigs((prev) => ({
        ...prev,
        configs: prev.configs.map((c) =>
          c.id === activeConfig.id
            ? { ...c, ...partial, updatedAt: new Date().toISOString() }
            : c,
        ),
      }))
    },
    [activeConfig, updateConfigs],
  )

  const issues = useMemo(
    () => (state ? validatePortfolio(state.portfolio) : []),
    [state],
  )
  const errorCount = issues.filter((i) => i.level === 'error').length
  const warnCount = issues.filter((i) => i.level === 'warn').length

  const onExport = useCallback(async () => {
    const dump = await getProvider().exportAll()
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const ts = new Date().toISOString().replace(/[:.]/g, '-')
    a.download = `tools-backup-${ts}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const onImport = useCallback(async (file: File) => {
    const text = await file.text()
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      alert('Invalid JSON file.')
      return
    }
    if (!parsed || typeof parsed !== 'object') {
      alert('Invalid backup format.')
      return
    }
    const dump = parsed as Partial<CollectionDump>
    if (!confirm('Importing will overwrite existing Library and Resume configs. Continue?')) {
      return
    }
    await getProvider().importAll(dump)
    window.location.reload()
  }, [])

  if (!state || !activeConfig) {
    return <BuilderSkeleton />
  }

  const leftPane =
    leftTab === 'library' ? (
      <LibraryPane portfolio={state.portfolio} updatePortfolio={updatePortfolio} />
    ) : (
      <ConfigPane
        portfolio={state.portfolio}
        configs={state.configs}
        activeConfig={activeConfig}
        updateConfigs={updateConfigs}
      />
    )

  const rightPane = (
    <PreviewPane portfolio={state.portfolio} config={activeConfig} patch={patchActive} />
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
          <TabButton active={leftTab === 'library'} onClick={() => setLeftTab('library')}>
            Library
          </TabButton>
          <TabButton active={leftTab === 'resume'} onClick={() => setLeftTab('resume')}>
            Resume
          </TabButton>
        </div>
        {(errorCount > 0 || warnCount > 0) && (
          <span className="inline-chip">
            {errorCount > 0 && `${errorCount} error${errorCount === 1 ? '' : 's'}`}
            {errorCount > 0 && warnCount > 0 && ' · '}
            {warnCount > 0 && `${warnCount} warning${warnCount === 1 ? '' : 's'}`}
          </span>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="inline-chip hover:border-[var(--line-strong)] inline-flex items-center gap-2"
          >
            <DownloadSimple size={14} weight="bold" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-chip hover:border-[var(--line-strong)] inline-flex items-center gap-2"
          >
            <UploadSimple size={14} weight="bold" />
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void onImport(file)
              e.target.value = ''
            }}
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 mb-4">
          <TabButton active={mobileTab === 'library'} onClick={() => setMobileTab('library')}>
            Library
          </TabButton>
          <TabButton active={mobileTab === 'resume'} onClick={() => setMobileTab('resume')}>
            Resume
          </TabButton>
          <TabButton active={mobileTab === 'preview'} onClick={() => setMobileTab('preview')}>
            Preview
          </TabButton>
        </div>
        {mobileTab === 'library' && (
          <LibraryPane portfolio={state.portfolio} updatePortfolio={updatePortfolio} />
        )}
        {mobileTab === 'resume' && (
          <ConfigPane
            portfolio={state.portfolio}
            configs={state.configs}
            activeConfig={activeConfig}
            updateConfigs={updateConfigs}
          />
        )}
        {mobileTab === 'preview' && (
          <div className="min-h-[70dvh]">{rightPane}</div>
        )}
      </div>

      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div className="min-w-0">{leftPane}</div>
        <div className="min-w-0 sticky top-24 h-[calc(100dvh-8rem)]">{rightPane}</div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        Stored in your account on Supabase.
      </p>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
        active
          ? 'bg-[var(--ink)] text-[var(--bg)]'
          : 'text-[var(--muted)] hover:text-[var(--ink)]'
      }`}
    >
      {children}
    </button>
  )
}

function BuilderSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-10 w-64 rounded-full bg-[var(--surface)] border border-[var(--line)]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[60dvh] rounded-[1.25rem] bg-[var(--surface)] border border-[var(--line)]" />
        <div className="h-[60dvh] rounded-[1.25rem] bg-[var(--surface)] border border-[var(--line)]" />
      </div>
    </div>
  )
}
