'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { AwardItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function AwardsEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      awards: [...p.awards, { id: newId(), name: '', year: '' }],
    }))
  const patch = (id: string, partial: Partial<AwardItem>) =>
    updatePortfolio((p) => ({ ...p, awards: p.awards.map((e) => (e.id === id ? { ...e, ...partial } : e)) }))
  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, awards: p.awards.filter((e) => e.id !== id) }))
  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.awards.map((e) => [e.id, e]))
      return { ...p, awards: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Awards"
      description="Honors and recognition."
      action={<AddButton onClick={add}>Add award</AddButton>}
    >
      {portfolio.awards.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No awards yet.</p>
      )}
      <SortableList
        items={portfolio.awards}
        onReorder={reorder}
        className="flex flex-col gap-3"
        renderItem={(item, h) => (
          <div className="card-elevated p-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <DragHandle attrs={h.attrs} />
              <div className="flex-1 grid gap-3 md:grid-cols-3">
                <Field label="Name">
                  <TextInput value={item.name} onChange={(e) => patch(item.id, { name: e.target.value })} />
                </Field>
                <Field label="Issuer">
                  <TextInput value={item.issuer ?? ''} onChange={(e) => patch(item.id, { issuer: e.target.value })} />
                </Field>
                <Field label="Year">
                  <TextInput value={item.year} onChange={(e) => patch(item.id, { year: e.target.value })} />
                </Field>
              </div>
              <IconButton label="Remove" onClick={() => remove(item.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>
          </div>
        )}
      />
    </SectionWrap>
  )
}
