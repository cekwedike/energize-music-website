# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 390px >> /artists/greatman-takit has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4321/artists/greatman-takit", waiting until "networkidle"

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
    - generic [ref=e97]:
      - region "Greatman Takit profile" [ref=e98]:
        - generic [ref=e102]:
          - link "All Artists" [ref=e103] [cursor=pointer]:
            - /url: /artists
            - generic [ref=e104]: ←
          - generic [ref=e106]:
            - img "energize-artist-greatman-takit" [ref=e107]
            - generic [ref=e108]:
              - heading "Greatman Takit" [level=1] [ref=e109]
              - paragraph [ref=e110]: Melody Man
              - group "Greatman Takit streaming and social links" [ref=e112]:
                - link "Greatman Takit on Spotify" [ref=e114] [cursor=pointer]:
                  - /url: https://open.spotify.com/artist/47oK1JYR8A9TABs010suzH?si=0dfhdrssQSKFLvvGUclo-A
                  - generic [ref=e118]: Spotify
                - link "Greatman Takit on Apple Music" [ref=e120] [cursor=pointer]:
                  - /url: https://music.apple.com/us/artist/greatman-takit/1528869332
                  - generic [ref=e125]: Apple Music
                - link "Greatman Takit on YouTube" [ref=e127] [cursor=pointer]:
                  - /url: https://youtube.com/@greatmantakit?sub_confirmation=1
                  - generic [ref=e131]: YouTube
                - link "Greatman Takit on Instagram" [ref=e133] [cursor=pointer]:
                  - /url: https://www.instagram.com/greatmantakit/
                  - generic [ref=e137]: Instagram
      - generic [ref=e138]:
        - region [ref=e139]:
          - generic [ref=e140]:
            - heading "About Greatman Takit" [level=2] [ref=e141]
            - generic [ref=e142]:
              - paragraph [ref=e143]: "Greatman Ademola Takit was born in Surulere, Lagos, but his roots trace back to Kwara State. He grew up in Abuja, in a home built on faith, and that foundation shaped everything he'd go on to create. He dropped his first single, \"Ain't Nobody,\" back in 2011. But it was his 2016 EP \"Wildfire\" that put him on the map and showed the world what he was really about: raw energy, honest lyrics, and a sound that doesn't sit still."
              - paragraph [ref=e144]: Greatman spent years as part of the gospel group The Gratitude before stepping out on his own in 2020. Since then, he's built a catalog that keeps pushing gospel music somewhere new. Projects like "Energy," "Worship SZN," and "Ghetto Gospel" blend Afrobeat, hip-hop, and worship into something that feels fresh every time. His songs "Look What You've Done," "ADML," "Commando," "Melody," and "Holy Spirit" have found their way into playlists far beyond Nigeria. And when he links up with other artists like Moses Bliss, Tim Godfrey, TY Bello, and Folabi Nuel, the results tend to become anthems.
              - paragraph [ref=e145]: What makes Greatman stand out isn't just the sound. It's the mission behind it. He's not chasing trends. He's using every beat and every bar to point people back to something bigger than himself.
        - region [ref=e146]:
          - generic [ref=e147]:
            - generic [ref=e148]:
              - heading "Discography" [level=2] [ref=e149]
              - paragraph [ref=e150]: Releases by Greatman Takit
            - link "View All Releases" [ref=e151] [cursor=pointer]:
              - /url: /releases
              - generic [ref=e153]: →
          - list [ref=e154]:
            - listitem [ref=e155]:
              - link [ref=e156] [cursor=pointer]:
                - /url: /releases/serving-a-god-energize-version
                - img "energize-release-serving-a-god" [ref=e158]
                - generic [ref=e159]:
                  - paragraph [ref=e160]: Serving A God (Energize Version)
                  - paragraph [ref=e161]: TY Bello, Greatman Takit · Single · 2022
            - listitem [ref=e162]:
              - link [ref=e163] [cursor=pointer]:
                - /url: /releases/energy
                - img "energize-release-energy" [ref=e165]
                - generic [ref=e166]:
                  - paragraph [ref=e167]: Energy
                  - paragraph [ref=e168]: Greatman Takit · EP · 2021
        - region [ref=e169]:
          - generic [ref=e170]:
            - heading "More Artists" [level=2] [ref=e171]
            - link "View All" [ref=e172] [cursor=pointer]:
              - /url: /artists
              - generic [ref=e174]: →
          - list [ref=e176]:
            - listitem [ref=e177]:
              - link [ref=e178] [cursor=pointer]:
                - /url: /artists/ty-bello
                - img "energize-artist-ty-bello" [ref=e180]
                - paragraph [ref=e181]: TY Bello
            - listitem [ref=e182]:
              - link [ref=e183] [cursor=pointer]:
                - /url: /artists/ellie-scotte
                - img "energize-music-ellie-scotte" [ref=e185]
                - paragraph [ref=e186]: Ellie Scotte
  - contentinfo [ref=e187]:
    - generic [ref=e189]:
      - generic [ref=e190]: The Energy Different
      - generic [ref=e193]: The Energy Different
      - generic [ref=e196]: The Energy Different
      - generic [ref=e199]: The Energy Different
      - generic [ref=e202]: The Energy Different
      - generic [ref=e205]: The Energy Different
      - generic [ref=e208]: The Energy Different
      - generic [ref=e211]: The Energy Different
      - generic [ref=e214]: The Energy Different
      - generic [ref=e217]: The Energy Different
      - generic [ref=e220]: The Energy Different
      - generic [ref=e223]: The Energy Different
    - generic [ref=e226]:
      - generic [ref=e227]:
        - generic [ref=e228]:
          - link "Energize Music" [ref=e229] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e293]: The Energy Different
          - generic [ref=e294]:
            - paragraph [ref=e295]: Newsletter
            - form "Newsletter signup" [ref=e296]:
              - generic [ref=e297]: Email address
              - generic [ref=e298]:
                - textbox "Email address" [ref=e299]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e300] [cursor=pointer]
            - paragraph [ref=e301]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e302]:
            - listitem [ref=e303]:
              - link "Instagram" [ref=e304] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e309]:
              - link "YouTube" [ref=e310] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e314]:
              - link "Spotify" [ref=e315] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e319]:
              - link "TikTok" [ref=e320] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e325]:
          - navigation "Explore" [ref=e326]:
            - paragraph [ref=e327]: Explore
            - list [ref=e328]:
              - listitem [ref=e329]:
                - link "About Us" [ref=e330] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e332]:
                - link "Artists" [ref=e333] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e335]:
                - link "Blogs" [ref=e336] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e338]:
                - link "Careers" [ref=e339] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e341]:
                - link "Contact" [ref=e342] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e344]:
            - paragraph [ref=e345]: Company
            - list [ref=e346]:
              - listitem [ref=e347]:
                - link "Privacy" [ref=e348] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e350]:
                - link "Terms" [ref=e351] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e355]:
        - generic [ref=e356]:
          - generic [ref=e357]: ©
          - generic [ref=e358]: "2026"
          - generic [ref=e359]: Energize Music
        - generic [ref=e360]: All rights reserved.
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