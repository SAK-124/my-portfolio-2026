import type { ComponentType } from 'react'
import { FileText } from '@phosphor-icons/react/dist/ssr'

export interface ToolDef {
  id: string
  title: string
  blurb: string
  icon: ComponentType<{ size?: number; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }>
  href: string
  status: 'live' | 'soon'
}

export const tools: ToolDef[] = [
  {
    id: 'resume',
    title: 'Resume Builder',
    blurb: 'Portfolio-backed resume builder with live PDF preview, templates, and overflow detection.',
    icon: FileText,
    href: '/tools/resume',
    status: 'live',
  },
]
