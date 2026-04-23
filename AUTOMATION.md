# Deploy & indexing automation

This doc explains everything that runs automatically when you push to `main`, plus the one-time manual steps to turn it all on. Pass this file to any dev agent or copy-paste the steps.

---

## What runs automatically

| Trigger | What happens | Who does it |
|---|---|---|
| `git push` to `main` | Vercel builds and deploys to production | Vercel GitHub app |
| Vercel deploy succeeds | GitHub Actions submits all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep) | `.github/workflows/indexnow.yml` |
| Manual click in Actions tab | You can ping IndexNow for specific URLs without a deploy | workflow_dispatch input |

Google does **not** support IndexNow. Google picks up the sitemap on its own crawl schedule after it's submitted once in Search Console.

---

## One-time setup (5 minutes)

### 1. Push this repo to GitHub

If the repo isn't already on GitHub:

```bash
git add .
git commit -m "Add SEO + IndexNow automation"
git push origin main
```

If you're using a different default branch name, update `.github/workflows/indexnow.yml` — the workflow filter is already set up for Vercel's default `Production` environment name, not the branch name, so you usually don't need to change anything.

### 2. Make sure Vercel's GitHub integration is connected

It almost certainly already is if Vercel auto-deploys on push. If not:

- Vercel dashboard → Settings → Integrations → install/enable **GitHub**
- Project → Settings → Git → ensure the repo is linked and Production branch is `main`

No other Vercel config is needed. The workflow reacts to the deploy-status events that Vercel's GitHub app emits on your behalf.

### 3. Make sure GitHub Actions is enabled

- Repo → Settings → Actions → General → **Allow all actions and reusable workflows**
- Under "Workflow permissions," `Read` is enough. The default is fine.

### 4. Submit the sitemap to Google once (Google doesn't use IndexNow)

- [Google Search Console](https://search.google.com/search-console) → add property `https://sabooralikhan.com`
- Verify via DNS TXT record or HTML file (easier on Vercel is the "DNS" method via your domain provider)
- Sitemaps → add new → `https://sabooralikhan.com/sitemap.xml`

### 5. Submit the sitemap to Bing (seeds IndexNow's host key for faster propagation)

- [Bing Webmaster Tools](https://www.bing.com/webmasters) → sign in → "Import from Search Console" (one click if you just did step 4)
- Add the sitemap the same way
- Settings → IndexNow → the dashboard auto-detects the public key file at `https://sabooralikhan.com/36016d80af624501bea1ee9355292ea5.txt` once a submission comes in

### 6. Trigger the first IndexNow submission manually

- Repo → Actions → **Submit to IndexNow after deploy** → Run workflow
- Leave the "urls" input empty → submits everything in the live sitemap
- You should see per-chunk `HTTP 200` or `HTTP 202` responses in the logs

From here on, every production deploy auto-submits. You do not need to push this workflow again.

---

## Testing / manual use

**Ping one URL after editing it**:
- Actions tab → Submit to IndexNow → Run workflow → paste `/blog/my-new-post` in the `urls` input

**Ping from your laptop without going through Actions**:
```bash
npm run indexnow                              # full sitemap
npm run indexnow -- /blog/slug /projects/x    # specific paths
```

**Verify the IndexNow key is live**:
Open `https://sabooralikhan.com/36016d80af624501bea1ee9355292ea5.txt` in a browser. It should return the raw hex string `36016d80af624501bea1ee9355292ea5` with content-type `text/plain`.

---

## Troubleshooting

**The workflow never runs after a deploy**:
- Vercel's GitHub integration may not be installed. Check your Vercel project → Settings → Git → "Connected Git Repository."
- If it's installed but still not firing, Vercel isn't emitting a `deployment_status` event with `environment: Production`. As a fallback, change the trigger in `.github/workflows/indexnow.yml` to:
  ```yaml
  on:
    push:
      branches: [main]
  ```
  And bump the `sleep 20` to `sleep 90` to give Vercel time to finish the build.

**IndexNow returns HTTP 422 (invalid key)**:
- The key file at `/public/<key>.txt` was deleted or renamed. The filename, file contents, and the `INDEXNOW_KEY` env in the workflow must all match the 32-char hex string.

**IndexNow returns HTTP 429 (too many requests)**:
- You're running the workflow too often. Restrict to deploy-success events only (already the default) and don't manually dispatch more than once per hour.

**IndexNow returns HTTP 400 for specific URLs**:
- The URL doesn't resolve (404 on the live site). Check the page is actually deployed.

---

## Alternative: Vercel Deployment Webhook (if you stop using GitHub Actions)

If you ever move off GitHub Actions, you can replace it with a Vercel Deployment Webhook pointing at a tiny serverless endpoint. High level:

1. Create a Next.js API route, e.g. `app/api/indexnow-hook/route.ts`, that accepts `POST`, verifies a shared secret header, and runs the submission logic from `scripts/indexnow.mjs`.
2. Generate a secret, add it to Vercel → Project → Settings → Environment Variables as `INDEXNOW_HOOK_SECRET`.
3. Vercel → Project → Settings → Webhooks → add webhook → event `deployment.succeeded` → URL `https://sabooralikhan.com/api/indexnow-hook?secret=<shared>`.

This is strictly more complex than the GitHub Action. Only do it if you leave GitHub entirely.

---

## Files involved

- `.github/workflows/indexnow.yml` — the GitHub Action
- `scripts/indexnow.mjs` — the submission script (works both locally and in CI)
- `public/36016d80af624501bea1ee9355292ea5.txt` — IndexNow host key (must be publicly fetchable)
- `app/sitemap.ts` — the Next.js sitemap route that gets submitted

If you rotate the IndexNow key: generate a new 32-char hex string, rename the public key file to match, and update the default in `scripts/indexnow.mjs`. No other file needs to change.
