'use client'

import { useRef, useState } from 'react'
import { Plus, Trash } from '@phosphor-icons/react/dist/ssr'
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
      projects: p.projects.map((item) => (item.id === id ? { ...item, ...partial } : item)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, projects: p.projects.filter((item) => item.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.projects.map((item) => [item.id, item]))
      return { ...p, projects: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  const addBullet = (itemId: string) => {
    const item = portfolio.projects.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, { bullets: [...item.bullets, { id: newId(), text: '' }] })
  }

  const patchBullet = (itemId: string, bulletId: string, text: string) => {
    const item = portfolio.projects.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, {
      bullets: item.bullets.map((bullet) => (bullet.id === bulletId ? { ...bullet, text } : bullet)),
    })
  }

  const removeBullet = (itemId: string, bulletId: string) => {
    const item = portfolio.projects.find((entry) => entry.id === itemId)
    if (!item) return
    patch(itemId, { bullets: item.bullets.filter((bullet) => bullet.id !== bulletId) })
  }

  return (
    <SectionWrap
      title="Projects"
      description="Professional or personal, anything you might show off."
      action={<AddButton onClick={add}>Add project</AddButton>}
    >
      {portfolio.projects.length === 0 ? <p className="tools-empty">No projects yet.</p> : null}

      <SortableList
        items={portfolio.projects}
        onReorder={reorder}
        className="flex flex-col gap-4"
        renderItem={(item, handle) => (
          <div className="tools-record-card">
            <div className="flex items-start gap-3">
              <DragHandle attrs={handle.attrs} />
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
              <TextArea value={item.description} onChange={(e) => patch(item.id, { description: e.target.value })} />
            </Field>

            <StackInput stack={item.stack} onChange={(stack) => patch(item.id, { stack })} />

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
              {item.bullets.map((bullet) => (
                <div key={bullet.id} className="flex items-start gap-2">
                  <TextArea
                    className="min-h-[40px] flex-1"
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
              ))}
            </div>
          </div>
        )}
      />
    </SectionWrap>
  )
}

function StackInput({
  stack,
  onChange,
}: {
  stack: string[]
  onChange: (stack: string[]) => void
}) {
  const [text, setText] = useState(() => stack.join(', '))
  const focusedRef = useRef(false)

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
            .map((part) => part.trim())
            .filter(Boolean)
          setText(parsed.join(', '))
        }}
        onChange={(e) => {
          const raw = e.target.value
          setText(raw)
          onChange(
            raw
              .split(',')
              .map((part) => part.trim())
              .filter(Boolean),
          )
        }}
      />
    </Field>
  )
}
