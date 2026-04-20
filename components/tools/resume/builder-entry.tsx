'use client'

import dynamic from 'next/dynamic'

const BuilderShell = dynamic(
  () => import('./builder-shell').then((module) => module.BuilderShell),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-4">
        <div className="tools-loading-card h-32" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          <div className="tools-loading-card h-[60dvh]" />
          <div className="tools-loading-card h-[60dvh]" />
        </div>
      </div>
    ),
  },
)

export default function BuilderEntry() {
  return <BuilderShell />
}
