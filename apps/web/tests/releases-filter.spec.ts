import { test, expect } from '@playwright/test';

test.describe('Releases page artist filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/releases', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForSelector('[data-releases-listing]', { timeout: 30_000 });
    await page.waitForFunction(() => {
      const root = document.querySelector('[data-releases-listing]');
      return root?.getAttribute('data-filter-active') === 'all';
    });
  });

  test('shows all artist stages when All is selected', async ({ page }) => {
    const listing = page.locator('[data-releases-listing]');
    const sections = listing.locator('[data-releases-section]');
    const sectionCount = await sections.count();

    test.skip(sectionCount === 0, 'No artist stages in Sanity yet');

    await listing.locator('[data-releases-filter][data-filter-slug="all"]').click();

    await expect(listing).toHaveAttribute('data-filter-active', 'all');

    for (let index = 0; index < sectionCount; index += 1) {
      await expect(sections.nth(index)).toBeVisible();
      await expect(sections.nth(index)).toHaveAttribute('data-filtered', 'visible');
    }
  });

  test('filters to a single artist stage with visible content', async ({ page }) => {
    const listing = page.locator('[data-releases-listing]');
    const artistPills = listing.locator('[data-releases-filter]:not([data-filter-slug="all"])');
    const pillCount = await artistPills.count();

    test.skip(pillCount === 0, 'No artist filter pills in Sanity yet');

    const firstPill = artistPills.first();
    const slug = await firstPill.getAttribute('data-filter-slug');
    expect(slug).toBeTruthy();

    await firstPill.scrollIntoViewIfNeeded();
    await firstPill.click();
    await expect(listing).toHaveAttribute('data-filter-active', slug!, { timeout: 15_000 });

    const visibleSections = listing.locator('[data-releases-section]:not([hidden])');
    await expect(visibleSections).toHaveCount(1);
    await expect(visibleSections.first()).toHaveAttribute('data-artist-slug', slug!);
    await expect(visibleSections.first().locator('[data-motion="stage-identity"]')).toBeVisible();

    const identityOpacity = await visibleSections
      .first()
      .locator('[data-motion="stage-identity"]')
      .evaluate((el) => window.getComputedStyle(el).opacity);

    expect(Number(identityOpacity)).toBeGreaterThan(0);
  });

  test('restores all stages after filtering back to All', async ({ page }) => {
    const listing = page.locator('[data-releases-listing]');
    const artistPills = listing.locator('[data-releases-filter]:not([data-filter-slug="all"])');
    const sections = listing.locator('[data-releases-section]');
    const sectionCount = await sections.count();

    test.skip(sectionCount === 0, 'No artist stages in Sanity yet');

    if ((await artistPills.count()) > 0) {
      const pill = artistPills.first();
      const slug = await pill.getAttribute('data-filter-slug');
      await pill.scrollIntoViewIfNeeded();
      await pill.click();
      await expect(listing).toHaveAttribute('data-filter-active', slug!, { timeout: 15_000 });
      await expect(listing.locator('[data-releases-section]:not([hidden])')).toHaveCount(1);
    }

    await listing.locator('[data-releases-filter][data-filter-slug="all"]').click();
    await expect(listing).toHaveAttribute('data-filter-active', 'all');
    await expect(listing.locator('[data-releases-section]:not([hidden])')).toHaveCount(sectionCount);
  });
});
