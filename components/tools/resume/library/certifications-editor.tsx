'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { CertificationItem, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, AddButton, IconButton, SectionWrap } from './fields'
import { SortableList, DragHandle } from './sortable-list'

export function CertificationsEditor({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const add = () =>
    updatePortfolio((p) => ({
      ...p,
      certifications: [...p.certifications, { id: newId(), name: '', issuer: '', year: '' }],
    }))

  const patch = (id: string, partial: Partial<CertificationItem>) =>
    updatePortfolio((p) => ({
      ...p,
      certifications: p.certifications.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    }))

  const remove = (id: string) =>
    updatePortfolio((p) => ({ ...p, certifications: p.certifications.filter((e) => e.id !== id) }))

  const reorder = (ids: string[]) =>
    updatePortfolio((p) => {
      const byId = new Map(p.certifications.map((e) => [e.id, e]))
      return { ...p, certifications: ids.map((id) => byId.get(id)!).filter(Boolean) }
    })

  return (
    <SectionWrap
      title="Certifications"
      description="Professional certificates and trainings."
      action={<AddButton onClick={add}>Add certification</AddButton>}
    >
      {portfolio.certifications.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No certifications yet.</p>
      )}
      <SortableList
        items={portfolio.certifications}
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
                  <TextInput value={item.issuer} onChange={(e) => patch(item.id, { issuer: e.target.value })} />
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
