# Manual action checklist — SEO rollout

Everything that requires your accounts, credentials, or external services. Work top-to-bottom: earlier items unblock later ones.

Estimated total time if you do it all in one sitting: **~2 hours** (most of which is waiting for verification DNS propagation and Wikidata review).

---

## Phase 1 — Ship the code

Nothing else on this list matters until the code is live.

- [ ] **Review the local changes** (staged in `my-portfolio-2026`)
  - All code changes pass `npm run build` — last run was clean (47 routes)
  - 6 blog posts are included but all marked `status: 'draft'` so they carry `noindex` and stay out of the sitemap until you flip them
  - Files changed/added are listed in [AUTOMATION.md](./AUTOMATION.md) and in the session transcript

- [ ] **Commit the changes**
  ```bash
  cd my-portfolio-2026
  git add .
  git commit -m "Add SEO overhaul, blog, IndexNow automation, schema expansion"
  ```

- [ ] **Push to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Confirm Vercel deployed successfully**
  - Vercel dashboard → project → latest deployment shows green
  - Visit `https://sabooralikhan.com` and spot-check: `/blog`, `/blog/wikidata-modern-seo-entity-ranking`, `/about`
  - Expected: 6 blog posts visible with "Draft · not yet indexed" labels

---

## Phase 2 — Turn on the automation

- [ ] **Enable GitHub Actions** (usually on by default)
  - Repo → Settings → Actions → General → *Allow all actions and reusable workflows*
  - Workflow permissions: *Read repository contents* is sufficient

- [ ] **Run IndexNow workflow manually once**
  - Repo → Actions tab → "Submit to IndexNow after deploy" → *Run workflow* button
  - Leave the "urls" input empty → submits the whole live sitemap
  - Expected: per-chunk `HTTP 200` or `HTTP 202` responses in the log
  - If you see `HTTP 422`: the key file didn't deploy — check `https://sabooralikhan.com/36016d80af624501bea1ee9355292ea5.txt` returns the key string as plain text

- [ ] **Verify the IndexNow key file is live**
  - Open `https://sabooralikhan.com/36016d80af624501bea1ee9355292ea5.txt` in a browser
  - Should show only: `36016d80af624501bea1ee9355292ea5`

From here on, every production deploy auto-pings IndexNow — no further action needed.

---

## Phase 3 — Submit to search engines

Google and Bing are the only two that matter for a Pakistan-audience English site. Yandex + Naver come free via IndexNow.

### Google Search Console (biggest single SEO action)

