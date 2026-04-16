'use client'

import { memo, useEffect, useMemo, useState } from 'react'

const prompts = [
  'Marketing automation systems for recurring execution',
  'Technical SEO workflows tied to reporting clarity',
  'Process support for practical digital operations',
]

export const TypewriterPill = memo(function TypewriterPill() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  const activePrompt = useMemo(() => prompts[promptIndex % prompts.length], [promptIndex])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!deleting && typed.length < activePrompt.length) {
      timeout = setTimeout(() => setTyped(activePrompt.slice(0, typed.length + 1)), 38)
    } else if (!deleting && typed.length === activePrompt.length) {
      timeout = setTimeout(() => setDeleting(true), 1400)
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(activePrompt.slice(0, typed.length - 1)), 20)
    } else {
      timeout = setTimeout(() => {
        setDeleting(false)
        setPromptIndex((value) => value + 1)
      }, 220)
    }

    return () => clearTimeout(timeout)
  }, [activePrompt, deleting, typed])

  return (
    <div className="mt-2 flex min-h-11 items-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <span className="mr-2 rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] uppercase tracking-[0.11em] text-[var(--accent)]">
        live
      </span>
      <span>{typed}</span>
      <span className="ml-1 inline-block h-4 w-[1px] animate-pulse bg-[var(--muted)] align-middle" />
    </div>
  )
})
