export type TopicSection = {
  title: string
  paragraphs: string[]
}

export type TopicPage = {
  slug: 'marketing-automation' | 'technical-seo' | 'marketing-operations' | 'ai-workflows'
  path: string
  eyebrow: string
  title: string
  lead: string
  description: string
  keywords: string[]
  seoTitle: string
  seoDescription: string
  sections: TopicSection[]
  relatedProjectSlugs: string[]
  relatedExperienceSlugs: string[]
}

export const topicPages: TopicPage[] = [
  {
    slug: 'marketing-automation',
    path: '/marketing-automation',
    eyebrow: 'Topic',
    title: 'Marketing automation',
    lead:
      'Marketing automation is one of the main threads running through my work at 10Pearls Pakistan and across the workflow tools I build for myself.',
    description:
      'Saboor Ali Khan works on marketing automation systems, outreach workflows, campaign operations, and repeatable execution structures.',
    keywords: ['Saboor marketing automation', 'marketing automation Pakistan', '10Pearls automation'],
    seoTitle: 'Marketing Automation | Saboor Ali Khan',
    seoDescription:
      'Public page about Saboor Ali Khan and his work in marketing automation, outreach workflows, campaign systems, and repeatable execution.',
    sections: [
      {
        title: 'What marketing automation means in my work',
        paragraphs: [
          'For me, marketing automation is not only about sending messages faster. It is about turning repeat work into a clearer operating system so campaigns, outreach, and recurring follow-up can run with less manual setup.',
          'That usually means workflow design, reusable structure, documentation, and enough tooling to keep the process practical over time.',
        ],
      },
      {
        title: 'Where it shows up',
        paragraphs: [
          'This theme appears most clearly in my 10Pearls Pakistan case studies, especially around outreach automation and marketing operations orchestration.',
          'It also shapes how I build workflow tools in public projects: the goal is usually to reduce friction, structure repeated work, and make the process easier to hand off.',
        ],
      },
    ],
    relatedProjectSlugs: [
      '10pearls-outreach-automation',
      '10pearls-marketing-operations-orchestrator',
      'my-portfolio-2026',
    ],
    relatedExperienceSlugs: ['10pearls-pakistan'],
  },
  {
    slug: 'technical-seo',
    path: '/technical-seo',
    eyebrow: 'Topic',
    title: 'Technical SEO',
    lead:
      'Technical SEO in my work is closely tied to monitoring, reporting, search-readiness routines, and the recurring systems behind search execution.',
    description:
      'Saboor Ali Khan works on technical SEO workflows, reporting systems, and search-readiness operations tied to recurring execution.',
    keywords: ['Saboor technical SEO', 'technical SEO Pakistan', '10Pearls SEO'],
    seoTitle: 'Technical SEO | Saboor Ali Khan',
    seoDescription:
      'Public page about Saboor Ali Khan and his technical SEO work across monitoring, reporting, and search-readiness operations.',
    sections: [
      {
        title: 'How I approach technical SEO',
        paragraphs: [
          'I am most interested in the operational side of technical SEO: recurring checks, reporting, issue visibility, and the workflows that make search-readiness measurable over time.',
          'That means I care about the systems around SEO, not just isolated fixes.',
        ],
      },
      {
        title: 'Why this matters',
        paragraphs: [
          'When technical SEO is treated as a repeatable process, teams can see what changed, what needs attention, and how to keep search work moving without constant reinvention.',
          'That is the lens I bring to SEO-related projects and internal tooling.',
        ],
      },
    ],
    relatedProjectSlugs: ['10pearls-seo-monitoring-workflow', 'my-portfolio-2026'],
    relatedExperienceSlugs: ['10pearls-pakistan'],
  },
  {
    slug: 'marketing-operations',
    path: '/marketing-operations',
    eyebrow: 'Topic',
    title: 'Marketing operations',
    lead:
      'Marketing operations is the thread that ties together my interest in systems, execution flow, reporting, and the behind-the-scenes work that keeps teams moving.',
    description:
      'Saboor Ali Khan works on marketing operations systems, workflow design, repeatable execution, and the tooling behind recurring team work.',
    keywords: ['Saboor marketing operations', 'marketing operations Pakistan', 'workflow systems'],
    seoTitle: 'Marketing Operations | Saboor Ali Khan',
    seoDescription:
      'Public page about Saboor Ali Khan and his work in marketing operations, workflow design, reporting systems, and execution tooling.',
    sections: [
      {
        title: 'What draws me to marketing operations',
        paragraphs: [
          'I like the part of marketing that people usually do not see first: how the work gets organized, repeated, tracked, and handed off when a team has to execute again and again.',
          'That is why I am drawn to workflow systems, reporting structures, internal tooling, and the routines that reduce operational friction.',
        ],
      },
      {
        title: 'How it appears across projects',
        paragraphs: [
          'Whether I am working on a 10Pearls case study, an academic portal, or a portfolio tool, I tend to focus on usability, repeatability, and making the system easier to run in practice.',
        ],
      },
    ],
    relatedProjectSlugs: [
      '10pearls-marketing-operations-orchestrator',
      '10pearls-outreach-automation',
      'iba-ta-hub',
    ],
    relatedExperienceSlugs: ['10pearls-pakistan', 'procter-and-gamble'],
  },
  {
    slug: 'ai-workflows',
    path: '/ai-workflows',
    eyebrow: 'Topic',
    title: 'AI workflows',
    lead:
      'I use AI workflows where they actually help - usually in research, workflow design, internal tooling, and reducing repeat manual work.',
    description:
      'Saboor Ali Khan uses AI workflows and LLM-assisted workflow design to support automation, internal tooling, and execution systems.',
    keywords: ['Saboor AI', 'Saboor AI workflows', 'LLM workflow design', 'AI workflow tools'],
    seoTitle: 'AI Workflows | Saboor Ali Khan',
    seoDescription:
      'Public page about Saboor Ali Khan and how he uses AI workflows, LLM-assisted workflow design, and internal tools to reduce repeat work.',
    sections: [
      {
        title: 'What AI workflows mean here',
        paragraphs: [
          'I do not treat AI as a generic label. In my work, AI workflows usually mean LLM-assisted workflow design, fast research support, or tooling that helps reduce repetitive work inside a real process.',
          'The value is in making the workflow more useful, not in forcing AI into places where it is not needed.',
        ],
      },
      {
        title: 'How it connects to the rest of the portfolio',
        paragraphs: [
          'AI workflows fit naturally with marketing automation, technical SEO operations, and workflow tools because all of them benefit from clearer systems, better prompts, and less repeated manual effort.',
        ],
      },
    ],
    relatedProjectSlugs: [
      '10pearls-outreach-automation',
      '10pearls-marketing-operations-orchestrator',
      'my-portfolio-2026',
      'iba-ta-hub',
    ],
    relatedExperienceSlugs: ['10pearls-pakistan'],
  },
]

export function getTopicPage(slug: string) {
  return topicPages.find((page) => page.slug === slug)
}
