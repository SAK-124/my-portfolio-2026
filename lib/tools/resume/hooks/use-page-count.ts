'use client'

import { useEffect, useRef, useState } from 'react'
import { pdf, type DocumentProps } from '@react-pdf/renderer'
import type { ReactElement } from 'react'

export interface PageCountResult {
  pageCount: number | null
  status: 'idle' | 'estimating' | 'ready' | 'error'
}

export function usePageCount(docElement: ReactElement<DocumentProps> | null): PageCountResult {
  const [result, setResult] = useState<PageCountResult>({ pageCount: null, status: 'idle' })
  const tokenRef = useRef(0)

  useEffect(() => {
    if (!docElement) return
    const myToken = ++tokenRef.current
    setResult((prev) => ({ pageCount: prev.pageCount, status: 'estimating' }))

    ;(async () => {
      try {
        const blob = await pdf(docElement).toBlob()
        if (tokenRef.current !== myToken) return
        const { PDFDocument } = await import('pdf-lib')
        const buf = await blob.arrayBuffer()
        if (tokenRef.current !== myToken) return
        const doc = await PDFDocument.load(buf, { ignoreEncryption: true })
        if (tokenRef.current !== myToken) return
        setResult({ pageCount: doc.getPageCount(), status: 'ready' })
      } catch {
        if (tokenRef.current !== myToken) return
        setResult({ pageCount: null, status: 'error' })
      }
    })()

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tokenRef.current++
    }
  }, [docElement])

  return result
}
