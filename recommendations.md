# SEO Recommendations — `www.sabooralikhan.com`

> Audit + recommendations for raising the portfolio's organic-search ranking. Generated 2026-05-04. Lives in the repo so future agents/Claude sessions working on this project can pick up where it left off.

## Context

Site ranks ~4-5th when Googling "Saboor Ali Khan" per the user (Google personalization makes that rosier than reality — anonymous search doesn't surface the site on page 1). Two real issues are limiting it:

1. **Authority gap.** ~19 backlinks from 16 referring domains, 0 ranking keywords, 0 organic traffic. Site launched October 2025 — only ~7 months old. Google hasn't trusted it yet.
2. **Entity collision.** "Saboor Ali Khan" SERPs are dominated by **Saboor Aly / Saboor Ali Ansari** (Pakistani actress, Wikipedia entry, 6M+ Instagram). Cannot displace her for the bare name. Can win for *qualified* variants: `saboor ali khan iba`, `saboor ali khan 10pearls`, `saboor ali khan marketing automation`, `marketing automation specialist pakistan`.

Targeting confirmed by user: **both** name-only AND topical phrases. Plan phases this — PK-localized branded queries first (months 1-2), global topical authority second (months 3-6).

The technical SEO foundation is already strong: full sitemap (`app/sitemap.ts`), robots.txt (`app/robots.ts`), JSON-LD Person/Organization/WebSite/ProfilePage/FAQPage/BlogPosting schemas (`lib/schema.ts`), IndexNow workflow (`.github/workflows/indexnow.yml`), GSC scripts (`scripts/gsc-*.mjs`). The site does NOT need *more* technical SEO scaffolding — it needs the bugs below shipped, more entity signals, more long-form content, and 3-6 months of patience.

**Constraint from the user:** do NOT use Ahrefs (any tool, any agent). Replace any Ahrefs-dependent monitoring with free tools: Google Search Console, Google Trends, PageSpeed Insights, Rich Results Test, schema.org validator, manual incognito SERP checks.

---

## Fresh live audit (2026-05-04)

Verified by curling production directly. The 2026-04-28 internal audit at `reports/gsc/technical-indexing-report.md` is still accurate — actually worse:

| Check | Expected | Actual | Status |
|---|---|---|---|
| `https://sabooralikhan.com/` | 308 → www | **200 OK** (serves identical content) | BROKEN |
| `https://www.sabooralikhan.com/` | 200 OK | 200 OK | ok |
| Sitemap host | `https://www.sabooralikhan.com/...` | `https://sabooralikhan.com/...` (48 URLs, 0 on www) | BROKEN |
| `<link rel="canonical">` on home | www host | `https://sabooralikhan.com` | BROKEN |
| `<meta property="og:url">` on home | www host | `https://sabooralikhan.com` | BROKEN |
| `portfolio-saboor-ali-khan.netlify.app/` | 404 (deindexable) | 404 | ok |
| `exportfoliosak.netlify.app/` | 301 → www | **200 OK** (live duplicate) | BROKEN |

### Why the canonical-host is broken in production

- `lib/site.ts:1-4` defaults `siteConfig.url` to `https://www.sabooralikhan.com` and normalizes any bare-host env var to www. The code is correct.
- But production renders `https://sabooralikhan.com` everywhere → **`NEXT_PUBLIC_SITE_URL` in Vercel Production is set to a value that bypasses the normalize.** Most likely it's set to `https://sabooralikhan.com` (the regex on line 3 should catch this; if it isn't, check whether the env var has a trailing slash or extra char that breaks the `^` anchor).
- Separately, `next.config.ts:6-20` declares a redirect from host `sabooralikhan.com` → www. Vercel routes non-primary domains at the edge before Next.js sees them, so this rule is dormant unless Vercel's domain config explicitly forwards traffic.

### Net effect on Google

Google sees two hosts (`sabooralikhan.com` and `www.sabooralikhan.com`) serving identical content with canonical pointing to the bare host. Authority is split. The 19 backlinks and any ranking signal are diluted across two hosts.

---

## Phase 0 — Ship the canonical-host fix (DO FIRST, BLOCKS EVERYTHING)

Two things must change. Both are configuration, not code.

