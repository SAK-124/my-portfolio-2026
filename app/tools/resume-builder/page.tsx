import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { ToolsViewHeader } from '@/components/tools/shell/tools-view-header'
import { resumeBuilderTool } from '@/data/tools'
import { buildMetadata } from '@/lib/seo'
import { buildToolSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: resumeBuilderTool.seoTitle,
  description: resumeBuilderTool.seoDescription,
  path: resumeBuilderTool.path,
  image: resumeBuilderTool.screenshots[0]?.src,
  keywords: resumeBuilderTool.keywords,
})

export default function ResumeBuilderLandingPage() {
  return (
    <section className="tools-view">
      <JsonLd data={buildToolSchema(resumeBuilderTool)} />
      <ToolsViewHeader eyebrow={resumeBuilderTool.eyebrow} title={resumeBuilderTool.title} lead={resumeBuilderTool.lead} />

      <section className="tools-surface">
        <div className="tools-pane-header">
          <div>
            <p className="tools-pane-header__eyebrow">Resume builder</p>
            <h2 className="tools-pane-header__title">Built for practical resume work</h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4">
            {resumeBuilderTool.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="rounded-[1.4rem] border border-[var(--tools-line)] bg-[var(--tools-surface)] p-3">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1600}
                  height={1000}
                  className="h-auto w-full rounded-[1rem] object-cover"
                />
                {screenshot.caption ? (
                  <figcaption className="mt-3 text-sm leading-relaxed text-[var(--tools-muted)]">{screenshot.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>

          <div className="grid gap-4">
            <article className="rounded-[1.4rem] border border-[var(--tools-line)] bg-[var(--tools-surface)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tools-accent)]">Summary</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--tools-muted)]">{resumeBuilderTool.summary}</p>
            </article>

            <article className="rounded-[1.4rem] border border-[var(--tools-line)] bg-[var(--tools-surface)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tools-accent)]">Templates</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resumeBuilderTool.templates.map((template) => (
                  <span key={template} className="inline-flex rounded-full border border-[var(--tools-line)] px-3 py-1 text-sm text-[var(--tools-copy)]">
                    {template}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[1.4rem] border border-[var(--tools-line)] bg-[var(--tools-surface)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tools-accent)]">Use cases</p>
              <div className="mt-4 grid gap-2">
                {resumeBuilderTool.useCases.map((useCase) => (
                  <p key={useCase} className="text-sm leading-relaxed text-[var(--tools-muted)]">
                    {useCase}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tools-surface">
        <div className="tools-pane-header">
          <div>
            <p className="tools-pane-header__eyebrow">Features</p>
            <h2 className="tools-pane-header__title">What this ATS resume builder supports</h2>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {resumeBuilderTool.featureList.map((feature, index) => (
            <article key={feature.title} className="rounded-[1.4rem] border border-[var(--tools-line)] bg-[var(--tools-surface)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tools-accent)]">0{index + 1}</p>
              <h2 className="mt-2 text-xl tracking-tight text-[var(--tools-copy)]">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--tools-muted)]">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-surface">
        <div className="tools-pane-header">
          <div>
            <p className="tools-pane-header__eyebrow">Workspace</p>
            <h2 className="tools-pane-header__title">Open the protected editor</h2>
          </div>
        </div>

        <Link href="/tools/resume-builder/app" className="tools-command-row">
          <span className="tools-command-row__main">
            <p className="tools-command-row__title">Launch the resume builder editor</p>
            <p className="tools-command-row__copy">
              Open the private editor to manage the library, tune one-page or two-page output, and export the final PDF.
            </p>
          </span>
          <span className="tools-command-row__action">
            Open app
            <ArrowUpRight size={13} weight="bold" />
          </span>
        </Link>
      </section>
    </section>
  )
}
