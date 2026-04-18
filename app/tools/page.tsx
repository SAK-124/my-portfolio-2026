import { PageHeader } from '@/components/page-header'
import { ToolCard } from '@/components/tools/shell/tool-card'
import { tools } from '@/lib/tools/registry'

export const metadata = {
  title: 'Tools · Private workspace',
  robots: { index: false, follow: false },
}

export default function ToolsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Private workspace"
        lead="Internal utilities. Not linked from the public site."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </>
  )
}
