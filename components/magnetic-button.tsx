'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
}

export function MagneticButton({ href, children, variant = 'solid' }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const dx = useSpring(x, { stiffness: 120, damping: 18 })
  const dy = useSpring(y, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const mx = event.clientX - (rect.left + rect.width / 2)
      const my = event.clientY - (rect.top + rect.height / 2)
      x.set(mx * 0.12)
      y.set(my * 0.12)
    }

    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)

    return () => {
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  const baseClass =
    variant === 'solid'
      ? 'border-transparent bg-[var(--accent)] text-[var(--accent-ink)]'
      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]'

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: dx, y: dy }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium tracking-tight ${baseClass}`}
    >
      <motion.span>{children}</motion.span>
    </motion.a>
  )
}
