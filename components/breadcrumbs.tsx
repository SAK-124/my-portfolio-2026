import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import { JsonLd } from '@/components/json-ld'
import { siteConfig } from '@/lib/site'

type Crumb = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  }

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--muted)]">
          {items.map((item, index) => (
            <li key={item.href} className="inline-flex items-center gap-1.5">
              {index > 0 ? <CaretRight size={12} weight="bold" /> : null}
              {index < items.length - 1 ? (
                <Link href={item.href} className="transition-colors hover:text-[var(--ink)]">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--ink)]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
