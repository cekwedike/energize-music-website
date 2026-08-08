# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 390px >> /artists has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4321/artists", waiting until "networkidle"

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
      - generic [ref=e98]:
        - paragraph [ref=e99]:
          - generic [ref=e100]: Afro-gospel & soul-fusion
          - generic [ref=e101]: voices on the Energize roster
        - paragraph [ref=e102]:
          - generic [ref=e103]: High-quality, uplifting music
        - paragraph [ref=e104]:
          - generic [ref=e105]: •
          - text: Artist Section
      - generic [ref=e106]:
        - region [ref=e107]:
          - figure
          - generic [ref=e108]:
            - generic [ref=e109]:
              - paragraph: Greatman
              - generic [ref=e112]:
                - heading "Greatman Takit" [level=2] [ref=e113]
                - paragraph [ref=e114]: MELODY MAN
            - generic [ref=e116]:
              - paragraph [ref=e117]: Profile
              - generic [ref=e118]:
                - paragraph [ref=e119]: Greatman Ademola Takit was born in Surulere, Lagos, but his roots trace back to Kwara State. He grew up in Abuja, in a home built on faith, and that foundation shaped everything he'd go on to create. He dropped his…
                - link "View full profile" [ref=e120] [cursor=pointer]:
                  - /url: /artists/greatman-takit
          - generic "Roster navigation, viewing Greatman Takit" [ref=e123]:
            - generic [ref=e127]:
              - link "01 GREATMAN TAKIT" [ref=e128] [cursor=pointer]:
                - /url: "#artist-greatman-takit"
                - generic [ref=e129]: "01"
                - generic [ref=e130]: GREATMAN TAKIT
              - link "02 TY BELLO" [ref=e131] [cursor=pointer]:
                - /url: "#artist-ty-bello"
                - generic [ref=e132]: "02"
                - generic [ref=e133]: TY BELLO
              - link "03 ELLIE SCOTTE" [ref=e134] [cursor=pointer]:
                - /url: "#artist-ellie-scotte"
                - generic [ref=e135]: "03"
                - generic [ref=e136]: ELLIE SCOTTE
        - region [ref=e137]:
          - figure
          - generic [ref=e138]:
            - generic [ref=e139]:
              - paragraph: TY
              - generic [ref=e142]:
                - heading "TY Bello" [level=2] [ref=e143]
                - paragraph [ref=e144]: ENERGIZE ARTIST
            - generic [ref=e146]:
              - paragraph [ref=e147]: Profile
              - generic [ref=e148]:
                - paragraph [ref=e149]: Toyin Sokefun-Bello, known to the world as TY Bello, is one of Nigeria's most recognized creative voices. She got her start in music in the early 2000s as part of the gospel group KUSH, before stepping out on her own…
                - link "View full profile" [ref=e150] [cursor=pointer]:
                  - /url: /artists/ty-bello
          - generic "Roster navigation, viewing TY Bello" [ref=e153]:
            - generic [ref=e157]:
              - link "01 GREATMAN TAKIT" [ref=e158] [cursor=pointer]:
                - /url: "#artist-greatman-takit"
                - generic [ref=e159]: "01"
                - generic [ref=e160]: GREATMAN TAKIT
              - link "02 TY BELLO" [ref=e161] [cursor=pointer]:
                - /url: "#artist-ty-bello"
                - generic [ref=e162]: "02"
                - generic [ref=e163]: TY BELLO
              - link "03 ELLIE SCOTTE" [ref=e164] [cursor=pointer]:
                - /url: "#artist-ellie-scotte"
                - generic [ref=e165]: "03"
                - generic [ref=e166]: ELLIE SCOTTE
        - region [ref=e167]:
          - figure
          - generic [ref=e168]:
            - generic [ref=e169]:
              - paragraph: Ellie
              - generic [ref=e172]:
                - heading "Ellie Scotte" [level=2] [ref=e173]
                - paragraph [ref=e174]: ENERGIZE ARTIST
            - generic [ref=e176]:
              - paragraph [ref=e177]: Profile
              - generic [ref=e178]:
                - paragraph [ref=e179]: Uyiosa Elyeke Eworo, known as Ellie Scotte, is a Nigerian gospel singer and songwriter from Cross River State. She's built a name for herself with a voice that carries real depth and a sound that blends gospel, R&B, and…
                - link "View full profile" [ref=e180] [cursor=pointer]:
                  - /url: /artists/ellie-scotte
          - generic "Roster navigation, viewing Ellie Scotte" [ref=e183]:
            - generic [ref=e187]:
              - link "01 GREATMAN TAKIT" [ref=e188] [cursor=pointer]:
                - /url: "#artist-greatman-takit"
                - generic [ref=e189]: "01"
                - generic [ref=e190]: GREATMAN TAKIT
              - link "02 TY BELLO" [ref=e191] [cursor=pointer]:
                - /url: "#artist-ty-bello"
                - generic [ref=e192]: "02"
                - generic [ref=e193]: TY BELLO
              - link "03 ELLIE SCOTTE" [ref=e194] [cursor=pointer]:
                - /url: "#artist-ellie-scotte"
                - generic [ref=e195]: "03"
                - generic [ref=e196]: ELLIE SCOTTE
  - contentinfo [ref=e197]:
    - generic [ref=e199]:
      - generic [ref=e200]: The Energy Different
      - generic [ref=e203]: The Energy Different
      - generic [ref=e206]: The Energy Different
      - generic [ref=e209]: The Energy Different
      - generic [ref=e212]: The Energy Different
      - generic [ref=e215]: The Energy Different
      - generic [ref=e218]: The Energy Different
      - generic [ref=e221]: The Energy Different
      - generic [ref=e224]: The Energy Different
      - generic [ref=e227]: The Energy Different
      - generic [ref=e230]: The Energy Different
      - generic [ref=e233]: The Energy Different
    - generic [ref=e236]:
      - generic [ref=e237]:
        - generic [ref=e238]:
          - link "Energize Music" [ref=e239] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e303]: The Energy Different
          - generic [ref=e304]:
            - paragraph [ref=e305]: Newsletter
            - form "Newsletter signup" [ref=e306]:
              - generic [ref=e307]: Email address
              - generic [ref=e308]:
                - textbox "Email address" [ref=e309]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e310] [cursor=pointer]
            - paragraph [ref=e311]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e312]:
            - listitem [ref=e313]:
              - link "Instagram" [ref=e314] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e319]:
              - link "YouTube" [ref=e320] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e324]:
              - link "Spotify" [ref=e325] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e329]:
              - link "TikTok" [ref=e330] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e335]:
          - navigation "Explore" [ref=e336]:
            - paragraph [ref=e337]: Explore
            - list [ref=e338]:
              - listitem [ref=e339]:
                - link "About Us" [ref=e340] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e342]:
                - link "Artists" [ref=e343] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e345]:
                - link "Blogs" [ref=e346] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e348]:
                - link "Careers" [ref=e349] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e351]:
                - link "Contact" [ref=e352] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e354]:
            - paragraph [ref=e355]: Company
            - list [ref=e356]:
              - listitem [ref=e357]:
                - link "Privacy" [ref=e358] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e360]:
                - link "Terms" [ref=e361] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e365]:
        - generic [ref=e366]:
          - generic [ref=e367]: ©
          - generic [ref=e368]: "2026"
          - generic [ref=e369]: Energize Music
        - generic [ref=e370]: All rights reserved.
  - generic [ref=e373]:
    - button [ref=e374]
    - button [ref=e380]
    - button [ref=e384]
    - button [ref=e389]
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