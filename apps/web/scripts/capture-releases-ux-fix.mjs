import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-ux-fix');
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321';

const VIEWPORTS = [
  { name: '375-mobile', width: 375, height: 812 },
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '1280-desktop', width: 1280, height: 900 },
];

async function capture() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForSelector('[data-releases-hero]', { timeout: 30_000 });
    await page.waitForTimeout(700);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `releases-hero-${viewport.name}.png`),
      fullPage: false,
    });

    const spotlight = page.locator('.release-spotlight');
    if (await spotlight.count()) {
      await spotlight.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await spotlight.screenshot({
        path: path.join(ARTIFACT_DIR, `releases-spotlight-${viewport.name}.png`),
      });
    }

    const listing = page.locator('[data-releases-listing]');
    if (await listing.count()) {
      await listing.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `releases-listing-${viewport.name}.png`),
        fullPage: false,
      });

      if (viewport.width >= 1024) {
        await page.locator('[data-releases-view="compact"]').click();
        await page.waitForTimeout(350);
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `releases-compact-${viewport.name}.png`),
          fullPage: false,
        });
      }
    }

    await page.close();
  }

  for (const viewport of VIEWPORTS.slice(0, 2)) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.locator('.about-values-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('.about-values-viewport').screenshot({
      path: path.join(ARTIFACT_DIR, `about-values-${viewport.name}.png`),
    });
    await page.close();
  }

  await browser.close();
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
