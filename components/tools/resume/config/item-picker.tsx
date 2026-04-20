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
  const updateSection = (kind: SectionKind, updater: (section: ResumeSection) => ResumeSection) => {
    patch({
      sections: config.sections.map((section) => (section.kind === kind ? updater(section) : section)),
    })
  }

  const addSection = (kind: SectionKind) => {
    if (config.sections.some((section) => section.kind === kind)) return
    const defaultIds = getAllIds(portfolio, kind)
    patch({
      sections: [...config.sections, { kind, include: defaultIds.map((id) => ({ id })) }],
    })
  }

  const removeSection = (kind: SectionKind) => {
    patch({ sections: config.sections.filter((section) => section.kind !== kind) })
  }

  const reorderSections = (kinds: string[]) => {
    const byKind = new Map(config.sections.map((section) => [section.kind, section]))
    patch({ sections: kinds.map((kind) => byKind.get(kind as SectionKind)!).filter(Boolean) })
  }

  const availableKinds = getAvailableKinds(portfolio, config)

  return (
    <div className="tools-rail-card">
      <div className="tools-module__header">
        <div>
          <p className="tools-group-label">Sections</p>
          <h3 className="tools-module__title mt-2">Include and order</h3>
          <p className="tools-module__description">Drag sections into order and choose which items render in each section.</p>
        </div>
      </div>

      {config.sections.length === 0 ? <p className="tools-empty">No sections yet. Add one below.</p> : null}

      <SortableList
        items={config.sections.map((section) => ({ id: section.kind }))}
        onReorder={reorderSections}
        className="flex flex-col gap-3"
        renderItem={({ id: kind }, handle) => {
          const section = config.sections.find((entry) => entry.kind === kind)!
          return (
            <div className="tools-list-card">
              <div className="flex items-center gap-2">
                <DragHandle attrs={handle.attrs} />
                <p className="tools-section-title flex-1">{renderSectionLabel(portfolio, section.kind)}</p>
                <button
                  type="button"
                  onClick={() => removeSection(section.kind)}
                  className="tools-icon-action tools-icon-action--danger"
                  aria-label="Remove section"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>
              <IncludeList
                portfolio={portfolio}
                section={section}
                onChange={(nextInclude) =>
                  updateSection(section.kind, (entry) => ({ ...entry, include: nextInclude }))
                }
              />
            </div>
          )
        }}
      />

      {availableKinds.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-2">
          {availableKinds.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => addSection(kind)}
              className="tools-cta tools-cta--accent tools-cta--compact"
            >
              <Plus size={10} weight="bold" />
              {renderSectionLabel(portfolio, kind)}
            </button>
          ))}
        </div>
      ) : null}
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
  const includedIds = new Set(section.include.map((item) => item.id))

  const toggle = (id: string) => {
    if (includedIds.has(id)) {
      onChange(section.include.filter((item) => item.id !== id))
      return
    }
    onChange([...section.include, { id }])
  }

  const toggleCompact = (id: string) => {
    onChange(section.include.map((item) => (item.id === id ? { ...item, compact: !item.compact } : item)))
  }

  const reorder = (ids: string[]) => {
    const byId = new Map(section.include.map((item) => [item.id, item]))
    onChange(ids.map((id) => byId.get(id)!).filter(Boolean))
  }

  const includedOrdered = section.include
    .map((include) => ({ include, item: allItems.find((entry) => entry.id === include.id) }))
    .filter((entry) => entry.item)

  const notIncluded = allItems.filter((item) => !includedIds.has(item.id))

  return (
    <div className="tools-stack">
      {includedOrdered.length > 0 ? (
        <SortableList
          items={includedOrdered.map(({ include }) => ({ id: include.id }))}
          onReorder={reorder}
          className="flex flex-col gap-2"
          renderItem={({ id }, handle) => {
            const include = section.include.find((item) => item.id === id)!
            const item = allItems.find((entry) => entry.id === id)
            if (!item) return null

            return (
              <div className="tools-list-row">
                <DragHandle attrs={handle.attrs} />
                <span className="tools-list-row__label">{item.label}</span>
                <button
                  type="button"
                  onClick={() => toggleCompact(include.id)}
                  className={`tools-list-row__toggle ${include.compact ? 'tools-list-row__toggle--active' : ''}`}
                  title="Compact shows only the headline row"
                >
                  Compact
                </button>
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-label="Remove"
                  className="tools-icon-action tools-icon-action--danger"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>
            )
          }}
        />
      ) : null}

      {notIncluded.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {notIncluded.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className="tools-cta tools-cta--accent tools-cta--compact"
            >
              <Plus size={10} weight="bold" />
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      {allItems.length === 0 ? <p className="tools-empty">No items in the library for this section.</p> : null}
    </div>
  )
}

type LabeledItem = { id: string; label: string }

function getSectionItems(portfolio: Portfolio, kind: SectionKind): LabeledItem[] {
  switch (kind) {
    case 'experience':
      return portfolio.experience.map((item) => ({ id: item.id, label: `${item.title} - ${item.organization}` }))
    case 'education':
      return portfolio.education.map((item) => ({ id: item.id, label: `${item.credential} - ${item.institution}` }))
    case 'projects':
      return portfolio.projects.map((item) => ({ id: item.id, label: item.name }))
    case 'skills':
      return portfolio.skillGroups.map((item) => ({ id: item.id, label: item.title }))
    case 'certifications':
      return portfolio.certifications.map((item) => ({ id: item.id, label: `${item.name} - ${item.issuer}` }))
    case 'awards':
      return portfolio.awards.map((item) => ({ id: item.id, label: `${item.name} (${item.year})` }))
    case 'languages':
      return portfolio.languages.map((item) => ({ id: item.id, label: item.name }))
    default: {
      const customId = customSectionId(kind)
      if (!customId) return []
      const custom = portfolio.customSections.find((item) => item.id === customId)
      return custom ? [{ id: custom.id, label: custom.title }] : []
    }
  }
}

function getAllIds(portfolio: Portfolio, kind: SectionKind): string[] {
  return getSectionItems(portfolio, kind).map((item) => item.id)
}

function renderSectionLabel(portfolio: Portfolio, kind: SectionKind): string {
  if (isCustomSectionKind(kind)) {
    const customId = customSectionId(kind)
    const custom = portfolio.customSections.find((item) => item.id === customId)
    return custom?.title ?? 'Custom section'
  }

  switch (kind) {
    case 'experience':
      return 'Experience'
    case 'education':
      return 'Education'
    case 'projects':
      return 'Projects'
    case 'skills':
      return 'Skills'
    case 'certifications':
      return 'Certifications'
    case 'awards':
      return 'Awards'
    case 'languages':
      return 'Languages'
    default:
      return 'Section'
  }
}

function getAvailableKinds(portfolio: Portfolio, config: ResumeConfig): SectionKind[] {
  const used = new Set(config.sections.map((section) => section.kind))
  const base: SectionKind[] = ['experience', 'education', 'projects', 'skills', 'certifications', 'awards', 'languages']
  const customKinds: SectionKind[] = portfolio.customSections.map((item) => `custom:${item.id}` as const)
  return [...base, ...customKinds].filter((kind) => !used.has(kind))
}
