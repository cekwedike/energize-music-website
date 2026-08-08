# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 414px >> /about has no horizontal overflow
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
    - generic [ref=e101]:
      - paragraph [ref=e166]: About Us
      - heading "About Energize Music" [level=1] [ref=e168]
      - paragraph [ref=e169]: "Afro-gospel and soul-fusion: uplifting music built on the belief that sound can connect people and speak to audiences everywhere."
      - generic [ref=e170]:
        - link "Our story" [ref=e171] [cursor=pointer]:
          - /url: "#story"
        - link "Meet the team" [ref=e172] [cursor=pointer]:
          - /url: "#team"
    - region [ref=e173]:
      - generic [ref=e175]:
        - paragraph [ref=e176]: What drives us
        - heading "Rooted in purpose" [level=2] [ref=e177]
        - paragraph [ref=e178]: Energize Music is an Afro-gospel & soul-fusion record label providing high-quality, family-friendly, uplifting music.
      - generic [ref=e180]:
        - paragraph
        - navigation "Mission, vision, and values" [ref=e181]:
          - button "Go to Mission" [ref=e182] [cursor=pointer]:
            - generic [ref=e184]: Mission
          - button "Go to Vision" [ref=e185] [cursor=pointer]:
            - generic [ref=e187]: Vision
          - button "Go to Values" [ref=e188] [cursor=pointer]:
            - generic [ref=e190]: Values
        - list "Mission, vision, and values" [ref=e192]:
          - 'listitem "Mission: Inspire Positive Emotions" [ref=e193]':
            - paragraph: Mission
            - generic [ref=e194]:
              - img "Energize Music artists and the Next initiative" [ref=e198]
              - generic [ref=e200]:
                - paragraph [ref=e201]: Mission
                - heading "Inspire Positive Emotions" [level=3] [ref=e202]
                - paragraph [ref=e203]: We are here to inspire positive emotions through music that uplifts, connects, and speaks to audiences everywhere.
          - 'listitem "Vision: One Billion Minds" [ref=e205]':
            - paragraph: Vision
            - generic [ref=e206]:
              - img "Energize Fest gathering with a global audience" [ref=e210]
              - generic [ref=e212]:
                - paragraph [ref=e213]: Vision
                - heading "One Billion Minds" [level=3] [ref=e214]
                - paragraph [ref=e215]: To influence and inspire 1,000,000,000 minds with the good news, carried from Lagos to every corner of the earth.
          - 'listitem "Values: Excellence & Relevance" [ref=e217]':
            - paragraph: Values
            - generic [ref=e218]:
              - img "Energize Kids community and family-friendly events" [ref=e222]
              - generic [ref=e224]:
                - paragraph [ref=e225]: Values
                - heading "Excellence & Relevance" [level=3] [ref=e226]
                - paragraph [ref=e227]: Excellence in music and lyrics, positivity and uplifting content, family-friendly material across cultures, and relevance to global audiences.
    - generic [ref=e231]:
      - generic [ref=e232]:
        - paragraph [ref=e233]: Our story
        - heading "Music with meaning" [level=2] [ref=e234]
        - paragraph [ref=e235]: "From Lagos to the world: we create and curate sounds that carry faith, culture, and excellence."
        - img "Energize Music logo" [ref=e237]
      - generic [ref=e239]:
        - paragraph [ref=e240]: Energize Music is an Afro-gospel & soul-fusion record label providing high-quality, family-friendly, uplifting music - built on the belief that music has the power to connect people and speak to audiences everywhere.
        - paragraph [ref=e241]: We champion artists who blend African rhythm with gospel truth, creating a sound that resonates across generations and borders.
        - paragraph [ref=e242]: "Whether through releases, live experiences, or initiatives like NEXT and Energize Kids, our work is rooted in one conviction: music can inspire positive change."
        - heading "Mission" [level=2] [ref=e243]
        - paragraph [ref=e244]: We are here to inspire positive emotions through music that uplifts, connects, and speaks to audiences everywhere.
        - heading "Vision" [level=2] [ref=e245]
        - paragraph [ref=e246]: To influence and inspire 1,000,000,000 minds with the good news - carried from Lagos to every corner of the earth.
        - heading "Values" [level=2] [ref=e247]
        - paragraph [ref=e248]: Excellence in music and lyrics, positivity and uplifting content, family-friendly material across cultures, and relevance to global audiences.
    - region [ref=e249]:
      - generic [ref=e250]:
        - generic [ref=e251]:
          - paragraph [ref=e252]: Energized Team
          - heading "Meet Our Team" [level=2] [ref=e253]
          - paragraph [ref=e254]: "The people behind Energize Music: strategists, creatives, and builders shaping Afro-gospel culture."
        - generic [ref=e255]:
          - article [ref=e257]:
            - generic [ref=e259]:
              - img "dj-classix" [ref=e260]
              - generic [ref=e262]:
                - paragraph [ref=e263]: DJ Classix
                - paragraph [ref=e264]: Official DJ
            - paragraph [ref=e266]: DJ Classix, also known as DJ On Point, is the Official DJ for Energize Music. Based in Lagos, he's built a reputation as a Social and Corporate Event DJ with a real gift for reading the room and keeping the energy right, whether it's a Sunday service vibe or a full blown party crowd. His mixes are known for blending gospel with mainstream sound, pulling in tracks from artists like Greatman Takit, Limoblaze, Ada Ehi, and Prinx Emmanuel, along with wider genres like Amapiano and RnB Gospel. He calls himself "Your Inspirational DJ," and that's exactly the feel he brings, music that moves people while still lifting them up. At Energize Music, DJ Classix is the sound behind the moments, curating mixes and setting the tone at events, on air, and everywhere the label shows up.
          - article [ref=e268]:
            - generic [ref=e270]:
              - img "daniel-double-majorrr" [ref=e271]
              - generic [ref=e273]:
                - paragraph [ref=e274]: Daniel 'Double Major' Oni
                - paragraph [ref=e275]: A&R Lead
            - paragraph [ref=e277]: "Daniel Oni, known in the industry as Double Major, is the A&R Lead at Energize Music. He wears a few hats there, working as a music producer, audio engineer, and A&R executive, with his hands in both gospel projects and contemporary Afrobeats sounds. Daniel's ear for talent and sound is what makes him such a key part of the Energize team. Behind the scenes, he's the one shaping how songs come together, mixing and mastering tracks, and helping artists find the right sound for their story. He also runs Double Major Studios, where a lot of that magic happens. Whether he's producing a record or scouting the next big voice for the label, Daniel brings the same energy: excellence, attention to detail, and a genuine love for great music."
          - article [ref=e279]:
            - generic [ref=e281]:
              - img "osas-idehen" [ref=e282]
              - generic [ref=e284]:
                - paragraph [ref=e285]: Osas Idehen
                - paragraph [ref=e286]: Administrative Executive/Events Lead
            - paragraph [ref=e288]: Osas Idehen serves as Administrative Executive and Events Lead at Energize Music, keeping the label's operations running smoothly and its events well organized from start to finish. She brings a rare mix of skills to the role, with a background that spans radio, design, and creative production. Beyond her work at Energize, Osas wears many hats. She's a designer behind Osas Tailorings, a voice over artist, a Pidgin English translator, and an experienced show producer and on air personality with a genuine love for radio. That range shows in how she works, organized and detail focused, but never short on creativity or personality. At Energize Music, Osas makes sure things happen the right way, on time and with excellence, whether that's behind the scenes on admin or out front running an event.
          - article [ref=e290]:
            - generic [ref=e292]:
              - img "dr-foy" [ref=e293]
              - generic [ref=e295]:
                - paragraph [ref=e296]: Tochukwu Macfoy
                - paragraph [ref=e297]: Founder
            - paragraph [ref=e299]: "Tochukwu Macfoy, better known as Dr. Foy, is the Founder and CEO of Energize Music. He started out as a medical doctor before making the leap into media and entertainment, a jump that's taken him from the world of medicine to becoming one of Africa's leading voices in Christian entertainment. Before founding Energize Music and its parent company, Same Energy Global, Dr. Foy worked as Content Director and Marketing Lead at Dentsu Nigeria, and led its subsidiary, Story Lab. There, he built a strong track record in content creation and strategic partnerships, producing over 60 episodes of a football show for Budweiser and running campaigns for brands like Coca-Cola. Under his leadership, Energize Music has grown into a home for some of gospel music's biggest names, including TY Bello and Greatman Takit, with projects that have topped Apple Music charts both in Nigeria and around the world. Dr. Foy calls Energize \"the label of the future,\" and everything he builds reflects that vision: clean, excellent music that carries real meaning, made for a whole new generation."
          - article [ref=e301]:
            - generic [ref=e303]:
              - img "teniola-akanni" [ref=e304]
              - generic [ref=e306]:
                - paragraph [ref=e307]: Teniola Akanni
                - paragraph [ref=e308]: Legal Partner
            - paragraph [ref=e310]: Teniola Akanni is a Co-Founder and Head of Legal and Administration at Energize Music, and the legal backbone behind some of Africa's biggest names in entertainment. With over eight years of experience as an Entertainment and Intellectual Property lawyer, she's built a reputation as a trusted advisor to creatives who need someone sharp in their corner. At Energize, Teniola handles the company's legal affairs and day to day operations, from negotiations to strategic advisory, making sure the label and its roster of artists stay protected every step of the way. Her work keeps the business side of Energize strong and steady, so the creative side is free to grow. Passionate about the entertainment industry, Teniola is committed to helping artists and creatives navigate a business that can be complicated, ensuring their work and their rights are always secure.
          - article [ref=e312]:
            - generic [ref=e314]:
              - img "excel-joab" [ref=e315]
              - generic [ref=e317]:
                - paragraph [ref=e318]: Excel Joab
                - paragraph [ref=e319]: Head of Music
            - paragraph [ref=e321]: Excel Joab, also known as "Exec," is the Head of Music at Energize Music, where he's spent years shaping the sound and direction of Afro-gospel music. His love for music started early, playing the drums at age seven, following in the footsteps of his father, a pastor who once sang in a gospel band called Steve and the Glues. Excel studied Political Science at the University of Lagos, but music pulled him in a different direction. Over more than a decade in the industry, he's worked across media, content, distribution, brand partnerships, A&R, and artist management, building a reputation as one of the sharpest minds in Nigerian music today. He's also the co-founder of Arktik Kold, a creative agency and production house. At Energize Music, Excel holds the standard high. As he puts it, the quality of the music must be excellent, and that mindset runs through everything the label puts out, from artist development to production. His mission goes beyond Nigeria too. He wants to help build the bridge between African music and the rest of the world, one great record at a time.
          - article [ref=e323]:
            - generic [ref=e325]:
              - img "Emmanuel Abadi" [ref=e326]
              - generic [ref=e328]:
                - paragraph [ref=e329]: Emmanuel Abadi
                - paragraph [ref=e330]: COO
            - paragraph [ref=e332]: Emmanuel Abadi is a seasoned Fintech specialist with years of experience helping businesses grow and transform. He's part of the team behind Moniepoint, one of Africa's biggest and most respected Fintech companies, where his work spans product management, strategic partnerships, and process improvement. Before Moniepoint, he built his skills across digital banking, sales, and fraud control, giving him a well rounded view of how financial systems actually work on the ground. Emmanuel holds a degree in Computer Science from Covenant University and an MBA from Nexford University. He brings that mix of tech and business thinking to everything he does at Energize Music, helping the team run smoother and grow smarter.
    - generic [ref=e335]:
      - paragraph [ref=e336]: Join the movement
      - heading "Be part of something bigger" [level=2] [ref=e337]
      - paragraph [ref=e338]: Explore our artists, releases, and initiatives, or discover how you can get involved.
      - generic [ref=e339]:
        - link "Our artists" [ref=e340] [cursor=pointer]:
          - /url: /artists
        - link "NEXT competition" [ref=e341] [cursor=pointer]:
          - /url: /next
  - contentinfo [ref=e342]:
    - generic [ref=e344]:
      - generic [ref=e345]: The Energy Different
      - generic [ref=e348]: The Energy Different
      - generic [ref=e351]: The Energy Different
      - generic [ref=e354]: The Energy Different
      - generic [ref=e357]: The Energy Different
      - generic [ref=e360]: The Energy Different
      - generic [ref=e363]: The Energy Different
      - generic [ref=e366]: The Energy Different
      - generic [ref=e369]: The Energy Different
      - generic [ref=e372]: The Energy Different
      - generic [ref=e375]: The Energy Different
      - generic [ref=e378]: The Energy Different
    - generic [ref=e381]:
      - generic [ref=e382]:
        - generic [ref=e383]:
          - link "Energize Music" [ref=e384] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e448]: The Energy Different
          - generic [ref=e449]:
            - paragraph [ref=e450]: Newsletter
            - form "Newsletter signup" [ref=e451]:
              - generic [ref=e452]: Email address
              - generic [ref=e453]:
                - textbox "Email address" [ref=e454]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e455] [cursor=pointer]
            - paragraph [ref=e456]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e457]:
            - listitem [ref=e458]:
              - link "Instagram" [ref=e459] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e464]:
              - link "YouTube" [ref=e465] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e469]:
              - link "Spotify" [ref=e470] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e474]:
              - link "TikTok" [ref=e475] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e480]:
          - navigation "Explore" [ref=e481]:
            - paragraph [ref=e482]: Explore
            - list [ref=e483]:
              - listitem [ref=e484]:
                - link "About Us" [ref=e485] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e487]:
                - link "Artists" [ref=e488] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e490]:
                - link "Blogs" [ref=e491] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e493]:
                - link "Careers" [ref=e494] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e496]:
                - link "Contact" [ref=e497] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e499]:
            - paragraph [ref=e500]: Company
            - list [ref=e501]:
              - listitem [ref=e502]:
                - link "Privacy" [ref=e503] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e505]:
                - link "Terms" [ref=e506] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e510]:
        - generic [ref=e511]:
          - generic [ref=e512]: ©
          - generic [ref=e513]: "2026"
          - generic [ref=e514]: Energize Music
        - generic [ref=e515]: All rights reserved.
  - generic [ref=e518]:
    - button [ref=e519]
    - button [ref=e525]
    - button [ref=e529]
    - button [ref=e534]
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