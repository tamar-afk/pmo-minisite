/**
 * Exports the built site to a full-page PDF.
 * Scrolls the page first so scroll-triggered animations (Framer useInView) run
 * and content is visible: plain headless print often captures blank sections.
 */
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const PORT = 4173
const OUT = join(root, 'pmo-minisite.pdf')
const URL = `http://127.0.0.1:${PORT}/`

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function waitForServer(maxMs = 90_000) {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(URL)
      if (res.ok) return
    } catch {
      /* not ready */
    }
    await sleep(250)
  }
  throw new Error(`Server at ${URL} did not respond within ${maxMs}ms`)
}

async function scrollToRevealAll(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms))
    const step = 350
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y)
      await delay(100)
    }
    await delay(600)
    window.scrollTo(0, h)
    await delay(400)
    window.scrollTo(0, 0)
    await delay(300)
  })
}

async function launchBrowser() {
  try {
    return await chromium.launch({
      channel: 'chrome',
      args: ['--disable-dev-shm-usage'],
    })
  } catch {
    return await chromium.launch({ args: ['--disable-dev-shm-usage'] })
  }
}

async function main() {
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: 'ignore',
  })

  try {
    await waitForServer()
    const browser = await launchBrowser()
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 120_000 })
    await sleep(800)
    await scrollToRevealAll(page)
    await sleep(1500)

    await page.pdf({
      path: OUT,
      printBackground: true,
      fullPage: true,
    })
    await browser.close()
    console.log(`Wrote ${OUT}`)
  } finally {
    preview.kill('SIGTERM')
    await sleep(300)
    try {
      preview.kill('SIGKILL')
    } catch {
      /* ignore */
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
