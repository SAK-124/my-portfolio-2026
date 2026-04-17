'use client'

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const prompts = [
  'Building automation systems at 10Pearls',
  'Designing SEO workflows end-to-end',
  'Full-stack web projects, built independently',
  'Shipping small tools to kill manual work',
  'Turning campaigns into repeatable systems',
  'Writing internal docs people can actually use',
  'Scoping, building, documenting — solo',
  'Instrumenting reporting that makes search readiness measurable',
  'Learning fast across marketing and product',
]

export const TypewriterPill = memo(function TypewriterPill() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [multi, setMulti] = useState(false)

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

  /* Detect whether the text wraps to more than one line so the pill can
     soften its corners from elongated-pill (single line) to rounded-rect
     (multi-line). Purely visual — layout is already absolute. */
  useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return
    const lineHeight = parseFloat(getComputedStyle(text).lineHeight || '20')
    const isMulti = text.offsetHeight > lineHeight * 1.4
    setMulti(isMulti)
  }, [typed])

  return (
    <div className="typewriter-slot mt-2">
      <div ref={pillRef} className="typewriter-pill" data-lines={multi ? 'multi' : 'single'}>
        <span className="typewriter-pill__tag">live</span>
        <span ref={textRef} className="typewriter-pill__text">{typed}</span>
        <span className="typewriter-pill__caret" aria-hidden="true" />
      </div>
    </div>
  )
})
