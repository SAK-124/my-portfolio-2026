'use client'

import { ReactNode } from 'react'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="section-eyebrow">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props
  return (
    <input
      {...rest}
      className={`border border-[var(--line)] rounded-2xl px-3 py-2 bg-[var(--surface)] outline-none focus:border-[var(--line-strong)] text-[var(--ink)] ${className}`}
    />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props
  return (
    <textarea
      {...rest}
      className={`border border-[var(--line)] rounded-2xl px-3 py-2 bg-[var(--surface)] outline-none focus:border-[var(--line-strong)] text-[var(--ink)] min-h-[80px] resize-y ${className}`}
    />
  )
}

export function IconButton({
  label,
  onClick,
  children,
  variant = 'default',
}: {
  label: string
  onClick: () => void
  children: ReactNode
  variant?: 'default' | 'danger'
}) {
  const color = variant === 'danger' ? 'hover:text-[color:var(--accent)]' : ''
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`profile-icon-chip ${color}`}
    >
      {children}
    </button>
  )
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-chip hover:border-[var(--line-strong)] self-start"
    >
      + {children}
    </button>
  )
}

export function SectionWrap({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-[var(--ink)]">{title}</h3>
          {description && <p className="text-xs text-[var(--muted)] mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
