'use client'

import { ArrowUpRight } from '@phosphor-icons/react'
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
  const dx = useSpring(x, { stiffness: 130, damping: 20 })
  const dy = useSpring(y, { stiffness: 130, damping: 20 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const mx = event.clientX - (rect.left + rect.width / 2)
      const my = event.clientY - (rect.top + rect.height / 2)
      x.set(mx * 0.10)
      y.set(my * 0.10)
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

  const isSolid = variant === 'solid'

  const baseClass = isSolid
    ? 'border-transparent bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_4px_16px_-4px_color-mix(in_srgb,var(--accent)_40%,transparent)]'
    : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: dx, y: dy }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-medium tracking-tight transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${baseClass}`}
    >
      <motion.span className="leading-none">{children}</motion.span>
      {isSolid && (
        <motion.span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.22)]"
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          whileHover={{ x: 1, y: -1, scale: 1.1 }}
        >
          <ArrowUpRight size={12} weight="bold" />
        </motion.span>
      )}
    </motion.a>
  )
}
