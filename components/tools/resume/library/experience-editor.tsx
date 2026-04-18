'use client'

import { Trash, Plus } from '@phosphor-icons/react/dist/ssr'
import type { ExperienceItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, TextArea, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function ExperienceEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const addItem = () =>
    updatePortfolio((p) => ({
      ...p,
      experience: [
        ...p.experience,
        {
          id: newId(),
          title: 'New role',
          organization: '',
          startLabel: '',
          endLabel: 'Present',
          bullets: [],
        },
      ],
    }))

  const patch = (id: string, partial: Partial<ExperienceItem>) =>
    updatePortfolio((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.experience.map((e) => [e.id, e]))
      return { ...p, experience: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addBullet = (itemId: string) =>
    patch(itemId, {
      bullets: [
        ...portfolio.experience.find((e) => e.id === itemId)!.bullets,
        { id: newId(), text: '' },
      ],
    })

  const patchBullet = (itemId: string, bulletId: string, text: string) => {
    const item = portfolio.experience.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, {
      bullets: item.bullets.map((b) => (b.id === bulletId ? { ...b, text } : b)),
    })
  }

  const removeBullet = (itemId: string, bulletId: string) => {
    const item = portfolio.experience.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { bullets: item.bullets.filter((b) => b.id !== bulletId) })
  }

  const reorderBullets = (itemId: string, ids: string[]) => {
    const item = portfolio.experience.find((e) => e.id === itemId)
    if (!item) return
    const byId = new Map(item.bullets.map((b) => [b.id, b]))
    patch(itemId, { bullets: ids.map((id) => byId.get(id)!).filter(Boolean) })
  }

  return (
    <SectionWrap
      title="Experience"
      description="Roles, internships, and contract work."
      action={<AddButton onClick={addItem}>Add role</AddButton>}
    >
      {portfolio.experience.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No experience entries yet.</p>
      )}

      <SortableList
        items={portfolio.experience}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1 grid gap-3 md:grid-cols-2">
                <Field label="Title">
                  <TextInput value={item.title} onChange={(e) => patch(item.id, { title: e.target.value })} />
                </Field>
                <Field label="Organization">
                  <TextInput
                    value={item.organization}
                    onChange={(e) => patch(item.id, { organization: e.target.value })}
                  />
                </Field>
                <Field label="Start">
                  <TextInput
                    value={item.startLabel}
                    placeholder="March 2026"
                    onChange={(e) => patch(item.id, { startLabel: e.target.value })}
                  />
                </Field>
                <Field label="End">
                  <TextInput
                    value={item.endLabel}
                    placeholder="Present"
                    onChange={(e) => patch(item.id, { endLabel: e.target.value })}
                  />
                </Field>
                <Field label="Location">
                  <TextInput
                    value={item.location ?? ''}
                    onChange={(e) => patch(item.id, { location: e.target.value })}
                  />
                </Field>
              </div>
              <IconButton label="Remove role" onClick={() => remove(item.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>

            <Field label="Summary">
              <TextArea
                value={item.summary ?? ''}
                onChange={(e) => patch(item.id, { summary: e.target.value })}
                placeholder="One-line summary of scope and focus."
              />
            </Field>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="section-eyebrow">Bullets</p>
                <button
                  type="button"
                  onClick={() => addBullet(item.id)}
                  className="inline-chip hover:border-[var(--line-strong)]"
                >
                  <Plus size={12} weight="bold" /> Add bullet
                </button>
              </div>
              {item.bullets.length === 0 && (
                <p className="text-xs text-[var(--muted)]">No bullets yet.</p>
              )}
              <SortableList
                items={item.bullets}
                onReorder={(ids) => reorderBullets(item.id, ids)}
                className="flex flex-col gap-2"
                renderItem={(b, hb) => (
                  <div className="flex items-start gap-2">
                    <DragHandle attrs={hb.attrs} />
                    <TextArea
                      className="flex-1 min-h-[48px]"
                      value={b.text}
                      onChange={(e) => patchBullet(item.id, b.id, e.target.value)}
                    />
                    <IconButton label="Remove bullet" onClick={() => removeBullet(item.id, b.id)} variant="danger">
                      <Trash size={14} weight="bold" />
                    </IconButton>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      />
    </SectionWrap>
  )
}
