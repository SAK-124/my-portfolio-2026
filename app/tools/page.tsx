import { ArrowUpRight, FileText } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ToolsViewHeader } from '@/components/tools/shell/tools-view-header'
import { publicTools } from '@/data/tools'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Public Tools | Saboor Ali Khan',
  description:
    'Public tools by Saboor Ali Khan, including a resume builder with ATS-friendly templates, live PDF preview, and downloadable PDF export.',
  path: '/tools',
  keywords: ['Saboor tools', 'Saboor resume builder', 'resume builder', 'ATS resume builder', 'resume editor'],
})

export default function ToolsIndexPage() {
  return (
    <section className="tools-view">
      <ToolsViewHeader
        eyebrow="Tools"
        title="Public tools"
        lead={
          <>
            Browse the public tools from the portfolio and open the ones you want to use. When a tool needs the
            editor workspace, authentication happens at the point of entry rather than here on the overview page.
          </>
        }
      />

      <section id="workspace-actions" className="tools-surface">
        <div className="tools-pane-header">
          <div>
            <p className="tools-pane-header__eyebrow">Public tools</p>
            <h2 className="tools-pane-header__title">Available surfaces</h2>
          </div>
        </div>

        <div className="tools-command-list">
          {publicTools.map((tool) => (
            <Link key={tool.slug} href={tool.path} className="tools-command-row">
              <span className="tools-command-row__icon">
                <FileText size={16} weight="regular" />
              </span>
              <div className="tools-command-row__main">
                <p className="tools-command-row__title">{tool.name}</p>
                <p className="tools-command-row__copy">{tool.summary}</p>
              </div>
              <span className="tools-command-row__action">
                Open
                <ArrowUpRight size={13} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
