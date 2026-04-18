'use client'

import { Trash, Plus } from '@phosphor-icons/react/dist/ssr'
import type { EducationItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, TextArea, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function EducationEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      education: [
        ...p.education,
        { id: newId(), institution: '', credential: '', startLabel: '', endLabel: '', notes: [] },
      ],
    }))

  const patch = (id: string, partial: Partial<EducationItem>) =>
    updatePortfolio((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.education.map((e) => [e.id, e]))
      return { ...p, education: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addNote = (itemId: string) => {
    const item = portfolio.education.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { notes: [...item.notes, { id: newId(), text: '' }] })
  }
  const patchNote = (itemId: string, bid: string, text: string) => {
    const item = portfolio.education.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { notes: item.notes.map((b) => (b.id === bid ? { ...b, text } : b)) })
  }
  const removeNote = (itemId: string, bid: string) => {
    const item = portfolio.education.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { notes: item.notes.filter((b) => b.id !== bid) })
  }

  return (
    <SectionWrap
      title="Education"
      description="Degrees, diplomas, and formal coursework."
      action={<AddButton onClick={add}>Add education</AddButton>}
    >
      {portfolio.education.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No education entries yet.</p>
      )}

      <SortableList
        items={portfolio.education}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1 grid gap-3 md:grid-cols-2">
                <Field label="Institution">
                  <TextInput
                    value={item.institution}
                    onChange={(e) => patch(item.id, { institution: e.target.value })}
                  />
                </Field>
                <Field label="Credential">
                  <TextInput
                    value={item.credential}
                    onChange={(e) => patch(item.id, { credential: e.target.value })}
                  />
                </Field>
                <Field label="Start">
                  <TextInput value={item.startLabel} onChange={(e) => patch(item.id, { startLabel: e.target.value })} />
                </Field>
                <Field label="End">
                  <TextInput value={item.endLabel} onChange={(e) => patch(item.id, { endLabel: e.target.value })} />
                </Field>
              </div>
              <IconButton label="Remove education" onClick={() => remove(item.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="section-eyebrow">Notes</p>
                <button
                  type="button"
                  onClick={() => addNote(item.id)}
                  className="inline-chip hover:border-[var(--line-strong)]"
                >
                  <Plus size={12} weight="bold" /> Add note
                </button>
              </div>
              {item.notes.map((b) => (
                <div key={b.id} className="flex items-start gap-2">
                  <TextArea
                    className="flex-1 min-h-[40px]"
                    value={b.text}
                    onChange={(e) => patchNote(item.id, b.id, e.target.value)}
                  />
                  <IconButton label="Remove note" onClick={() => removeNote(item.id, b.id)} variant="danger">
                    <Trash size={14} weight="bold" />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </SectionWrap>
  )
}
