'use client'

import { useEffect, useRef, useState } from 'react'
import { Trash, Plus } from '@phosphor-icons/react/dist/ssr'
import type { Portfolio, ProjectItem } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, TextArea, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function ProjectsEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      projects: [
        ...p.projects,
        { id: newId(), name: 'New project', description: '', stack: [], bullets: [] },
      ],
    }))

  const patch = (id: string, partial: Partial<ProjectItem>) =>
    updatePortfolio((p) => ({
      ...p,
      projects: p.projects.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, projects: p.projects.filter((e) => e.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.projects.map((e) => [e.id, e]))
      return { ...p, projects: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addBullet = (itemId: string) => {
    const item = portfolio.projects.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { bullets: [...item.bullets, { id: newId(), text: '' }] })
  }
  const patchBullet = (itemId: string, bid: string, text: string) => {
    const item = portfolio.projects.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { bullets: item.bullets.map((b) => (b.id === bid ? { ...b, text } : b)) })
  }
  const removeBullet = (itemId: string, bid: string) => {
    const item = portfolio.projects.find((e) => e.id === itemId)
    if (!item) return
    patch(itemId, { bullets: item.bullets.filter((b) => b.id !== bid) })
  }

  return (
    <SectionWrap
      title="Projects"
      description="Professional or personal — anything you might show off."
      action={<AddButton onClick={add}>Add project</AddButton>}
    >
      {portfolio.projects.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No projects yet.</p>
      )}

      <SortableList
        items={portfolio.projects}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1 grid gap-3 md:grid-cols-2">
                <Field label="Name">
                  <TextInput value={item.name} onChange={(e) => patch(item.id, { name: e.target.value })} />
                </Field>
                <Field label="URL (optional)">
                  <TextInput value={item.url ?? ''} onChange={(e) => patch(item.id, { url: e.target.value })} />
                </Field>
              </div>
              <IconButton label="Remove project" onClick={() => remove(item.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>

            <Field label="Description">
              <TextArea
                value={item.description}
                onChange={(e) => patch(item.id, { description: e.target.value })}
              />
            </Field>

            <StackInput
              itemId={item.id}
              stack={item.stack}
              onChange={(stack) => patch(item.id, { stack })}
            />

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
              {item.bullets.map((b) => (
                <div key={b.id} className="flex items-start gap-2">
                  <TextArea
                    className="flex-1 min-h-[40px]"
                    value={b.text}
                    onChange={(e) => patchBullet(item.id, b.id, e.target.value)}
                  />
                  <IconButton label="Remove bullet" onClick={() => removeBullet(item.id, b.id)} variant="danger">
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

function StackInput({
  itemId,
  stack,
  onChange,
}: {
  itemId: string
  stack: string[]
  onChange: (stack: string[]) => void
}) {
  const [text, setText] = useState(() => stack.join(', '))
  const focusedRef = useRef(false)

  useEffect(() => {
    if (focusedRef.current) return
    setText(stack.join(', '))
  }, [stack])

  useEffect(() => {
    focusedRef.current = false
    setText(stack.join(', '))
    // Only re-sync when the project identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  return (
    <Field label="Stack (comma separated)">
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
          onChange(
            raw
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }}
      />
    </Field>
  )
}
