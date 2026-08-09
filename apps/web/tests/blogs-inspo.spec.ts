import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'blogs-inspo');

const VIEWPORTS = [
  { name: '1280', width: 1280, height: 900 },
  { name: '375', width: 375, height: 812 },
] as const;

test.beforeEach(async ({ page }) => {
  await page.route('**/*.mp4', (route) => route.abort());
  await page.route('**/*.mp3', (route) => route.abort());
});

for (const viewport of VIEWPORTS) {
  test.describe(`Blogs editorial @ ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('capture blogs page layout', async ({ page }) => {
      test.setTimeout(120_000);
      await page.goto('/blogs', { waitUntil: 'load', timeout: 60_000 });
      await page.waitForSelector('[data-blogs-hero]', { timeout: 30_000 });
      await page.waitForTimeout(500);

      const screenshotDir = path.join(ARTIFACT_DIR, viewport.name);
      fs.mkdirSync(screenshotDir, { recursive: true });

      await page.screenshot({
        path: path.join(screenshotDir, 'blogs-full-page.png'),
        fullPage: true,
      });

      const sections = [
        { selector: '[data-blogs-hero]', name: 'hero' },
        { selector: '[data-blogs-featured]', name: 'featured' },
        { selector: '[data-blogs-split]', name: 'split' },
        { selector: '[data-blogs-cta]', name: 'cta' },
      ];

      for (const section of sections) {
        const el = page.locator(section.selector);
        if (await el.count()) {
          await el.screenshot({
            path: path.join(screenshotDir, `blogs-${section.name}.png`),
          });
        }
      }
    });
  });
}
