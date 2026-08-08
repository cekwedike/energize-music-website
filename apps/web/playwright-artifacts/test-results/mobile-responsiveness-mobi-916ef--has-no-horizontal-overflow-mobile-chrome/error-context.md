# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 320px >> /energize-kids has no horizontal overflow
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
      - paragraph [ref=e101]: Music · Movement · Learning · Joy
      - heading "Fun, engaging experiences for amazing kids." [level=1] [ref=e102]
      - paragraph [ref=e103]: Energize Kids is a colorful community for clean entertainment, bright creativity, and moments children can enjoy and share.
      - generic [ref=e104]:
        - link "Visit Energize Kids" [ref=e105] [cursor=pointer]:
          - /url: https://energize-kids.com/
        - link "Explore the pillars" [ref=e106] [cursor=pointer]:
          - /url: "#pillars"
    - list [ref=e109]:
      - listitem [ref=e110]:
        - strong [ref=e111]: Clean age-friendly entertainment
        - text: Creative songs, movement, and learning
      - listitem [ref=e112]:
        - strong [ref=e113]: Community powered
        - text: By Energize Music and Energize Central
      - listitem [ref=e114]:
        - strong [ref=e115]: Built for families
        - text: Safe, expressive, shareable experiences
    - generic [ref=e117]:
      - generic [ref=e118]:
        - generic [ref=e119]:
          - paragraph [ref=e120]: Live events & registration
          - paragraph [ref=e121]: Dates, Zoom links, and sign-up live on the Energize Kids site. Visit Energize Kids for the latest.
        - link "Go to Energize Kids" [ref=e122] [cursor=pointer]:
          - /url: https://energize-kids.com/
      - generic [ref=e123]:
        - generic [ref=e124]:
          - paragraph [ref=e125]: Online event for parents and guardians
          - heading "Crowned, Not Cloned." [level=2] [ref=e126]
          - paragraph [ref=e127]: Join a thoughtful conversation about raising kings and queens with identity, conviction, purpose, and confidence in God.
          - generic [ref=e128]:
            - link "Register at Energize Kids" [ref=e129] [cursor=pointer]:
              - /url: https://energize-kids.com/
            - link "View all events" [ref=e130] [cursor=pointer]:
              - /url: https://energize-kids.com/
        - generic [ref=e131]:
          - paragraph [ref=e132]: Featured Artist
          - heading "Xade" [level=3] [ref=e133]
          - paragraph [ref=e134]:
            - text: Xade brings a soulful blend of Afro-Gospel, Afrobeats, and Hip-Hop. His single
            - emphasis [ref=e135]: Prayer
            - text: is available across all platforms.
          - list [ref=e136]:
            - listitem [ref=e137]: Afro-Gospel
            - listitem [ref=e138]: Afrobeats
            - listitem [ref=e139]: Hip-Hop
            - listitem [ref=e140]: Clean Energy
    - generic [ref=e142]:
      - generic [ref=e143]:
        - paragraph [ref=e144]: The Energize Kids World
        - heading "More than music, built for joyful discovery." [level=2] [ref=e145]
      - generic [ref=e146]:
        - article [ref=e147]:
          - text: ♪
          - heading "Music" [level=3] [ref=e148]
          - paragraph [ref=e149]: Clean sounds kids can sing, dance, and grow with.
        - article [ref=e150]:
          - text: ↗
          - heading "Movement" [level=3] [ref=e151]
          - paragraph [ref=e152]: Simple activities that get energy moving in a positive way.
        - article [ref=e153]:
          - text: "?"
          - heading "Learning" [level=3] [ref=e154]
          - paragraph [ref=e155]: Fun prompts and challenges that spark curiosity.
        - article [ref=e156]:
          - text: ★
          - heading "Joy" [level=3] [ref=e157]
          - paragraph [ref=e158]: Bright experiences that feel safe, expressive, and shareable.
    - generic [ref=e160]:
      - heading "Follow the movement." [level=2] [ref=e161]
      - paragraph [ref=e162]: Powered by @energize_music and @energizecentral. Keep up with releases, activities, and community updates on the live Energize Kids site.
      - link "Visit Energize Kids" [ref=e163] [cursor=pointer]:
        - /url: https://energize-kids.com/
  - contentinfo [ref=e164]:
    - generic [ref=e166]:
      - generic [ref=e167]: The Energy Different
      - generic [ref=e170]: The Energy Different
      - generic [ref=e173]: The Energy Different
      - generic [ref=e176]: The Energy Different
      - generic [ref=e179]: The Energy Different
      - generic [ref=e182]: The Energy Different
      - generic [ref=e185]: The Energy Different
      - generic [ref=e188]: The Energy Different
      - generic [ref=e191]: The Energy Different
      - generic [ref=e194]: The Energy Different
      - generic [ref=e197]: The Energy Different
      - generic [ref=e200]: The Energy Different
    - generic [ref=e203]:
      - generic [ref=e204]:
        - generic [ref=e205]:
          - link "Energize Music" [ref=e206] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e270]: The Energy Different
          - generic [ref=e271]:
            - paragraph [ref=e272]: Newsletter
            - form "Newsletter signup" [ref=e273]:
              - generic [ref=e274]: Email address
              - generic [ref=e275]:
                - textbox "Email address" [ref=e276]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e277] [cursor=pointer]
            - paragraph [ref=e278]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e279]:
            - listitem [ref=e280]:
              - link "Instagram" [ref=e281] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e286]:
              - link "YouTube" [ref=e287] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e291]:
              - link "Spotify" [ref=e292] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e296]:
              - link "TikTok" [ref=e297] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e302]:
          - navigation "Explore" [ref=e303]:
            - paragraph [ref=e304]: Explore
            - list [ref=e305]:
              - listitem [ref=e306]:
                - link "About Us" [ref=e307] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e309]:
                - link "Artists" [ref=e310] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e312]:
                - link "Blogs" [ref=e313] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e315]:
                - link "Careers" [ref=e316] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e318]:
                - link "Contact" [ref=e319] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e321]:
            - paragraph [ref=e322]: Company
            - list [ref=e323]:
              - listitem [ref=e324]:
                - link "Privacy" [ref=e325] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e327]:
                - link "Terms" [ref=e328] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e332]:
        - generic [ref=e333]:
          - generic [ref=e334]: ©
          - generic [ref=e335]: "2026"
          - generic [ref=e336]: Energize Music
        - generic [ref=e337]: All rights reserved.
  - generic [ref=e340]:
    - button [ref=e341]
    - button [ref=e347]
    - button [ref=e351]
    - button [ref=e356]
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