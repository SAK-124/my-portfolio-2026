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
      'Designed and built the outreach automation program for 10Pearls\u2019 digital marketing function. Independently scoped the segmentation architecture, built the template system, and documented the complete workflow for ongoing campaign operations.',
    stack: ['Marketing Automation', 'Workflow Design', 'Segmentation Systems'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls SEO Monitoring Workflow',
    description:
      'Designed and built an internal SEO monitoring workflow from the ground up. Created the reporting structure, established recurring review cadences, and built the operational systems used for tracking search readiness.',
    stack: ['Technical SEO', 'Reporting Systems', 'Operational Workflows'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls Marketing Operations Orchestrator',
    description:
      'Designed and built an operations orchestration system that consolidates recurring marketing tasks into a structured execution flow. Independently identified process gaps, designed the workflow architecture, and implemented the system that eliminated manual coordination overhead.',
    stack: ['Operations Systems', 'Workflow Automation', 'Process Design'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: '10Pearls Kwanzoo Workflow Integrations',
    description:
      'Designed and built workflow integrations connecting Kwanzoo with 10Pearls\u2019 campaign operations. Independently scoped integration requirements, built the process logic, and standardized the operational steps used across campaign-adjacent workflows.',
    stack: ['Kwanzoo', 'Integration Design', 'Campaign Operations'],
    visibility: 'private',
    category: 'professional',
    featured: true,
  },
  {
    name: 'AAMD-Portal',
    description:
      'Independently designed, built, and deployed an academic workflow portal in TypeScript. Sole author \u2014 from initial architecture through final implementation. Focused on operational reliability, clean data flow, and practical usability.',
    stack: ['TypeScript', 'Next.js', 'Web App'],
    visibility: 'public',
    category: 'public',
    href: 'https://github.com/SAK-124/AAMD-Portal',
    featured: true,
  },
  {
    name: 'iba-ta-hub',
    description:
      'Independently designed, built, and deployed a coordination hub for TA process management at IBA. Sole author \u2014 conceived the system, built the full implementation, and deployed it end-to-end.',
    stack: ['TypeScript', 'Process Systems', 'Internal Tooling'],
    visibility: 'public',
    category: 'public',
    href: 'https://github.com/SAK-124/iba-ta-hub',
    featured: true,
  },
]
