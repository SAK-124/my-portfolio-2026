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
      customSections: p.customSections.map((item) => (item.id === id ? { ...item, ...partial } : item)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, customSections: p.customSections.filter((item) => item.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.customSections.map((item) => [item.id, item]))
      return { ...p, customSections: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Custom sections"
      description="Free-form blocks for anything that does not fit the other types."
      action={<AddButton onClick={add}>Add custom section</AddButton>}
    >
      {portfolio.customSections.length === 0 ? <p className="tools-empty">No custom sections.</p> : null}
      <SortableList
        items={portfolio.customSections}
        onReorder={reorder}
        className="flex flex-col gap-3"
        renderItem={(item, handle) => (
          <div className="tools-record-card">
            <div className="flex items-start gap-3">
              <DragHandle attrs={handle.attrs} />
              <div className="flex-1">
                <Field label="Title">
                  <TextInput value={item.title} onChange={(e) => patch(item.id, { title: e.target.value })} />
                </Field>
              </div>
              <IconButton label="Remove section" onClick={() => remove(item.id)} variant="danger">
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
