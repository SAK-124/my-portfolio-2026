import type { Metadata } from 'next'
import './tools.css'
import { ToolsRouteShell } from '@/components/tools/shell/tools-route-shell'

export const metadata: Metadata = {
  title: 'Tools',
  robots: { index: false, follow: false },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <ToolsRouteShell>{children}</ToolsRouteShell>
}
