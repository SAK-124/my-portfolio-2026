'use client'

import { Plus, X } from '@phosphor-icons/react/dist/ssr'
import type {
  IncludedItem,
  Portfolio,
  ResumeConfig,
  ResumeSection,
  SectionKind,
} from '@/lib/tools/resume/types'
import { customSectionId, isCustomSectionKind } from '@/lib/tools/resume/types'
import { SortableList, DragHandle } from '../library/sortable-list'

type Patch = (partial: Partial<ResumeConfig>) => void

export function ItemPicker({
  portfolio,
  config,
  patch,
}: {
  portfolio: Portfolio
  config: ResumeConfig
  patch: Patch
}) {
  const updateSection = (kind: SectionKind, updater: (s: ResumeSection) => ResumeSection) => {
    patch({
      sections: config.sections.map((s) => (s.kind === kind ? updater(s) : s)),
    })
  }

  const addSection = (kind: SectionKind) => {
    if (config.sections.some((s) => s.kind === kind)) return
    const defaultIds = getAllIds(portfolio, kind)
    patch({
      sections: [
        ...config.sections,
        { kind, include: defaultIds.map((id) => ({ id })) },
      ],
    })
  }

  const removeSection = (kind: SectionKind) => {
    patch({ sections: config.sections.filter((s) => s.kind !== kind) })
  }

  const reorderSections = (kinds: string[]) => {
    const byKind = new Map(config.sections.map((s) => [s.kind, s]))
    patch({ sections: kinds.map((k) => byKind.get(k as SectionKind)!).filter(Boolean) })
  }

  const availableKinds = getAvailableKinds(portfolio, config)

  return (
    <div className="card-elevated p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-[var(--ink)]">Sections</h3>
          <p className="text-xs text-[var(--muted)] mt-0.5">Drag to reorder. Toggle items to include.</p>
        </div>
      </div>

      {config.sections.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No sections yet. Add one below.</p>
      )}

      <SortableList
        items={config.sections.map((s) => ({ id: s.kind }))}
        onReorder={reorderSections}
        className="flex flex-col gap-3"
        renderItem={({ id: kind }, h) => {
          const section = config.sections.find((s) => s.kind === kind)!
          return (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <DragHandle attrs={h.attrs} />
                <p className="text-sm font-medium text-[var(--ink)] flex-1">
                  {renderSectionLabel(portfolio, section.kind)}
                </p>
                <button
                  type="button"
                  onClick={() => removeSection(section.kind)}
                  className="text-[var(--muted)] hover:text-[color:var(--accent)]"
                  aria-label="Remove section"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>
              <IncludeList
                portfolio={portfolio}
                section={section}
                onChange={(nextInclude) =>
                  updateSection(section.kind, (s) => ({ ...s, include: nextInclude }))
                }
              />
            </div>
          )
        }}
      />

      {availableKinds.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
          {availableKinds.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => addSection(kind)}
              className="inline-chip hover:border-[var(--line-strong)]"
            >
              <Plus size={10} weight="bold" /> {renderSectionLabel(portfolio, kind)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function IncludeList({
  portfolio,
  section,
  onChange,
}: {
  portfolio: Portfolio
  section: ResumeSection
  onChange: (next: IncludedItem[]) => void
}) {
  const allItems = getSectionItems(portfolio, section.kind)
  const includedIds = new Set(section.include.map((i) => i.id))

  const toggle = (id: string) => {
    if (includedIds.has(id)) {
      onChange(section.include.filter((i) => i.id !== id))
    } else {
      onChange([...section.include, { id }])
    }
  }

  const toggleCompact = (id: string) => {
    onChange(section.include.map((i) => (i.id === id ? { ...i, compact: !i.compact } : i)))
  }

  const reorder = (ids: string[]) => {
    const byId = new Map(section.include.map((i) => [i.id, i]))
    onChange(ids.map((id) => byId.get(id)!).filter(Boolean))
  }

  const includedOrdered = section.include
    .map((inc) => ({ inc, item: allItems.find((it) => it.id === inc.id) }))
    .filter((x) => x.item)

  const notIncluded = allItems.filter((it) => !includedIds.has(it.id))

  return (
    <div className="flex flex-col gap-3">
      {includedOrdered.length > 0 && (
        <SortableList
          items={includedOrdered.map(({ inc }) => ({ id: inc.id }))}
          onReorder={reorder}
          className="flex flex-col gap-1.5"
          renderItem={({ id }, h) => {
            const inc = section.include.find((i) => i.id === id)!
            const item = allItems.find((it) => it.id === id)
            if (!item) return null
            return (
              <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg)] px-2 py-1.5">
                <DragHandle attrs={h.attrs} />
                <span className="flex-1 text-sm text-[var(--ink)] truncate">{item.label}</span>
                <button
                  type="button"
                  onClick={() => toggleCompact(inc.id)}
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    inc.compact
                      ? 'border-[var(--line-strong)] text-[var(--ink)]'
                      : 'border-[var(--line)] text-[var(--muted)]'
                  }`}
                  title="Compact shows only the headline row"
                >
                  compact
                </button>
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-label="Remove"
                  className="text-[var(--muted)] hover:text-[color:var(--accent)]"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>
            )
          }}
        />
      )}
      {notIncluded.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {notIncluded.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className="inline-chip hover:border-[var(--line-strong)]"
            >
              <Plus size={10} weight="bold" /> {item.label}
            </button>
          ))}
        </div>
      )}
      {allItems.length === 0 && (
        <p className="text-xs text-[var(--muted)]">No items in library for this section.</p>
      )}
    </div>
  )
}

type LabeledItem = { id: string; label: string }

function getSectionItems(portfolio: Portfolio, kind: SectionKind): LabeledItem[] {
  switch (kind) {
    case 'experience':
      return portfolio.experience.map((e) => ({ id: e.id, label: `${e.title} — ${e.organization}` }))
    case 'education':
      return portfolio.education.map((e) => ({ id: e.id, label: `${e.credential} — ${e.institution}` }))
    case 'projects':
      return portfolio.projects.map((e) => ({ id: e.id, label: e.name }))
    case 'skills':
      return portfolio.skillGroups.map((e) => ({ id: e.id, label: e.title }))
    case 'certifications':
      return portfolio.certifications.map((e) => ({ id: e.id, label: `${e.name} — ${e.issuer}` }))
    case 'awards':
      return portfolio.awards.map((e) => ({ id: e.id, label: `${e.name} (${e.year})` }))
    case 'languages':
      return portfolio.languages.map((e) => ({ id: e.id, label: e.name }))
    default: {
      const cid = customSectionId(kind)
      if (!cid) return []
      const custom = portfolio.customSections.find((c) => c.id === cid)
      return custom ? [{ id: custom.id, label: custom.title }] : []
    }
  }
}

function getAllIds(portfolio: Portfolio, kind: SectionKind): string[] {
  return getSectionItems(portfolio, kind).map((x) => x.id)
}

function renderSectionLabel(portfolio: Portfolio, kind: SectionKind): string {
  if (isCustomSectionKind(kind)) {
    const cid = customSectionId(kind)
    const custom = portfolio.customSections.find((c) => c.id === cid)
    return custom?.title ?? 'Custom section'
  }
  switch (kind) {
    case 'experience': return 'Experience'
    case 'education': return 'Education'
    case 'projects': return 'Projects'
    case 'skills': return 'Skills'
    case 'certifications': return 'Certifications'
    case 'awards': return 'Awards'
    case 'languages': return 'Languages'
    default: return 'Section'
  }
}

function getAvailableKinds(portfolio: Portfolio, config: ResumeConfig): SectionKind[] {
  const used = new Set(config.sections.map((s) => s.kind))
  const base: SectionKind[] = ['experience', 'education', 'projects', 'skills', 'certifications', 'awards', 'languages']
  const customs: SectionKind[] = portfolio.customSections.map((c) => `custom:${c.id}` as const)
  return [...base, ...customs].filter((k) => !used.has(k))
}
