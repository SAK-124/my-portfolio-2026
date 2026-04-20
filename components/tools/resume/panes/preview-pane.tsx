'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { Portfolio, ResumeConfig } from '@/lib/tools/resume/types'
import { resolveResume } from '@/lib/tools/resume/selectors'
import { estimatePages } from '@/lib/tools/resume/overflow'
import { useDebouncedValue } from '@/lib/tools/resume/hooks/use-debounced-value'
import { usePageCount } from '@/lib/tools/resume/hooks/use-page-count'
import { ResumeDocument } from '../pdf/document'
import { OverflowBanner } from '../config/overflow-banner'

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFViewer),
  { ssr: false, loading: () => <ViewerSkeleton label="Loading preview..." /> },
)

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFDownloadLink),
  { ssr: false, loading: () => <span className="tools-cta tools-cta--ghost tools-cta--compact">Preparing...</span> },
)

function ViewerSkeleton({ label }: { label: string }) {
  return <div className="tools-preview__empty">{label}</div>
}

export function PreviewPane({
  portfolio,
  config,
  patch,
}: {
  portfolio: Portfolio
  config: ResumeConfig | null
  patch: (partial: Partial<ResumeConfig>) => void
}) {
  const resolved = useMemo(() => (config ? resolveResume(portfolio, config) : null), [portfolio, config])
  const debouncedResolved = useDebouncedValue(resolved, 1000)
  const debouncedDensity = useDebouncedValue(config?.density ?? 'standard', 1000)
  const debouncedTemplate = useDebouncedValue(config?.templateId ?? 'editorial', 300)

  const documentElement = useMemo(() => {
    if (!debouncedResolved) return null
    return (
      <ResumeDocument
        resolved={debouncedResolved}
        density={debouncedDensity}
        templateId={debouncedTemplate}
      />
    )
  }, [debouncedResolved, debouncedDensity, debouncedTemplate])

  const estimatedPages = useMemo(
    () => (debouncedResolved ? estimatePages(debouncedResolved, debouncedDensity) : 1),
    [debouncedResolved, debouncedDensity],
  )

  const { pageCount: authoritativePages, status } = usePageCount(documentElement)

  const downloadFilename = useMemo(() => {
    const name = (config?.name ?? 'Resume').replace(/[^a-z0-9-_ ]/gi, '').trim() || 'Resume'
    return `${name}.pdf`
  }, [config?.name])

  if (!config || !documentElement) {
    return <ViewerSkeleton label="No config selected." />
  }

  return (
    <div className="tools-preview">
      <div className="tools-preview__toolbar">
        <OverflowBanner
          config={config}
          estimatedPages={estimatedPages}
          authoritativePages={authoritativePages}
          status={status}
          patch={patch}
        />
        <PDFDownloadLink
          document={documentElement}
          fileName={downloadFilename}
          className="tools-cta tools-cta--ghost tools-cta--compact ml-auto"
        >
          Download PDF
        </PDFDownloadLink>
      </div>
      <div className="tools-preview__dock">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          {documentElement}
        </PDFViewer>
      </div>
    </div>
  )
}
