# External blog drafts

These markdown files are ready-to-publish exports of posts from `data/blog.ts`, sized for **Medium** and **Dev.to**.

## How to use

### Dev.to
1. Go to https://dev.to/new
2. Paste the full contents of a file (including the YAML frontmatter block at the top).
3. Dev.to reads `canonical_url`, `tags`, `title`, and `description` from the frontmatter — no manual fields needed.
4. Keep `published: false` for a draft, switch to `true` to publish.

### Medium
1. Go to https://medium.com/new-story
2. Paste the contents below the frontmatter (Medium ignores the `---` block — you can delete it or just scroll past).
3. Re-apply headings with the `#` / `##` toolbar or just paste the raw markdown (Medium auto-formats most of it).
4. Add the canonical link manually: three-dot menu → More settings → Customize canonical link → paste the URL.

## Canonical link

Every post must keep its canonical URL pointing back to `https://sabooralikhan.com/blog/{slug}` so Google does not penalize the republish as duplicate content. Dev.to handles this automatically via frontmatter; Medium needs the manual step above.

## Tags

The frontmatter already has suggested tags. Medium allows up to 5 per story — pick the top 5. Dev.to allows up to 4 — pick the top 4.

## Order to publish

If you are only going to publish a few, these are the ranked picks by traffic potential vs. brand safety:

1. **n8n-vs-zapier-vs-make-marketing-automation-2026** — highest search volume, evergreen comparison query
2. **wikidata-modern-seo-entity-ranking** — contrarian take, strong shareability in SEO circles
3. **vibe-coding-with-codex-and-claude-code-parallel** — on-trend topic, good dev-community fit
4. **technical-seo-monitoring-workflow** — narrower audience but high-signal readers
5. **ai-workflows-for-marketing-operations** — broad AI-interest audience
6. **marketing-automation-as-an-iba-marketing-student** — strong for personal brand, narrower traffic
