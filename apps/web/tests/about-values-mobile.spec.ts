import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'about-mobile-fix');

const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
] as const;

test.beforeEach(async ({ page }) => {
  await page.route('**/*.mp4', (route) => route.abort());
  await page.route('**/*.mp3', (route) => route.abort());
});

for (const viewport of VIEWPORTS) {
  test.describe(`About values @ ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('slides stack without overlap and no page overflow', async ({ page }) => {
      await page.goto('/about', { waitUntil: 'domcontentloaded', timeout: 45_000 });
      await page.waitForTimeout(600);

      const valuesViewport = page.locator('.about-values-viewport');
      await valuesViewport.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const layoutCheck = await page.evaluate(() => {
        const doc = document.documentElement;
        const valuesViewportEl = document.querySelector<HTMLElement>('.about-values-viewport');
        const slide = document.querySelector<HTMLElement>('.about-value-slide.is-active')
          ?? document.querySelector<HTMLElement>('.about-value-slide');

        if (!slide || !valuesViewportEl) {
          return { ok: false, reason: 'No slide or values viewport found' };
        }

        const frame = slide.querySelector<HTMLElement>('.about-value-slide__frame');
        const content = slide.querySelector<HTMLElement>('.about-value-slide__content');
        const nav = document.querySelector<HTMLElement>('.about-values-nav');

        if (!frame || !content || !nav) {
          return { ok: false, reason: 'Missing frame, content, or nav' };
        }

        const frameRect = frame.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const viewportRect = valuesViewportEl.getBoundingClientRect();
        const viewportWidth = doc.clientWidth;

        const verticalGap = contentRect.top - frameRect.bottom;
        const navInsetFromViewportBottom = viewportRect.bottom - navRect.bottom;
        const contentAboveNav = navRect.top - contentRect.bottom;

        return {
          ok: true,
          scrollWidth: doc.scrollWidth,
          clientWidth: viewportWidth,
          verticalGap: Math.round(verticalGap),
          navInsetFromViewportBottom: Math.round(navInsetFromViewportBottom),
          contentAboveNav: Math.round(contentAboveNav),
        };
      });

      expect(layoutCheck.ok, layoutCheck.reason ?? 'layout check failed').toBe(true);

      if (layoutCheck.ok) {
        expect(
          layoutCheck.scrollWidth,
          `Horizontal overflow at ${viewport.name}px`,
        ).toBeLessThanOrEqual(layoutCheck.clientWidth! + 1);

        expect(
          layoutCheck.verticalGap,
          'Image frame should not overlap content card',
        ).toBeGreaterThanOrEqual(0);

        expect(
          layoutCheck.contentAboveNav,
          'Content card should sit above nav pills',
        ).toBeGreaterThanOrEqual(4);

        expect(
          layoutCheck.navInsetFromViewportBottom,
          'Nav pills should have bottom breathing room inside carousel',
        ).toBeGreaterThanOrEqual(8);
      }

      const section = page.locator('.about-values-section');
      const screenshotDir = path.join(ARTIFACT_DIR, viewport.name);
      fs.mkdirSync(screenshotDir, { recursive: true });

      await page.screenshot({
        path: path.join(screenshotDir, 'about-values-section.png'),
      });

      await valuesViewport.screenshot({
        path: path.join(screenshotDir, 'about-values-viewport.png'),
      });

      await section.screenshot({
        path: path.join(screenshotDir, 'about-values-cropped.png'),
      });
    });

    test('nav pills scroll to next slide', async ({ page }) => {
      await page.goto('/about', { waitUntil: 'domcontentloaded', timeout: 45_000 });
      await page.locator('.about-values-section').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const visionButton = page.locator('.about-values-nav__item[data-nav-index="1"]');
      await visionButton.click();
      await page.waitForTimeout(500);

      await expect(visionButton).toHaveClass(/is-active/);

      const activeSlide = page.locator('.about-value-slide.is-active');
      await expect(activeSlide).toHaveAttribute('data-slide-index', '1');
    });
  });
}
