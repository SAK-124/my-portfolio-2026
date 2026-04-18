'use client'

import dynamic from 'next/dynamic'

const BuilderShell = dynamic(
  () => import('./builder-shell').then((m) => m.BuilderShell),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4">
        <div className="h-10 w-64 rounded-full bg-[var(--surface)] border border-[var(--line)]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[60dvh] rounded-[1.25rem] bg-[var(--surface)] border border-[var(--line)]" />
          <div className="h-[60dvh] rounded-[1.25rem] bg-[var(--surface)] border border-[var(--line)]" />
        </div>
      </div>
    ),
  },
)

export default function BuilderEntry() {
  return <BuilderShell />
}
