import type { Density } from '@/lib/tools/resume/types'

export interface DensityTokens {
  base: number
  lineHeight: number
  sectionGap: number
  itemGap: number
  bulletGap: number
}

export const densityTokens: Record<Density, DensityTokens> = {
  compact:  { base: 8.5,  lineHeight: 1.22, sectionGap: 8,  itemGap: 4,  bulletGap: 2 },
  standard: { base: 9.5,  lineHeight: 1.32, sectionGap: 12, itemGap: 6,  bulletGap: 3 },
  spacious: { base: 10.5, lineHeight: 1.42, sectionGap: 18, itemGap: 9,  bulletGap: 5 },
}

export function scaleSizes(base: number) {
  return {
    body: base,
    small: base - 1,
    micro: base - 1.5,
    headline: base * 1.1,
    section: base * 1.25,
    display: base * 2.2,
  }
}
