import Link from 'next/link'
import type { ReactNode } from 'react'

// Matches any reference to an internal sabooralikhan.com URL or a bare
// internal path. Used to auto-link references inside long-form body copy
// (e.g. blog posts) without requiring MDX or hand-written <Link> wrappers.
//
// Valid shapes:
//   https://sabooralikhan.com/<path>
//   sabooralikhan.com/<path>
//   /about
//   /blog/<slug>
//   /projects/<slug>
//   /experience/<slug>
//   /tools/<slug>
//   /education
//   /certifications
//   /contact
//   /faq
//   /marketing-automation
//   /technical-seo
//   /marketing-operations
//   /ai-workflows
const INTERNAL_LINK_PATTERN = new RegExp(
  [
    'https?://sabooralikhan\\.com/[a-z0-9\\-/]*',
    'sabooralikhan\\.com/[a-z0-9\\-/]*',
    '/(?:about|blog|projects|tools|experience|education|certifications|contact|faq|marketing-automation|technical-seo|marketing-operations|ai-workflows)(?:/[a-z0-9\\-]+)?',
  ].join('|'),
  'gi',
)

const TRAILING_PUNCTUATION = /[.,!?:;)\]]+$/

function normalizeToInternalPath(raw: string): string | null {
  let value = raw.replace(TRAILING_PUNCTUATION, '')
  if (value.startsWith('https://sabooralikhan.com')) {
    value = value.slice('https://sabooralikhan.com'.length)
  } else if (value.startsWith('http://sabooralikhan.com')) {
    value = value.slice('http://sabooralikhan.com'.length)
  } else if (value.startsWith('sabooralikhan.com')) {
    value = value.slice('sabooralikhan.com'.length)
  }
  if (!value.startsWith('/')) return null
  return value
}

export type LinkifyTextProps = {
  text: string
  /** Tailwind class applied to every auto-link rendered inside the text. */
  linkClassName?: string
}

/**
 * Renders plain text with internal path references turned into real <Link>
 * elements. Only internal sabooralikhan.com paths are linked — external URLs
 * and plain words are returned untouched.
 */
export function LinkifyText({ text, linkClassName }: LinkifyTextProps) {
  const className =
    linkClassName ??
    'font-medium text-[var(--ink)] underline decoration-[color-mix(in_srgb,var(--accent)_45%,transparent)] decoration-1 underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)]'

  const nodes: ReactNode[] = []
  const pattern = new RegExp(INTERNAL_LINK_PATTERN.source, 'gi')
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    const raw = match[0]
    const trailing = raw.match(TRAILING_PUNCTUATION)?.[0] ?? ''
    const visible = trailing ? raw.slice(0, -trailing.length) : raw
    const href = normalizeToInternalPath(visible)

    if (!href || visible.length === 0) {
      // Shouldn't happen given the regex, but be safe.
      continue
    }

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <Link key={`link-${key++}`} href={href} className={className}>
        {visible}
      </Link>,
    )
    if (trailing) {
      nodes.push(trailing)
    }
    lastIndex = match.index + raw.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <>{nodes}</>
}
