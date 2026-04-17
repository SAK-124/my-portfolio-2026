type PageHeaderProps = {
  eyebrow: string
  title: string
  lead?: string
}

export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <div className="pb-10 md:pb-14">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-[22ch] text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl md:text-[3.5rem] md:leading-[0.98] md:tracking-[-0.04em] lg:text-[4rem]">
        {title}
      </h1>
      {lead ? (
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted)] md:mt-6 md:text-[1.05rem]">
          {lead}
        </p>
      ) : null}
    </div>
  )
}

type SectionHeadProps = {
  eyebrow: string
  title: string
  lead?: string
}

export function SectionHead({ eyebrow, title, lead }: SectionHeadProps) {
  return (
    <div className="max-w-[44rem]">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {lead ? <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">{lead}</p> : null}
    </div>
  )
}
