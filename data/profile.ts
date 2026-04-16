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
  headline: 'Saboor Ali Khan builds marketing automation and SEO systems for real execution.',
  shortBio:
    'BBA Marketing student at IBA and Digital Marketing Intern at 10Pearls Pakistan, focused on marketing automation, technical SEO, and execution systems.',
  intro:
    'I am a BBA Marketing student at the Institute of Business Administration (IBA), Karachi, and currently work as a Digital Marketing Intern at 10Pearls Pakistan. My focus is marketing automation, technical SEO, reporting workflows, and practical web-based systems that make execution faster and clearer.',
  location: 'Karachi, Pakistan',
  availability: 'Available for internships, projects, and collaboration',
  currentFocus:
    'My current work sits at the intersection of marketing operations, SEO execution, and workflow automation. I care most about systems that reduce manual work and make team execution more reliable.',
  focusAreas: [
    {
      title: 'Marketing Automation',
      copy: 'I help turn recurring marketing work into repeatable systems so teams spend less time on manual handoffs and more time on actual execution.',
    },
    {
      title: 'Technical SEO',
      copy: 'I am interested in the operational side of SEO, especially crawl readiness, reporting workflows, and the practical systems that support search visibility.',
    },
    {
      title: 'Reporting and Process Systems',
      copy: 'I build simple process layers for reporting, coordination, and execution tracking so work is easier to follow and maintain.',
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
        'Working across marketing automation, SEO operations, and process support for recurring campaign and reporting work.',
      bullets: [
        'Support marketing automation and recurring process improvement inside the digital marketing function.',
        'Contribute to SEO-related operational work and search-focused execution support.',
        'Help structure workflows, reporting steps, and documentation for cleaner team execution.',
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
    'I study marketing at IBA and work on practical digital systems that improve how teams plan, report, and execute. My strongest interests are marketing automation, SEO operations, and using modern web tools to turn repetitive work into dependable workflows.',
  aboutSections: [
    {
      title: 'What I focus on',
      points: [
        'Marketing automation for repeatable campaign and operational work.',
        'Technical SEO support tied to execution, reporting, and process clarity.',
        'Simple web-based systems that make digital work easier to manage.',
      ],
    },
    {
      title: 'How I like to work',
      points: [
        'Start with the process, not the tool.',
        'Document workflows clearly so work stays reusable after handoff.',
        'Keep systems practical enough for real teams to maintain.',
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
    a: 'He works as a Digital Marketing Intern, supporting marketing automation, SEO operations, workflow structure, and reporting-related execution support.',
  },
  {
    q: 'What kind of work does Saboor Ali Khan focus on?',
    a: 'His work is centered on marketing automation, technical SEO, reporting workflows, and practical systems that make digital execution more reliable.',
  },
]
