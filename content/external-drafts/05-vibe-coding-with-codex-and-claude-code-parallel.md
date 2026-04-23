---
title: "Vibe-Coding a Resume Builder with Codex and Claude Code Running in Parallel"
description: "How I shipped a Next.js + Supabase resume builder by vibe-coding with OpenAI Codex and Anthropic Claude Code running side by side and talking to each other."
published: false
canonical_url: https://sabooralikhan.com/blog/building-resume-builder-nextjs-supabase
tags: ai, coding, productivity, webdev
---

I shipped the public resume builder at [sabooralikhan.com](https://sabooralikhan.com/tools/resume-builder) by vibe-coding — two AI coding agents, OpenAI Codex and Anthropic Claude Code, running in parallel, passing intermediate work back and forth. This is the honest version of what that setup actually looks like, why it works, and how you can run it yourself.

## Why a resume builder, and why on a portfolio

I wanted the tools section of sabooralikhan.com to hold things I actually use. The resume builder solves a problem I had twice a month — adjusting a resume for a specific job posting without rewriting the same three sections by hand.

Putting it on the portfolio, rather than as a separate product, also makes the portfolio denser. Tools are a category of work. A site that only has case studies and an about page feels static.

## What "vibe-coding" actually means here

Vibe-coding is a specific style: you drive the product direction, the agent holds the code. You describe outcomes, read diffs, redirect when the agent wanders, and never type a semicolon yourself. It is closer to being a tech lead than being a developer.

On this project I ran two agents instead of one. OpenAI Codex handled long-running, high-context tasks (refactors across many files, migration scripts, test scaffolding). Anthropic Claude Code handled the fast, surgical work (single-file edits, rapid UI iteration, debugging). They talked to each other through the filesystem — which is the only handoff protocol you actually need.

## How to set up Codex and Claude Code in parallel

Setup is less complicated than it sounds. Both agents read and write the same repository on disk, so the "communication" is just the working tree. Here is the concrete setup I use.

- Open two terminal panes side-by-side in the same repo directory. Pane A runs `codex` (the OpenAI CLI), Pane B runs `claude` (the Anthropic Claude Code CLI).
- Give each a distinct role in its system prompt or repo AGENTS.md. Codex: "You handle large refactors, schema migrations, and multi-file changes. Wait for my review before committing." Claude: "You handle single-file surgical edits, UI polish, and ad-hoc debugging." Role clarity prevents both agents from racing on the same file.
- Use git as the safety net between them. After each meaningful step, commit. If one agent clobbers the other's work, `git reset` is 2 seconds. Without frequent commits, parallel agents will hurt you.
- Pass intermediate state through markdown files in the repo, not through paste-and-copy. When Codex finishes a schema design, it writes `notes/schema.md`. Claude reads `notes/schema.md` when I ask it to build the UI on top. The file is the contract.
- Run typecheck and lint in a third pane on a filewatcher (`tsc --noEmit --watch`). Both agents react to red type errors. They will fix errors that the other introduced. This is the closest thing to them "talking."
- Never let both agents have the same tool permissions. Give Codex the write + exec permissions for big refactors; keep Claude Code in a more restricted mode for precision work. Different blast radii keep mistakes small.

## Where each agent outperformed the other

Codex won on scale. When I needed to move the resume data model from a single object to an append-only block model, Codex rewrote 14 files in one pass, updated tests, and flagged three edge cases I had not considered. That was a three-hour manual refactor compressed into fifteen minutes.

Claude Code won on feel. The UI iteration loop — tweak padding, adjust typography, reshape a component — was noticeably faster with Claude because its diffs land cleaner for small changes and it asks fewer clarifying questions when the task is visual.

Put differently: Codex thinks, Claude moves. Using both in parallel gives you a tech-lead posture over the whole codebase.

## The stack the agents built

Next.js app router, Supabase for auth and persistence, Tailwind for the UI, and a React-PDF renderer for the export. The only unusual choice is putting the authenticated app behind `/tools/resume-builder/app` while keeping a public `/tools/resume-builder` landing page for SEO.

The split matters because the landing page needs to be indexed, while the app behind auth should be kept out of Google. The `robots.ts` disallow rules and a per-page noindex take care of that. Codex wrote the robots config, Claude wrote the landing page copy — exactly the division of labor their strengths suggest.

## The PDF trap (both agents hit it)

Every resume builder eventually dies on PDF. The renderer choice sets a ceiling on what the product can do. I started with html-to-pdf wrappers, hit layout drift within a day, and had Codex migrate the pipeline to true React-PDF. The learning curve is worth it.

The trickiest constraint is that most ATS systems parse PDFs as if they were created in Word. The resume has to layout correctly and parse as plain-text correctly. Those two goals fight each other on almost every design decision — this is also exactly the kind of thing where having a second agent (Claude) checking the first agent's (Codex) output catches the subtle bugs.

## What Supabase solves and does not

Supabase auth is the right pick for a portfolio-scale product. Row-level security means users only see their own drafts without any API layer of my own. The migrations stay in the repo, which matches how the rest of the site is versioned.

What Supabase does not solve: transactional email at scale, PDF rendering, or anything that needs background jobs beyond a simple cron. If the product grew, I would reach for a dedicated worker and keep Supabase in the auth + data role it is good at.

## What I would do differently

Start with the two-agent setup from day one. I used a single-agent flow for the first week and the productivity delta was obvious once I added the second pane.

Design the data model around exportable blocks from day one. I started with a "resume" object and fought that shape for two iterations before switching to an append-only block model (each section is a typed block with an order field).

Build the public landing page first and the app second. I did it in the other order and the landing page ended up under-built. For SEO purposes, the landing page is the thing that compounds.

## Where to see it

The tool lives at [sabooralikhan.com/tools/resume-builder](https://sabooralikhan.com/tools/resume-builder). The case-study style write-up is at `/projects/my-portfolio-2026`. The full tools surface is at `/tools`.

If you are starting your own vibe-coding setup: two panes, two agents, git as the safety net, markdown files as the handoff. That is the whole thing. The tooling is not the hard part. The hard part is learning to stop typing and start directing.

---

*Originally published at [sabooralikhan.com/blog/building-resume-builder-nextjs-supabase](https://sabooralikhan.com/blog/building-resume-builder-nextjs-supabase).*

*About the author: [Saboor Ali Khan](https://sabooralikhan.com/about) is a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan focused on marketing automation, technical SEO, and workflow tools.*
