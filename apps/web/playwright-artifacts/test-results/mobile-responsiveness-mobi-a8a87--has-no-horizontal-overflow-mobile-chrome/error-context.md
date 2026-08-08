# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 414px >> /next has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4321/next", waiting until "networkidle"

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
    - generic [ref=e105]:
      - generic [ref=e106]:
        - paragraph [ref=e108]: Energize Music Presents
        - 'img "NEXT: New Era Xceptional Talent" [ref=e110]'
        - paragraph [ref=e111]: Africa's boldest Afrogospel talent competition. Submit your music. Get your community to vote. Rise to the top.
        - generic [ref=e112]:
          - link "Submit Your Music" [ref=e113] [cursor=pointer]:
            - /url: https://tally.so/r/ob7Px1
          - link "How It Works" [ref=e114] [cursor=pointer]:
            - /url: "#phases"
      - generic [ref=e115]:
        - paragraph [ref=e116]: Afrogospel Has A New Stage
        - heading "Your Voice. Your Faith. Your Moment." [level=2] [ref=e117]
        - paragraph [ref=e118]: NEXT is Africa's first pan-African Afrogospel talent competition. One submission could put you in front of an entire continent.
        - generic [ref=e119]:
          - generic [ref=e120]: "6"
          - generic [ref=e121]: Months to Impact
        - link "Submit Your Music Now" [ref=e122] [cursor=pointer]:
          - /url: https://tally.so/r/ob7Px1
    - generic [ref=e125]:
      - generic [ref=e126]:
        - paragraph [ref=e127]: The Vision
        - heading "This Is Bigger Than A Competition" [level=2] [ref=e128]
        - paragraph [ref=e129]: "NEXT is a pan-African Afrogospel talent competition and creative incubator. Artists from across the continent submit original music. Fans vote. The top talent is not just celebrated: they are showcased, mentored, recorded, and launched to Africa and the world through the ENERGIZE Afrogospel Album and a landmark concert that will define the sound of a generation."
      - generic [ref=e130]:
        - generic [ref=e136]:
          - heading "Discover" [level=3] [ref=e137]
          - paragraph [ref=e138]: We surface gifted Afrogospel artists from across five African nations who would never otherwise get this platform.
        - generic [ref=e146]:
          - heading "Develop" [level=3] [ref=e147]
          - paragraph [ref=e148]: Top artists receive mentorship, coaching, and access to the Kingdom Creatives Academy ecosystem built for long-term growth.
        - generic [ref=e155]:
          - heading "Launch" [level=3] [ref=e156]
          - paragraph [ref=e157]: Finalists are recorded on the ENERGIZE Afrogospel Album and performed live at the pan-African launch concert in October.
    - generic [ref=e159]:
      - generic [ref=e160]:
        - paragraph [ref=e161]: The Process
        - heading "The Six Phase Journey" [level=2] [ref=e162]
        - paragraph [ref=e163]: May to October 2026
      - generic [ref=e164]:
        - article [ref=e165]:
          - paragraph [ref=e166]: Phase 01
          - heading "Launch and Submissions" [level=3] [ref=e167]
          - paragraph [ref=e168]: May 4 – May 31
          - paragraph [ref=e169]: Artists across five nations submit original Afrogospel tracks and create their public profiles on the platform.
        - article [ref=e170]:
          - paragraph [ref=e171]: Phase 02
          - heading "Social Showcase" [level=3] [ref=e172]
          - paragraph [ref=e173]: June 1 – June 21
          - paragraph [ref=e174]: The top 50 artists are revealed and showcased across Energize Music social media platforms. As the public votes, the field narrows from 50 to 20. Every artist gets their moment in front of Africa.
        - article [ref=e175]:
          - paragraph [ref=e176]: Phase 03
          - heading "Public Voting" [level=3] [ref=e177]
          - paragraph [ref=e178]: June 1 – July 13
          - paragraph [ref=e179]: The African diaspora and fans worldwide vote for their favorites. Community decides who advances to the album.
        - article [ref=e180]:
          - paragraph [ref=e181]: Phase 04
          - heading "Album Creation" [level=3] [ref=e182]
          - paragraph [ref=e183]: July to August
          - paragraph [ref=e184]: Top artists enter the studio. The ENERGIZE Afrogospel Album is produced, engineered, and mastered for global release.
        - article [ref=e185]:
          - paragraph [ref=e186]: Phase 05
          - heading "Pan-African Block Parties" [level=3] [ref=e187]
          - paragraph [ref=e188]: September
          - paragraph [ref=e189]: Community celebration events across all five participating nations. Album previews, artist showcases, and live worship experiences.
        - article [ref=e190]:
          - paragraph [ref=e191]: Phase 06
          - heading "Album Launch Concert" [level=3] [ref=e192]
          - paragraph [ref=e193]: October
          - paragraph [ref=e194]: The definitive moment. A full-scale pan-African concert launches the album and the careers of Africa's next generation of Afrogospel voices.
    - generic [ref=e196]:
      - img "Afrogospel artist performing on stage" [ref=e198]
      - generic [ref=e201]:
        - paragraph [ref=e202]: For Artists
        - heading "Are You The Next Afrogospel Star?" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e210]:
              - paragraph [ref=e211]: Step 01
              - paragraph [ref=e212]: Create your artist profile
          - listitem [ref=e213]:
            - generic [ref=e218]:
              - paragraph [ref=e219]: Step 02
              - paragraph [ref=e220]: Submit your links
              - paragraph [ref=e221]: Share a link to a video of yourself performing a song rendition. This is what gets featured on our social media platforms during the showcase. If you have an original song, include that link too.
          - listitem [ref=e222]:
            - generic [ref=e227]:
              - paragraph [ref=e228]: Step 03
              - paragraph [ref=e229]: Fill in your artist details
          - listitem [ref=e230]:
            - generic [ref=e235]:
              - paragraph [ref=e236]: Step 04
              - paragraph [ref=e237]: Submit and wait for results
        - link "Submit Your Music" [ref=e238] [cursor=pointer]:
          - /url: https://tally.so/r/ob7Px1
    - generic [ref=e240]:
      - generic [ref=e241]:
        - paragraph [ref=e242]: Beyond The Competition
        - heading "NEXT Is Just The Beginning" [level=2] [ref=e243]
        - paragraph [ref=e244]: Kingdom Creatives Academy
        - paragraph [ref=e245]: Every artist who enters NEXT becomes part of the KCA ecosystem. The competition ends. The growth does not. Regardless of where you place, entering NEXT opens a door to a long-term creative community built for serious Afrogospel artists.
      - generic [ref=e246]:
        - article [ref=e247]:
          - paragraph [ref=e248]: All Entrants
          - heading "Get Involved" [level=3] [ref=e249]
          - paragraph [ref=e250]: Submit your music to Energize Music and step into the NEXT movement. Every artist who enters becomes part of something bigger than a competition.
        - article [ref=e251]:
          - paragraph [ref=e252]: Top 50
          - heading "Get Your Music Heard" [level=3] [ref=e253]
          - paragraph [ref=e254]: The top 50 artists have their performances showcased across our social media platforms. This is your chance to shine on a global stage.
        - article [ref=e255]:
          - paragraph [ref=e256]: Top 20
          - heading "Your Voice, Your Choice" [level=3] [ref=e257]
          - paragraph [ref=e258]: The public votes for their favorites, narrowing down to the top 20. Your community becomes your campaign.
        - article [ref=e259]:
          - paragraph [ref=e260]: Top 10
          - heading "Make History" [level=3] [ref=e261]
          - paragraph [ref=e262]: The top 10 artists collaborate with renowned Afrogospel musicians to create the ENERGIZE Afrogospel Album. This is history in the making.
    - generic [ref=e264]:
      - generic [ref=e265]:
        - paragraph [ref=e266]: Frequently Asked Questions
        - heading "Got Questions? We've Got Answers" [level=2] [ref=e267]
      - generic [ref=e268]:
        - article [ref=e269]:
          - heading "Do I need to be based in Nigeria to apply?" [level=3] [ref=e270]
          - paragraph [ref=e271]: No. NEXT is open to artists across Africa. It does not matter where you are on the continent. If you make Afrogospel music, this platform is for you.
        - article [ref=e272]:
          - heading "Do I need to be a singer to enter NEXT?" [level=3] [ref=e273]
          - paragraph [ref=e274]: Not at all. NEXT is open to singers and rappers. Afrogospel is a genre, not a format. If your music carries faith and the Afrogospel sound, you belong here.
        - article [ref=e275]:
          - heading "Do I need to have an original song to apply?" [level=3] [ref=e276]
          - paragraph [ref=e277]: No. You can submit a video of yourself performing a rendition of any song. If you have an original, you can include that link too. But it is not a requirement to enter.
        - article [ref=e278]:
          - heading "How do I submit my music?" [level=3] [ref=e279]
          - paragraph [ref=e280]: Click the "Submit Your Music" button on this page. It takes you to a short form where you fill in your artist details and drop your links.
        - article [ref=e281]:
          - heading "What kind of video should I submit?" [level=3] [ref=e282]
          - paragraph [ref=e283]: A video of you performing a song. It can be a cover or an original. Let your voice and presence do the talking. This is what our judges will use to evaluate you in the first stage of the competition.
        - article [ref=e284]:
          - heading "Can I submit more than one entry?" [level=3] [ref=e285]
          - paragraph [ref=e286]: No. Each artist gets one submission. Make it count.
        - article [ref=e287]:
          - heading "How does voting work and who can vote?" [level=3] [ref=e288]
          - paragraph [ref=e289]: Our team selects the top 50 from the submission pool. From there, the public votes to narrow the field to 20, then to the final 10. Anyone can vote, including the African diaspora and fans worldwide.
        - article [ref=e290]:
          - heading "What happens after I submit? When will I hear back?" [level=3] [ref=e291]
          - paragraph [ref=e292]: If you are selected as part of the top 50, you will be notified directly about your next steps in the competition.
        - article [ref=e293]:
          - heading "What exactly do I get if I make the top 10?" [level=3] [ref=e294]
          - paragraph [ref=e295]: The top 10 artists get recorded on the ENERGIZE Afrogospel Album and perform live at the pan-African launch concert in October.
        - article [ref=e296]:
          - heading "Is NEXT free to enter?" [level=3] [ref=e297]
          - paragraph [ref=e298]: Yes. Completely free. No entry fee, no hidden cost. Just submit and let your music speak.
    - generic [ref=e300]:
      - img "NEXT" [ref=e301]
      - paragraph [ref=e302]: by Energize Music
      - link "Submit Your Music" [ref=e303] [cursor=pointer]:
        - /url: https://tally.so/r/ob7Px1
      - paragraph [ref=e304]: © 2026 NEXT by Energize Music. All rights reserved.
    - region "Music player" [ref=e305]:
      - generic: Feel The ENERGY
      - button "Play background music" [ref=e306] [cursor=pointer]
  - contentinfo [ref=e311]:
    - generic [ref=e313]:
      - generic [ref=e314]: The Energy Different
      - generic [ref=e317]: The Energy Different
      - generic [ref=e320]: The Energy Different
      - generic [ref=e323]: The Energy Different
      - generic [ref=e326]: The Energy Different
      - generic [ref=e329]: The Energy Different
      - generic [ref=e332]: The Energy Different
      - generic [ref=e335]: The Energy Different
      - generic [ref=e338]: The Energy Different
      - generic [ref=e341]: The Energy Different
      - generic [ref=e344]: The Energy Different
      - generic [ref=e347]: The Energy Different
    - generic [ref=e350]:
      - generic [ref=e351]:
        - generic [ref=e352]:
          - link "Energize Music" [ref=e353] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e417]: The Energy Different
          - generic [ref=e418]:
            - paragraph [ref=e419]: Newsletter
            - form "Newsletter signup" [ref=e420]:
              - generic [ref=e421]: Email address
              - generic [ref=e422]:
                - textbox "Email address" [ref=e423]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e424] [cursor=pointer]
            - paragraph [ref=e425]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e426]:
            - listitem [ref=e427]:
              - link "Instagram" [ref=e428] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e433]:
              - link "YouTube" [ref=e434] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e438]:
              - link "Spotify" [ref=e439] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e443]:
              - link "TikTok" [ref=e444] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e449]:
          - navigation "Explore" [ref=e450]:
            - paragraph [ref=e451]: Explore
            - list [ref=e452]:
              - listitem [ref=e453]:
                - link "About Us" [ref=e454] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e456]:
                - link "Artists" [ref=e457] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e459]:
                - link "Blogs" [ref=e460] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e462]:
                - link "Careers" [ref=e463] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e465]:
                - link "Contact" [ref=e466] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e468]:
            - paragraph [ref=e469]: Company
            - list [ref=e470]:
              - listitem [ref=e471]:
                - link "Privacy" [ref=e472] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e474]:
                - link "Terms" [ref=e475] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e479]:
        - generic [ref=e480]:
          - generic [ref=e481]: ©
          - generic [ref=e482]: "2026"
          - generic [ref=e483]: Energize Music
        - generic [ref=e484]: All rights reserved.
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