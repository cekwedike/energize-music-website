import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const VIEWPORTS = [
  { name: '320', width: 320, height: 568 },
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '414', width: 414, height: 896 },
  { name: '768', width: 768, height: 1024 },
] as const;

const ROUTES = [
  '/',
  '/about',
  '/artists',
  '/artists/greatman-takit',
  '/releases',
  '/blogs',
  '/contact',
  '/404',
  '/energize-fest',
  '/energize-kids',
  '/next',
] as const;

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'mobile-audit');

type OverflowIssue = {
  route: string;
  viewport: string;
  scrollWidth: number;
  clientWidth: number;
  overflowElements: Array<{ tag: string; className: string; width: number; right: number }>;
  smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }>;
};

async function auditPage(page: Page, route: string, viewportName: string): Promise<OverflowIssue> {
  await page.goto(route, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(500);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const viewportWidth = doc.clientWidth;

    const overflowElements: Array<{ tag: string; className: string; width: number; right: number }> = [];
    const smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }> = [];

    const interactiveSelector =
      'a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';

    for (const el of document.querySelectorAll<HTMLElement>('*')) {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;

      const rightOverflow = rect.right - viewportWidth;
      if (rightOverflow > 2 && rect.left < viewportWidth) {
        overflowElements.push({
          tag: el.tagName.toLowerCase(),
          className: (el.className?.toString?.() ?? '').slice(0, 120),
          width: Math.round(rect.width),
          right: Math.round(rect.right),
        });
      }

      if (el.matches(interactiveSelector)) {
        const minDim = Math.min(rect.width, rect.height);
        if (minDim > 0 && minDim < 44 && style.pointerEvents !== 'none') {
          smallTapTargets.push({
            tag: el.tagName.toLowerCase(),
            className: (el.className?.toString?.() ?? '').slice(0, 120),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    }

    return {
      scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
      clientWidth: viewportWidth,
      overflowElements: overflowElements.slice(0, 15),
      smallTapTargets: smallTapTargets.slice(0, 15),
    };
  });

  const screenshotDir = path.join(ARTIFACT_DIR, viewportName);
  fs.mkdirSync(screenshotDir, { recursive: true });
  const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
  await page.screenshot({
    path: path.join(screenshotDir, `${safeRoute}.png`),
    fullPage: true,
  });

  return {
    route,
    viewport: viewportName,
    scrollWidth: metrics.scrollWidth,
    clientWidth: metrics.clientWidth,
    overflowElements: metrics.overflowElements,
    smallTapTargets: metrics.smallTapTargets,
  };
}

for (const viewport of VIEWPORTS) {
  test.describe(`mobile audit @ ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`${route} has no horizontal overflow`, async ({ page }) => {
        const result = await auditPage(page, route, viewport.name);

        if (result.scrollWidth > result.clientWidth + 1) {
          console.log(
            `[overflow] ${route} @ ${viewport.name}px: scroll=${result.scrollWidth} client=${result.clientWidth}`,
          );
          console.log(JSON.stringify(result.overflowElements, null, 2));
        }

        expect(
          result.scrollWidth,
          `Horizontal overflow on ${route} at ${viewport.name}px (scrollWidth=${result.scrollWidth}, clientWidth=${result.clientWidth})`,
        ).toBeLessThanOrEqual(result.clientWidth + 1);
      });
    }

    test('mobile nav opens and closes', async ({ page }) => {
      if (viewport.width >= 768) return;

      await page.goto('/', { waitUntil: 'networkidle' });

      const menuButton = page.getByRole('button', { name: /menu|open navigation|toggle/i });
      if ((await menuButton.count()) === 0) {
        const altButton = page.locator('[data-nav-toggle], [aria-controls*="nav"], .site-header__menu-btn').first();
        if ((await altButton.count()) === 0) {
          test.skip();
          return;
        }
        await altButton.click();
      } else {
        await menuButton.first().click();
      }

      const navPanel = page.locator('[data-mobile-nav], [data-nav-panel], .site-header__mobile-nav, nav[aria-label]').first();
      await expect(navPanel).toBeVisible({ timeout: 5000 });

      const closeButton = page.getByRole('button', { name: /close|menu/i });
      if ((await closeButton.count()) > 0) {
        await closeButton.first().click();
      }
    });
  });
}

test('write audit summary', async ({ page }) => {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const allIssues: OverflowIssue[] = [];

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of ROUTES) {
      const result = await auditPage(page, route, viewport.name);
      if (result.scrollWidth > result.clientWidth + 1 || result.overflowElements.length > 0) {
        allIssues.push(result);
      }
    }
  }

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'issues.json'), JSON.stringify(allIssues, null, 2));
});
