'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const onChange = (field: keyof FormState, value: string) => {
    setError('')
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete all fields before sending.')
      setSent(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please provide a valid email address.')
      setSent(false)
      return
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)

    window.location.href = `mailto:saboor.a.khan@outlook.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium tracking-tight text-[var(--ink)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => onChange('name', event.target.value)}
          className="rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_96%,white_4%)] px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[var(--accent)]"
          placeholder="Your name"
        />
      </div>

      <div className="mt-4 grid gap-2">
        <label htmlFor="email" className="text-sm font-medium tracking-tight text-[var(--ink)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          className="rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_96%,white_4%)] px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[var(--accent)]"
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-4 grid gap-2">
        <label htmlFor="message" className="text-sm font-medium tracking-tight text-[var(--ink)]">
          What are you reaching out about?
        </label>
        <p className="text-xs text-[var(--muted)]">Include your goal, timeline, and any relevant context.</p>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => onChange('message', event.target.value)}
          className="min-h-36 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_96%,white_4%)] px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[var(--accent)]"
          placeholder="Briefly describe the project, role, or question."
        />
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      {sent ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Your mail app should open now. If it does not, send directly to saboor.a.khan@outlook.com.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-5 inline-flex rounded-full border border-transparent bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  )
}
