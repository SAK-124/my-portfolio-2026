import Link from 'next/link'
import { ArrowUpRight, FileText } from '@phosphor-icons/react/dist/ssr'
import { ToolsViewHeader } from '@/components/tools/shell/tools-view-header'

export const metadata = {
  title: 'Tools - Private workspace',
  robots: { index: false, follow: false },
}

export default function ToolsIndexPage() {
  return (
    <section className="tools-view">
      <ToolsViewHeader
        eyebrow="Workspace"
        title="Private workspace"
        lead={
          <>
            A focused command center for internal tools. Open a surface and{' '}
            <span className="tools-highlight">work directly</span> &mdash; no extra chrome, no decorative layers.
          </>
        }
      />

      <section id="workspace-actions" className="tools-surface">
        <div className="tools-pane-header">
          <div>
            <p className="tools-pane-header__eyebrow">Tools</p>
            <h2 className="tools-pane-header__title">Available surfaces</h2>
          </div>
        </div>

        <div className="tools-command-list">
          <Link href="/tools/resume" className="tools-command-row">
            <span className="tools-command-row__icon">
              <FileText size={16} weight="regular" />
            </span>
            <div className="tools-command-row__main">
              <p className="tools-command-row__title">Resume builder</p>
              <p className="tools-command-row__copy">
                Edit the library, tune configs, and preview the rendered output.
              </p>
            </div>
            <span className="tools-command-row__action">
              Open
              <ArrowUpRight size={13} weight="bold" />
            </span>
          </Link>
        </div>
      </section>
    </section>
  )
}
