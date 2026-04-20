'use client'

import { Plus, Trash } from '@phosphor-icons/react/dist/ssr'
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
      experience: p.experience.map((item) => (item.id === id ? { ...item, ...partial } : item)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, experience: p.experience.filter((item) => item.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.experience.map((item) => [item.id, item]))
      return { ...p, experience: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addBullet = (itemId: string) =>
    patch(itemId, {
      bullets: [
        ...portfolio.experience.find((item) => item.id === itemId)!.bullets,
        { id: newId(), text: '' },
      ],
    })

  const patchBullet = (itemId: string, bulletId: string, text: string) => {
    const item = portfolio.experience.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, {
      bullets: item.bullets.map((bullet) => (bullet.id === bulletId ? { ...bullet, text } : bullet)),
    })
  }

  const removeBullet = (itemId: string, bulletId: string) => {
    const item = portfolio.experience.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, { bullets: item.bullets.filter((bullet) => bullet.id !== bulletId) })
  }

  const reorderBullets = (itemId: string, ids: string[]) => {
    const item = portfolio.experience.find((entry) => entry.id === itemId)
    if (!item) return
    const byId = new Map(item.bullets.map((bullet) => [bullet.id, bullet]))
    patch(itemId, { bullets: ids.map((id) => byId.get(id)!).filter(Boolean) })
  }

  return (
    <SectionWrap
      title="Experience"
      description="Roles, internships, and contract work."
      action={<AddButton onClick={addItem}>Add role</AddButton>}
    >
      {portfolio.experience.length === 0 ? <p className="tools-empty">No experience entries yet.</p> : null}

      <SortableList
        items={portfolio.experience}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, handle) => (
          <div className="tools-record-card">
            <div className="flex items-start gap-3">
              <DragHandle attrs={handle.attrs} />
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
                <p className="tools-group-label">Bullets</p>
                <button
                  type="button"
                  onClick={() => addBullet(item.id)}
                  className="tools-cta tools-cta--ghost tools-cta--compact"
                >
                  <Plus size={12} weight="bold" />
                  Add bullet
                </button>
              </div>
              {item.bullets.length === 0 ? <p className="tools-empty">No bullets yet.</p> : null}
              <SortableList
                items={item.bullets}
                onReorder={(ids) => reorderBullets(item.id, ids)}
                className="flex flex-col gap-2"
                renderItem={(bullet, bulletHandle) => (
                  <div className="flex items-start gap-2">
                    <DragHandle attrs={bulletHandle.attrs} />
                    <TextArea
                      className="min-h-[48px] flex-1"
                      value={bullet.text}
                      onChange={(e) => patchBullet(item.id, bullet.id, e.target.value)}
                    />
                    <IconButton
                      label="Remove bullet"
                      onClick={() => removeBullet(item.id, bullet.id)}
                      variant="danger"
                    >
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
