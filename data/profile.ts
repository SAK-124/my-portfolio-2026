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
  headline: 'Marketing ops, SEO, and the small systems behind them.',
  shortBio:
    'BBA Marketing student at IBA. Digital Marketing Intern at 10Pearls Pakistan — automation, SEO, and the tooling that keeps recurring work moving.',
  intro:
    "I'm a BBA Marketing student at IBA in Karachi, currently interning on the digital marketing team at 10Pearls Pakistan. Most of my time goes into marketing automation and SEO workflows. On the side I build small web tools for myself — usually to fix something annoying.",
  location: 'Karachi, Pakistan',
  availability: 'Open to internships and collaboration',
  currentFocus:
    "Right now most of my time goes into marketing automation, SEO workflows, and the small internal tooling that makes recurring work less painful.",
  focusAreas: [
    {
      title: 'Marketing Automation',
      copy: "Taking the recurring marketing work nobody wants to do twice and turning it into something repeatable.",
    },
    {
      title: 'Technical SEO',
      copy: "The operational side of SEO — monitoring, reporting, and keeping search readiness actually measurable.",
    },
    {
      title: 'Reporting & Tooling',
      copy: "Small internal systems for tracking, coordination, and execution. Less dashboards, more usable tools.",
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
        "Interning on the digital marketing team. I help with marketing automation and SEO workflows — building and maintaining the small tooling behind recurring campaign and search work.",
      bullets: [
        'Contribute to marketing automation workflows used for recurring campaign and outreach work.',
        'Help maintain SEO monitoring and reporting routines.',
        'Write internal workflow notes and docs so things stay easy to hand off.',
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
    "I study marketing at IBA and intern on the digital marketing team at 10Pearls, mostly on automation and SEO workflows. In my own time I build small web tools from scratch — usually because I hit something I didn't want to do by hand again.",
  aboutSections: [
    {
      title: 'What I work on',
      points: [
        "Automation for the recurring marketing work — the stuff nobody wants to do twice.",
        "Technical SEO tooling — monitoring, reporting, and the parts that make search readiness measurable.",
        "Small full-stack web tools I build on the side, mostly to scratch my own itch.",
      ],
    },
    {
      title: 'How I work',
      points: [
        "Figure out the process first. Build the thing around it.",
        "Write it down so someone else can pick it up without a handoff call.",
        "Stay with a problem until it actually works — not just until it ships.",
      ],
    },
  ],
  toolGroups: [
    {
      title: 'Automation and AI',
      items: ['LLM-assisted workflow design', 'Automation scripting', 'Rapid prototyping', 'Task orchestration'],
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
    q: "Who are you?",
    a: "BBA Marketing student at IBA in Karachi, currently interning on the digital marketing team at 10Pearls Pakistan. I work on marketing automation and SEO, and build small web tools in my own time.",
  },
  {
    q: "Where do you study?",
    a: "IBA Karachi. I'm in the BBA Marketing program, graduating in 2026.",
  },
  {
    q: "What are you doing at 10Pearls?",
    a: "I intern on the digital marketing team. Most of my time goes into automation workflows and SEO tooling that the team uses for recurring campaign and search work.",
  },
  {
    q: "What kind of work interests you most?",
    a: "The operational side of marketing — automation, technical SEO, reporting, and the small internal tooling behind day-to-day execution.",
  },
  {
    q: "Are you available for work?",
    a: "Open to internships and collaboration on marketing ops, SEO, or workflow automation. Easiest way to reach me is email or LinkedIn.",
  },
]
