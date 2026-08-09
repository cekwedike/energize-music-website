import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'blogs-redesign');

const VIEWPORTS = [
  { name: '1280', width: 1280, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
] as const;

test.beforeEach(async ({ page }) => {
  await page.route('**/*.mp4', (route) => route.abort());
  await page.route('**/*.mp3', (route) => route.abort());
});

for (const viewport of VIEWPORTS) {
  test.describe(`Blogs redesign @ ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('capture blogs page layout', async ({ page }) => {
      test.setTimeout(120_000);
      await page.goto('/blogs', { waitUntil: 'load', timeout: 60_000 });
      await page.waitForSelector('[data-blogs-header]', { timeout: 30_000 });
      await page.waitForTimeout(500);

      const screenshotDir = path.join(ARTIFACT_DIR, viewport.name);
      fs.mkdirSync(screenshotDir, { recursive: true });

      await page.screenshot({
        path: path.join(screenshotDir, 'blogs-full-page.png'),
        fullPage: true,
      });

      const sections = [
        { selector: '[data-blogs-header]', name: 'header' },
        { selector: '[data-blogs-grid]', name: 'grid' },
        { selector: '[data-blogs-sidebar]', name: 'sidebar' },
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
