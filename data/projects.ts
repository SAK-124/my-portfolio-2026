export type ProjectLink = {
  label: string
  href: string
  kind: 'repo' | 'live' | 'external'
}

export type ProjectScreenshot = {
  src: string
  alt: string
  caption?: string
}

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string[]
  impact: string[]
  stack: string[]
  visibility: 'public' | 'private'
  category: 'professional' | 'public'
  schemaType: 'CreativeWork' | 'SoftwareApplication'
  keywords: string[]
  links: ProjectLink[]
  screenshots: ProjectScreenshot[]
  relatedTopics: string[]
  seoTitle: string
  seoDescription: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: '10pearls-outreach-automation',
    name: '10Pearls Outreach Automation Program',
    tagline: 'Marketing automation systems for recurring outreach and campaign execution.',
    description:
      'Designed and built the outreach automation program for 10Pearls Pakistan, covering segmentation structure, reusable templates, and the recurring workflow behind campaign execution.',
    longDescription: [
      'This 10Pearls Pakistan project focused on marketing automation for recurring outreach work. I scoped the segmentation logic, structured the reusable messaging system, and documented how campaigns should move from setup to execution.',
      'The end result was a cleaner operating model for repeat outreach - less manual coordination, faster handoff, and clearer process ownership for recurring campaign work.',
    ],
    impact: [
      'Reduced repeat setup work by turning outreach into a reusable operating system.',
      'Created a documented structure that could be repeated across campaign cycles.',
      'Strengthened the link between marketing automation, workflow clarity, and team handoff.',
    ],
    stack: ['Marketing automation', 'Workflow design', 'Segmentation systems'],
    visibility: 'private',
    category: 'professional',
    schemaType: 'CreativeWork',
    keywords: ['10Pearls Pakistan', 'marketing automation', 'outreach automation', 'campaign operations'],
    links: [],
    screenshots: [
      {
        src: '/project-media/10pearls-outreach-automation/cover.svg',
        alt: 'Saboor Ali Khan 10Pearls outreach automation case study cover illustration showing segmentation and recurring campaign workflow.',
      },
    ],
    relatedTopics: ['marketing-automation', 'marketing-operations', 'ai-workflows'],
    seoTitle: '10Pearls Outreach Automation Program | Saboor Ali Khan',
    seoDescription:
      'Case study for the outreach automation program Saboor Ali Khan built at 10Pearls Pakistan, focused on marketing automation, segmentation, and repeatable campaign operations.',
    featured: true,
  },
  {
    slug: '10pearls-seo-monitoring-workflow',
    name: '10Pearls SEO Monitoring Workflow',
    tagline: 'Operational technical SEO systems for recurring search monitoring.',
    description:
      'Built an internal SEO monitoring workflow for 10Pearls Pakistan, combining reporting structure, recurring review cadence, and search-readiness tracking.',
    longDescription: [
      'This project sat on the technical SEO side of marketing operations. I structured the reporting flow, recurring checks, and documentation so search-readiness work stayed measurable over time.',
      'Instead of treating SEO as one-off fixes, the workflow made it easier to review, monitor, and repeat the important operational steps behind search performance.',
    ],
    impact: [
      'Turned technical SEO work into a repeatable workflow rather than ad hoc review.',
      'Created a clearer reporting structure for recurring search-readiness checks.',
      'Supported day-to-day visibility into what needed attention and when.',
    ],
    stack: ['Technical SEO', 'Reporting systems', 'Operational workflows'],
    visibility: 'private',
    category: 'professional',
    schemaType: 'CreativeWork',
    keywords: ['technical SEO', 'SEO workflow', '10Pearls Pakistan', 'search monitoring'],
    links: [],
    screenshots: [
      {
        src: '/project-media/10pearls-seo-monitoring-workflow/saboor-ali-khan-10pearls-seo-monitoring-workflow.png',
        alt: 'Saboor Ali Khan 10Pearls SEO monitoring workflow case-study page screenshot — technical SEO reporting and search-readiness routines.',
        caption:
          'The public case-study page documents the reporting cadence, workflow structure, and search-readiness framing without exposing internal company data.',
      },
    ],
    relatedTopics: ['technical-seo', 'marketing-operations', 'ai-workflows'],
    seoTitle: '10Pearls SEO Monitoring Workflow | Saboor Ali Khan',
    seoDescription:
      'Technical SEO case study by Saboor Ali Khan on the SEO monitoring and reporting workflow built for 10Pearls Pakistan.',
    featured: true,
  },
  {
    slug: '10pearls-marketing-operations-orchestrator',
    name: '10Pearls Marketing Operations Orchestrator',
    tagline: 'Workflow orchestration for recurring marketing work across teams.',
    description:
      'Designed and built an operations orchestration system for 10Pearls Pakistan that grouped recurring marketing work into a more structured execution flow.',
    longDescription: [
      'This project focused on marketing operations rather than a single campaign or deliverable. I identified process gaps, defined the workflow architecture, and turned recurring coordination work into a more usable operating system.',
      'The system was designed to reduce manual overhead and make recurring work easier to track, hand off, and repeat with less friction.',
    ],
    impact: [
      'Reduced manual coordination overhead in recurring marketing operations.',
      'Created a clearer execution structure for repeat work across the team.',
      'Linked process design, tooling, and day-to-day operational reliability.',
    ],
    stack: ['Operations systems', 'Workflow automation', 'Process design'],
    visibility: 'private',
    category: 'professional',
    schemaType: 'CreativeWork',
    keywords: ['marketing operations', 'workflow automation', '10Pearls Pakistan', 'process design'],
    links: [],
    screenshots: [
      {
        src: '/project-media/10pearls-marketing-operations-orchestrator/cover.svg',
        alt: 'Saboor Ali Khan 10Pearls marketing operations orchestrator case-study cover — workflow design and recurring execution system.',
      },
    ],
    relatedTopics: ['marketing-operations', 'marketing-automation', 'ai-workflows'],
    seoTitle: '10Pearls Marketing Operations Orchestrator | Saboor Ali Khan',
    seoDescription:
      'Marketing operations case study by Saboor Ali Khan on the workflow orchestration system built for 10Pearls Pakistan.',
    featured: true,
  },
  {
    slug: '10pearls-kwanzoo-workflow-integrations',
    name: '10Pearls Kwanzoo Workflow Integrations',
    tagline: 'Workflow integrations connecting campaign tooling with daily execution.',
    description:
      'Scoped and standardized workflow integrations between Kwanzoo and 10Pearls campaign operations to make campaign-adjacent work more repeatable.',
    longDescription: [
      'This project sat at the intersection of tooling and operations. I mapped out the workflow requirements, built the process logic, and documented the operating steps that connected Kwanzoo to campaign-adjacent work.',
      'The focus was not just connecting systems, but turning the integration into something practical and repeatable for the marketing team.',
    ],
    impact: [
      'Standardized campaign-adjacent workflow steps around Kwanzoo integrations.',
      'Reduced ambiguity in how the connected workflow should run.',
      'Improved repeatability for integration-dependent execution work.',
    ],
    stack: ['Kwanzoo', 'Integration design', 'Campaign operations'],
    visibility: 'private',
    category: 'professional',
    schemaType: 'CreativeWork',
    keywords: ['Kwanzoo', 'workflow integrations', '10Pearls Pakistan', 'campaign operations'],
    links: [],
    screenshots: [
      {
        src: '/project-media/10pearls-kwanzoo-workflow-integrations/cover.svg',
        alt: 'Saboor Ali Khan 10Pearls Kwanzoo workflow integrations case-study cover — marketing automation tooling and ABM workflow connections.',
      },
    ],
    relatedTopics: ['marketing-automation', 'marketing-operations'],
    seoTitle: '10Pearls Kwanzoo Workflow Integrations | Saboor Ali Khan',
    seoDescription:
      'Workflow integration case study by Saboor Ali Khan on connecting Kwanzoo with recurring marketing operations at 10Pearls Pakistan.',
    featured: true,
  },
  {
    slug: 'my-portfolio-2026',
    name: 'my-portfolio-2026',
    tagline: 'A personal portfolio built to act like a searchable entity hub, not just a static resume.',
    description:
      'Built and shipped my own portfolio in Next.js as a living hub for projects, experience, tools, and public search visibility around Saboor Ali Khan.',
    longDescription: [
      'This project is my own portfolio website. I designed it to function as a clear public identity layer for Saboor Ali Khan, connecting marketing automation, technical SEO, AI workflows, GitHub work, and public case studies in one place.',
      'Beyond the visuals, the site is built with a strong metadata, schema, sitemap, and internal-linking foundation so it can compete better for branded searches and topic-adjacent discovery.',
    ],
    impact: [
      'Created a single public hub that ties together portfolio, GitHub, LinkedIn, tools, and project pages.',
      'Gave me a structured space to publish case studies, topic pages, and public tools.',
      'Turned the portfolio itself into a product that can support both recruiting and SEO goals.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO architecture'],
    visibility: 'public',
    category: 'public',
    schemaType: 'SoftwareApplication',
    keywords: ['Saboor Ali Khan portfolio', 'Next.js portfolio', 'SEO portfolio', 'workflow tools'],
    links: [
      { label: 'View live site', href: 'https://sabooralikhan.com', kind: 'live' },
      { label: 'Open repository', href: 'https://github.com/SAK-124/my-portfolio-2026', kind: 'repo' },
    ],
    screenshots: [
      {
        src: '/project-media/my-portfolio-2026/saboor-ali-khan-portfolio-homepage.png',
        alt: 'Saboor Ali Khan portfolio homepage screenshot — hero, experience timeline, projects, and public tools entry points at sabooralikhan.com.',
        caption:
          'The portfolio home page is designed to connect branded search, project discovery, and the public tools surface in one place.',
      },
      {
        src: '/project-media/my-portfolio-2026/saboor-ali-khan-portfolio-tools.png',
        alt: 'Saboor Ali Khan portfolio tools workspace screenshot — public resume builder and workflow utilities surface at sabooralikhan.com/tools.',
        caption: 'The site includes public tools, portfolio pages, and a resume builder workspace.',
      },
    ],
    relatedTopics: ['marketing-automation', 'technical-seo', 'ai-workflows'],
    seoTitle: 'my-portfolio-2026 | Saboor Ali Khan',
    seoDescription:
      'Portfolio project by Saboor Ali Khan built in Next.js, combining public case studies, workflow tools, resume builder pages, and SEO-focused site architecture.',
    featured: true,
  },
  {
    slug: 'iba-ta-hub',
    name: 'IBA TA Hub',
    tagline: 'A TA coordination hub at IBA Karachi that grew out of an earlier AAMD Portal workflow build.',
    description:
      'Designed and built a coordination hub for TA process management at IBA Karachi, carrying forward what worked in the earlier AAMD Portal build and refining it into a more focused internal workflow.',
    longDescription: [
      'IBA TA Hub was created to organize teaching-assistant process work at IBA Karachi. I conceived the system, built the implementation, and deployed it with a focus on practical coordination rather than abstract features.',
      'Before this version, I had already explored the workflow through an earlier AAMD Portal build. The later IBA TA Hub direction kept the useful attendance and operations thinking, then narrowed the product into a more focused coordination system.',
    ],
    impact: [
      'Created a clearer digital workflow for TA process coordination at IBA Karachi.',
      'Folded lessons from the earlier AAMD Portal version into a cleaner, more focused internal product.',
      'Showed end-to-end ownership across planning, implementation, and shipping.',
      'Connected educational administration with usable internal tooling.',
    ],
    stack: ['TypeScript', 'Internal tooling', 'Workflow systems'],
    visibility: 'public',
    category: 'public',
    schemaType: 'SoftwareApplication',
    keywords: ['IBA TA Hub', 'AAMD Portal', 'IBA Karachi tool', 'teaching assistant workflow', 'Saboor Ali Khan projects'],
    links: [
      { label: 'Open current repository', href: 'https://github.com/SAK-124/iba-ta-hub', kind: 'repo' },
      { label: 'View earlier AAMD Portal version', href: 'https://github.com/SAK-124/AAMD-Portal', kind: 'repo' },
    ],
    screenshots: [
      {
        src: '/project-media/iba-ta-hub/saboor-ali-khan-iba-aamd-portal.png',
        alt: 'Saboor Ali Khan IBA AAMD Portal screenshot — early academic workflow interface that informed the later IBA TA Hub coordination system.',
        caption:
          'An earlier AAMD Portal iteration that shaped the attendance and workflow thinking later folded into IBA TA Hub.',
      },
      {
        src: '/project-media/iba-ta-hub/cover.svg',
        alt: 'Saboor Ali Khan IBA TA Hub project cover — teaching-assistant process coordination tool for IBA Karachi.',
      },
    ],
    relatedTopics: ['marketing-operations', 'ai-workflows'],
    seoTitle: 'IBA TA Hub | Saboor Ali Khan',
    seoDescription:
      'IBA TA Hub is a workflow tool by Saboor Ali Khan for TA process management at IBA Karachi, built on lessons from an earlier AAMD Portal iteration.',
    featured: true,
  },
  {
    slug: 'ultimate-tictactoe-android',
    name: 'ultimate-tictactoe-android',
    tagline: 'A live multiplayer Android game built with Jetpack Compose and Firebase.',
    description:
      'Built a neon-styled Ultimate Tic-Tac-Toe Android app with live multiplayer, room-based play, rematches, and Firebase-backed game state.',
    longDescription: [
      'This project shows a different side of my work - product design and interaction design in a consumer-style experience. The app uses Jetpack Compose and Firebase to support live 1v1 play, rematches, and room-based sessions.',
      'Even though it is a game project, the same themes appear here too: state management, user flow clarity, and making the product feel stable during real use.',
    ],
    impact: [
      'Demonstrated cross-functional product thinking outside my usual workflow-tool niche.',
      'Handled real-time state, multiplayer flow, and user feedback loops in one app.',
      'Added visible variety to my public portfolio while still showing systems thinking.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    visibility: 'public',
    category: 'public',
    schemaType: 'SoftwareApplication',
    keywords: ['Ultimate Tic-Tac-Toe Android', 'Kotlin Firebase app', 'Saboor Ali Khan Android project'],
    links: [{ label: 'Open repository', href: 'https://github.com/SAK-124/ultimate-tictactoe-android', kind: 'repo' }],
    screenshots: [
      {
        src: '/project-media/ultimate-tictactoe-android/cover.svg',
        alt: 'Saboor Ali Khan ultimate-tictactoe-android project cover — multiplayer Android app built with Kotlin, Jetpack Compose, and Firebase.',
      },
    ],
    relatedTopics: ['ai-workflows'],
    seoTitle: 'ultimate-tictactoe-android | Saboor Ali Khan',
    seoDescription:
      'Android project by Saboor Ali Khan featuring a live multiplayer Ultimate Tic-Tac-Toe app built with Kotlin, Jetpack Compose, and Firebase.',
    featured: true,
  },
  {
    slug: 'corporate-service-website-demo',
    name: 'corporate-service-website-demo',
    tagline: 'A premium B2B advisory website demo with a polished client-facing presentation.',
    description:
      'Built a responsive corporate service website demo for a premium advisory brand, covering multiple pages, contact flow, and clean service positioning.',
    longDescription: [
      'This project is a presentation-focused website build rather than an internal tool. It is useful in the portfolio because it shows that I can also handle structured marketing sites, page hierarchy, and a cleaner service-led narrative.',
      'The implementation uses a lightweight front-end stack and a working contact flow, which makes it a good example of practical website delivery rather than only concept design.',
    ],
    impact: [
      'Shows polished front-end execution for a service website format.',
      'Adds a more client-facing website example to the portfolio mix.',
      'Demonstrates structure, hierarchy, and conversion-aware page design.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    visibility: 'public',
    category: 'public',
    schemaType: 'CreativeWork',
    keywords: ['corporate website demo', 'B2B service website', 'Saboor Ali Khan front-end project'],
    links: [{ label: 'Open repository', href: 'https://github.com/SAK-124/corporate-service-website-demo', kind: 'repo' }],
    screenshots: [
      {
        src: '/project-media/corporate-service-website-demo/cover.svg',
        alt: 'Saboor Ali Khan corporate-service-website-demo project cover — enterprise-style Next.js marketing site demo.',
      },
    ],
    relatedTopics: ['marketing-operations'],
    seoTitle: 'corporate-service-website-demo | Saboor Ali Khan',
    seoDescription:
      'A premium B2B advisory website demo by Saboor Ali Khan, showing multi-page front-end work, contact flow, and service-site structure.',
    featured: true,
  },
  {
    slug: 'nebula-stack-enterprise-tech',
    name: 'nebula-stack-enterprise-tech',
    tagline: 'A cinematic enterprise-tech website demo with multi-page product storytelling.',
    description:
      'Built a high-performance enterprise-tech website demo with React, TypeScript, routing, and a Supabase-backed blog layer.',
    longDescription: [
      'NebulaStack is a more ambitious website demo that combines product storytelling, front-end structure, and content-driven pages. It includes multiple sections, routed pages, and a blog layer backed by Supabase.',
      'The project matters in the portfolio because it shows stronger visual ambition while still keeping the structure coherent and deployable.',
    ],
    impact: [
      'Shows higher-end visual execution in a multi-page web product format.',
      'Balances branding, content architecture, and technical implementation.',
      'Adds range beyond purely internal tools and workflow products.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase'],
    visibility: 'public',
    category: 'public',
    schemaType: 'CreativeWork',
    keywords: ['enterprise tech website', 'React TypeScript site', 'Saboor Ali Khan project'],
    links: [{ label: 'Open repository', href: 'https://github.com/SAK-124/nebula-stack-enterprise-tech', kind: 'repo' }],
    screenshots: [
      {
        src: '/project-media/nebula-stack-enterprise-tech/cover.svg',
        alt: 'Saboor Ali Khan nebula-stack-enterprise-tech project cover — enterprise-tech product website built with React, TypeScript, and Supabase.',
      },
    ],
    relatedTopics: ['ai-workflows'],
    seoTitle: 'nebula-stack-enterprise-tech | Saboor Ali Khan',
    seoDescription:
      'Enterprise-tech website demo by Saboor Ali Khan built with React, TypeScript, and Supabase-backed content pages.',
    featured: true,
  },
  {
    slug: 'voxel-parkour-shadow-runs',
    name: 'voxel-parkour-shadow-runs',
    tagline: 'A browser-based parkour prototype built around flow, collapse, and dynamic state.',
    description:
      'Built a forward-running voxel parkour prototype in the browser, focused on dynamic segment assembly, stability systems, and fail-state design.',
    longDescription: [
      'This project is a more experimental browser game prototype, but it still shows the same systems-first approach that appears in my workflow tools. The game logic centers on movement flow, segment behavior, checkpoints, and collapse-driven failure states.',
      'It broadens the portfolio by showing how I think about mechanics, state, and interaction when the output is playful rather than operational.',
    ],
    impact: [
      'Demonstrates systems thinking in a browser-based interactive prototype.',
      'Shows range in front-end experimentation and gameplay logic.',
      'Adds a distinctive visual and technical contrast to the portfolio.',
    ],
    stack: ['JavaScript', 'Browser game prototype', 'Gameplay systems'],
    visibility: 'public',
    category: 'public',
    schemaType: 'SoftwareApplication',
    keywords: ['voxel parkour game', 'browser game prototype', 'Saboor Ali Khan JavaScript project'],
    links: [{ label: 'Open repository', href: 'https://github.com/SAK-124/voxel-parkour-shadow-runs', kind: 'repo' }],
    screenshots: [
      {
        src: '/project-media/voxel-parkour-shadow-runs/cover.svg',
        alt: 'Saboor Ali Khan voxel-parkour-shadow-runs project cover — voxel-style parkour runner built as a personal game-development experiment.',
      },
    ],
    relatedTopics: ['ai-workflows'],
    seoTitle: 'voxel-parkour-shadow-runs | Saboor Ali Khan',
    seoDescription:
      'Browser-based voxel parkour prototype by Saboor Ali Khan, built in JavaScript with dynamic level systems and collapse-driven gameplay.',
    featured: true,
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export const featuredProjects = projects.filter((project) => project.featured)
export const publicProjects = projects.filter((project) => project.category === 'public')
export const professionalProjects = projects.filter((project) => project.category === 'professional')
