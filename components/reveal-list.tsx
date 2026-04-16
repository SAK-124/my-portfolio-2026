import type { ReactNode } from 'react'

type RevealListProps = {
  children: ReactNode
  className?: string
}

export function RevealList({ children, className }: RevealListProps) {
  return <div className={className}>{children}</div>
}
