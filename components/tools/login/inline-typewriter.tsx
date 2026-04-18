'use client'

import { memo, useEffect, useMemo, useState } from 'react'

export const InlineTypewriter = memo(function InlineTypewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 45,
  holdMs = 1200,
  className,
}: {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  holdMs?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  const active = useMemo(() => words[index % words.length], [words, index])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && typed.length < active.length) {
      timeout = setTimeout(() => setTyped(active.slice(0, typed.length + 1)), typeSpeed)
    } else if (!deleting && typed.length === active.length) {
      timeout = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(active.slice(0, typed.length - 1)), deleteSpeed)
    } else {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((v) => v + 1)
      }, 260)
    }
    return () => clearTimeout(timeout)
  }, [active, deleting, typed, typeSpeed, deleteSpeed, holdMs])

  return (
    <span className={className}>
      {typed}
      <span className="inline-typewriter__caret" aria-hidden="true" />
    </span>
  )
})
