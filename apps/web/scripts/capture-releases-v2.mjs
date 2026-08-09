import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-v2');
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321';

async function captureReleasesPage() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForSelector('[data-releases-hero]', { timeout: 30_000 });
  await page.waitForTimeout(900);

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'releases-hero-desktop.png'),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'releases-page-full.png'),
    fullPage: true,
  });

  const listing = page.locator('[data-releases-listing]');
  if (await listing.count()) {
    const artistPill = listing.locator('[data-releases-filter]:not([data-filter-slug="all"])').first();
    if (await artistPill.count()) {
      await artistPill.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'releases-filter-single-artist.png'),
        fullPage: false,
      });
    }

    await listing.locator('[data-releases-filter][data-filter-slug="all"]').click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'releases-filter-all.png'),
      fullPage: false,
    });
  }

  await browser.close();
}

captureReleasesPage().catch((error) => {
  console.error(error);
  process.exit(1);
});
