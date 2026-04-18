export type ID = string

export interface LinkItem {
  id: ID
  label: string
  url: string
}

export interface PersonalInfo {
  id: ID
  name: string
  headline?: string
  email?: string
  phone?: string
  location?: string
  links: LinkItem[]
}

export interface BulletItem {
  id: ID
  text: string
}

export interface ExperienceItem {
  id: ID
  title: string
  organization: string
  location?: string
  startLabel: string
  endLabel: string
  startDate?: string
  endDate?: string
  summary?: string
  bullets: BulletItem[]
}

export interface EducationItem {
  id: ID
  institution: string
  credential: string
  location?: string
  startLabel: string
  endLabel: string
  notes: BulletItem[]
}

export interface ProjectItem {
  id: ID
  name: string
  description: string
  stack: string[]
  url?: string
  startLabel?: string
  endLabel?: string
  bullets: BulletItem[]
}

export interface SkillEntry {
  id: ID
  label: string
}

export interface SkillGroup {
  id: ID
  title: string
  items: SkillEntry[]
}

export interface CertificationItem {
  id: ID
  name: string
  issuer: string
  year: string
  url?: string
}

export interface AwardItem {
  id: ID
  name: string
  issuer?: string
  year: string
  note?: string
}

export interface LanguageItem {
  id: ID
  name: string
  proficiency?: string
}

export interface CustomSectionItem {
  id: ID
  title: string
  body: string
  bullets: BulletItem[]
}

export interface Portfolio {
  personalInfo: PersonalInfo
  experience: ExperienceItem[]
  education: EducationItem[]
  projects: ProjectItem[]
  skillGroups: SkillGroup[]
  certifications: CertificationItem[]
  awards: AwardItem[]
  languages: LanguageItem[]
  customSections: CustomSectionItem[]
}

export type SectionKind =
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'awards'
  | 'languages'
  | `custom:${ID}`

export interface IncludedItem {
  id: ID
  compact?: boolean
}

export interface ResumeSection {
  kind: SectionKind
  title?: string
  include: IncludedItem[]
}

export type TemplateId = 'ats-classic' | 'editorial'
export type Density = 'compact' | 'standard' | 'spacious'

export interface ResumeConfig {
  id: ID
  name: string
  updatedAt: string
  templateId: TemplateId
  targetPages: 1 | 2
  density: Density
  sections: ResumeSection[]
  personalInfoOverrides?: Partial<Omit<PersonalInfo, 'id' | 'links'>> & { links?: LinkItem[] }
}

export interface ResumeConfigsState {
  activeId: ID | null
  configs: ResumeConfig[]
}

export interface Preferences {
  lastOpenedConfigId?: ID
}

export const SECTION_LABELS: Record<string, string> = {
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  skills: 'Skills',
  certifications: 'Certifications',
  awards: 'Awards',
  languages: 'Languages',
}

export function isCustomSectionKind(k: SectionKind): k is `custom:${ID}` {
  return typeof k === 'string' && k.startsWith('custom:')
}

export function customSectionId(k: SectionKind): ID | null {
  return isCustomSectionKind(k) ? k.slice('custom:'.length) : null
}
