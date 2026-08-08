import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const outDir = 'playwright-artifacts';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/artists/greatman-takit', { waitUntil: 'networkidle' });

const navAbout = page.locator('.nav-outline-group .nav-link').filter({ hasText: 'ABOUT US' });
await navAbout.hover();
await page.waitForTimeout(500);
await page.screenshot({
  path: `${outDir}/navbar-hover-fixed.png`,
  clip: { x: 280, y: 0, width: 720, height: 80 },
});

await page.goto('http://localhost:4321/artists/greatman-takit', { waitUntil: 'networkidle' });
const spotify = page.locator('.streaming-grid__link[data-platform="spotify"]');
await spotify.hover();
await page.waitForTimeout(400);
await page.locator('.streaming-grid').screenshot({ path: `${outDir}/socials-hover-fixed.png` });

await browser.close();
console.log(`Screenshots saved to ${outDir}`);
