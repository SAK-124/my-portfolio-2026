export type BlogSection = {
  heading?: string
  paragraphs: string[]
  list?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  readingTimeMinutes: number
  wordCount: number
  category: 'Marketing Automation' | 'Technical SEO' | 'AI Workflows' | 'Marketing Operations' | 'Tools'
  keywords: string[]
  coverImage?: string
  lead: string
  sections: BlogSection[]
  status: 'draft' | 'published' | 'hidden'
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'marketing-automation-as-an-iba-marketing-student',
    title:
      'How I Think About Marketing Automation as a BBA Marketing Student at IBA Karachi',
    description:
      'Saboor Ali Khan on how a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan actually uses marketing automation in practice.',
    datePublished: '2026-04-10',
    readingTimeMinutes: 6,
    wordCount: 820,
    category: 'Marketing Automation',
    keywords: [
      'Saboor Ali Khan marketing automation',
      'IBA Karachi marketing',
      'marketing automation Pakistan',
      'BBA marketing student automation',
      '10Pearls Pakistan marketing intern',
    ],
    status: 'published',
    lead: 'Marketing automation is easy to learn as a label and hard to learn as a practice. Two years into a BBA Marketing at IBA Karachi and a digital marketing internship at 10Pearls Pakistan, the gap between the two has shaped how I actually build.',
    sections: [
      {
        heading: 'The version of marketing automation people usually learn first',
        paragraphs: [
          'In most marketing coursework, automation is introduced as a tool story. You learn HubSpot workflows, basic email sequences, and the idea that automation equals "send messages faster." That framing is useful for exams but it leaves out the part that actually matters on a real team: what breaks when the volume scales.',
          'At IBA, the marketing curriculum gave me the customer-journey lens and the funnel vocabulary. What it did not give me was an operating model — the idea that automation is an internal system, not a send button.',
        ],
      },
      {
        heading: 'What changed at 10Pearls',
        paragraphs: [
          'Interning on the 10Pearls Pakistan digital marketing team reframed the whole thing. The teams I work with treat campaigns as recurring operational routines — not one-off launches — which means the value of automation shifts from speed to repeatability.',
          'That reframing is why most of what I do now is workflow design first, tool configuration second. Before any automation gets built, the process needs to be clear: what are the inputs, what is the trigger, where does the human review happen, where does the system hand off to the next step.',
        ],
      },
      {
        heading: 'The three questions I ask before touching a tool',
        paragraphs: [
          'These are borrowed from conversations with more senior marketers at 10Pearls, stress-tested in my own projects, and now the first thing I write down before building anything.',
        ],
        list: [
          'What is the repeat unit of work here? If a team has to do this again and again, what exactly is the smallest thing that repeats?',
          'Where does friction compound? Automation is leverage. Leverage on friction is good. Leverage on a broken process is worse than doing it manually.',
          'Who owns the output when it breaks? If no one owns the recovery path, the automation is a ticking liability.',
        ],
      },
      {
        heading: 'How this shows up in my portfolio work',
        paragraphs: [
          'The 10Pearls Outreach Automation Program and the Marketing Operations Orchestrator both started from the same pattern — a recurring operational task that kept getting rebuilt by hand. In each case, the win was not "we sent more messages." It was "the next team member can pick this up without a two-hour handoff."',
          'The same principle shapes the public work. The resume builder I maintain at sabooralikhan.com/tools/resume-builder is essentially an automation for the single most repetitive task every applicant does — rewriting the same content in slightly different formats — packaged as a small product.',
        ],
      },
      {
        heading: 'What I would tell another IBA marketing student',
        paragraphs: [
          'Learn HubSpot and n8n early. Read a few real operating-procedure documents from any marketing team that publishes them. Build one tiny automation for yourself — something like auto-clipping articles into a reading queue — just to internalize how messy the edge cases get.',
          'And the biggest one: resist the urge to build a Rube Goldberg machine. The best marketing automation at your first job will almost always be the one with the fewest moving parts.',
        ],
      },
      {
        heading: 'Where to go next',
        paragraphs: [
          'If this matches how you think about marketing, the topic pages on this site have the longer version: /marketing-automation, /marketing-operations, and /technical-seo. The project case studies for the 10Pearls work show how the same reasoning plays out in practice.',
        ],
      },
    ],
  },
  {
    slug: 'technical-seo-monitoring-workflow',
    title: 'Technical SEO Monitoring: A Practical Operating Model That Does Not Rot',
    description:
      'A field-tested operating model for technical SEO monitoring and reporting, based on the 10Pearls workflow Saboor Ali Khan maintains.',
    datePublished: '2026-04-05',
    readingTimeMinutes: 7,
    wordCount: 910,
    category: 'Technical SEO',
    keywords: [
      'technical SEO monitoring',
      'SEO workflow Pakistan',
      'Saboor Ali Khan technical SEO',
      '10Pearls SEO',
      'SEO reporting system',
    ],
    status: 'hidden',
    lead: 'Most technical SEO dashboards go stale within two months. This is the operating model I use to keep the monitoring layer alive instead of slowly rotting into a screenshot that nobody opens.',
    sections: [
      {
        heading: 'Why technical SEO monitoring rots',
        paragraphs: [
          'A typical technical SEO setup starts with enthusiasm. Someone wires up Ahrefs, adds a few GSC exports, builds a Looker Studio board, and shares it in a Slack channel. Two months later the board still loads but nobody clicks on it, because the signal-to-work ratio has collapsed: the team sees a red bar, cannot tell whether it is a real regression or a reporting artifact, and learns to ignore it.',
          'The monitoring did not fail because the tools were wrong. It failed because the workflow around the tools was missing.',
        ],
      },
      {
        heading: 'The four layers I separate',
        paragraphs: [
          'I split any technical SEO operation into four layers and only automate the ones that clearly reward it. Each layer has a different cadence and a different owner.',
        ],
        list: [
          'Collection — the crawlers, GSC, and analytics exports that produce raw data. Automated, cheap, boring.',
          'Normalization — turning raw data into a canonical table (pages, issues, impressions, CTR bucket). Worth automating as soon as you have more than one source.',
          'Triage — the human read that decides what actually needs action this week. Never fully automate this. It is the entire judgment layer.',
          'Action log — what the team did and when. Usually lives in Notion, Linear, or a simple sheet with two columns: what, when.',
        ],
      },
      {
        heading: 'What the recurring cadence looks like',
        paragraphs: [
          'At 10Pearls, the rhythm I settled on is weekly triage, monthly review, quarterly direction check. Each has a different question: is anything on fire, are we winning the right fights, and are we still pointing at the right goals.',
          'The weekly view is deliberately short. Fifteen minutes is the budget. If the dashboard needs more than that to interpret, the normalization layer is the thing to fix — not the dashboard.',
        ],
      },
      {
        heading: 'The single most underrated move',
        paragraphs: [
          'Every recurring SEO report should link directly to the action log from the previous week. It is the cheapest way to force accountability without adding any process.',
          'When the Monday review opens with "here is what we said we would fix last week," the whole meeting changes shape. Triage becomes faster because everyone already remembers the context, and the monitoring stops feeling like a passive feed.',
        ],
      },
      {
        heading: 'Tools I actually use',
        paragraphs: [
          'Ahrefs for the external surface (backlinks, keyword movement, competitor drift). Google Search Console for the ground truth on impressions and CTR. Google Analytics for the session side. n8n as the glue when I need to auto-ship a weekly digest into a channel the team will actually read.',
          'I do not automate the triage step. It is the layer where a human reading the numbers catches the thing the system cannot name yet.',
        ],
      },
      {
        heading: 'Where this operating model lives in my work',
        paragraphs: [
          'The 10Pearls SEO Monitoring Workflow case study on /projects/10pearls-seo-monitoring-workflow is the clearest public expression of this. The /technical-seo topic page has the short version.',
          'If you are setting up technical SEO monitoring at a Pakistani team for the first time, the best advice I can give you is this: pick the smallest possible normalization step, make it the cheapest part of the week, and put the action log in front of the dashboard.',
        ],
      },
    ],
  },
  {
    slug: 'n8n-vs-zapier-vs-make-marketing-automation-2026',
    title: 'n8n vs Zapier vs Make: Picking a Marketing Automation Tool in 2026',
    description:
      'A grounded comparison of n8n, Zapier, and Make for marketing automation in 2026 — written from live workflows, not marketing copy.',
    datePublished: '2026-03-28',
    readingTimeMinutes: 8,
    wordCount: 980,
    category: 'Marketing Automation',
    keywords: [
      'n8n vs Zapier',
      'n8n vs Make',
      'marketing automation tool comparison 2026',
      'Saboor Ali Khan automation',
      'marketing automation Pakistan tools',
    ],
    status: 'published',
    lead: 'I have shipped production workflows in all three. Here is the honest trade-off map I wish I had read when I was starting — from a marketing-ops lens, not an engineering lens.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'If you want speed-to-first-workflow and do not want to think about hosting, pick Zapier. If you want the best price-per-task and do not mind a slightly steeper learning curve, pick Make. If you want to self-host, own the data path, and get real branching power, pick n8n.',
          'For most Pakistani SMBs and small marketing teams I have worked with, the first two are the practical pick. For a 10Pearls-scale operation that cares about data sovereignty, n8n wins.',
        ],
      },
      {
        heading: 'Where Zapier still wins',
        paragraphs: [
          'Zapier\u2019s app catalog is the widest and the integration quality is almost always the most polished. If your workflow touches HubSpot, Intercom, Slack, Airtable, or any of the top-50 SaaS apps, Zapier usually has the connector with the fewest surprises.',
          'The tradeoff is cost-per-task. At medium volume, the pricing cliff is real. And the branching model (Paths, Filters) feels clumsy the moment you need more than one conditional.',
        ],
      },
      {
        heading: 'Where Make pulls ahead',
        paragraphs: [
          'Make\u2019s visual branching is genuinely better. When a workflow has routers, iterators, and aggregators, Make shows you the data shape at every node. That matters a lot when debugging marketing workflows, where ninety percent of the failures are malformed payloads.',
          'The price per operation is also materially lower than Zapier. The tradeoff is that the UI is denser and the learning curve for a non-technical marketer is steeper.',
        ],
      },
      {
        heading: 'Where n8n is the right call',
        paragraphs: [
          'n8n self-hosts. For teams handling client data, Pakistani marketing shops working with enterprise clients, or any workflow where you cannot pipe a record through a third-party US server, this is the entire game.',
          'The node library is smaller than Zapier\u2019s but covers the real-world 80% — HTTP, webhooks, common CRMs, database reads, LLM calls. The code node is the killer feature: if a connector does not exist, you write 15 lines of JavaScript and ship.',
        ],
      },
      {
        heading: 'Concrete recommendations by team shape',
        paragraphs: [
          'A founder doing marketing alone: Zapier. The cost is fine at your volume and you should not be thinking about integration plumbing.',
          'A 3-5 person marketing team at a mid-size agency: Make. The routing model pays back the learning curve within a month.',
          'An in-house marketing ops function inside a product or services company: n8n, self-hosted. Own the data, own the uptime, save the money.',
          'A BBA marketing student learning the craft: start in Make. The visual model teaches you how data actually flows.',
        ],
      },
      {
        heading: 'What I use day to day',
        paragraphs: [
          'At 10Pearls I lean on n8n for the workflows that touch internal systems and HubSpot for the ones that sit on the customer side. Make shows up when I need fast branching with clean visual debugging.',
          'The resume builder I maintain at sabooralikhan.com/tools/resume-builder does not use any of these — it is a Next.js + Supabase product. Not every automation problem is a workflow-tool problem.',
        ],
      },
      {
        heading: 'The deeper point',
        paragraphs: [
          'The tool matters less than the process discipline. A clean workflow in Zapier will outperform a messy n8n graph every time. If the process is not clear on paper first, no tool will save you.',
        ],
      },
    ],
  },
  {
    slug: 'ai-workflows-for-marketing-operations',
    title: 'Using AI Workflows to Reduce Repeat Marketing Operations Work',
    description:
      'How I use AI workflows and LLM-assisted tooling to cut repetitive marketing operations work — the patterns that actually hold up in production.',
    datePublished: '2026-03-20',
    readingTimeMinutes: 6,
    wordCount: 780,
    category: 'AI Workflows',
    keywords: [
      'AI workflows marketing operations',
      'LLM marketing automation',
      'Saboor Ali Khan AI workflows',
      'AI marketing ops Pakistan',
    ],
    status: 'published',
    lead: 'AI in marketing operations is mostly a pile of demos. A small handful of patterns actually survive contact with real work. These are the ones I keep coming back to.',
    sections: [
      {
        heading: 'The pattern that works: reduce, do not generate',
        paragraphs: [
          'The strongest use of LLMs in my workflows is reduction, not generation. Long meeting transcripts into a structured action list. Forty GSC queries into five clusters. A noisy support inbox into a ranked feature-request queue.',
          'Reduction wins because the human check is fast. You can scan a shortened output and notice errors. Generation loses because the human check is slow — you have to read an entire essay to know if it is right.',
        ],
      },
      {
        heading: 'The pattern that fails: creative content at scale',
        paragraphs: [
          'Every marketing team has tried this and every team has quietly backed off. The content reads fine, the SEO impact is middling at best, and the brand voice costs more to repair than to write from scratch.',
          'The exception is internal content — briefs, first drafts, one-off emails — where voice consistency does not matter and speed does.',
        ],
      },
      {
        heading: 'The pattern that surprises people: as a coworker for ops docs',
        paragraphs: [
          'The most underrated use I have found is writing and maintaining the boring internal ops documents. The SOPs, the runbooks, the "when something breaks, here is who to call" pages. LLMs keep those alive because the work to update them is small and the human brain hates doing it.',
          'At 10Pearls, the team operating documents I help maintain stay fresher than they would otherwise because the rewrite cost is close to zero.',
        ],
      },
      {
        heading: 'Tool setup I actually run',
        paragraphs: [
          'Claude or GPT for the reduction work. n8n for the workflow glue. A small Supabase table for prompt versions so the team can roll back when a prompt regresses. Nothing fancier.',
          'The rule I keep: never call an LLM from a workflow without a deterministic fallback. If the model is slow, rate-limited, or returns nonsense, the workflow should still ship the job to a human queue instead of silently dropping it.',
        ],
      },
      {
        heading: 'What to build first',
        paragraphs: [
          'Pick one recurring task that your team complains about once a week. Measure how long it takes today. Build a reduction workflow that shrinks the human version to a final 20-percent review step. Measure again. If the time saved is real, keep it and move to the next one.',
          'This is the opposite of the "AI transformation" pitch. It is small, honest, and the only version that sticks.',
        ],
      },
      {
        heading: 'Further reading on this site',
        paragraphs: [
          'The /ai-workflows topic page is the short version of my position. The /marketing-automation and /marketing-operations pages show where these patterns fit inside the larger operating model I work inside at 10Pearls.',
        ],
      },
    ],
  },
  {
    slug: 'building-resume-builder-nextjs-supabase',
    title: 'Vibe-Coding a Resume Builder with Codex and Claude Code Running in Parallel',
    description:
      'How I shipped the Next.js + Supabase resume builder at sabooralikhan.com by vibe-coding with OpenAI Codex and Anthropic Claude Code running side by side and talking to each other.',
    datePublished: '2026-03-12',
    readingTimeMinutes: 9,
    wordCount: 1180,
    category: 'Tools',
    keywords: [
      'vibe coding',
      'Codex and Claude Code',
      'parallel AI coding',
      'resume builder Next.js',
      'Supabase resume builder',
      'Saboor Ali Khan resume builder',
      'AI pair programming setup',
    ],
    status: 'published',
    lead: 'I shipped the public resume builder at sabooralikhan.com by vibe-coding — two AI coding agents, OpenAI Codex and Anthropic Claude Code, running in parallel, passing intermediate work back and forth. This is the honest version of what that setup actually looks like, why it works, and how you can run it yourself.',
    sections: [
      {
        heading: 'Why a resume builder, and why on a portfolio',
        paragraphs: [
          'I wanted the tools section of sabooralikhan.com to hold things I actually use. The resume builder solves a problem I had twice a month — adjusting a resume for a specific job posting without rewriting the same three sections by hand.',
          'Putting it on the portfolio, rather than as a separate product, also makes the portfolio denser. Tools are a category of work. A site that only has case studies and an about page feels static.',
        ],
      },
      {
        heading: 'What "vibe-coding" actually means here',
        paragraphs: [
          'Vibe-coding is a specific style: you drive the product direction, the agent holds the code. You describe outcomes, read diffs, redirect when the agent wanders, and never type a semicolon yourself. It is closer to being a tech lead than being a developer.',
          'On this project I ran two agents instead of one. OpenAI Codex handled long-running, high-context tasks (refactors across many files, migration scripts, test scaffolding). Anthropic Claude Code handled the fast, surgical work (single-file edits, rapid UI iteration, debugging). They talked to each other through the filesystem — which is the only handoff protocol you actually need.',
        ],
      },
      {
        heading: 'How to set up Codex and Claude Code in parallel',
        paragraphs: [
          'Setup is less complicated than it sounds. Both agents read and write the same repository on disk, so the "communication" is just the working tree. Here is the concrete setup I use.',
        ],
        list: [
          'Open two terminal panes side-by-side in the same repo directory. Pane A runs `codex` (the OpenAI CLI), Pane B runs `claude` (the Anthropic Claude Code CLI).',
          'Give each a distinct role in its system prompt or repo AGENTS.md. Codex: "You handle large refactors, schema migrations, and multi-file changes. Wait for my review before committing." Claude: "You handle single-file surgical edits, UI polish, and ad-hoc debugging." Role clarity prevents both agents from racing on the same file.',
          'Use git as the safety net between them. After each meaningful step, commit. If one agent clobbers the other\u2019s work, `git reset` is 2 seconds. Without frequent commits, parallel agents will hurt you.',
          'Pass intermediate state through markdown files in the repo, not through paste-and-copy. When Codex finishes a schema design, it writes `notes/schema.md`. Claude reads `notes/schema.md` when I ask it to build the UI on top. The file is the contract.',
          'Run typecheck and lint in a third pane on a filewatcher (`tsc --noEmit --watch`). Both agents react to red type errors. They will fix errors that the other introduced. This is the closest thing to them "talking."',
          'Never let both agents have the same tool permissions. Give Codex the write + exec permissions for big refactors; keep Claude Code in a more restricted mode for precision work. Different blast radii keep mistakes small.',
        ],
      },
      {
        heading: 'Where each agent outperformed the other',
        paragraphs: [
          'Codex won on scale. When I needed to move the resume data model from a single object to an append-only block model, Codex rewrote 14 files in one pass, updated tests, and flagged three edge cases I had not considered. That was a three-hour manual refactor compressed into fifteen minutes.',
          'Claude Code won on feel. The UI iteration loop — tweak padding, adjust typography, reshape a component — was noticeably faster with Claude because its diffs land cleaner for small changes and it asks fewer clarifying questions when the task is visual.',
          'Put differently: Codex thinks, Claude moves. Using both in parallel gives you a tech-lead posture over the whole codebase.',
        ],
      },
      {
        heading: 'The stack the agents built',
        paragraphs: [
          'Next.js app router, Supabase for auth and persistence, Tailwind for the UI, and a React-PDF renderer for the export. The only unusual choice is putting the authenticated app behind /tools/resume-builder/app while keeping a public /tools/resume-builder landing page for SEO.',
          'The split matters because the landing page needs to be indexed, while the app behind auth should be kept out of Google. The robots.ts disallow rules and a per-page noindex take care of that. Codex wrote the robots config, Claude wrote the landing page copy — exactly the division of labor their strengths suggest.',
        ],
      },
      {
        heading: 'The PDF trap (both agents hit it)',
        paragraphs: [
          'Every resume builder eventually dies on PDF. The renderer choice sets a ceiling on what the product can do. I started with html-to-pdf wrappers, hit layout drift within a day, and had Codex migrate the pipeline to true React-PDF. The learning curve is worth it.',
          'The trickiest constraint is that most ATS systems parse PDFs as if they were created in Word. The resume has to layout correctly and parse as plain-text correctly. Those two goals fight each other on almost every design decision — this is also exactly the kind of thing where having a second agent (Claude) checking the first agent\u2019s (Codex) output catches the subtle bugs.',
        ],
      },
      {
        heading: 'What Supabase solves and does not',
        paragraphs: [
          'Supabase auth is the right pick for a portfolio-scale product. Row-level security means users only see their own drafts without any API layer of my own. The migrations stay in the repo, which matches how the rest of the site is versioned.',
          'What Supabase does not solve: transactional email at scale, PDF rendering, or anything that needs background jobs beyond a simple cron. If the product grew, I would reach for a dedicated worker and keep Supabase in the auth + data role it is good at.',
        ],
      },
      {
        heading: 'What I would do differently',
        paragraphs: [
          'Start with the two-agent setup from day one. I used a single-agent flow for the first week and the productivity delta was obvious once I added the second pane.',
          'Design the data model around exportable blocks from day one. I started with a "resume" object and fought that shape for two iterations before switching to an append-only block model (each section is a typed block with an order field).',
          'Build the public landing page first and the app second. I did it in the other order and the landing page ended up under-built. For SEO purposes, the landing page is the thing that compounds.',
        ],
      },
      {
        heading: 'Where to see it',
        paragraphs: [
          'The tool lives at sabooralikhan.com/tools/resume-builder. The case-study style write-up is at /projects/my-portfolio-2026. The full tools surface is at /tools.',
          'If you are starting your own vibe-coding setup: two panes, two agents, git as the safety net, markdown files as the handoff. That is the whole thing. The tooling is not the hard part. The hard part is learning to stop typing and start directing.',
        ],
      },
    ],
  },
  {
    slug: 'wikidata-modern-seo-entity-ranking',
    title:
      'The Wikidata Lever: Why Modern SEO Ignores It and How a Single Entity Can Rewrite Your Search Results',
    description:
      'Why Wikidata is the most underrated SEO move in 2026, how it powers Google\u2019s Knowledge Graph, and the step-by-step playbook for claiming your own entity — written by Saboor Ali Khan.',
    datePublished: '2026-04-15',
    readingTimeMinutes: 8,
    wordCount: 1120,
    category: 'Technical SEO',
    keywords: [
      'Wikidata SEO',
      'Knowledge Graph optimization',
      'entity-based SEO',
      'Wikidata for personal branding',
      'Saboor Ali Khan Wikidata',
      'name SERP entity disambiguation',
    ],
    status: 'published',
    lead: 'Every serious SEO guide in 2026 talks about E-E-A-T, schema markup, and AI search. Almost none of them talk about the single most direct lever into Google\u2019s Knowledge Graph: Wikidata. This is the post I wish someone had written for me when I first started competing with a celebrity for my own name.',
    sections: [
      {
        heading: 'Why Wikidata gets ignored',
        paragraphs: [
          'Wikidata looks like a wiki. It reads like a research database. It has almost no marketing copy aimed at SEOs. Those three things together are why most technical SEO blogs skip it entirely — and why the few people who use it see disproportionate results.',
          'There is also a cultural issue. Wikidata is run by volunteers with a strong notability culture. If you try to spam-edit a marketing page, it gets reverted in hours. That filter scares away the low-effort SEO crowd. Good: it also means the signal quality stays high, which is exactly why Google trusts it.',
        ],
      },
      {
        heading: 'How Wikidata actually feeds search results',
        paragraphs: [
          'Google\u2019s Knowledge Graph pulls from a small number of authoritative sources. Wikidata is one of the largest inputs. When Google needs to decide "is there one entity called Saboor Ali Khan or several?", it reaches into its entity graph — and Wikidata entries are how that graph gets disambiguated.',
          'The downstream effects are concrete. Knowledge panels on the right side of search results, rich cards, "people also ask" expansions, and increasingly the AI-generated overviews at the top of SERPs all lean on entity data. Being a recognized entity means your photo, bio snippet, and official links get pinned to queries for your name. Not being one means you compete as a stranger.',
        ],
      },
      {
        heading: 'Why this matters even more in the AI search era',
        paragraphs: [
          'ChatGPT, Gemini, Perplexity, and Claude all use knowledge-graph-style retrieval as part of how they answer identity questions. When someone asks "who is Saboor Ali Khan marketing", the model stitches together entries it was trained on plus live retrieval. A clean Wikidata entry is one of the few public signals that reliably lands in both layers.',
          'This is the thing people miss: LLM-era SEO is less about keyword density and more about entity clarity. Wikidata is the cheapest and most direct place to establish that clarity.',
        ],
      },
      {
        heading: 'When Wikidata is the right move',
        paragraphs: [
          'You have a public identity tied to a body of work — a professional profile, a product, an organization, a published person.',
          'You compete with another entity for the same name. This is the canonical use case. Disambiguation is exactly what Wikidata excels at.',
          'You want AI-generated summaries of your work to use correct canonical descriptions. A Wikidata description is one of the cleanest inputs a model will find.',
          'You do not pass the notability bar yet. The community will remove entries for people with no public footprint. If you are a student with no press coverage, wait until you have at least two verifiable public sources — a university profile, a news mention, a professional listing.',
        ],
      },
      {
        heading: 'The playbook (what to actually do)',
        paragraphs: [
          'Here is the step-by-step I used for my own entity.',
        ],
        list: [
          'Create a Wikidata account. One-step signup at wikidata.org. Use your real name so edits look non-spammy.',
          'Search first. Before creating an entry, search for yourself. If someone else shares the name, you will see their entry. You are adding a separate item, not editing theirs.',
          'Click "Create a new item." Wikidata asks for a label, description, and aliases. Label: your full name. Description: short, professional, disambiguating. "Saboor Ali Khan (marketing professional)" is the pattern.',
          'Add statements, not paragraphs. Wikidata speaks in properties. P31 (instance of) → Q5 (human). P27 (country of citizenship). P69 (educated at) linked to your school\u2019s existing Wikidata item. P108 (employer) linked to your employer\u2019s existing item. P106 (occupation). Each statement is one row.',
          'Add references. Every statement should have a source. This is the single most important move. A statement without a reference is fragile; a statement with a link to a university page, company listing, or published article is durable.',
          'Add identifier properties. P2002 (Twitter/X username), P2037 (GitHub username), P6634 (LinkedIn personal profile ID), P856 (official website). These are the direct links AI models pick up when answering questions about you.',
          'Link back from your site. Add the Wikidata URL to your Person schema sameAs array. This closes the loop — your site confirms the entity, the entity confirms your site.',
        ],
      },
      {
        heading: 'Common mistakes that kill entries',
        paragraphs: [
          'Writing marketing copy in the description field. Wikidata descriptions are neutral and factual. "Founder of life-changing marketing automation consultancy" gets reverted in an hour. "Marketing professional based in Karachi" survives forever.',
          'Creating an entry before you pass notability. No references, no durability. Fix the upstream — publish something, get listed somewhere — then come back.',
          'Treating the entry as a one-time action. Keep it updated as your roles change. A stale Wikidata entry is worse than none, because it is what Google shows.',
        ],
      },
      {
        heading: 'What to expect after you publish',
        paragraphs: [
          'Wikidata updates propagate to Google\u2019s Knowledge Graph on its own schedule — typically days to weeks. You will not see a knowledge panel immediately. What you will see is cleaner entity clustering in your name SERP, better AI-answer descriptions, and more accurate rich-result metadata.',
          'If you maintain the entry and keep adding referenced statements, the compounding effect over six months is real. The site is free. The crawl is free. The output is how modern search decides you exist.',
        ],
      },
      {
        heading: 'Related reading on this site',
        paragraphs: [
          'The /technical-seo topic page has more on the operational side of search. The /about page is an example of the entity-clarity principle applied to a personal site: one name, one description, consistent across every surface.',
        ],
      },
    ],
  },
  {
    slug: 'vibe-coded-portfolio-postmortem',
    title:
      'I Vibe-Coded My Portfolio in a Weekend. Here Is What Claude Code Got Right and Where It Lied.',
    description:
      'An honest postmortem of building a Next.js portfolio almost entirely through natural-language prompts with Claude Code, what shipped well and what quietly broke.',
    datePublished: '2026-05-12',
    readingTimeMinutes: 7,
    wordCount: 880,
    category: 'AI Workflows',
    keywords: [
      'vibe coding',
      'Claude Code portfolio',
      'AI assisted development',
      'Next.js vibe coding',
      'natural language coding',
      'AI pair programming',
    ],
    status: 'published',
    lead: 'The portfolio you are reading was written mostly by typing English at a terminal. I did almost no manual coding for the first two days. The result was good enough to ship and bad enough in specific places that it is worth writing the honest version down.',
    sections: [
      {
        heading: 'What I actually did',
        paragraphs: [
          'I opened a blank Next.js 14 app, opened Claude Code in the same folder, and started describing the site I wanted. Header, hero, blog index, project case studies, contact form. I gave it the typography I liked and the page structure I had sketched on paper. Then I let it write.',
          'Over a weekend, the site went from empty to roughly forty components and twenty pages. I reviewed diffs, asked for changes in plain English, and rarely opened a file myself unless something was clearly off.',
        ],
      },
      {
        heading: 'What Claude Code got right',
        paragraphs: [
          'The boring parts were great. Layout scaffolding, Tailwind class composition, accessible nav structure, schema.org JSON-LD blocks, MDX-ish data files. Things that have a thousand examples in its training set arrived clean on the first attempt.',
          'It was also good at being told to be consistent. Once I picked a card component pattern, asking it to apply the same pattern to a new section worked the first time, every time. That alone saved hours.',
        ],
      },
      {
        heading: 'Where it quietly lied',
        paragraphs: [
          'Three categories of lies, in increasing order of how much pain they caused.',
          'First, it invented props that did not exist on libraries it was using. The code compiled because TypeScript inference filled in any, the runtime worked because the unused prop was simply ignored, and I only noticed weeks later when I tried to actually use the feature.',
          'Second, it confidently produced breadcrumb arrays with one item on three pages, then told me the component was working. The component was working. The data I had let it generate was not.',
          'Third, and worst, it duplicated logic. The same date formatter exists in four files. The same color token is defined twice. None of this is broken, but all of it is the kind of rot a senior engineer would catch in code review and a vibe coder will miss until the codebase is too big to refactor cheaply.',
        ],
      },
      {
        heading: 'The rule that fixed half of it',
        paragraphs: [
          'After the weekend, I added a single rule to my workflow. Before asking for new code, ask Claude to read the existing files and tell me where the new logic should live. Roughly half the duplication problem disappeared immediately.',
          'The other half got better when I started ending prompts with a short verification step. Not "build X" but "build X, then run the type check, then list every other file you touched and why."',
        ],
      },
      {
        heading: 'What I would do differently next time',
        paragraphs: [
          'Start with the data model, not the components. The components are the easy part. The shape of a BlogPost or a Project is the part you will regret if a model invents it for you in a single shot.',
          'Write a one-page house style before the first prompt. Spacing scale, color tokens, typography ramp, naming conventions. Five minutes of constraints up front saves a refactor pass at the end.',
          'And keep a running list of every assumption the model makes that you did not verify. Most of them are fine. The ones that are not will be the bugs in production.',
        ],
      },
      {
        heading: 'Is this a real way to build software',
        paragraphs: [
          'For a personal site, yes. For anything anyone else depends on, only with the same review process you would apply to a junior engineer who is fast, confident, and occasionally wrong about things they will never admit to.',
          'The honest answer is that vibe coding is not a replacement for understanding the stack. It is a force multiplier for people who already understand it and a trap for people who do not.',
        ],
      },
    ],
  },
  {
    slug: 'spec-driven-vs-vibe-driven-coding',
    title: 'Spec-Driven vs Vibe-Driven: When to Plan and When to Just Talk to the Model',
    description:
      'A practical take on when a written spec beats a freeform conversation with the model, and when the opposite is true, drawn from real projects.',
    datePublished: '2026-05-08',
    readingTimeMinutes: 6,
    wordCount: 820,
    category: 'AI Workflows',
    keywords: [
      'spec driven development',
      'vibe coding',
      'AI development workflow',
      'planning vs prompting',
      'Claude Code workflow',
      'AI software process',
    ],
    status: 'published',
    lead: 'There are two camps now. The spec people write a plan, hand it to the model, and review the diff. The vibe people open a chat and start describing what they want until something works. Both are real. Both are right in different situations.',
    sections: [
      {
        heading: 'The two postures',
        paragraphs: [
          'Spec-driven work treats the model like a fast junior engineer. You write down the requirement, the constraints, the files that will change, and the verification step. The model produces code that fits inside the box you drew.',
          'Vibe-driven work treats the model like a sketchpad. You think out loud, the model writes something, you react, it adjusts. The product of the conversation is the spec, written in code instead of prose.',
        ],
      },
      {
        heading: 'When the spec wins',
        paragraphs: [
          'Anything that touches production, anything with a database migration, anything that another person will read in six months. The cost of a wrong assumption compounds, and a spec is the cheapest way to force the assumption into the open before the diff exists.',
          'Also true for any task where the failure mode is silent. Payments, auth, analytics events, security headers. If the bug will not show up in a screenshot, write the spec first.',
        ],
      },
      {
        heading: 'When the vibe wins',
        paragraphs: [
          'Early exploration. You do not know what you want yet, and writing a spec for something you have not seen is a slow way to discover that the spec was wrong.',
          'Visual and layout work. A round trip of "make this look more like X" against a live preview is faster than any document.',
          'One-off scripts. If the code will run twice and then be deleted, planning it is overhead.',
        ],
      },
      {
        heading: 'The middle path I actually use',
        paragraphs: [
          'Most of my real work is vibe at the start and spec at the end. I explore freely until the shape of the thing is clear, then I stop, ask the model to summarize what we have built and what is missing, and turn that summary into a spec for the rest.',
          'The transition point is the moment I notice myself saying "okay but make sure it also handles" for the third time. That is the signal that the conversation has produced enough surface area to need a written contract.',
        ],
      },
      {
        heading: 'A failure mode in each camp',
        paragraphs: [
          'The spec camp over-specifies. A two-page document for a one-line change is a smell. The model does not need the same context a human reviewer does. Spec for the decisions, not the typing.',
          'The vibe camp under-reviews. A working preview is not a working feature. The model will happily produce a button that looks right and dispatches no event. Treat every vibe session as draft code until you have read the diff.',
        ],
      },
      {
        heading: 'The thing both camps agree on',
        paragraphs: [
          'You still have to know the stack. The spec writer who does not understand the framework writes specs that the model cannot satisfy. The vibe coder who does not understand the framework ships bugs that look like features. There is no version of this where the human gets to stop reading code.',
        ],
      },
    ],
  },
  {
    slug: 'geo-is-the-new-seo',
    title: 'GEO Is the New SEO: Optimizing for ChatGPT, Perplexity, and Claude in 2026',
    description:
      'Generative Engine Optimization is the practice of being cited by the answer, not ranked above it. What changes, what stays the same, and what to actually do.',
    datePublished: '2026-05-03',
    readingTimeMinutes: 7,
    wordCount: 900,
    category: 'Technical SEO',
    keywords: [
      'generative engine optimization',
      'GEO',
      'AI search optimization',
      'ChatGPT SEO',
      'Perplexity SEO',
      'LLM optimization',
      'answer engine optimization',
    ],
    status: 'published',
    lead: 'The traffic from ten blue links is still there, but a growing share of the questions never reach a results page. They get answered in a chat window, with two or three sources cited at the bottom. Being one of those sources is a different game.',
    sections: [
      {
        heading: 'What GEO actually is',
        paragraphs: [
          'Generative Engine Optimization is the practice of making a page easy for a large language model to cite. The unit of value is no longer the click. It is the citation, and the brand mention that comes with it, even when no click follows.',
          'This sounds like a small shift. It is not. The optimization target moved from "rank in position one" to "be one of the three pages the model paraphrases when it answers."',
        ],
      },
      {
        heading: 'What stayed the same',
        paragraphs: [
          'Crawlable HTML. Clear page structure. A single canonical URL. Honest titles and descriptions. Internal links that actually go somewhere relevant. If any of this is missing, no model will cite you for the same reason no search engine will rank you.',
          'Reputation also stayed the same. Models lean on the same signals search engines do when they decide which sources to trust. Mentions across known publications, consistent entity data, a real author with a real history.',
        ],
      },
      {
        heading: 'What is genuinely new',
        paragraphs: [
          'Three things.',
          'First, answer-shaped content wins. A page that opens with a one-sentence answer to a specific question, then expands, gets cited more than a page that buries the same answer in section four.',
          'Second, entity clarity matters more than keyword density. Models reason in entities. A page that clearly defines what it is about, who wrote it, and what its claims are, is easier to ground than a page that gestures at a topic.',
          'Third, brand mentions without links count now. A model that has seen your name in ten unrelated contexts will surface you more often than a model that has only seen one. This is closer to PR than to backlink building.',
        ],
      },
      {
        heading: 'The structural changes I make to every page now',
        paragraphs: [
          'A one-sentence answer in the lead. A clear definition of every named thing on the page. Schema.org markup for the entity at minimum, plus Article or BlogPosting where it fits. A visible author block with a link to a real bio.',
          'I also write one paragraph per page that I would be happy to see quoted verbatim. If a model is going to paraphrase me anyway, I would rather hand it the sentence than let it invent one.',
        ],
      },
      {
        heading: 'How I measure it',
        paragraphs: [
          'Ahrefs Brand Radar tracks how often a brand or domain shows up across the major AI answer engines. Watching that number alongside Google Search Console traffic is how I tell whether the GEO work is paying off without confusing it for ordinary SEO.',
          'The metric I care about most is share of voice on the prompts that matter to me. Not how often I am mentioned everywhere. How often I am mentioned in the conversation I want to win.',
        ],
      },
      {
        heading: 'What I would not bother with',
        paragraphs: [
          'Stuffing the page with FAQs that no one asked. Schema markup for every possible type. Trying to game one specific model with prompts hidden in alt text. None of this survives the next model update and most of it makes the page worse to read.',
          'The honest play is to write pages that a careful human would want to cite. Models are converging on the same definition of careful.',
        ],
      },
    ],
  },
  {
    slug: 'death-of-the-keyword-entity-search',
    title: 'The Death of the Keyword: How Entity-Based Search Changes Content Strategy',
    description:
      'Why the keyword as a planning unit is breaking down, and how entity-first content strategy works in its place, with concrete examples from a working portfolio.',
    datePublished: '2026-04-28',
    readingTimeMinutes: 7,
    wordCount: 860,
    category: 'Technical SEO',
    keywords: [
      'entity based SEO',
      'entity search',
      'content strategy 2026',
      'Wikidata SEO',
      'knowledge graph SEO',
      'topic clusters',
    ],
    status: 'published',
    lead: 'For fifteen years, the keyword was the planning unit of SEO. Pick a phrase, build a page, repeat. That model is breaking down because the engines stopped thinking in phrases and started thinking in things.',
    sections: [
      {
        heading: 'What changed under the hood',
        paragraphs: [
          'Modern search engines and AI answer systems represent the world as a graph of entities. A person, a company, a product, a concept. Each entity has properties and relationships, and the engine matches a query to entities before it matches it to documents.',
          'A page that ranks well is no longer a page that contains the right words. It is a page that is clearly about a specific entity, supports that claim with structured data, and connects to other entities the engine already knows.',
        ],
      },
      {
        heading: 'The keyword still exists. It just lost its job.',
        paragraphs: [
          'Keywords are useful for measuring demand and for picking the language of a page. They are no longer useful as the unit of content planning. Two pages targeting different keywords for the same underlying entity will cannibalize each other, because the engine sees them as duplicates.',
          'The new planning unit is the entity. One entity, one page, many keyword variations served by the same document.',
        ],
      },
      {
        heading: 'What an entity-first plan looks like',
        paragraphs: [
          'Start with a list of the entities your work is about. For me, that includes a person (myself), an institution (IBA Karachi), an employer (10Pearls Pakistan), a set of methods (marketing automation, technical SEO, AI workflows), and a set of tools (n8n, Claude, Ahrefs).',
          'Each entity gets one canonical page. Every other page either supports that page or describes a different entity. There is no third option.',
        ],
      },
      {
        heading: 'Why Wikidata matters even if you never get listed',
        paragraphs: [
          'Wikidata is the public scaffolding that search engines and AI systems use to resolve entities. Being on Wikidata is the strongest possible signal that your entity is real and disambiguated, but the bigger lesson is the shape of the data itself.',
          'A Wikidata entry has a label, a description, aliases, types, and properties. Any page on your own site should be readable as the same kind of object. If it is not, the engine has to guess what your page is about, and guesses are not citations.',
        ],
      },
      {
        heading: 'The internal linking change',
        paragraphs: [
          'In a keyword world, internal links are about passing authority to money pages. In an entity world, they are about declaring relationships. A link from a project case study to the method page that describes how it was built is a sentence in the graph, not a vote.',
          'Anchor text matters again, but for a different reason. The anchor is the engine learning what your linked page is about. Vague anchors waste a sentence.',
        ],
      },
      {
        heading: 'What to do on Monday morning',
        paragraphs: [
          'List every entity on your site. Note which ones have one canonical page and which ones are scattered across several. Pick the worst offender, consolidate it into one page, and redirect the rest. Do this once a quarter and you will outpace any competitor still building keyword pages.',
          'The /technical-seo and /about pages on this site are the version of that exercise I keep running on my own work.',
        ],
      },
    ],
  },
  {
    slug: 'marketers-should-learn-vibe-coding',
    title: 'Why Every Marketer in 2026 Should Learn Just Enough Vibe Coding to Be Dangerous',
    description:
      'A practical case for marketers learning to talk to code through AI, what to learn first, and what not to bother with.',
    datePublished: '2026-04-22',
    readingTimeMinutes: 6,
    wordCount: 780,
    category: 'Marketing Operations',
    keywords: [
      'marketers learn to code',
      'vibe coding for marketers',
      'AI for marketing',
      'no code AI marketing',
      'marketing automation skills',
      'marketing technology 2026',
    ],
    status: 'published',
    lead: 'I am a marketing student. I am not a software engineer. I still write code most weeks, because the gap between what I want a tool to do and what it does is now small enough that a thirty-minute conversation with a model can close it. Every marketer should be able to do this.',
    sections: [
      {
        heading: 'The argument in one paragraph',
        paragraphs: [
          'Marketing in 2026 runs on twenty-something tools that almost do what you need. The marketer who can write a fifty-line script to bridge two of them, or fix a broken Zapier step, or build a quick internal dashboard, is worth twice as much as the marketer who has to file a ticket. The model does the typing. You have to know what to ask for.',
        ],
      },
      {
        heading: 'What "just enough" actually means',
        paragraphs: [
          'You do not need to learn React. You do not need to memorize syntax. You need to know what a function is, what an API is, what a JSON object looks like, and what it means when a script fails. That is roughly a week of casual study.',
          'After that, the model handles the rest. You describe the task, read the output, run it, and react to the error message. The error message is where most of the learning happens.',
        ],
      },
      {
        heading: 'Three real things I have built this year',
        paragraphs: [
          'A script that pulls keyword positions from Ahrefs every Monday morning and writes a one-page summary to a shared doc. Forty lines of code, written in a chat window over an afternoon.',
          'A small dashboard that compares my brand mentions across AI answer engines week over week. Built on top of an existing API, deployed for free, takes ten minutes a week to maintain.',
          'A throwaway tool that takes a messy CSV of campaign results and turns it into the format my reporting template expects. Used three times, then deleted.',
        ],
      },
      {
        heading: 'What not to bother with',
        paragraphs: [
          'Do not learn a frontend framework. Do not try to ship a real app to real users unless you are working with an engineer. Do not write code that handles customer data without help. The point is not to replace engineering. The point is to stop being blocked by it on tasks no engineer would prioritize.',
        ],
      },
      {
        heading: 'Where this matters most',
        paragraphs: [
          'Marketing operations is the first place this skill pays off. Anything that involves moving data between systems, cleaning a list, scheduling a recurring report, or hacking around a tool limitation, is now solvable in one sitting.',
          'Content and SEO is the second place. Pulling rank data, scraping a competitor table, generating consistent metadata at scale. None of this requires real software. All of it used to require a developer.',
        ],
      },
      {
        heading: 'The honest catch',
        paragraphs: [
          'You will write bad code. You will run something you do not fully understand. You will, eventually, paste an API key somewhere you should not have. The first time that happens is the moment you actually learn how this works.',
          'The marketers who refuse to touch any of this in 2026 are making the same bet the marketers who refused to learn analytics made in 2010. It did not go well for them either.',
        ],
      },
    ],
  },
  {
    slug: 'prompt-engineering-to-context-engineering',
    title: 'Stop Writing Prompts. Start Writing Systems.',
    description:
      'Prompt engineering was a useful idea for one model generation. The work has moved to context engineering, the practice of designing what the model sees before you ask it anything.',
    datePublished: '2026-04-18',
    readingTimeMinutes: 7,
    wordCount: 850,
    category: 'AI Workflows',
    keywords: [
      'context engineering',
      'prompt engineering',
      'AI agents',
      'LLM systems design',
      'AI workflow design',
      'context window management',
    ],
    status: 'published',
    lead: 'The thing we used to call prompt engineering was a useful idea for one model generation. The clever phrasing tricks stopped mattering as the models got better. What replaced them is harder and more interesting. It is the work of designing what the model sees before you ask it anything.',
    sections: [
      {
        heading: 'Why prompts stopped being the bottleneck',
        paragraphs: [
          'Two years ago, the difference between a working AI feature and a broken one was often a sentence in the prompt. Adding "think step by step" or restructuring the instruction format could change a result from useless to good.',
          'Modern models do most of that on their own. The marginal value of clever prompting has collapsed. The marginal value of better context has gone up.',
        ],
      },
      {
        heading: 'What context engineering actually is',
        paragraphs: [
          'Context engineering is the practice of deciding what information the model has in its window when it answers. Which documents are loaded, which tools are exposed, which past conversations are summarized, which constraints are enforced before the user even types.',
          'A good context is small, relevant, and structured. A bad context is everything the team could think of, dumped in. Most production AI systems fail because someone confused "more context" with "better context."',
        ],
      },
      {
        heading: 'The five pieces of a real context',
        paragraphs: [
          'I think about it as five layers, in roughly this order.',
        ],
        list: [
          'Identity. What is this system, what is it allowed to do, what is it not allowed to do.',
          'Knowledge. The retrieved documents, summaries, or facts the model needs for this specific request.',
          'Tools. The exact set of functions the model can call, with clear descriptions.',
          'Memory. The relevant slices of past interaction, summarized down to what actually matters.',
          'Task. The current user request, framed so the model knows what success looks like.',
        ],
      },
      {
        heading: 'The cost of getting it wrong',
        paragraphs: [
          'Two failure modes. The first is the cluttered context, where the model has access to so much that it cannot tell what is relevant and starts guessing. Symptoms include hallucinated answers that combine details from unrelated documents.',
          'The second is the missing context, where the model is asked a question it cannot possibly answer correctly because the right document was never retrieved. Symptoms include confident wrong answers about things that are right there in the knowledge base.',
        ],
      },
      {
        heading: 'How I design a context now',
        paragraphs: [
          'I start by writing the worst possible context for the task, then deleting from it. Everything that survives has to justify its presence. Anything I cannot defend gets cut.',
          'I also write a one-line description of what each piece of context is for. If I cannot describe what a chunk of system prompt is doing, neither can the model. That chunk is noise.',
        ],
      },
      {
        heading: 'The skill that replaced prompting',
        paragraphs: [
          'The new skill is closer to information architecture than to copywriting. You are designing the world the model wakes up inside. What it can see, what it can touch, what it has been told about itself.',
          'The teams winning with AI right now are not the ones with the cleverest prompts. They are the ones who treat the context window like a product surface, with the same care they would give to an onboarding flow.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export const publishedBlogPosts = blogPosts.filter((post) => post.status === 'published')
export const draftBlogPosts = blogPosts.filter((post) => post.status === 'draft')
export const visibleBlogPosts = blogPosts.filter((post) => post.status !== 'hidden')
