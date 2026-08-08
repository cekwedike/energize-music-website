# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 375px >> mobile nav opens and closes
- Location: tests\mobile-responsiveness.spec.ts:131:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4321/", waiting until "networkidle"

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
          - link "About Us" [ref=e80] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e81]:
          - link "Artists" [ref=e82] [cursor=pointer]:
            - /url: /artists
        - listitem [ref=e83]:
          - link "Blogs" [ref=e84] [cursor=pointer]:
            - /url: /blogs
        - listitem [ref=e85]:
          - button "Initiatives" [ref=e86] [cursor=pointer]
        - listitem [ref=e90]:
          - link "Careers" [ref=e91] [cursor=pointer]:
            - /url: /careers
        - listitem [ref=e92]:
          - link "Contact" [ref=e93] [cursor=pointer]:
            - /url: /contact
  - generic [ref=e95]:
    - generic [ref=e96]: The Energy Different
    - generic [ref=e99]: The Energy Different
    - generic [ref=e102]: The Energy Different
    - generic [ref=e105]: The Energy Different
    - generic [ref=e108]: The Energy Different
    - generic [ref=e111]: The Energy Different
    - generic [ref=e114]: The Energy Different
    - generic [ref=e117]: The Energy Different
    - generic [ref=e120]: The Energy Different
    - generic [ref=e123]: The Energy Different
    - generic [ref=e126]: The Energy Different
    - generic [ref=e129]: The Energy Different
  - main [ref=e132]:
    - generic [ref=e137]:
      - paragraph [ref=e201]: The Energy Different
      - heading "Rooted in Lagos. Reaching the world." [level=1] [ref=e202]
      - paragraph [ref=e203]: Afro-gospel and soul-fusion music, carried from Lagos to every corner of the earth.
  - contentinfo [ref=e204]:
    - generic [ref=e206]:
      - generic [ref=e207]: The Energy Different
      - generic [ref=e210]: The Energy Different
      - generic [ref=e213]: The Energy Different
      - generic [ref=e216]: The Energy Different
      - generic [ref=e219]: The Energy Different
      - generic [ref=e222]: The Energy Different
      - generic [ref=e225]: The Energy Different
      - generic [ref=e228]: The Energy Different
      - generic [ref=e231]: The Energy Different
      - generic [ref=e234]: The Energy Different
      - generic [ref=e237]: The Energy Different
      - generic [ref=e240]: The Energy Different
    - generic [ref=e243]:
      - generic [ref=e244]:
        - generic [ref=e245]:
          - link "Energize Music" [ref=e246] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e310]: The Energy Different
          - generic [ref=e311]:
            - paragraph [ref=e312]: Newsletter
            - form "Newsletter signup" [ref=e313]:
              - generic [ref=e314]: Email address
              - generic [ref=e315]:
                - textbox "Email address" [ref=e316]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e317] [cursor=pointer]
            - paragraph [ref=e318]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e319]:
            - listitem [ref=e320]:
              - link "Instagram" [ref=e321] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e326]:
              - link "YouTube" [ref=e327] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e331]:
              - link "Spotify" [ref=e332] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e336]:
              - link "TikTok" [ref=e337] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e342]:
          - navigation "Explore" [ref=e343]:
            - paragraph [ref=e344]: Explore
            - list [ref=e345]:
              - listitem [ref=e346]:
                - link "About Us" [ref=e347] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e349]:
                - link "Artists" [ref=e350] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e352]:
                - link "Blogs" [ref=e353] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e355]:
                - link "Careers" [ref=e356] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e358]:
                - link "Contact" [ref=e359] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e361]:
            - paragraph [ref=e362]: Company
            - list [ref=e363]:
              - listitem [ref=e364]:
                - link "Privacy" [ref=e365] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e367]:
                - link "Terms" [ref=e368] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e372]:
        - generic [ref=e373]:
          - generic [ref=e374]: ©
          - generic [ref=e375]: "2026"
          - generic [ref=e376]: Energize Music
        - generic [ref=e377]: All rights reserved.
```

# Test source

```ts
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
> 134 |       await page.goto('/', { waitUntil: 'networkidle' });
      |                  ^ Error: page.goto: Test timeout of 30000ms exceeded.
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