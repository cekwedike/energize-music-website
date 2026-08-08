# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 414px >> /contact has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.screenshot: Test timeout of 30000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Energize Music" [ref=e5] [cursor=pointer]:
        - /url: /
      - button "Menu Toggle menu" [ref=e69] [cursor=pointer]:
        - generic [ref=e70]: Menu
        - generic [ref=e76]: Toggle menu
    - navigation "Primary mobile" [ref=e77]:
      - list [ref=e78]:
        - listitem [ref=e79]:
          - link "Home" [ref=e80] [cursor=pointer]:
            - /url: /
        - listitem [ref=e81]:
          - link "About Us" [ref=e82] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e83]:
          - link "Artists" [ref=e84] [cursor=pointer]:
            - /url: /artists
        - listitem [ref=e85]:
          - link "Blogs" [ref=e86] [cursor=pointer]:
            - /url: /blogs
        - listitem [ref=e87]:
          - button "Initiatives" [ref=e88] [cursor=pointer]
        - listitem [ref=e92]:
          - link "Careers" [ref=e93] [cursor=pointer]:
            - /url: /careers
        - listitem [ref=e94]:
          - link "Contact" [ref=e95] [cursor=pointer]:
            - /url: /contact
  - main [ref=e96]:
    - generic [ref=e100]:
      - heading "Contact" [level=1] [ref=e101]
      - paragraph [ref=e102]: Tell us what you're reaching out about and we'll route it to the right team.
    - generic [ref=e104]:
      - generic [ref=e105]:
        - generic [ref=e106]: Name
        - textbox "Name" [ref=e107]
      - generic [ref=e108]:
        - generic [ref=e109]: Email
        - textbox "Email" [ref=e110]
      - generic [ref=e111]:
        - generic [ref=e112]: I'm reaching out about
        - combobox "I'm reaching out about" [ref=e113]:
          - option "A&R" [selected]
          - option "Press"
          - option "Partnership"
          - option "Booking"
          - option "General"
      - generic [ref=e114]:
        - generic [ref=e115]: Message
        - textbox "Message" [ref=e116]
      - button "Send message" [ref=e117]
      - status
  - contentinfo [ref=e118]:
    - generic [ref=e120]:
      - generic [ref=e121]: The Energy Different
      - generic [ref=e124]: The Energy Different
      - generic [ref=e127]: The Energy Different
      - generic [ref=e130]: The Energy Different
      - generic [ref=e133]: The Energy Different
      - generic [ref=e136]: The Energy Different
      - generic [ref=e139]: The Energy Different
      - generic [ref=e142]: The Energy Different
      - generic [ref=e145]: The Energy Different
      - generic [ref=e148]: The Energy Different
      - generic [ref=e151]: The Energy Different
      - generic [ref=e154]: The Energy Different
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]:
          - link "Energize Music" [ref=e160] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e224]: The Energy Different
          - generic [ref=e225]:
            - paragraph [ref=e226]: Newsletter
            - form "Newsletter signup" [ref=e227]:
              - generic [ref=e228]: Email address
              - generic [ref=e229]:
                - textbox "Email address" [ref=e230]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e231] [cursor=pointer]
            - paragraph [ref=e232]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e233]:
            - listitem [ref=e234]:
              - link "Instagram" [ref=e235] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e240]:
              - link "YouTube" [ref=e241] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e245]:
              - link "Spotify" [ref=e246] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e250]:
              - link "TikTok" [ref=e251] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e256]:
          - navigation "Explore" [ref=e257]:
            - paragraph [ref=e258]: Explore
            - list [ref=e259]:
              - listitem [ref=e260]:
                - link "About Us" [ref=e261] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e263]:
                - link "Artists" [ref=e264] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e266]:
                - link "Blogs" [ref=e267] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e269]:
                - link "Careers" [ref=e270] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e272]:
                - link "Contact" [ref=e273] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e275]:
            - paragraph [ref=e276]: Company
            - list [ref=e277]:
              - listitem [ref=e278]:
                - link "Privacy" [ref=e279] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e281]:
                - link "Terms" [ref=e282] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e286]:
        - generic [ref=e287]:
          - generic [ref=e288]: ©
          - generic [ref=e289]: "2026"
          - generic [ref=e290]: Energize Music
        - generic [ref=e291]: All rights reserved.
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | import fs from 'node:fs';
  3   | import path from 'node:path';
  4   | 
  5   | const VIEWPORTS = [
  6   |   { name: '320', width: 320, height: 568 },
  7   |   { name: '375', width: 375, height: 812 },
  8   |   { name: '390', width: 390, height: 844 },
  9   |   { name: '414', width: 414, height: 896 },
  10  |   { name: '768', width: 768, height: 1024 },
  11  | ] as const;
  12  | 
  13  | const ROUTES = [
  14  |   '/',
  15  |   '/about',
  16  |   '/artists',
  17  |   '/artists/greatman-takit',
  18  |   '/releases',
  19  |   '/blogs',
  20  |   '/contact',
  21  |   '/404',
  22  |   '/energize-fest',
  23  |   '/energize-kids',
  24  |   '/next',
  25  | ] as const;
  26  | 
  27  | const ARTIFACT_DIR = path.join(process.cwd(), 'playwright-artifacts', 'mobile-audit');
  28  | 
  29  | type OverflowIssue = {
  30  |   route: string;
  31  |   viewport: string;
  32  |   scrollWidth: number;
  33  |   clientWidth: number;
  34  |   overflowElements: Array<{ tag: string; className: string; width: number; right: number }>;
  35  |   smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }>;
  36  | };
  37  | 
  38  | async function auditPage(page: Page, route: string, viewportName: string): Promise<OverflowIssue> {
  39  |   await page.goto(route, { waitUntil: 'networkidle', timeout: 60_000 });
  40  |   await page.waitForTimeout(500);
  41  | 
  42  |   const metrics = await page.evaluate(() => {
  43  |     const doc = document.documentElement;
  44  |     const body = document.body;
  45  |     const viewportWidth = doc.clientWidth;
  46  | 
  47  |     const overflowElements: Array<{ tag: string; className: string; width: number; right: number }> = [];
  48  |     const smallTapTargets: Array<{ tag: string; className: string; width: number; height: number }> = [];
  49  | 
  50  |     const interactiveSelector =
  51  |       'a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';
  52  | 
  53  |     for (const el of document.querySelectorAll<HTMLElement>('*')) {
  54  |       const style = window.getComputedStyle(el);
  55  |       if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
  56  | 
  57  |       const rect = el.getBoundingClientRect();
  58  |       if (rect.width <= 0 || rect.height <= 0) continue;
  59  | 
  60  |       const rightOverflow = rect.right - viewportWidth;
  61  |       if (rightOverflow > 2 && rect.left < viewportWidth) {
  62  |         overflowElements.push({
  63  |           tag: el.tagName.toLowerCase(),
  64  |           className: (el.className?.toString?.() ?? '').slice(0, 120),
  65  |           width: Math.round(rect.width),
  66  |           right: Math.round(rect.right),
  67  |         });
  68  |       }
  69  | 
  70  |       if (el.matches(interactiveSelector)) {
  71  |         const minDim = Math.min(rect.width, rect.height);
  72  |         if (minDim > 0 && minDim < 44 && style.pointerEvents !== 'none') {
  73  |           smallTapTargets.push({
  74  |             tag: el.tagName.toLowerCase(),
  75  |             className: (el.className?.toString?.() ?? '').slice(0, 120),
  76  |             width: Math.round(rect.width),
  77  |             height: Math.round(rect.height),
  78  |           });
  79  |         }
  80  |       }
  81  |     }
  82  | 
  83  |     return {
  84  |       scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
  85  |       clientWidth: viewportWidth,
  86  |       overflowElements: overflowElements.slice(0, 15),
  87  |       smallTapTargets: smallTapTargets.slice(0, 15),
  88  |     };
  89  |   });
  90  | 
  91  |   const screenshotDir = path.join(ARTIFACT_DIR, viewportName);
  92  |   fs.mkdirSync(screenshotDir, { recursive: true });
  93  |   const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
> 94  |   await page.screenshot({
      |              ^ Error: page.screenshot: Test timeout of 30000ms exceeded.
  95  |     path: path.join(screenshotDir, `${safeRoute}.png`),
  96  |     fullPage: true,
  97  |   });
  98  | 
  99  |   return {
  100 |     route,
  101 |     viewport: viewportName,
  102 |     scrollWidth: metrics.scrollWidth,
  103 |     clientWidth: metrics.clientWidth,
  104 |     overflowElements: metrics.overflowElements,
  105 |     smallTapTargets: metrics.smallTapTargets,
  106 |   };
  107 | }
  108 | 
  109 | for (const viewport of VIEWPORTS) {
  110 |   test.describe(`mobile audit @ ${viewport.name}px`, () => {
  111 |     test.use({ viewport: { width: viewport.width, height: viewport.height } });
  112 | 
  113 |     for (const route of ROUTES) {
  114 |       test(`${route} has no horizontal overflow`, async ({ page }) => {
  115 |         const result = await auditPage(page, route, viewport.name);
  116 | 
  117 |         if (result.scrollWidth > result.clientWidth + 1) {
  118 |           console.log(
  119 |             `[overflow] ${route} @ ${viewport.name}px: scroll=${result.scrollWidth} client=${result.clientWidth}`,
  120 |           );
  121 |           console.log(JSON.stringify(result.overflowElements, null, 2));
  122 |         }
  123 | 
  124 |         expect(
  125 |           result.scrollWidth,
  126 |           `Horizontal overflow on ${route} at ${viewport.name}px (scrollWidth=${result.scrollWidth}, clientWidth=${result.clientWidth})`,
  127 |         ).toBeLessThanOrEqual(result.clientWidth + 1);
  128 |       });
  129 |     }
  130 | 
  131 |     test('mobile nav opens and closes', async ({ page }) => {
  132 |       if (viewport.width >= 768) return;
  133 | 
  134 |       await page.goto('/', { waitUntil: 'networkidle' });
  135 | 
  136 |       const menuButton = page.getByRole('button', { name: /menu|open navigation|toggle/i });
  137 |       if ((await menuButton.count()) === 0) {
  138 |         const altButton = page.locator('[data-nav-toggle], [aria-controls*="nav"], .site-header__menu-btn').first();
  139 |         if ((await altButton.count()) === 0) {
  140 |           test.skip();
  141 |           return;
  142 |         }
  143 |         await altButton.click();
  144 |       } else {
  145 |         await menuButton.first().click();
  146 |       }
  147 | 
  148 |       const navPanel = page.locator('[data-mobile-nav], [data-nav-panel], .site-header__mobile-nav, nav[aria-label]').first();
  149 |       await expect(navPanel).toBeVisible({ timeout: 5000 });
  150 | 
  151 |       const closeButton = page.getByRole('button', { name: /close|menu/i });
  152 |       if ((await closeButton.count()) > 0) {
  153 |         await closeButton.first().click();
  154 |       }
  155 |     });
  156 |   });
  157 | }
  158 | 
  159 | test('write audit summary', async ({ page }) => {
  160 |   fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  161 |   const allIssues: OverflowIssue[] = [];
  162 | 
  163 |   for (const viewport of VIEWPORTS) {
  164 |     await page.setViewportSize({ width: viewport.width, height: viewport.height });
  165 |     for (const route of ROUTES) {
  166 |       const result = await auditPage(page, route, viewport.name);
  167 |       if (result.scrollWidth > result.clientWidth + 1 || result.overflowElements.length > 0) {
  168 |         allIssues.push(result);
  169 |       }
  170 |     }
  171 |   }
  172 | 
  173 |   fs.writeFileSync(path.join(ARTIFACT_DIR, 'issues.json'), JSON.stringify(allIssues, null, 2));
  174 | });
  175 | 
```