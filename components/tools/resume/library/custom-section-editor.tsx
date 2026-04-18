'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { CustomSectionItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, TextArea, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function CustomSectionEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      customSections: [
        ...p.customSections,
        { id: newId(), title: 'Untitled section', body: '', bullets: [] },
      ],
    }))
  const patch = (id: string, partial: Partial<CustomSectionItem>) =>
    updatePortfolio((p) => ({
      ...p,
      customSections: p.customSections.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))
  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, customSections: p.customSections.filter((e) => e.id !== id) }))
  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.customSections.map((e) => [e.id, e]))
      return { ...p, customSections: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Custom sections"
      description="Free-form blocks — anything that doesn't fit the other types."
      action={<AddButton onClick={add}>Add custom section</AddButton>}
    >
      {portfolio.customSections.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No custom sections.</p>
      )}
      <SortableList
        items={portfolio.customSections}
        onReorder={reorder}
        className="flex flex-col gap-3"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1">
                <Field label="Title">
                  <TextInput value={item.title} onChange={(e) => patch(item.id, { title: e.target.value })} />
                </Field>
              </div>
              <IconButton label="Remove" onClick={() => remove(item.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>
            <Field label="Body">
              <TextArea value={item.body} onChange={(e) => patch(item.id, { body: e.target.value })} />
            </Field>
          </div>
        )}
      />
    </SectionWrap>
  )
}
