export type ExperienceEntry = {
  title: string
  organization: string
  startLabel: string
  endLabel: string
  location: string
  summary: string
  bullets: string[]
}

export type EducationEntry = {
  institution: string
  credential: string
  startLabel: string
  endLabel: string
  notes?: string[]
}

export type ToolGroup = {
  title: string
  items: string[]
}

export const profile = {
  name: 'Saboor Ali Khan',
  headline: 'I build marketing automation and SEO systems for real execution.',
  shortBio:
    'BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan, focused on marketing automation, technical SEO, and execution systems.',
  intro:
    'I am a BBA Marketing student at the Institute of Business Administration (IBA), Karachi, and work as a Digital Marketing Intern at 10Pearls Pakistan, where I independently design and build the automation systems, SEO workflows, and operational infrastructure used by the marketing team. Outside of work, I build my own web tools from scratch.',
  location: 'Karachi, Pakistan',
  availability: 'Open to internships, projects, and collaboration',
  currentFocus:
    'My current work sits at the intersection of marketing operations, SEO execution, and workflow automation. I focus on systems that reduce manual work and make execution more reliable.',
  focusAreas: [
    {
      title: 'Marketing Automation',
      copy: 'I turn recurring marketing work into repeatable systems so there is less manual handoff and less process friction.',
    },
    {
      title: 'Technical SEO',
      copy: 'I focus on the operational side of SEO, especially crawl readiness, reporting workflows, and the systems behind search visibility.',
    },
    {
      title: 'Reporting and Process Systems',
      copy: 'I build simple reporting, coordination, and execution systems so work is easier to track and maintain.',
    },
  ],
  experience: [
    {
      title: 'Digital Marketing Intern',
      organization: '10Pearls Pakistan',
      startLabel: 'March 2026',
      endLabel: 'Present',
      location: 'Hybrid',
      summary:
        'Design and build marketing automation systems, SEO monitoring workflows, and operational infrastructure for the digital marketing function at 10Pearls.',
      bullets: [
        'Design and build marketing automation systems and recurring process workflows for the digital marketing function.',
        'Build and own SEO monitoring workflows and search-focused operational systems.',
        'Design workflow documentation, reporting structures, and execution infrastructure used by the marketing team.',
      ],
    },
    {
      title: 'Brand Ambassador',
      organization: 'P&G',
      startLabel: '2025',
      endLabel: '2025',
      location: 'IBA Career Fair',
      summary: 'Supported recruitment efforts during the IBA Career Fair.',
      bullets: [
        'Represented P&G during campus-facing recruitment activity.',
        'Helped coordinate candidate-facing communication during the event.',
      ],
    },
  ] satisfies ExperienceEntry[],
  education: [
    {
      institution: 'Institute of Business Administration',
      credential: 'Bachelor of Business Administration (BBA), Marketing',
      startLabel: 'August 2022',
      endLabel: 'August 2026',
      notes: ['IBA, Karachi'],
    },
    {
      institution: 'The International School',
      credential: "Associate's degree in Business, Management, Marketing, and related support studies",
      startLabel: '2019',
      endLabel: '2021',
    },
  ] satisfies EducationEntry[],
  certifications: [
    {
      name: 'Google Analytics Certification',
      issuer: 'Google Skillshop',
      year: '2026',
      fileHint: 'Google Analytics Certification • Saboor Khan • Skillshop.pdf',
    },
  ],
  aboutLead:
    'I study marketing at IBA and independently design and build digital systems — from marketing automation and SEO workflows to full-stack operational web tools. At 10Pearls, I own the systems I create. My personal projects are built entirely by me, from architecture through deployment.',
  aboutSections: [
    {
      title: 'What I build',
      points: [
        'Marketing automation systems for repeatable campaign and operational work — designed and built entirely by me.',
        'Technical SEO workflows focused on execution, reporting, and measurable search readiness.',
        'Full-stack web tools I architect and ship independently, from requirements through deployment.',
      ],
    },
    {
      title: 'How I work',
      points: [
        'Start with the process, then design the system around it.',
        'Document clearly so what I build is maintainable beyond handoff.',
        'Own outcomes, not just tasks — from initial scope to working implementation.',
      ],
    },
  ],
  toolGroups: [
    {
      title: 'Automation and AI',
      items: ['Codex', 'Claude Code', 'Cursor', 'Lovable'],
    },
    {
      title: 'SEO and analytics',
      items: ['Google Analytics', 'Technical SEO workflows', 'Reporting systems'],
    },
    {
      title: 'Web product tools',
      items: ['TypeScript', 'Next.js', 'Workflow-focused web apps'],
    },
  ] satisfies ToolGroup[],
}

export const faq = [
  {
    q: 'Who is Saboor Ali Khan?',
    a: 'Saboor Ali Khan is a BBA Marketing student at IBA, Karachi, and a Digital Marketing Intern at 10Pearls Pakistan with a focus on marketing automation, technical SEO, and execution systems.',
  },
  {
    q: 'Where does Saboor Ali Khan study?',
    a: 'He studies at the Institute of Business Administration (IBA), where he is completing a Bachelor of Business Administration in Marketing.',
  },
  {
    q: 'What does Saboor Ali Khan do at 10Pearls?',
    a: 'At 10Pearls, he independently designs and builds marketing automation systems, SEO monitoring workflows, and operational infrastructure for the digital marketing function. He owns the systems he creates end-to-end.',
  },
  {
    q: 'What kind of work does Saboor Ali Khan focus on?',
    a: 'His work is centered on marketing automation, technical SEO, reporting workflows, and practical systems that make digital execution more reliable.',
  },
]
