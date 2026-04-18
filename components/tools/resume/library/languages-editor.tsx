'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { LanguageItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function LanguagesEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      languages: [...p.languages, { id: newId(), name: '' }],
    }))
  const patch = (id: string, partial: Partial<LanguageItem>) =>
    updatePortfolio((p) => ({
      ...p,
      languages: p.languages.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))
  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, languages: p.languages.filter((e) => e.id !== id) }))
  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.languages.map((e) => [e.id, e]))
      return { ...p, languages: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Languages"
      action={<AddButton onClick={add}>Add language</AddButton>}
    >
      {portfolio.languages.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No languages yet.</p>
      )}
      <SortableList
        items={portfolio.languages}
        onReorder={reorder}
        className="flex flex-col gap-3"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 flex items-start gap-3">
            <DragHandle attrs={h.attrs} />
            <div className="flex-1 grid gap-3 md:grid-cols-2">
              <Field label="Language">
                <TextInput value={item.name} onChange={(e) => patch(item.id, { name: e.target.value })} />
              </Field>
              <Field label="Proficiency">
                <TextInput
                  value={item.proficiency ?? ''}
                  placeholder="Fluent / Professional / Conversational"
                  onChange={(e) => patch(item.id, { proficiency: e.target.value })}
                />
              </Field>
            </div>
            <IconButton label="Remove" onClick={() => remove(item.id)} variant="danger">
              <Trash size={14} weight="bold" />
            </IconButton>
          </div>
        )}
      />
    </SectionWrap>
  )
}
