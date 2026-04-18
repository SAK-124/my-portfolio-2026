'use client'

import { Trash } from '@phosphor-icons/react/dist/ssr'
import type { PersonalInfo, Portfolio } from '@/lib/tools/resume/types'
import { newId } from '@/lib/tools/resume/ids'
import { Field, TextInput, AddButton, IconButton, SectionWrap } from './fields'

export function PersonalInfoForm({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const pi = portfolio.personalInfo

  const patch = (partial: Partial<PersonalInfo>) =>
    updatePortfolio((p) => ({ ...p, personalInfo: { ...p.personalInfo, ...partial } }))

  const addLink = () =>
    updatePortfolio((p) => ({
      ...p,
      personalInfo: {
        ...p.personalInfo,
        links: [...p.personalInfo.links, { id: newId(), label: '', url: '' }],
      },
    }))

  const patchLink = (id: string, partial: Partial<{ label: string; url: string }>) =>
    updatePortfolio((p) => ({
      ...p,
      personalInfo: {
        ...p.personalInfo,
        links: p.personalInfo.links.map((l) => (l.id === id ? { ...l, ...partial } : l)),
      },
    }))

  const removeLink = (id: string) =>
    updatePortfolio((p) => ({
      ...p,
      personalInfo: {
        ...p.personalInfo,
        links: p.personalInfo.links.filter((l) => l.id !== id),
      },
    }))

  return (
    <SectionWrap title="Personal info" description="Appears at the top of every resume.">
      <div className="card-elevated p-5 md:p-6 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <TextInput value={pi.name} onChange={(e) => patch({ name: e.target.value })} />
          </Field>
          <Field label="Headline">
            <TextInput value={pi.headline ?? ''} onChange={(e) => patch({ headline: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput type="email" value={pi.email ?? ''} onChange={(e) => patch({ email: e.target.value })} />
          </Field>
          <Field label="Phone">
            <TextInput value={pi.phone ?? ''} onChange={(e) => patch({ phone: e.target.value })} />
          </Field>
          <Field label="Location">
            <TextInput value={pi.location ?? ''} onChange={(e) => patch({ location: e.target.value })} />
          </Field>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="section-eyebrow">Links</p>
            <AddButton onClick={addLink}>Add link</AddButton>
          </div>
          {pi.links.length === 0 && <p className="text-xs text-[var(--muted)]">No links yet.</p>}
          {pi.links.map((l) => (
            <div key={l.id} className="grid grid-cols-[1fr_2fr_auto] gap-2">
              <TextInput
                placeholder="Label"
                value={l.label}
                onChange={(e) => patchLink(l.id, { label: e.target.value })}
              />
              <TextInput
                placeholder="URL"
                value={l.url}
                onChange={(e) => patchLink(l.id, { url: e.target.value })}
              />
              <IconButton label="Remove link" onClick={() => removeLink(l.id)} variant="danger">
                <Trash size={14} weight="bold" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

    </SectionWrap>
  )
}
