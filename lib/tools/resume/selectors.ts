import type {
  AwardItem,
  CertificationItem,
  CustomSectionItem,
  EducationItem,
  ExperienceItem,
  IncludedItem,
  LanguageItem,
  PersonalInfo,
  Portfolio,
  ProjectItem,
  ResumeConfig,
  ResumeSection,
  SectionKind,
  SkillGroup,
} from './types'
import { customSectionId } from './types'

export type ResolvedExperience = ExperienceItem & { compact: boolean }
export type ResolvedEducation = EducationItem & { compact: boolean }
export type ResolvedProject = ProjectItem & { compact: boolean }
export type ResolvedSkillGroup = SkillGroup & { compact: boolean }
export type ResolvedCertification = CertificationItem & { compact: boolean }
export type ResolvedAward = AwardItem & { compact: boolean }
export type ResolvedLanguage = LanguageItem & { compact: boolean }
export type ResolvedCustom = CustomSectionItem & { compact: boolean }

export type ResolvedSection =
  | { kind: 'experience'; title: string; items: ResolvedExperience[] }
  | { kind: 'education'; title: string; items: ResolvedEducation[] }
  | { kind: 'projects'; title: string; items: ResolvedProject[] }
  | { kind: 'skills'; title: string; items: ResolvedSkillGroup[] }
  | { kind: 'certifications'; title: string; items: ResolvedCertification[] }
  | { kind: 'awards'; title: string; items: ResolvedAward[] }
  | { kind: 'languages'; title: string; items: ResolvedLanguage[] }
  | { kind: 'custom'; title: string; items: ResolvedCustom[] }

export interface ResolvedResume {
  personalInfo: PersonalInfo
  sections: ResolvedSection[]
}

function pick<T extends { id: string }>(items: T[], include: IncludedItem[]): Array<T & { compact: boolean }> {
  const map = new Map(items.map((it) => [it.id, it]))
  const out: Array<T & { compact: boolean }> = []
  for (const inc of include) {
    const item = map.get(inc.id)
    if (item) out.push({ ...item, compact: !!inc.compact })
  }
  return out
}

const defaultTitle = (kind: SectionKind): string => {
  switch (kind) {
    case 'experience': return 'Experience'
    case 'education': return 'Education'
    case 'projects': return 'Projects'
    case 'skills': return 'Skills'
    case 'certifications': return 'Certifications'
    case 'awards': return 'Awards'
    case 'languages': return 'Languages'
    default: return 'Section'
  }
}

function resolveSection(section: ResumeSection, portfolio: Portfolio): ResolvedSection | null {
  const title = section.title || defaultTitle(section.kind)
  switch (section.kind) {
    case 'experience': return { kind: 'experience', title, items: pick(portfolio.experience, section.include) }
    case 'education': return { kind: 'education', title, items: pick(portfolio.education, section.include) }
    case 'projects': return { kind: 'projects', title, items: pick(portfolio.projects, section.include) }
    case 'skills': return { kind: 'skills', title, items: pick(portfolio.skillGroups, section.include) }
    case 'certifications': return { kind: 'certifications', title, items: pick(portfolio.certifications, section.include) }
    case 'awards': return { kind: 'awards', title, items: pick(portfolio.awards, section.include) }
    case 'languages': return { kind: 'languages', title, items: pick(portfolio.languages, section.include) }
    default: {
      const cid = customSectionId(section.kind)
      if (!cid) return null
      const custom = portfolio.customSections.find((c) => c.id === cid)
      if (!custom) return null
      const titleFromCustom = section.title || custom.title || 'Section'
      return { kind: 'custom', title: titleFromCustom, items: [{ ...custom, compact: false }] }
    }
  }
}

export function resolveResume(portfolio: Portfolio, config: ResumeConfig): ResolvedResume {
  const overrides = config.personalInfoOverrides ?? {}
  const personalInfo: PersonalInfo = {
    ...portfolio.personalInfo,
    ...overrides,
    links: overrides.links ?? portfolio.personalInfo.links,
  }

  const sections: ResolvedSection[] = []
  for (const section of config.sections) {
    const resolved = resolveSection(section, portfolio)
    if (resolved && resolved.items.length > 0) sections.push(resolved)
  }

  return { personalInfo, sections }
}