### 0a. Fix Vercel domain config

In Vercel dashboard → Project → Settings → Domains:
1. Confirm both `sabooralikhan.com` AND `www.sabooralikhan.com` are attached.
2. **Set `www.sabooralikhan.com` as the primary domain.**
3. Click `sabooralikhan.com` (the bare one) → set it to **"Redirect to www.sabooralikhan.com"** with **status 308 (permanent)**.

After this, visiting `https://sabooralikhan.com/anything` returns a 308 with `Location: https://www.sabooralikhan.com/anything` *before* the request reaches Next.js. The `next.config.ts:6-20` redirect rule then becomes redundant (and that's fine — leave it as a safety net).

### 0b. Fix `NEXT_PUBLIC_SITE_URL`

In Vercel → Project → Settings → Environment Variables:
1. Find `NEXT_PUBLIC_SITE_URL` (Production scope).
2. Set to exactly `https://www.sabooralikhan.com` (no trailing slash, no `http://`, www prefix).
3. Save. Trigger a **fresh production deploy** (env var changes don't auto-redeploy).

After this, the sitemap, canonical tags, og:url, and every JSON-LD `url` field resolve to www.

### 0c. Verification (re-run after deploy)

```
curl -sI https://sabooralikhan.com/                           # expect: HTTP/* 308 + location: https://www.sabooralikhan.com/
curl -s  https://www.sabooralikhan.com/sitemap.xml | grep -c "https://www\."     # expect: 48+
curl -s  https://www.sabooralikhan.com/sitemap.xml | grep -c "https://sabooralikhan\.com"   # expect: 0
curl -s  https://www.sabooralikhan.com/ | grep -i 'rel="canonical"'              # expect: href on www host
curl -s  https://www.sabooralikhan.com/ | grep -i 'og:url'                        # expect: content on www host
```

### 0d. Google Search Console actions (after verification passes)

1. Keep both `sabooralikhan.com` and `www.sabooralikhan.com` properties for now (different data while reconciling).
2. On the **www** property: resubmit the sitemap (`https://www.sabooralikhan.com/sitemap.xml`).
3. URL Inspection → Request Indexing on these 11 high-value URLs: `/`, `/about`, `/projects`, `/blog`, `/contact`, `/faq`, `/marketing-automation`, `/technical-seo`, `/marketing-operations`, `/ai-workflows`, `/tools/resume-builder`.
4. Monitor Coverage report → "Duplicate, Google chose different canonical" should drop to 0 within ~14 days.
5. After ~30 days with the bare-host property showing zero impressions, leave it as a monitor or remove it.

---

## Phase 1 — Clean up the duplicate Netlify site

`exportfoliosak.netlify.app` still returns 200 with the old portfolio content. Replace its deploy with a redirect-only deploy:

1. Create a folder locally (anywhere — call it `netlify-redirect/`) with one file named `_redirects`. Content (one line):
   ```
   /*  https://www.sabooralikhan.com/:splat  301!
   ```
   The trailing `!` forces the redirect even when a file with the matching path also exists.
2. Optionally add an `index.html` saying "Moved to www.sabooralikhan.com" so search engines (and curious humans) see something if redirect headers are stripped.
3. Drag-drop the folder into Netlify (renamed site's deploy area). Netlify rebuilds with redirects only.
4. **Verify:** `curl -sI https://exportfoliosak.netlify.app/` returns `HTTP/* 301` with `location: https://www.sabooralikhan.com/`.

The old `portfolio-saboor-ali-khan.netlify.app` URL is already returning 404 → Google deindexes naturally over weeks/months. To speed it up: in GSC add `portfolio-saboor-ali-khan.netlify.app` as a temporary property (DNS-verify via Netlify's DNS panel if possible), then **Removals → New Request** for the URL prefix. Suppression lasts 6 months — enough time to drop naturally.

---

## Phase 2 — Strengthen entity disambiguation (the "I'm not the actress" layer)

### 2a. Tighten the home `<title>` and visible H1

Current title (`lib/site.ts:10`): `Saboor Ali Khan | Marketing Automation, Technical SEO, and Workflow Tools` — good. But the visible home `<h1>` (`app/page.tsx`) is just `Saboor Ali Khan`. Make it match the long-form: **"Saboor Ali Khan — Marketing Automation & Technical SEO"**.

Trade-off: weakens bare-name match (which can't beat the actress anyway), strongly pulls into a different SERP cluster, reinforces topical authority. This single change does the work of three SEO tweaks.

### 2b. Enrich the Person schema in `lib/schema.ts:22-134`

Add three fields to `buildPersonSchema()`:

- **`disambiguatingDescription`** — exact string: `"Pakistani marketing automation specialist; not to be confused with the Pakistani actress Saboor Aly."` This is *exactly* what schema.org `disambiguatingDescription` exists for.
- **`identifier`** — array of `{ "@type": "PropertyValue", propertyID: <name>, value: <id> }` for GitHub username (`SAK-124`), LinkedIn slug (`sabooralikhan`), and Wikidata Q-ID once minted.
- **`affiliation`** — array of full `Organization` nodes for IBA Karachi (with `sameAs: "https://www.wikidata.org/wiki/Q6039964"`) and 10Pearls Pakistan. Stronger than the current top-level `worksFor` — survives schema parser edge cases.

### 2c. Add BreadcrumbList schema + visible breadcrumbs

Currently absent on every nested page. Add `BreadcrumbList` JSON-LD on `/projects/[slug]`, `/experience/[slug]`, `/blog/[slug]`, `/tools/[slug]`, and the four topic pages, plus a visible `Home › Blog › Post title` component above each `<h1>`. Anchor text: use the topical phrase (link "Marketing Automation" to `/marketing-automation`, not "Topics").

Why: breadcrumbs render as a SERP feature that visually pushes competitors down and reinforces the site's topic taxonomy.

**Files to add:** `buildBreadcrumbSchema()` in `lib/schema.ts`, new `components/Breadcrumbs.tsx`, mount in each `[slug]/page.tsx`.

### 2d. Wikidata — honest path

The user has only one weak secondary source (a research paper co-authorship he can't fully recall). Realistic outcome: a Wikidata item with that single source will likely be tagged for deletion under WP:NOTABILITY within days.

**Recommendation: defer Wikidata until ~month 4-5.** In the meantime build sources:
- Land 1-2 Medium publication features (Better Marketing, The Startup) — counts as a publication byline.
- Pitch a 10Pearls "Life at 10Pearls" / careers blog feature (10Pearls is the strongest realistic source — DR ~50+, and they have an interest in featuring interns).
- Track down the research paper, get the full citation (authors, title, journal, year).
- Pitch IBA student publications (*Tabeer*, *The IBA Voice*, IBA Marketing Society blog) for one contributed essay.

Around month 4-5, attempt Wikidata as `Saboor Ali Khan (marketing automation specialist)` with `instance of: human`, `occupation: marketing automation specialist`, `educated at: IBA Karachi (Q6039964)`, `employer: 10Pearls`, `country of citizenship: Pakistan`, `official website: https://www.sabooralikhan.com`, `different from: Saboor Aly`. With 3-4 sources there's a real chance of surviving AfD.

Until Wikidata lands, most of the entity-graph benefit comes from enriched schema (2b) + consistent `sameAs` profiles (Phase 3) — Google's Knowledge Graph builds entities from cross-references even without Wikidata.

---

## Phase 3 — External profile reinforcement (low effort, high yield)

These build entity cross-references Google uses to disambiguate from the actress.

- **LinkedIn**
  - Headline: `BBA Marketing @ IBA Karachi · Digital Marketing Intern @ 10Pearls · Marketing Automation, Technical SEO, AI Workflows`
  - About section: open with `Saboor Ali Khan — BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan.` (front-loads recruiter-search match).
  - Featured links: portfolio, GEO pillar post (when published), resume builder, Wikidata blog post.
  - Custom URL: `linkedin.com/in/sabooralikhan/` (already set per `lib/site.ts:15`).

- **GitHub** — `github-profile-readme` repo at `C:\Users\saboor.alikhan\Desktop\Personal\github-profile-readme`. Confirm: prominent disambiguator near the top ("Not the Pakistani actress — different person."), portfolio link, list of pinned project repos that match `/projects/*` URLs (consistent naming → entity reinforcement), GitHub social-preview image matching the site's OG image.

- **Dev.to + Hashnode profiles** — same headline copy, link back to portfolio. Both DR 70+ → free `sameAs` authority transfer.

- **Add to Person schema `sameAs`** in `lib/schema.ts` — every external profile URL once live: GitHub, LinkedIn, Dev.to, Hashnode, Medium, Instagram (already there at line 45), Wikidata when it lands.

---

## Phase 4 — Content roadmap (8 posts over ~3 months)

Cadence: 1 new post every 10-12 days. Mix: 2 PK-localized (Phase 1 wins), 4 global topical (Phase 2 wins), 2 personal-brand reinforcement.

Trending-but-low-quality-coverage clusters (May 2026): Generative Engine Optimization (GEO/AEO), LLM SEO, agentic marketing automation, robots.txt for LLM crawlers, first-party / zero-party data post-cookies, Pakistan/South Asia MarTech (extremely thin English coverage — opportunity), vibe coding for non-engineers.

### #1 [PILLAR] Generative Engine Optimization (GEO): A Marketer's Operating Model for AI Overviews, ChatGPT, and Perplexity in 2026
- **Target:** `generative engine optimization`, `GEO marketing`, `AEO vs SEO`
- **Length:** 2,400-2,800 words. Hub piece, internally links to all clusters below.
- **Defensible:** extends the existing Wikidata post into a real framework; combines IBA marketing theory + 10Pearls technical-SEO practice.
- **Outline:** AEO/GEO/LLM-SEO definitions disambiguated → why entity graph beats keywords → four-layer monitoring stack (GSC + Google Trends + LLM citation logs + structured data) → Pakistani-market reality check → 90-day starter operating model.

### #2 Marketing Automation in Pakistan: What HubSpot, n8n, and Kwanzoo Actually Cost in PKR
- **Target:** `marketing automation pakistan`, `hubspot pakistan pricing`, `n8n karachi`
- **Length:** 1,800 words.
- **Defensible:** **almost nobody writes serious English content on this**. Geo-niche moat. The user is the rare credentialed voice (10Pearls + IBA).
- **Outline:** PK MarTech adoption snapshot (banks, telcos, D2C) → tool-by-tool cost in PKR with payment-gateway gotchas → local agency stack patterns → when self-hosted n8n beats HubSpot in PK → resource list.
- **PK win:** ranks for `marketing automation specialist pakistan`.

### #3 Robots.txt for LLM Crawlers: Training Bots vs Answer Bots, and Which to Block in 2026
- **Target:** `robots.txt llm crawlers`, `block GPTBot`, `allow OAI-SearchBot`
- **Length:** 1,200 words. Quick technical reference.
- **Outline:** the two bot families → per-bot table (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) → sample robots.txt → which to allow if you want LLM citations → how to verify (Cloudflare bot reports, server log analysis — free tools).

### #4 Agentic Marketing Workflows: Self-Optimizing n8n Patterns I Run at 10Pearls
- **Target:** `agentic marketing workflows`, `n8n agentic`, `self-optimizing automation`
- **Length:** 1,600 words.
- **Outline:** agentic vs deterministic → five patterns (re-prompt-on-failure, scoring loop, self-routing, evaluator-optimizer, human-in-the-loop gate) → n8n implementations with screenshots → when NOT to go agentic → cost ceilings.

### #5 Vibe Coding for Marketers: Building Internal Tools Without an Engineering Ticket
- **Target:** `vibe coding marketing`, `claude code for marketers`, `non-developer building tools`
- **Length:** 1,400 words. The user shipped the resume builder this way (`building-resume-builder-nextjs-supabase`) — walk-the-talk authority.
- **Outline:** what vibe coding is → marketer use cases (campaign QA, dashboard scrapers, lead-list cleaners) → step-by-step on a real micro-tool → where it breaks → handoff conventions to engineers.

### #6 First-Party Data for B2B SaaS in 2026: A Post-Cookie Playbook with Kwanzoo + HubSpot
- **Target:** `first-party data b2b 2026`, `kwanzoo abm`, `post cookie b2b`
- **Length:** 1,800 words.
- **Defensible:** 10Pearls runs Kwanzoo. Almost no public English content on Kwanzoo workflows = SERP white space.

### #7 Tracking LLM Citations Without Paid Tools: A Free Stack for Watching Your Brand in ChatGPT and Perplexity
- **Target:** `track llm citations`, `monitor chatgpt mentions`, `free brand monitoring llm`
- **Length:** 1,300 words.
- **Free-tools angle (per Ahrefs constraint):** ChatGPT/Perplexity manual prompt logs (weekly), Google Trends, GSC query reports, server log analysis for LLM user-agents.

### #8 IBA Karachi → 10Pearls: What a BBA Marketing Curriculum Misses About Real MarTech
- **Target:** `iba karachi marketing`, `bba marketing pakistan`, `martech career pakistan`
- **Length:** 1,400 words. Personal essay — strong recruiter-search match for `saboor ali khan iba`.

### Existing post fixes (do alongside #1-#8)

- **Unhide `technical-seo-monitoring-workflow`** in `data/blog.ts` (currently `hidden: true`). It's the strongest cluster anchor for pillar #1. Add an FAQ block (5 Qs) and attach `FAQPage` schema (builder exists at `lib/schema.ts:290`).
- **Update Wikidata post (`wikidata-modern-seo-entity-ranking`)** with a screenshot of the live Wikidata Q-ID once it exists (~month 5). Until then, add a "Status: pending" callout.
- **Add a 3-link "Related reading" footer block** to every blog post template — currently each post is an internal-linking island.
- **Confirm `Person` schema `@id` reference** as `author` on every BlogPosting (already done in `buildBlogPostingSchema:367` — verify the rendered HTML actually contains it).

---

## Phase 5 — Medium cross-posting

Originals on `sabooralikhan.com` always. **Wait 2-3 weeks** after each post lands (Google indexes the original first), then syndicate with canonical pointing back. On Medium use Settings → Customize Canonical Link, OR the "Import a story" flow which auto-sets canonical.

| Post | Medium publication |
|---|---|
| #1 GEO pillar | **Better Marketing** + **The Startup** |
| #2 Pakistan MarTech | **Entrepreneur's Handbook** |
| #3 Robots.txt LLM | (skip Medium — Dev.to fits better) |
| #4 Agentic n8n | **Better Programming** |
| #5 Vibe coding | **UX Collective** |
| #6 First-party data | **Marketing & Growth Hacking** |
| #7 LLM citation tracking | (skip Medium — Dev.to fits better) |
| #8 IBA essay | **The Startup** (personal essay format) |

**Never** publish externally before the original is indexed — that flips the canonical signal.

---

## Phase 6 — Low-effort backlinks

User opted out of guest-post outreach + ongoing community participation. This is the minimal one-time-submission set:

- **Product Hunt** — launch the resume builder. Maker profile + product page = two backlinks.
- **There's An AI For That, FuturePedia, BetaList** — submit the resume builder.
- **Awesome lists on GitHub** — open PRs to `awesome-n8n`, `awesome-claude-code`, `awesome-nextjs` (the portfolio repo qualifies). Link only when genuinely useful.
- **IBA student publications** — *Tabeer*, *The IBA Voice*, IBA Marketing Society blog. Pitch one of posts #2 or #8 as a contributed essay. Email-only — under 5 hours total work.
- **10Pearls "Life at 10Pearls" feature** — internal request to the user's manager. Highest-yield single backlink available (10Pearls' DR is ~50+).

That's ~6 backlinks in ~10 hours of work, plus residual from Medium syndications. Realistic: 16 → ~30 referring domains in 3 months at this effort level.

---

## Phase 7 — Verification and monitoring (free tools only, no Ahrefs)

**Weekly:**
- **Google Search Console** — `Performance → Search Results`. Filter for queries containing `saboor`, `marketing automation`, `technical seo`. Watch impressions before clicks.
- **GSC Coverage** — confirm "Duplicate, Google chose different canonical" count drops to 0 within 14 days of Phase 0 ship.
- **Manual SERP check** — incognito + Pakistani VPN, then incognito + US, search the queries below. Track positions in a spreadsheet.

**Monthly:**
- **Google Rich Results Test** (`https://search.google.com/test/rich-results`) on `/`, one project page, one blog post, one topic page → confirm Person, BreadcrumbList, BlogPosting, ItemList all validate.
- **Schema.org validator** (`https://validator.schema.org`) on the home page — ensure Person schema has all enrichments from Phase 2b.
- **PageSpeed Insights** on `/`, `/about`, `/projects`, `/blog`, `/tools/resume-builder` → mobile scores ≥ 90 across LCP/CLS/INP.
- **Google Trends** — monitor topic clusters (`marketing automation pakistan`, `generative engine optimization`, `agentic workflows`) for content-timing signals.

**Queries to track manually (PK + US incognito):**
- `saboor ali khan` — entity battle, slow climb
- `saboor ali khan iba` — winnable months 2-3
- `saboor ali khan 10pearls` — winnable fast
- `saboor ali khan marketing automation` — winnable month 2
- `saboor ali khan portfolio` — winnable fast (was being eaten by netlify, now should be the user's after Phase 1)
- `marketing automation specialist pakistan` — months 4-6 with content
- `marketing automation pakistan` — depends on post #2

---

## 90-day timeline at a glance

| Week | Action |
|---|---|
| 1 | Phase 0 (Vercel domain + env var fix). Phase 1 (Netlify `_redirects`). Phase 2a (H1). One deploy. |
| 2 | Phase 2b (Person schema). Phase 2c (breadcrumbs). Unhide hidden post. Update LinkedIn + GitHub. |
| 3-12 | Ship blog posts in this order (best ROI first): #2 Pakistan MarTech → #1 GEO pillar → #5 Vibe coding → #3 LLM robots.txt → #4 Agentic n8n → #8 IBA essay → #6 First-party data → #7 LLM citations. 1 every 10-12 days. Medium-syndicate each ~3 weeks after origin. |
| 6 | Pitch 10Pearls features blog. Submit resume builder to Product Hunt + directories. |
| 8 | Pitch IBA publications (post #2 or #8). |
| 10-12 | Re-evaluate Wikidata feasibility based on accumulated sources. |

---

## Critical files to modify

- Vercel dashboard: domain config + `NEXT_PUBLIC_SITE_URL` env var (Phase 0 — not a code change)
- New deploy folder with `_redirects` for the renamed Netlify site (Phase 1 — not in this repo)
- `app/page.tsx` — H1 text update (Phase 2a)
- `lib/schema.ts:22-134` — Person schema enrichment (Phase 2b); add `buildBreadcrumbSchema()` (Phase 2c)
- New: `components/Breadcrumbs.tsx` — visible breadcrumb component (Phase 2c)
- `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`, `app/experience/[slug]/page.tsx`, `app/tools/[slug]/page.tsx` — mount breadcrumbs + Related-reading footer
- `data/blog.ts` — unhide `technical-seo-monitoring-workflow`; add 8 new post entries
- `content/external-drafts/` — author 8 markdown drafts
- `C:\Users\saboor.alikhan\Desktop\Personal\github-profile-readme\README.md` — disambiguator + portfolio link

---

## Out of scope (per user's stated constraints)

- Guest-post outreach / ongoing community participation — user opted out
- Paid link building, PBNs, Fiverr packages — never recommended
- Ahrefs-dependent monitoring — replaced with GSC + Trends + manual SERP checks per user constraint (do NOT use Ahrefs MCP for any work on this project)
- Internationalization / hreflang — single-locale site

---

## Honest expectation-setting

- **Weeks 1-2 (post-canonical fix):** GSC Coverage normalizes, www becomes the sole canonical. No ranking change yet — Google needs time to recrawl.
- **Weeks 3-6:** Impressions in GSC start climbing for branded variants (`saboor ali khan iba`, `saboor ali khan portfolio`). Rankings on those land in positions 4-10.
- **Weeks 6-12:** First two pillar posts indexed and ranking for long-tail topical queries. Backlinks from Medium syndications and Product Hunt land. Branded queries climb to top 3.
- **Months 4-6:** Topical authority builds. `marketing automation pakistan` reachable. `marketing automation specialist pakistan` competitive. Bare `saboor ali khan` may climb to top 5 globally on a good month — but the actress will still own positions 1-3.

The bare-name fight is partly unwinnable. The qualified-name fight is very winnable. Plan around that.
