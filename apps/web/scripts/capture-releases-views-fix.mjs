import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-views-fix');
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4321';

const VIEWPORTS = [
  { name: '320', width: 320, height: 640 },
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1280', width: 1280, height: 900 },
];

const VIEW_MODES = ['grid', 'list', 'compact'];

async function capture() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    for (const mode of VIEW_MODES) {
      if (viewport.width < 1024 && mode !== 'list') continue;

      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
      });
      await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForSelector('[data-releases-listing]', { timeout: 30_000 });

      if (viewport.width >= 1024) {
        await page.locator(`[data-releases-view="${mode}"]`).click();
        await page.waitForTimeout(350);
      }

      const activeMode = viewport.width >= 1024 ? mode : 'list';
      await page.locator('[data-releases-listing]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `releases-${activeMode}-${viewport.name}.png`),
        fullPage: false,
      });
      await page.close();
    }
  }

  for (const viewport of VIEWPORTS.filter((item) => item.width <= 768)) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    await page.goto(`${BASE_URL}/artists/greatman-takit`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    const discography = page.locator('.discography');
    if (await discography.count()) {
      await discography.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await discography.screenshot({
        path: path.join(ARTIFACT_DIR, `discography-greatman-takit-${viewport.name}.png`),
      });
    }
    await page.close();
  }

  await browser.close();
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
