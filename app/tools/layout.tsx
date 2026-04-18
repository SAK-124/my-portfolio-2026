import type { Metadata } from 'next'
import { ToolsNav } from '@/components/tools/shell/tools-nav'

export const metadata: Metadata = {
  title: 'Tools',
  robots: { index: false, follow: false },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-10 md:py-16">
      <ToolsNav />
      <div className="pt-8 md:pt-10">{children}</div>
    </div>
  )
}
