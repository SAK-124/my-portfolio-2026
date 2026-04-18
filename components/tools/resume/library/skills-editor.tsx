'use client'

import { useEffect, useRef, useState } from 'react'
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
            <SkillItemsInput
              groupId={group.id}
              items={group.items}
              onChange={(items) => patchGroup(group.id, { items })}
            />
          </div>
        )}
      />
    </SectionWrap>
  )
}

function SkillItemsInput({
  groupId,
  items,
  onChange,
}: {
  groupId: string
  items: SkillGroup['items']
  onChange: (items: SkillGroup['items']) => void
}) {
  const [text, setText] = useState(() => items.map((x) => x.label).join(', '))
  const focusedRef = useRef(false)

  useEffect(() => {
    if (focusedRef.current) return
    setText(items.map((x) => x.label).join(', '))
  }, [items])

  useEffect(() => {
    focusedRef.current = false
    setText(items.map((x) => x.label).join(', '))
    // Only re-sync when the group identity changes (e.g., reordering swaps items).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId])

  return (
    <Field label="Items (comma separated)">
      <TextInput
        value={text}
        onFocus={() => {
          focusedRef.current = true
        }}
        onBlur={(e) => {
          focusedRef.current = false
          const parsed = e.target.value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          setText(parsed.join(', '))
        }}
        onChange={(e) => {
          const raw = e.target.value
          setText(raw)
          const labels = raw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          const existingById = new Map(items.map((it) => [it.label, it]))
          const next = labels.map(
            (label) => existingById.get(label) ?? { id: newId(), label },
          )
          onChange(next)
        }}
      />
    </Field>
  )
}

