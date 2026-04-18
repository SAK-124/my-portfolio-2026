'use client'

import { useState } from 'react'
import type { Portfolio } from '@/lib/tools/resume/types'
import { PersonalInfoForm } from '../library/personal-info-form'
import { ExperienceEditor } from '../library/experience-editor'
import { EducationEditor } from '../library/education-editor'
import { ProjectsEditor } from '../library/projects-editor'
import { SkillsEditor } from '../library/skills-editor'
import { CertificationsEditor } from '../library/certifications-editor'
import { AwardsEditor } from '../library/awards-editor'
import { LanguagesEditor } from '../library/languages-editor'
import { CustomSectionEditor } from '../library/custom-section-editor'

const TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certs' },
  { id: 'awards', label: 'Awards' },
  { id: 'languages', label: 'Languages' },
  { id: 'custom', label: 'Custom' },
] as const

type TabId = (typeof TABS)[number]['id']

export function LibraryPane({
  portfolio,
  updatePortfolio,
}: {
  portfolio: Portfolio
  updatePortfolio: (u: (p: Portfolio) => Portfolio) => void
}) {
  const [tab, setTab] = useState<TabId>('personal')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-chip ${tab === t.id ? 'border-[var(--line-strong)] text-[var(--ink)]' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'personal' && <PersonalInfoForm portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'experience' && <ExperienceEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'education' && <EducationEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'projects' && <ProjectsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'skills' && <SkillsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'certifications' && <CertificationsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'awards' && <AwardsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'languages' && <LanguagesEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {tab === 'custom' && <CustomSectionEditor portfolio={portfolio} updatePortfolio={updatePortfolio} />}
    </div>
  )
}
