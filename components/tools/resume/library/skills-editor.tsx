'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { Portfolio, SkillGroup } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function SkillsEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const addGroup = () =>
    updatePortfolio((p) => ({
      ...p,
      skillGroups: [...p.skillGroups, { id: newId(), title: 'New group', items: [] }],
    }))

  const patchGroup = (id: string, partial: Partial<SkillGroup>) =>
    updatePortfolio((p) => ({
      ...p,
      skillGroups: p.skillGroups.map((g) => (g.id === id ? { ...g, ...partial } : g)),
    }))

  const removeGroup = (id: string) =>
    updatePortfolio((p) => ({ ...p, skillGroups: p.skillGroups.filter((g) => g.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.skillGroups.map((g) => [g.id, g]))
      return { ...p, skillGroups: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Skills"
      description="Grouped by category — each group renders on one line."
      action={<AddButton onClick={addGroup}>Add group</AddButton>}
    >
      {portfolio.skillGroups.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No skill groups yet.</p>
      )}

      <SortableList
        items={portfolio.skillGroups}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(group, h) => (
          <div className="card-elevated p-5 md:p-6 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1">
                <Field label="Group title">
                  <TextInput
                    value={group.title}
                    onChange={(e) => patchGroup(group.id, { title: e.target.value })}
                  />
                </Field>
              </div>
              <IconButton label="Remove group" onClick={() => removeGroup(group.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>
            <Field label="Items (comma separated)">
              <TextInput
                value={group.items.map((x) => x.label).join(', ')}
                onChange={(e) =>
                  patchGroup(group.id, {
                    items: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((label) => ({ id: newId(), label })),
                  })
                }
              />
            </Field>
          </div>
        )}
      />
    </SectionWrap>
  )
}
