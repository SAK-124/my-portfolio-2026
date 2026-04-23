#!/usr/bin/env node
/**
 * IndexNow submitter for sabooralikhan.com.
 *
 * IndexNow is a free protocol supported by Bing, Yandex, Seznam, Naver, and Yep.
 * (Google does not currently support IndexNow — for Google, submit the sitemap
 * in Search Console.) One POST hits all the IndexNow partners at once.
 *
 * Usage:
 *   npm run indexnow                                    # submits everything in the live sitemap
 *   npm run indexnow -- /blog/some-slug /projects/foo  # submits just those URLs
 *   npm run indexnow -- --sitemap https://host/sm.xml  # use a specific sitemap
 *
 * Env overrides:
 *   INDEXNOW_HOST  (default: sabooralikhan.com)
 *   INDEXNOW_KEY   (default: the repo key below)
 *   INDEXNOW_SITEMAP_URL (default: https://{host}/sitemap.xml)
 */

const HOST = process.env.INDEXNOW_HOST || 'sabooralikhan.com'
const KEY = process.env.INDEXNOW_KEY || 'a8f4c2e6b31d7059af8c4e2b7d3f1096'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const DEFAULT_SITEMAP = process.env.INDEXNOW_SITEMAP_URL || `https://${HOST}/sitemap.xml`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

// Chunked submission: IndexNow allows up to 10,000 URLs per request, but most
// partners throttle over ~1,000. Batch into chunks of 500 to stay safe.
const CHUNK_SIZE = 500

function parseArgs(argv) {
  const out = { sitemap: null, explicitUrls: [] }
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--sitemap') {
      out.sitemap = argv[++i]
    } else if (arg.startsWith('--sitemap=')) {
      out.sitemap = arg.slice('--sitemap='.length)
    } else if (arg.startsWith('-')) {
      console.warn(`Ignoring unknown flag: ${arg}`)
    } else {
      out.explicitUrls.push(arg)
    }
  }
  return out
}

function toAbsoluteUrl(input) {
  if (/^https?:\/\//.test(input)) return input
  const path = input.startsWith('/') ? input : `/${input}`
  return `https://${HOST}${path}`
}

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'indexnow-submitter' } })
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: ${res.status}`)
  }
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (urls.length === 0) {
    throw new Error(`No <loc> entries found in sitemap ${sitemapUrl}`)
  }
  return urls
}

async function submit(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  const text = await res.text().catch(() => '')
  return { status: res.status, text }
}

async function main() {
  const args = parseArgs(process.argv)

  let urls
  if (args.explicitUrls.length > 0) {
    urls = args.explicitUrls.map(toAbsoluteUrl)
    console.log(`[indexnow] Submitting ${urls.length} explicit URL(s).`)
  } else {
    const sitemapUrl = args.sitemap || DEFAULT_SITEMAP
    console.log(`[indexnow] Fetching sitemap: ${sitemapUrl}`)
    urls = await fetchSitemapUrls(sitemapUrl)
    console.log(`[indexnow] Found ${urls.length} URL(s) in sitemap.`)
  }

  urls = [...new Set(urls)].filter((u) => u.startsWith(`https://${HOST}`))

  if (urls.length === 0) {
    console.error(`[indexnow] No URLs to submit under host ${HOST}.`)
    process.exit(1)
  }

  console.log(`[indexnow] Host: ${HOST}`)
  console.log(`[indexnow] Key:  ${KEY}`)
  console.log(`[indexnow] Key location: ${KEY_LOCATION}`)
  console.log(`[indexnow] Submitting ${urls.length} URL(s) in chunks of ${CHUNK_SIZE}...\n`)

  let submitted = 0
  let failures = 0

  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE)
    try {
      const { status, text } = await submit(chunk)
      const ok = status === 200 || status === 202
      console.log(
        `[indexnow] Chunk ${i / CHUNK_SIZE + 1}: ${ok ? 'OK' : 'FAIL'} (HTTP ${status}) for ${chunk.length} URL(s)${text ? ` — ${text.slice(0, 200)}` : ''}`,
      )
      if (ok) submitted += chunk.length
      else failures += chunk.length
    } catch (err) {
      failures += chunk.length
      console.error(`[indexnow] Chunk ${i / CHUNK_SIZE + 1} errored:`, err.message)
    }
  }

  console.log('')
  console.log(`[indexnow] Submitted: ${submitted}`)
  console.log(`[indexnow] Failed:    ${failures}`)

  if (failures > 0 && submitted === 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[indexnow] Fatal error:', err)
  process.exit(1)
})