- [ ] **Add property**
  - Go to [search.google.com/search-console](https://search.google.com/search-console)
  - Add property → **Domain** property type → enter `sabooralikhan.com`
  - Verify via DNS TXT record (your domain registrar settings)

- [ ] **Submit sitemap**
  - GSC → Sitemaps → Add new → `sitemap.xml` (relative — GSC prepends the domain)
  - Status should go to "Success" within minutes

- [ ] **Request manual indexing for top 3 pages**
  - GSC → URL Inspection → paste each → "Request indexing":
    1. `https://sabooralikhan.com/`
    2. `https://sabooralikhan.com/about`
    3. `https://sabooralikhan.com/tools/resume-builder`
  - Google won't always honor, but the ask is free

- [ ] **Check Coverage tab in 1–2 weeks**
  - Target: 30+ indexed pages within 2 weeks
  - If pages are "Discovered — not indexed" for >3 weeks, the content may be too thin or duplicated

### Bing Webmaster Tools

- [ ] **Add + import from GSC**
  - [bing.com/webmasters](https://www.bing.com/webmasters) → sign in with any Microsoft account
  - Click "Import from Google Search Console" → one-click imports site + sitemap + verification

- [ ] **Confirm IndexNow is active in Bing dashboard**
  - Bing WMT → Settings → IndexNow → should show the key file detected at `https://sabooralikhan.com/36016d80af624501bea1ee9355292ea5.txt`
  - Recent submissions panel should show the batch you pushed in Phase 2

### Verify OG image renders everywhere

- [ ] **Test on all major platforms**
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) → paste `https://sabooralikhan.com` → should render the 1200×630 branded image
  - [Facebook/Meta Debugger](https://developers.facebook.com/tools/debug/) → same
  - [Twitter/X Card Validator](https://cards-dev.twitter.com/validator) (deprecated but still works) or just post the URL in a draft DM
  - If LinkedIn caches the old SVG: click "Scrape again" in the Post Inspector

---

## Phase 4 — Entity / authority (the celebrity-disambiguation moves)

### Wikidata (highest-leverage item on the list)

- [ ] **Create a Wikidata account**
  - [wikidata.org](https://www.wikidata.org) → top-right → Create account
  - Use your real name as username (reduces spam-flag risk)

- [ ] **Search for existing "Saboor Ali Khan" entries**
  - Confirm the actress is there (she is)
  - You are adding a **separate** item, not editing hers

- [ ] **Create the item**
  - Wikidata → *Special:NewItem*
  - Fields:
    - **Label**: `Saboor Ali Khan`
    - **Description**: `marketing automation and technical SEO professional based in Karachi, Pakistan`
    - **Aliases**: `Saboor Khan`, `SAK-124`

- [ ] **Add statements (P-codes are Wikidata properties — search them in the interface)**
  - `P31` (instance of) → `Q5` (human)
  - `P27` (country of citizenship) → `Q843` (Pakistan)
  - `P69` (educated at) → search & link to "Institute of Business Administration, Karachi"
  - `P69` (educated at) → second entry for "The International School, Karachi" if it has an item; skip if not
  - `P108` (employer) → search & link to "10Pearls"
  - `P106` (occupation) → `Q13424456` (marketer) and optionally `Q82594` (web developer)
  - `P19` (place of birth) → `Q8660` (Karachi) — only if you're comfortable publishing
  - `P569` (date of birth) → add year-only if you prefer privacy

- [ ] **Add identifier properties** (these are what AI models actually pick up)
  - `P856` (official website) → `https://sabooralikhan.com`
  - `P2037` (GitHub username) → `SAK-124`
  - `P6634` (LinkedIn personal profile ID) → `sabooralikhan`
  - `P2003` (Instagram username) → `saboor.a.khan`

- [ ] **Add references for every statement**
  - This is the make-or-break step. Unreferenced statements get flagged.
  - For each statement, click "add reference" → use the `P854` (reference URL) property
  - Acceptable sources: your own portfolio URL, an IBA student directory page if available, a 10Pearls team page if public, any news mention

- [ ] **Save and copy the Q-number**
  - After publishing, the URL becomes `https://www.wikidata.org/wiki/Q<number>`
  - **Keep the Q-number** — you'll need it in the next step

- [ ] **Link back from your site** (small code change)
  - Edit [`lib/schema.ts`](my-portfolio-2026/lib/schema.ts) line ~37 — the `sameAs` array inside `buildPersonSchema`
  - Add: `'https://www.wikidata.org/wiki/Q<number>'`
  - Commit and push — closes the loop for Google's entity graph

### LinkedIn optimization (biggest single non-code move)

- [ ] **Confirm vanity URL is `linkedin.com/in/sabooralikhan`**
  - LinkedIn → Profile → Edit public profile & URL → should match. If not, grab it now.

- [ ] **Rewrite headline**
  - Paste exactly: `Saboor Ali Khan | Marketing Automation & Technical SEO at 10Pearls | BBA Marketing, IBA Karachi`
  - LinkedIn headline has a 220-char limit and is indexed heavily by Google

- [ ] **Rewrite About section — first sentence is what Google sees**
  - Open with: `Saboor Ali Khan is a BBA Marketing student at IBA Karachi and Digital Marketing Intern at 10Pearls Pakistan, focused on marketing automation, technical SEO, AI workflows, and workflow tools.`
  - Then add 2–3 paragraphs on what you do / what you're looking for
  - Close with: `Portfolio: https://sabooralikhan.com · GitHub: SAK-124`

- [ ] **Add Contact Info → Website**
  - Type: "Portfolio"
  - URL: `https://sabooralikhan.com`

- [ ] **Featured section — pin these**
  - Link 1: `https://sabooralikhan.com` (title: "My Portfolio")
  - Link 2: `https://sabooralikhan.com/tools/resume-builder` (title: "Resume Builder — A Free Tool I Built")
  - Link 3: Your top blog post once published

- [ ] **Open to work settings**
  - Toggle "Open to work" with marketing operations, SEO, automation as target roles
  - Shows the green #OpenToWork ring — worth the marginal stigma for entry-level roles

### GitHub profile README

- [ ] **Create the special repo**
  - GitHub → New repository → name: `SAK-124` (must match your username exactly)
  - Must be **public** — GitHub's profile README feature requires this
  - Initialize with a README (any content — you'll overwrite)

- [ ] **Push the local README content**
  - Copy [`github-profile-readme/README.md`](github-profile-readme/README.md) in this repo
  - Paste as the README of the new `SAK-124/SAK-124` repo
  - Commit → it renders on `https://github.com/SAK-124` instantly

- [ ] **Verify the live render**
  - Visit `https://github.com/SAK-124`
  - Tables should render, all links should work, disambiguation footnote should be visible

---

## Phase 5 — Publish blog content

Your 6 blog posts are drafted and visible internally but blocked from Google. Promote them one at a time — spreads the freshness signal and lets you adjust each after feedback.

### Recommended publish order (ranked by traffic / authority potential)

1. `n8n-vs-zapier-vs-make-marketing-automation-2026` — highest-volume search query
2. `wikidata-modern-seo-entity-ranking` — contrarian take, high shareability in SEO circles
3. `building-resume-builder-nextjs-supabase` (the vibe-coding one) — on-trend with dev audience
4. `technical-seo-monitoring-workflow` — narrower but high-signal readers
5. `ai-workflows-for-marketing-operations` — broad AI-interest audience
6. `marketing-automation-as-an-iba-marketing-student` — strong for personal brand, narrower traffic

### Per post, do this:

- [ ] **Read the post at `sabooralikhan.com/blog/<slug>`** (currently `noindex`)

- [ ] **Edit as needed** — change copy in [`data/blog.ts`](my-portfolio-2026/data/blog.ts) for that post

- [ ] **Promote to published**
  - In `data/blog.ts`, change the post's `status: 'draft'` → `status: 'published'`
  - Commit + push → Vercel deploys → GitHub Action auto-pings IndexNow for the new URL

- [ ] **Request Google indexing** (not automatic — GSC → URL Inspection → paste the post URL → Request indexing)

- [ ] **Publish the external variant** (Medium or Dev.to, pick one)
  - Dev.to path:
    - Open `content/external-drafts/<N>-<slug>.md`
    - Paste the full contents into [dev.to/new](https://dev.to/new)
    - Change frontmatter `published: false` → `published: true`
    - Publish
  - Medium path:
    - Open the same `.md` file
    - Skip the frontmatter block (the `---`…`---` section)
    - Paste the rest into [medium.com/new-story](https://medium.com/new-story)
    - Publish → then **Menu (⋯) → More settings → Customize canonical link** → paste `https://sabooralikhan.com/blog/<slug>`
    - This step is critical. Without it, Medium competes with your own site on Google.

- [ ] **Wait 5–7 days before publishing the next one**
  - Avoids self-competition on your own feeds
  - Lets each post settle into its own SERP without churn

---

## Phase 6 — Ongoing monitoring (weekly, 10 min)

- [ ] **Week 1–2: Verify indexation**
  - GSC → Coverage → should see pages moving from "Discovered" to "Indexed"
  - If stuck at <10 indexed pages after 2 weeks, open URL Inspection for 5 pages and manually request

- [ ] **Weekly: Track rising queries**
  - GSC → Performance → Queries → sort by impressions
  - Look for "saboor" + new term combinations appearing — that's the long-tail working
  - Note which queries are position 4–15: those are the ones to write more content around

- [ ] **Monthly: Check name SERP from incognito**
  - Open a private browser window, search `saboor ali khan`
  - Target progression:
    - Month 1: your site appears on page 2–3
    - Month 3: page 1–2 with Wikidata effects kicking in
    - Month 6: consistent page 1 for any `saboor ali khan + <qualifier>` query
  - Take a screenshot monthly so you have a baseline

- [ ] **Monthly: Check knowledge panel / AI responses**
  - Google → search `saboor ali khan marketing` → does a knowledge card appear on the right?
  - ChatGPT → ask "who is saboor ali khan in marketing?" → does it describe you correctly?
  - Perplexity, Claude, Gemini — same prompt
  - If AI answers drift or use stale info, update `/llms.txt` and `/llms-full.txt` (already wired — just edit `app/llms.txt/route.ts`)

---

## Housekeeping (one-off, do whenever)

- [ ] Delete the now-unused `public/og-default.svg` (dynamic OG has replaced it)
- [ ] Update `profile.certifications[0].year` if '2026' is still placeholder
- [ ] Update `experience[0].startLabel: 'March 2026'` if the actual start date changes
- [ ] Update the Wikidata Q-number in `sameAs` once the Wikidata entry is approved (see Phase 4)
- [ ] If you rotate the IndexNow key: rename `public/<key>.txt`, update the default in `scripts/indexnow.mjs`, update the `keyLocation` in the workflow file

---

## What I cannot do — why it's on you

| Task | Why |
|---|---|
| Google Search Console | Needs your Google account + DNS access to verify domain |
| Bing Webmaster Tools | Needs Microsoft account sign-in |
| Wikidata entry | Community-moderated — would be flagged and deleted if submitted by a bot |
| LinkedIn edits | Requires your account |
| GitHub profile repo | Requires your GitHub auth to create the `SAK-124/SAK-124` repo |
| Medium / Dev.to publishing | Requires your accounts |
| Domain DNS records | Under your registrar |

Everything else — the code, the schemas, the sitemap, the IndexNow wiring, the blog drafts, the external markdown exports — is already in the repo and deploys itself.

---

## Quick reference — files to know

- [`AUTOMATION.md`](./AUTOMATION.md) — deploy pipeline and IndexNow details
- [`data/blog.ts`](my-portfolio-2026/data/blog.ts) — blog posts (change `status` to publish)
- [`lib/schema.ts`](my-portfolio-2026/lib/schema.ts) — Person, Organization, all structured data (add Wikidata URL here)
- [`content/external-drafts/`](my-portfolio-2026/content/external-drafts/) — Medium + Dev.to drafts
- [`data/profile.ts`](my-portfolio-2026/data/profile.ts) — personal data that feeds half the site
- [`github-profile-readme/README.md`](github-profile-readme/README.md) — paste into GitHub profile repo
