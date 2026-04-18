import type { ResolvedResume } from './selectors'
import type { Density } from './types'

interface HeuristicTokens {
  charsPerLine: number
  sectionChrome: number
  itemChrome: number
  bulletChrome: number
  lineHeightPt: number
  pageContentHeightPt: number
}

const HEURISTICS: Record<Density, HeuristicTokens> = {
  compact:  { charsPerLine: 95, sectionChrome: 18, itemChrome: 14, bulletChrome: 2, lineHeightPt: 8.5 * 1.22, pageContentHeightPt: 792 - 48 - 42 - 42 },
  standard: { charsPerLine: 90, sectionChrome: 22, itemChrome: 18, bulletChrome: 3, lineHeightPt: 9.5 * 1.32, pageContentHeightPt: 792 - 48 - 42 - 42 },
  spacious: { charsPerLine: 82, sectionChrome: 28, itemChrome: 24, bulletChrome: 4, lineHeightPt: 10.5 * 1.42, pageContentHeightPt: 792 - 48 - 42 - 42 },
}

function textLines(text: string | undefined, charsPerLine: number): number {
  if (!text) return 0
  let total = 0
  for (const line of text.split(/\r?\n/)) {
    total += Math.max(1, Math.ceil((line.length || 1) / charsPerLine))
  }
  return total
}

export function estimatePages(resolved: ResolvedResume, density: Density): number {
  const h = HEURISTICS[density]

  let lines = 0
  lines += 3 // name + headline + contact
  let chrome = h.sectionChrome

  for (const section of resolved.sections) {
    chrome += h.sectionChrome

    switch (section.kind) {
      case 'experience':
        for (const item of section.items) {
          chrome += h.itemChrome
          lines += 1
          lines += item.location ? 1 : 0
          if (!item.compact) {
            lines += textLines(item.summary, h.charsPerLine)
            for (const b of item.bullets) {
              lines += textLines(b.text, h.charsPerLine)
              chrome += h.bulletChrome
            }
          }
        }
        break
      case 'education':
        for (const item of section.items) {
          chrome += h.itemChrome
          lines += 1
          if (!item.compact) {
            for (const n of item.notes) {
              lines += textLines(n.text, h.charsPerLine)
              chrome += h.bulletChrome
            }
          }
        }
        break
      case 'projects':
        for (const item of section.items) {
          chrome += h.itemChrome
          lines += 1
          if (!item.compact) {
            lines += textLines(item.description, h.charsPerLine)
            lines += item.stack.length > 0 ? 1 : 0
            for (const b of item.bullets) {
              lines += textLines(b.text, h.charsPerLine)
              chrome += h.bulletChrome
            }
          }
        }
        break
      case 'skills':
        for (const item of section.items) {
          chrome += h.itemChrome
          lines += textLines(`${item.title}: ${item.items.map((x) => x.label).join(', ')}`, h.charsPerLine)
        }
        break
      case 'certifications':
      case 'awards':
      case 'languages':
        for (const _item of section.items) {
          chrome += h.itemChrome
          lines += 1
        }
        break
      case 'custom':
        for (const item of section.items) {
          chrome += h.itemChrome
          lines += textLines(item.body, h.charsPerLine)
        }
        break
    }
  }

  const consumedPt = lines * h.lineHeightPt + chrome
  return Math.max(1, Math.ceil(consumedPt / h.pageContentHeightPt))
}
