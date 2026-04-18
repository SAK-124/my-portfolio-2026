import type { Project } from '@/data/projects'
import type { profile as ProfileShape } from '@/data/profile'
import { newId } from './ids'
import type {
  BulletItem,
  Portfolio,
  ResumeConfig,
  ResumeSection,
  SkillGroup,
} from './types'

type SiteLinks = { email?: string; linkedin?: string; github?: string }

const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12',
}

function parseDate(label: string): string | undefined {
  const s = label.trim().toLowerCase()
  if (!s || s === 'present' || s === 'now' || s === 'current') return undefined
  const mMonthYear = s.match(/^([a-z]+)\s+(\d{4})$/)
  if (mMonthYear) {
    const m = MONTHS[mMonthYear[1]]
    if (m) return `${mMonthYear[2]}-${m}`
  }
  const mYear = s.match(/^(\d{4})$/)
  if (mYear) return `${mYear[1]}-01`
  return undefined
}

const bullets = (arr: string[]): BulletItem[] => arr.map((text) => ({ id: newId(), text }))

export function createEmptyPortfolio(): Portfolio {
  return {
    personalInfo: {
      id: newId(),
      name: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      links: [],
    },
    experience: [],
    education: [],
    projects: [],
    skillGroups: [],
    certifications: [],
    awards: [],
    languages: [],
    customSections: [],
  }
}

export function seedPortfolioFromProfile(
  profile: typeof ProfileShape,
  projects: Project[],
  site: SiteLinks,
): Portfolio {
  const links = [] as Portfolio['personalInfo']['links']
  if (site.email) links.push({ id: newId(), label: 'Email', url: site.email })
  if (site.linkedin) links.push({ id: newId(), label: 'LinkedIn', url: site.linkedin })
  if (site.github) links.push({ id: newId(), label: 'GitHub', url: site.github })

  const skillGroups: SkillGroup[] = profile.toolGroups.map((g) => ({
    id: newId(),
    title: g.title,
    items: g.items.map((label) => ({ id: newId(), label })),
  }))

  return {
    personalInfo: {
      id: newId(),
      name: profile.name,
      headline: profile.headline,
      email: site.email,
      location: profile.location,
      links,
    },
    experience: profile.experience.map((e) => ({
      id: newId(),
      title: e.title,
      organization: e.organization,
      location: e.location,
      startLabel: e.startLabel,
      endLabel: e.endLabel,
      startDate: parseDate(e.startLabel),
      endDate: parseDate(e.endLabel),
      summary: e.summary,
      bullets: bullets(e.bullets),
    })),
    education: profile.education.map((e) => ({
      id: newId(),
      institution: e.institution,
      credential: e.credential,
      startLabel: e.startLabel,
      endLabel: e.endLabel,
      notes: bullets(e.notes ?? []),
    })),
    projects: projects.map((p) => ({
      id: newId(),
      name: p.name,
      description: p.description,
      stack: [...p.stack],
      url: p.href,
      bullets: [],
    })),
    skillGroups,
    certifications: profile.certifications.map((c) => ({
      id: newId(),
      name: c.name,
      issuer: c.issuer,
      year: c.year,
    })),
    awards: [],
    languages: [],
    customSections: [],
  }
}

export function defaultResumeConfig(portfolio: Portfolio): ResumeConfig {
  const sections: ResumeSection[] = []

  if (portfolio.experience.length) {
    sections.push({
      kind: 'experience',
      include: portfolio.experience.map((it) => ({ id: it.id })),
    })
  }
  if (portfolio.projects.length) {
    sections.push({
      kind: 'projects',
      include: portfolio.projects.slice(0, 4).map((it) => ({ id: it.id })),
    })
  }
  if (portfolio.education.length) {
    sections.push({
      kind: 'education',
      include: portfolio.education.map((it) => ({ id: it.id })),
    })
  }
  if (portfolio.skillGroups.length) {
    sections.push({
      kind: 'skills',
      include: portfolio.skillGroups.map((it) => ({ id: it.id })),
    })
  }
  if (portfolio.certifications.length) {
    sections.push({
      kind: 'certifications',
      include: portfolio.certifications.map((it) => ({ id: it.id })),
    })
  }

  return {
    id: newId(),
    name: 'Default',
    updatedAt: new Date().toISOString(),
    templateId: 'editorial',
    targetPages: 1,
    density: 'standard',
    sections,
  }
}
