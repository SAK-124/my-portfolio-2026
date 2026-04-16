export type Project = {
  name: string
  description: string
  stack: string[]
  visibility: 'public' | 'private'
  category: 'professional' | 'public'
  href?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: '10Pearls Outreach Automation Program',
    description:
      'Built internal outreach workflow support for segmentation, template handling, and repeatable campaign operations.',
    stack: ['Marketing Automation', 'Workflow Design', 'Operations Support'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls SEO Monitoring Workflow',
    description:
      'Supported an internal SEO workflow for recurring monitoring, reporting structure, and search-readiness review.',
    stack: ['Technical SEO', 'Reporting Workflows', 'Operations'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls Marketing Operations Orchestrator',
    description:
      'Structured recurring marketing tasks into a clearer execution flow to reduce manual coordination overhead.',
    stack: ['Operations Systems', 'Automation', 'Internal Workflow'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls Kwanzoo Workflow Integrations',
    description:
      'Helped standardize integration-related workflow steps used in campaign-adjacent operational processes.',
    stack: ['Integrations', 'Process Support', 'Private Systems'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: 'AAMD-Portal',
    description:
      'Built a workflow-focused academic portal in TypeScript with an emphasis on operational reliability.',
    stack: ['TypeScript', 'Web App'],
    visibility: 'public',
    category: 'public',
    href: 'https://github.com/SAK-124/AAMD-Portal',
    featured: true,
  },
  {
    name: 'iba-ta-hub',
    description:
      'Created a hub for TA-related process handling and internal coordination.',
    stack: ['TypeScript', 'Operations'],
    visibility: 'public',
    category: 'public',
    href: 'https://github.com/SAK-124/iba-ta-hub',
    featured: true,
  },
]
