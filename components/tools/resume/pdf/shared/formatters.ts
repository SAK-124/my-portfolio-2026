export function formatDateRange(start: string, end: string): string {
  const s = start.trim()
  const e = end.trim()
  if (!s && !e) return ''
  if (!e) return s
  if (!s) return e
  return `${s} — ${e}`
}

export function shortenUrl(url: string, max = 48): string {
  const cleaned = url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
  if (cleaned.length <= max) return cleaned
  const keep = Math.floor((max - 1) / 2)
  return `${cleaned.slice(0, keep)}…${cleaned.slice(-keep)}`
}
