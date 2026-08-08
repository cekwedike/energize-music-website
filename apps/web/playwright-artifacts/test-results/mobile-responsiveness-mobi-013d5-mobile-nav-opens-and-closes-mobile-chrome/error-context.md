# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 320px >> mobile nav opens and closes
- Location: tests\mobile-responsiveness.spec.ts:131:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-mobile-nav], [data-nav-panel], .site-header__mobile-nav, nav[aria-label]').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-mobile-nav], [data-nav-panel], .site-header__mobile-nav, nav[aria-label]').first()
    5 × locator resolved to <nav aria-label="Primary" data-astro-cid-tbenxcyl="">…</nav>
      - unexpected value "hidden"

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- banner:
  - link "Energize Music":
    - /url: /
    - img
  - button "Close Toggle menu" [expanded]
  - navigation "Primary mobile":
    - list:
      - listitem:
        - link "About Us":
          - /url: /about
      - listitem:
        - link "Artists":
          - /url: /artists
      - listitem:
        - link "Blogs":
          - /url: /blogs
      - listitem:
        - button "Initiatives"
      - listitem:
        - link "Careers":
          - /url: /careers
      - listitem:
        - link "Contact":
          - /url: /contact
- main:
  - img
  - paragraph: The Energy Different
  - heading "Rooted in Lagos. Reaching the world." [level=1]
  - paragraph: Afro-gospel and soul-fusion music, carried from Lagos to every corner of the earth.
- contentinfo:
  - link "Energize Music":
    - /url: /
    - img
  - paragraph: The Energy Different
  - paragraph: Newsletter
  - form "Newsletter signup":
    - text: Email address
    - textbox "Email address":
      - /placeholder: you@example.com
    - button "Join"
  - paragraph: Newsletter provider wires up in Phase 4.
  - list "Social media":
    - listitem:
      - link "Instagram":
        - /url: https://instagram.com/energizemusic
    - listitem:
      - link "YouTube":
        - /url: https://youtube.com/@energizemusic
    - listitem:
      - link "Spotify":
        - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
    - listitem:
      - link "TikTok":
        - /url: https://tiktok.com/@energizemusic
  - navigation "Explore":
    - paragraph: Explore
    - list:
      - listitem:
        - link "About Us":
          - /url: /about
      - listitem:
        - link "Artists":
          - /url: /artists
      - listitem:
        - link "Blogs":
          - /url: /blogs
      - listitem:
        - link "Careers":
          - /url: /careers
      - listitem:
        - link "Contact":
          - /url: /contact
  - navigation "Company":
    - paragraph: Company
    - list:
      - listitem:
        - link "Privacy":
          - /url: /privacy
      - listitem:
        - link "Terms":
          - /url: /terms
  - paragraph: 2026 Energize Music All rights reserved.
```

# Test source

```ts
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
  140 |           test.skip();
  141 |           return;
  142 |         }
  143 |         await altButton.click();
  144 |       } else {
  145 |         await menuButton.first().click();
  146 |       }
  147 | 
  148 |       const navPanel = page.locator('[data-mobile-nav], [data-nav-panel], .site-header__mobile-nav, nav[aria-label]').first();
> 149 |       await expect(navPanel).toBeVisible({ timeout: 5000 });
      |                              ^ Error: expect(locator).toBeVisible() failed
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