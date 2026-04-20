import type { ReactNode } from 'react'

type ToolsViewHeaderProps = {
  eyebrow: string
  title: string
  lead?: ReactNode
}

export function ToolsViewHeader({ eyebrow, title, lead }: ToolsViewHeaderProps) {
  return (
    <header className="tools-view-header">
      <p className="tools-view-header__eyebrow">{eyebrow}</p>
      <h1 className="tools-view-header__title">{title}</h1>
      {lead ? <p className="tools-view-header__lead">{lead}</p> : null}
    </header>
  )
}
