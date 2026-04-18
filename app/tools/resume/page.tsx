import { PageHeader } from '@/components/page-header'
import BuilderEntry from '@/components/tools/resume/builder-entry'

export const metadata = {
  title: 'Resume Builder · Tools',
  robots: { index: false, follow: false },
}

export default function ResumeBuilderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools · Resume"
        title="Resume Builder"
        lead="Portfolio-backed resume builder with live PDF preview."
      />
      <BuilderEntry />
    </>
  )
}
