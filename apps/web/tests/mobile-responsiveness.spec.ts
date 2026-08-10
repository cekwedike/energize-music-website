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
  '/events',
  '/events/energize-fest',
  '/energize-kids',
  '/next',
] as const;

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'mobile-audit');

type AuditResult = {
  route: string;
  viewport: string;
  scrollWidth: number;
  clientWidth: number;
  overflowElements: Array<{ tag: string; className: string; width: number; right: number }>;
  smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }>;
};

async function auditPage(page: Page, route: string, viewportName: string): Promise<AuditResult> {
  await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await page.waitForTimeout(400);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const viewportWidth = doc.clientWidth;

    const overflowElements: Array<{ tag: string; className: string; width: number; right: number }> = [];
    const smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }> = [];

    const interactiveSelector =
      'a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';

    for (const el of document.querySelectorAll<HTMLElement>(interactiveSelector)) {
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

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: viewportWidth,
      overflowElements: overflowElements.slice(0, 10),
      smallTapTargets: smallTapTargets.slice(0, 10),
    };
  });

  const screenshotDir = path.join(ARTIFACT_DIR, viewportName);
  fs.mkdirSync(screenshotDir, { recursive: true });
  const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
  await page.screenshot({
    path: path.join(screenshotDir, `${safeRoute}.png`),
    fullPage: route !== '/' && route !== '/about',
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

test.beforeEach(async ({ page }) => {
  await page.route('**/*.mp4', (route) => route.abort());
  await page.route('**/*.mp3', (route) => route.abort());
});

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
          `Horizontal overflow on ${route} at ${viewport.name}px`,
        ).toBeLessThanOrEqual(result.clientWidth + 1);
      });
    }

    test('mobile nav opens and closes', async ({ page }) => {
      if (viewport.width >= 1024) {
        test.skip();
        return;
      }

      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const menuButton = page.locator('#nav-toggle');
      await menuButton.click();

      const navPanel = page.locator('#mobile-nav');
      await expect(navPanel).toHaveClass(/is-open/);

      await menuButton.click();
      await expect(navPanel).not.toHaveClass(/is-open/);
    });
  });
}

test('write audit summary', async ({ page }) => {
  test.setTimeout(180_000);
  test.skip(!process.env.PLAYWRIGHT_WRITE_SUMMARY, 'Set PLAYWRIGHT_WRITE_SUMMARY=1 to generate audit JSON');

  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const allResults: AuditResult[] = [];

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of ROUTES) {
      allResults.push(await auditPage(page, route, viewport.name));
    }
  }

  const issues = allResults.filter(
    (result) => result.scrollWidth > result.clientWidth + 1 || result.overflowElements.length > 0,
  );

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'audit-results.json'), JSON.stringify(allResults, null, 2));
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'issues.json'), JSON.stringify(issues, null, 2));
});
