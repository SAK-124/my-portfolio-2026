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
        configs: prev.configs.map((config) =>
          config.id === activeConfig.id
            ? { ...config, ...partial, updatedAt: new Date().toISOString() }
            : config,
        ),
      }))
    },
    [activeConfig, updateConfigs],
  )

  const issues = useMemo(() => (state ? validatePortfolio(state.portfolio) : []), [state])
  const errorCount = issues.filter((issue) => issue.level === 'error').length
  const warnCount = issues.filter((issue) => issue.level === 'warn').length

  const onExport = useCallback(async () => {
    const dump = await getProvider().exportAll()
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    anchor.download = `tools-backup-${timestamp}.json`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
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
    return (
      <div className="grid gap-4">
        <div className="tools-loading-card h-32" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          <div className="tools-loading-card h-[60dvh]" />
          <div className="tools-loading-card h-[60dvh]" />
        </div>
      </div>
    )
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

  const previewPane = (
    <PreviewPane portfolio={state.portfolio} config={activeConfig} patch={patchActive} />
  )

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:hidden">
        <section id="resume-editor" className="tools-surface">
          <div className="tools-pane-header">
            <div>
              <p className="tools-pane-header__eyebrow">Editor</p>
              <h2 className="tools-pane-header__title">Resume builder</h2>
            </div>
            <div className="tools-pane-header__actions">
              <button type="button" onClick={onExport} className="tools-cta tools-cta--ghost tools-cta--compact">
                <DownloadSimple size={14} weight="bold" />
                Export
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="tools-cta tools-cta--ghost tools-cta--compact"
              >
                <UploadSimple size={14} weight="bold" />
                Import
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) void onImport(file)
                  event.target.value = ''
                }}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="tools-switch">
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
            {(errorCount > 0 || warnCount > 0) ? (
              <span className="tools-statusbar">
                {errorCount > 0 ? `${errorCount} error${errorCount === 1 ? '' : 's'}` : null}
                {errorCount > 0 && warnCount > 0 ? ' / ' : null}
                {warnCount > 0 ? `${warnCount} warning${warnCount === 1 ? '' : 's'}` : null}
              </span>
            ) : null}
          </div>

          {mobileTab === 'library' ? (
            <LibraryPane portfolio={state.portfolio} updatePortfolio={updatePortfolio} />
          ) : null}
          {mobileTab === 'resume' ? (
            <ConfigPane
              portfolio={state.portfolio}
              configs={state.configs}
              activeConfig={activeConfig}
              updateConfigs={updateConfigs}
            />
          ) : null}
          {mobileTab === 'preview' ? <div id="resume-preview">{previewPane}</div> : null}

          <p className="tools-callout mt-4">
            <span className="tools-callout__label">Synced</span>
            <span>Saved to your account on Supabase as you edit.</span>
          </p>
        </section>
      </div>

      <div className="tools-workspace hidden lg:grid">
        <section id="resume-editor" className="tools-surface">
          <div className="tools-pane-header">
            <div>
              <p className="tools-pane-header__eyebrow">Editor</p>
              <h2 className="tools-pane-header__title">Library &amp; configuration</h2>
            </div>
            <div className="tools-pane-header__actions">
              {(errorCount > 0 || warnCount > 0) ? (
                <span className="tools-statusbar">
                  {errorCount > 0 ? `${errorCount} error${errorCount === 1 ? '' : 's'}` : null}
                  {errorCount > 0 && warnCount > 0 ? ' / ' : null}
                  {warnCount > 0 ? `${warnCount} warning${warnCount === 1 ? '' : 's'}` : null}
                </span>
              ) : null}
              <button type="button" onClick={onExport} className="tools-cta tools-cta--ghost tools-cta--compact">
                <DownloadSimple size={14} weight="bold" />
                Export
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="tools-cta tools-cta--ghost tools-cta--compact"
              >
                <UploadSimple size={14} weight="bold" />
                Import
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) void onImport(file)
                  event.target.value = ''
                }}
              />
            </div>
          </div>

          <div className="mb-4 tools-switch">
            <TabButton active={leftTab === 'library'} onClick={() => setLeftTab('library')}>
              Library
            </TabButton>
            <TabButton active={leftTab === 'resume'} onClick={() => setLeftTab('resume')}>
              Resume
            </TabButton>
          </div>

          {leftPane}
          <p className="tools-callout mt-4">
            <span className="tools-callout__label">Synced</span>
            <span>Saved to your account on Supabase as you edit.</span>
          </p>
        </section>

        <section id="resume-preview" className="tools-surface">
          <div className="tools-pane-header">
            <div>
              <p className="tools-pane-header__eyebrow">Preview</p>
              <h2 className="tools-pane-header__title">Live output</h2>
            </div>
          </div>

          {previewPane}
        </section>
      </div>
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
      className={`tools-switch__tab ${active ? 'tools-switch__tab--active' : ''}`}
    >
      {children}
    </button>
  )
}
