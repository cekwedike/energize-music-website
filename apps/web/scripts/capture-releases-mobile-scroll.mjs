import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-mobile-scroll');
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321';

const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
];

async function capture() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForSelector('[data-releases-listing]', { timeout: 30_000 });

    const firstStage = page.locator('[data-releases-section]').first();
    if (await firstStage.count()) {
      await firstStage.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await firstStage.screenshot({
        path: path.join(ARTIFACT_DIR, `releases-artist-stage-${viewport.name}.png`),
      });
    }

    await page.locator('[data-releases-listing]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `releases-page-${viewport.name}.png`),
      fullPage: false,
    });

    await page.close();
  }

  await browser.close();
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
