import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'careers-redesign');

const VIEWPORTS = [
  { name: '1280', width: 1280, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
] as const;

test.describe('Careers page', () => {
  test.beforeAll(() => {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  });

  for (const viewport of VIEWPORTS) {
    test(`renders careers page at ${viewport.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/careers', { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForTimeout(600);

      await expect(page.locator('#volunteer')).toBeVisible();
      await expect(page.locator('#careers-volunteer-title')).toBeVisible();

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `careers-${viewport.name}.png`),
        fullPage: true,
      });
    });
  }

  for (const viewport of VIEWPORTS.filter((item) => item.width <= 768)) {
    test(`captures open roles section at ${viewport.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/careers', { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForTimeout(600);
      await page.addStyleTag({
        content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
      });
      await page.evaluate(() => {
        document.querySelectorAll('.scroll-reveal').forEach((element) => {
          element.classList.add('is-revealed');
        });
      });

      const openRoles = page.locator('#open-roles');
      await expect(openRoles).toBeVisible();
      await openRoles.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await openRoles.screenshot({
        path: path.join(ARTIFACT_DIR, `careers-open-roles-${viewport.name}.png`),
        animations: 'disabled',
        timeout: 30_000,
      });
    });
  }

  test('volunteer section is always visible', async ({ page }) => {
    await page.goto('/careers', { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForTimeout(600);
    const volunteer = page.locator('#volunteer');
    await expect(volunteer).toBeVisible();
    await expect(page.locator('#careers-volunteer-title')).not.toBeEmpty();
    await expect(volunteer.getByRole('link', { name: /volunteer|contact us/i })).toBeVisible();
  });

  test('employment type filters hide and show roles when openings exist', async ({ page }) => {
    await page.goto('/careers', { waitUntil: 'networkidle', timeout: 60_000 });

    const panel = page.locator('[data-careers-roles]');
    if ((await panel.count()) === 0) {
      await expect(page.getByText('No open roles right now')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Explore Volunteer Opportunities' })).toHaveAttribute(
        'href',
        '#volunteer',
      );
      return;
    }

    const rows = page.locator('[data-careers-role]');
    const pills = page.locator('[data-careers-filter]');
    const totalRows = await rows.count();
    expect(totalRows).toBeGreaterThan(0);

    const typePill = pills.filter({ hasNotText: 'All' }).first();
    if ((await typePill.count()) === 0) {
      return;
    }

    const filterType = await typePill.getAttribute('data-filter-type');
    expect(filterType).toBeTruthy();

    await typePill.click();
    await expect(typePill).toHaveAttribute('aria-current', 'true');

    const visibleRows = rows.filter({ hasNot: page.locator('.is-filtered-out') });
    const visibleCount = await visibleRows.count();
    expect(visibleCount).toBeGreaterThan(0);
    expect(visibleCount).toBeLessThanOrEqual(totalRows);

    await page.locator('[data-careers-filter][data-filter-type="all"]').click();
    await expect(page.locator('[data-careers-filter][data-filter-type="all"]')).toHaveAttribute(
      'aria-current',
      'true',
    );
    await expect(page.locator('[data-careers-role].is-filtered-out')).toHaveCount(0);
  });
});
