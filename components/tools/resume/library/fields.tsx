'use client'

import { ReactNode } from 'react'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="tools-field">
      <span className="tools-field__label">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props
  return <input {...rest} className={`tools-field__control ${className}`} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props
  return <textarea {...rest} className={`tools-field__control min-h-[96px] resize-y ${className}`} />
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
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`tools-glyph-button ${variant === 'danger' ? 'tools-glyph-button--danger' : ''}`}
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
      className="tools-cta tools-cta--ghost tools-cta--compact"
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
  eyebrow = 'Library',
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
  eyebrow?: string
}) {
  return (
    <section className="tools-module">
      <div className="tools-module__header">
        <div>
          <p className="tools-group-label">{eyebrow}</p>
          <h3 className="tools-module__title mt-1">{title}</h3>
          {description ? <p className="tools-module__description">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
