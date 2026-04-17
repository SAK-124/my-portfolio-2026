'use client'

import { memo, useEffect, useMemo, useState } from 'react'

const prompts = [
  'Building automation systems at 10Pearls',
  'Designing SEO workflows end-to-end',
  'Full-stack web projects, built independently',
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
    <div className="mt-2 flex h-[5.5rem] w-full min-w-0 items-start overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] md:h-[5rem]">
      <span className="mr-2 mt-[2px] shrink-0 rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] uppercase tracking-[0.11em] text-[var(--accent)]">
        live
      </span>
      <span className="min-w-0 flex-1 break-words leading-relaxed">{typed}</span>
      <span className="ml-1 mt-[2px] inline-block h-4 w-[1px] shrink-0 animate-pulse bg-[var(--muted)] align-middle" />
    </div>
  )
})
