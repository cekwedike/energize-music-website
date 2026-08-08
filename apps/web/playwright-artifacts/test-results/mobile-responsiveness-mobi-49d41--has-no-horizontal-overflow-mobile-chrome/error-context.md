# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 414px >> /404 has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4321/404", waiting until "networkidle"

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
    - region [ref=e97]:
      - generic: "404"
      - generic [ref=e98]:
        - paragraph [ref=e99]: Off the map
        - heading [level=1] [ref=e101]:
          - text: This page
          - emphasis [ref=e102]: isn't
          - text: on the roster
        - paragraph [ref=e103]: The link may be outdated, or the page moved. Pick a destination below and we'll get you back in rhythm.
        - navigation "Helpful links" [ref=e104]:
          - link "Home Back to the main stage" [ref=e105] [cursor=pointer]:
            - /url: /
            - generic [ref=e106]: Home
            - generic [ref=e107]: Back to the main stage
          - link "Artists Browse the roster" [ref=e108] [cursor=pointer]:
            - /url: /artists
            - generic [ref=e109]: Artists
            - generic [ref=e110]: Browse the roster
          - link "Contact Reach the team" [ref=e111] [cursor=pointer]:
            - /url: /contact
            - generic [ref=e112]: Contact
            - generic [ref=e113]: Reach the team
      - generic [ref=e115]:
        - generic [ref=e116]: Wrong turn
        - generic [ref=e119]: Signal lost
        - generic [ref=e122]: Keep the energy
        - generic [ref=e125]: Find your way back
        - generic [ref=e128]: Wrong turn
        - generic [ref=e131]: Signal lost
        - generic [ref=e134]: Keep the energy
        - generic [ref=e137]: Find your way back
        - generic [ref=e140]: Wrong turn
        - generic [ref=e143]: Signal lost
        - generic [ref=e146]: Keep the energy
        - generic [ref=e149]: Find your way back
        - generic [ref=e152]: Wrong turn
        - generic [ref=e155]: Signal lost
        - generic [ref=e158]: Keep the energy
        - generic [ref=e161]: Find your way back
        - generic [ref=e164]: Wrong turn
        - generic [ref=e167]: Signal lost
        - generic [ref=e170]: Keep the energy
        - generic [ref=e173]: Find your way back
        - generic [ref=e176]: Wrong turn
        - generic [ref=e179]: Signal lost
        - generic [ref=e182]: Keep the energy
        - generic [ref=e185]: Find your way back
        - generic [ref=e188]: Wrong turn
        - generic [ref=e191]: Signal lost
        - generic [ref=e194]: Keep the energy
        - generic [ref=e197]: Find your way back
        - generic [ref=e200]: Wrong turn
        - generic [ref=e203]: Signal lost
        - generic [ref=e206]: Keep the energy
        - generic [ref=e209]: Find your way back
  - contentinfo [ref=e212]:
    - generic [ref=e214]:
      - generic [ref=e215]: The Energy Different
      - generic [ref=e218]: The Energy Different
      - generic [ref=e221]: The Energy Different
      - generic [ref=e224]: The Energy Different
      - generic [ref=e227]: The Energy Different
      - generic [ref=e230]: The Energy Different
      - generic [ref=e233]: The Energy Different
      - generic [ref=e236]: The Energy Different
      - generic [ref=e239]: The Energy Different
      - generic [ref=e242]: The Energy Different
      - generic [ref=e245]: The Energy Different
      - generic [ref=e248]: The Energy Different
    - generic [ref=e251]:
      - generic [ref=e252]:
        - generic [ref=e253]:
          - link "Energize Music" [ref=e254] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e318]: The Energy Different
          - generic [ref=e319]:
            - paragraph [ref=e320]: Newsletter
            - form "Newsletter signup" [ref=e321]:
              - generic [ref=e322]: Email address
              - generic [ref=e323]:
                - textbox "Email address" [ref=e324]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e325] [cursor=pointer]
            - paragraph [ref=e326]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e327]:
            - listitem [ref=e328]:
              - link "Instagram" [ref=e329] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e334]:
              - link "YouTube" [ref=e335] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e339]:
              - link "Spotify" [ref=e340] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e344]:
              - link "TikTok" [ref=e345] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e350]:
          - navigation "Explore" [ref=e351]:
            - paragraph [ref=e352]: Explore
            - list [ref=e353]:
              - listitem [ref=e354]:
                - link "About Us" [ref=e355] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e357]:
                - link "Artists" [ref=e358] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e360]:
                - link "Blogs" [ref=e361] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e363]:
                - link "Careers" [ref=e364] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e366]:
                - link "Contact" [ref=e367] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e369]:
            - paragraph [ref=e370]: Company
            - list [ref=e371]:
              - listitem [ref=e372]:
                - link "Privacy" [ref=e373] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e375]:
                - link "Terms" [ref=e376] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e380]:
        - generic [ref=e381]:
          - generic [ref=e382]: ©
          - generic [ref=e383]: "2026"
          - generic [ref=e384]: Energize Music
        - generic [ref=e385]: All rights reserved.
  - generic [ref=e388]:
    - button [ref=e389]
    - button [ref=e395]
    - button [ref=e399]
    - button [ref=e404]
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
> 39  |   await page.goto(route, { waitUntil: 'networkidle', timeout: 60_000 });
      |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
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
  94  |   await page.screenshot({
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
```