import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-tidal');
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321';

async function captureArtistSection(slug, filename) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(900);

  const section = page.locator(`[data-artist-slug="${slug}"]`);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await section.screenshot({ path: path.join(ARTIFACT_DIR, filename) });
  await browser.close();
}

const slug = process.argv[2] ?? 'greatman-takit';
const filename = process.argv[3] ?? 'artist-stage-desktop.png';

captureArtistSection(slug, filename).catch((error) => {
  console.error(error);
  process.exit(1);
});
