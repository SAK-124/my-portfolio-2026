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
  status: 'draft' | 'published'
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
    status: 'draft',
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
    status: 'draft',
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
    status: 'draft',
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
    status: 'draft',
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
    status: 'draft',
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
    status: 'draft',
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
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export const publishedBlogPosts = blogPosts.filter((post) => post.status === 'published')
export const draftBlogPosts = blogPosts.filter((post) => post.status === 'draft')
