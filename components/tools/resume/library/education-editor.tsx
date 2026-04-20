'use client'

import { Plus, Trash } from '@phosphor-icons/react/dist/ssr'
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
      education: p.education.map((item) => (item.id === id ? { ...item, ...partial } : item)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, education: p.education.filter((item) => item.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.education.map((item) => [item.id, item]))
      return { ...p, education: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addNote = (itemId: string) => {
    const item = portfolio.education.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, { notes: [...item.notes, { id: newId(), text: '' }] })
  }

  const patchNote = (itemId: string, noteId: string, text: string) => {
    const item = portfolio.education.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, {
      notes: item.notes.map((note) => (note.id === noteId ? { ...note, text } : note)),
    })
  }

  const removeNote = (itemId: string, noteId: string) => {
    const item = portfolio.education.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, { notes: item.notes.filter((note) => note.id !== noteId) })
  }

  return (
    <SectionWrap
      title="Education"
      description="Degrees, diplomas, and formal coursework."
      action={<AddButton onClick={add}>Add education</AddButton>}
    >
      {portfolio.education.length === 0 ? <p className="tools-empty">No education entries yet.</p> : null}

      <SortableList
        items={portfolio.education}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, handle) => (
          <div className="tools-record-card">
            <div className="flex items-start gap-3">
              <DragHandle attrs={handle.attrs} />
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
                  <TextInput
                    value={item.startLabel}
                    onChange={(e) => patch(item.id, { startLabel: e.target.value })}
                  />
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
                <p className="tools-group-label">Notes</p>
                <button
                  type="button"
                  onClick={() => addNote(item.id)}
                  className="tools-cta tools-cta--ghost tools-cta--compact"
                >
                  <Plus size={12} weight="bold" />
                  Add note
                </button>
              </div>
              {item.notes.length === 0 ? <p className="tools-empty">No notes yet.</p> : null}
              {item.notes.map((note) => (
                <div key={note.id} className="flex items-start gap-2">
                  <TextArea
                    className="min-h-[40px] flex-1"
                    value={note.text}
                    onChange={(e) => patchNote(item.id, note.id, e.target.value)}
                  />
                  <IconButton label="Remove note" onClick={() => removeNote(item.id, note.id)} variant="danger">
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
