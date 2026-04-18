import type { Portfolio } from './types'

export interface Issue {
  level: 'info' | 'warn' | 'error'
  message: string
  fieldPath: string
}

const BULLET_MAX = 220

export function validatePortfolio(portfolio: Portfolio): Issue[] {
  const issues: Issue[] = []

  for (const e of portfolio.experience) {
    if (e.startDate && e.endDate && e.endDate < e.startDate) {
      issues.push({
        level: 'error',
        message: `End date precedes start date for ${e.title} at ${e.organization}.`,
        fieldPath: `experience.${e.id}.endDate`,
      })
    }
    for (const b of e.bullets) {
      if (b.text.length > BULLET_MAX) {
        issues.push({
          level: 'warn',
          message: `Bullet is ${b.text.length} chars; may wrap to 4+ lines.`,
          fieldPath: `experience.${e.id}.bullets.${b.id}`,
        })
      }
      if (/\b(TODO|Lorem)\b/i.test(b.text)) {
        issues.push({
          level: 'info',
          message: 'Placeholder text detected in bullet.',
          fieldPath: `experience.${e.id}.bullets.${b.id}`,
        })
      }
    }
  }

  for (const p of portfolio.projects) {
    if (p.description.length > BULLET_MAX * 2) {
      issues.push({
        level: 'warn',
        message: `Project description is long (${p.description.length} chars).`,
        fieldPath: `projects.${p.id}.description`,
      })
    }
  }

  return issues
}
