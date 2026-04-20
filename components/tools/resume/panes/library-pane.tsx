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
  { id: 'certifications', label: 'Certifications' },
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
  updatePortfolio: (updater: (portfolio: Portfolio) => Portfolio) => void
}) {
  const [tab, setTab] = useState<TabId>('personal')

  return (
    <div className="tools-stack">
      <div className="tools-subnav">
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setTab(entry.id)}
            className={`tools-subnav__tab ${tab === entry.id ? 'tools-subnav__tab--active' : ''}`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {tab === 'personal' ? <PersonalInfoForm portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'experience' ? <ExperienceEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'education' ? <EducationEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'projects' ? <ProjectsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'skills' ? <SkillsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'certifications' ? <CertificationsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'awards' ? <AwardsEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'languages' ? <LanguagesEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
      {tab === 'custom' ? <CustomSectionEditor portfolio={portfolio} updatePortfolio={updatePortfolio} /> : null}
    </div>
  )
}
