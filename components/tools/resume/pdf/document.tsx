import { memo } from 'react'
import type { ResolvedResume } from '@/lib/tools/resume/selectors'
import type { Density, TemplateId } from '@/lib/tools/resume/types'
import { AtsClassicDocument } from './templates/ats-classic'
import { EditorialDocument } from './templates/editorial'
import { MuzainaDocument } from './templates/muzaina'

interface Props {
  resolved: ResolvedResume
  density: Density
  templateId: TemplateId
}

function ResumeDocumentImpl({ resolved, density, templateId }: Props) {
  if (templateId === 'ats-classic') return <AtsClassicDocument resolved={resolved} density={density} />
  if (templateId === 'muzaina') return <MuzainaDocument resolved={resolved} density={density} />
  return <EditorialDocument resolved={resolved} density={density} />
}

export const ResumeDocument = memo(ResumeDocumentImpl)
