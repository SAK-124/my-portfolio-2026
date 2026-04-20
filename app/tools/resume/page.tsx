import { ToolsViewHeader } from '@/components/tools/shell/tools-view-header'
import BuilderEntry from '@/components/tools/resume/builder-entry'

export const metadata = {
  title: 'Resume Builder - Tools',
  robots: { index: false, follow: false },
}

export default function ResumeBuilderPage() {
  return (
    <section className="tools-view">
      <ToolsViewHeader
        eyebrow="Resume builder"
        title="Resume workspace"
        lead={
          <>
            Build, configure, and preview resume output. The preview stays{' '}
            <span className="tools-highlight">docked while you edit</span>.
          </>
        }
      />
      <BuilderEntry />
    </section>
  )
}
