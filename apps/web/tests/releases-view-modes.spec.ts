import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'releases-views-fix');

const VIEWPORTS = [
  { name: '320', width: 320, height: 640 },
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1280', width: 1280, height: 900 },
] as const;

const VIEW_MODES = ['grid', 'list', 'compact'] as const;

async function setViewMode(
  listing: ReturnType<typeof test.info> extends never ? never : import('@playwright/test').Locator,
  mode: (typeof VIEW_MODES)[number],
): Promise<void> {
  await listing.locator(`[data-releases-view="${mode}"]`).click();
  await expect(listing).toHaveAttribute('data-view-mode', mode);
}

test.describe('Releases page view modes', () => {
  test.beforeAll(() => {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.removeItem('energize-releases-view-mode');
    });
  });

  for (const viewport of VIEWPORTS) {
    for (const mode of VIEW_MODES) {
      test(`${mode} view at ${viewport.name}px`, async ({ page }) => {
        test.skip(
          viewport.width < 1024 && mode !== 'list',
          'View mode toggle is desktop-only; mobile defaults to list',
        );

        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/releases', { waitUntil: 'domcontentloaded', timeout: 60_000 });
        await page.waitForSelector('[data-releases-listing]', { timeout: 30_000 });

        const listing = page.locator('[data-releases-listing]');
        const sectionCount = await listing.locator('[data-releases-section]').count();
        test.skip(sectionCount === 0, 'No artist stages in Sanity yet');

        if (viewport.width >= 1024) {
          await setViewMode(listing, mode);
        } else {
          await expect(listing).toHaveAttribute('data-view-mode', 'list');
        }

        const activeMode = viewport.width >= 1024 ? mode : 'list';
        const firstCard = listing.locator('.catalog-card').first();
        await firstCard.waitFor({ state: 'visible' });

        const cardBox = await firstCard.boundingBox();
        expect(cardBox).toBeTruthy();

        if (activeMode === 'grid') {
          const coverBox = await firstCard.locator('.catalog-card__cover').boundingBox();
          expect(coverBox).toBeTruthy();
          expect(coverBox!.width).toBeGreaterThanOrEqual(140);
          expect(coverBox!.width).toBeLessThanOrEqual(230);
          const rowStyle = await listing
            .locator('.artist-stage__catalog-row')
            .first()
            .evaluate((el) => window.getComputedStyle(el).flexWrap);
          expect(rowStyle).toBe('nowrap');
        }

        if (activeMode === 'list') {
          const coverBox = await firstCard.locator('.catalog-card__cover').boundingBox();
          expect(coverBox).toBeTruthy();
          expect(coverBox!.width).toBeGreaterThanOrEqual(48);
          expect(coverBox!.width).toBeLessThanOrEqual(72);
          await expect(firstCard.locator('.catalog-card__artist')).toBeVisible();
        }

        if (activeMode === 'compact') {
          const coverDisplay = await firstCard
            .locator('.catalog-card__cover')
            .evaluate((el) => window.getComputedStyle(el).display);
          expect(coverDisplay).toBe('none');
        }

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(2);

        await listing.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `releases-${activeMode}-${viewport.name}.png`),
          fullPage: false,
        });
      });
    }
  }

  test('view modes produce distinct card heights on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/releases', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForSelector('[data-releases-listing]', { timeout: 30_000 });

    const listing = page.locator('[data-releases-listing]');
    test.skip((await listing.locator('[data-releases-section]').count()) === 0, 'No stages');

    const heights: Record<string, number> = {};

    for (const mode of VIEW_MODES) {
      await setViewMode(listing, mode);
      const box = await listing.locator('.catalog-card').first().boundingBox();
      expect(box).toBeTruthy();
      heights[mode] = box!.height;
    }

    expect(new Set(Object.values(heights)).size).toBeGreaterThan(1);
  });
});
