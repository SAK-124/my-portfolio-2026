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
  const [pillHeight, setPillHeight] = useState<number | null>(null)

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

  /* Measure the text block after each keystroke and drive the pill height
     explicitly so it transitions smoothly between layouts instead of snapping
     per character. Also toggle the rounded-pill ↔ rounded-rect shape flag. */
  useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return
    const styles = getComputedStyle(text)
    const lineHeight = parseFloat(styles.lineHeight || '20')
    const textHeight = text.offsetHeight
    const isMulti = textHeight > lineHeight * 1.4
    setMulti(isMulti)
    /* Add vertical padding (matches CSS: 0.5rem top + 0.5rem bottom = 16px)
       and 2px border. Using a ref-measured target instead of "auto" is what
       makes the transition possible. */
    setPillHeight(textHeight + 18)
  }, [typed])

  return (
    <div className="typewriter-slot mt-2">
      <div
        ref={pillRef}
        className="typewriter-pill"
        data-lines={multi ? 'multi' : 'single'}
        style={pillHeight != null ? { height: pillHeight } : undefined}
      >
        <span className="typewriter-pill__tag">live</span>
        <span ref={textRef} className="typewriter-pill__text">
          {typed}
          <span className="typewriter-pill__caret" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
})
