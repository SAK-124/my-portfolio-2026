'use client'

import { useRef, useState } from 'react'
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
      skillGroups: p.skillGroups.map((group) => (group.id === id ? { ...group, ...partial } : group)),
    }))

  const removeGroup = (id: string) =>
    updatePortfolio((p) => ({ ...p, skillGroups: p.skillGroups.filter((group) => group.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.skillGroups.map((group) => [group.id, group]))
      return { ...p, skillGroups: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Skills"
      description="Grouped by category, each group renders on one line."
      action={<AddButton onClick={addGroup}>Add group</AddButton>}
    >
      {portfolio.skillGroups.length === 0 ? <p className="tools-empty">No skill groups yet.</p> : null}

      <SortableList
        items={portfolio.skillGroups}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(group, handle) => (
          <div className="tools-record-card">
            <div className="flex items-start gap-3">
              <DragHandle attrs={handle.attrs} />
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
  items,
  onChange,
}: {
  items: SkillGroup['items']
  onChange: (items: SkillGroup['items']) => void
}) {
  const [text, setText] = useState(() => items.map((item) => item.label).join(', '))
  const focusedRef = useRef(false)

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
            .map((part) => part.trim())
            .filter(Boolean)
          setText(parsed.join(', '))
        }}
        onChange={(e) => {
          const raw = e.target.value
          setText(raw)
          const labels = raw
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
          const existingByLabel = new Map(items.map((item) => [item.label, item]))
          const next = labels.map((label) => existingByLabel.get(label) ?? { id: newId(), label })
          onChange(next)
        }}
      />
    </Field>
  )
}
