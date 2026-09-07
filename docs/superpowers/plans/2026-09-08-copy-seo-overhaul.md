# Copy + SEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic AI-sounding site copy with specific, SEO-solid text across Astro pages and Sanity drafts, without changing layout or styling.

**Architecture:** Marketing copy and static meta live in Astro (`apps/web`). Entity bodies live in Sanity project `mw1jn7pa` / dataset `production`. Update Astro in the repo; write Sanity changes only as `drafts.*` documents via `SANITY_WRITE_TOKEN` in `apps/studio/.env`. User publishes in Studio. Keep tagline **The Energy Different** unchanged. Allow **"carried from Lagos to every corner of the earth"** only in About vision.

**Tech Stack:** Astro, TypeScript, Sanity HTTP Mutations API, existing `lib/seo/*` JSON-LD helpers, `@astrojs/sitemap` (already configured).

**Spec:** `docs/superpowers/specs/2026-09-08-copy-seo-overhaul-design.md`

---

## File map

| File | Responsibility |
|---|---|
| `apps/web/src/lib/seo/site.ts` | Site-wide default description; Organization description source |
| `apps/web/src/lib/seo/schema.ts` | Organization JSON-LD (add founder) |
| `apps/web/src/lib/nav.ts` | Initiative card blurbs (home + header dropdown) |
| `apps/web/src/lib/artists/rosterUtils.ts` | Sentence-safe roster excerpts |
| `apps/web/src/lib/artists/rosterUtils.test.ts` | Node test for excerpt helper |
| `apps/web/src/lib/events/pageDefaults.ts` | Events landing fallback copy |
| `apps/web/src/lib/next/pageDefaults.ts` | NEXT closed-message default (ban "next drop") |
| `apps/web/src/pages/index.astro` | Home meta |
| `apps/web/src/components/home/Hero.astro` | Home H1 + lead |
| `apps/web/src/components/home/HomeInitiatives.astro` | Initiatives section titles |
| `apps/web/src/components/home/HomeArtists.astro` | Roster teaser labels + alt text |
| `apps/web/src/components/home/HomeAbout.astro` | Founder caption |
| `apps/web/src/components/home/HomeNewsletter.astro` | Newsletter copy |
| `apps/web/src/pages/about.astro` | About meta |
| `apps/web/src/components/about/AboutValues.astro` | Mission/vision/values (single source) |
| `apps/web/src/components/about/AboutStory.astro` | Story chrome (no duplicate mission dump) |
| `apps/web/src/pages/artists/index.astro` | Roster meta |
| `apps/web/src/pages/artists/[slug].astro` | Artist meta + H1 wiring |
| `apps/web/src/components/artists/ArtistProfileHero.astro` | Artist H1 with genre |
| `apps/web/src/pages/releases/index.astro` | Releases meta |
| `apps/web/src/pages/events/index.astro` | Events meta |
| `apps/web/src/pages/next.astro` | NEXT meta + hero lead |
| `apps/web/src/pages/energize-kids.astro` | Kids page copy + meta |
| `apps/web/src/pages/blogs/index.astro` | Blogs meta |
| `apps/web/src/components/blogs/BlogsPageHeader.astro` | Blogs H1 |
| `apps/web/src/pages/careers.astro` | Careers meta |
| `apps/web/src/components/careers/CareersHero.astro` | Careers H1 |
| `apps/web/src/components/careers/CareersRoleList.astro` | Empty-state copy tweak |
| `apps/web/src/pages/contact.astro` | Contact meta |
| `apps/studio/scripts/draft-copy-overhaul.mjs` | Sanity draft mutations (careers delete markers + optional about/team) |
| `apps/web/public/llms.txt` | Align site summary if it repeats banned phrases |

---

### Task 1: Sentence-safe roster excerpts

**Files:**
- Modify: `apps/web/src/lib/artists/rosterUtils.ts`
- Create: `apps/web/src/lib/artists/rosterUtils.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/web/src/lib/artists/rosterUtils.test.ts`:

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { excerptCompleteSentences } from './rosterUtils.ts';

describe('excerptCompleteSentences', () => {
  it('returns full text when under max', () => {
    const text = 'Ellie Scotte is a Nigerian gospel singer.';
    assert.equal(excerptCompleteSentences(text, 220), text);
  });

  it('cuts after a complete sentence near the limit', () => {
    const text =
      'Greatman Ademola Takit was born in Surulere, Lagos, but his roots trace back to Kwara State. He grew up in Abuja, in a home built on faith, and that foundation shaped everything he would go on to create. He dropped his first single, "Ain\'t Nobody," back in 2011. But it was his 2016 EP that changed things.';
    const out = excerptCompleteSentences(text, 220);
    assert.match(out, /\.$/);
    assert.doesNotMatch(out, /\u2026$/);
    assert.ok(out.length <= 220);
    assert.ok(out.startsWith('Greatman Ademola Takit'));
  });

  it('falls back to word boundary with ellipsis only when no sentence end exists', () => {
    const text = 'Word '.repeat(80).trim();
    const out = excerptCompleteSentences(text, 80);
    assert.match(out, /\u2026$/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd apps/web && node --experimental-strip-types --test src/lib/artists/rosterUtils.test.ts
```

Expected: FAIL (export `excerptCompleteSentences` missing). If strip-types fails on this Node version, rename to `.mts` or compile via existing tsconfig; prefer making the helper a plain `.ts` imported the way the package already resolves TS, or temporarily place a `.js` twin. Fallback run:

```bash
cd apps/web && npx tsx --test src/lib/artists/rosterUtils.test.ts
```

- [ ] **Step 3: Implement `excerptCompleteSentences` and wire `bioSnippet`**

In `apps/web/src/lib/artists/rosterUtils.ts`, add and use:

```ts
/** Prefer ending on a full sentence. Only use ellipsis when no sentence boundary fits. */
export function excerptCompleteSentences(text: string, maxLength = 220): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const window = trimmed.slice(0, maxLength + 1);
  const sentenceEnds: number[] = [];
  for (let i = 0; i < window.length; i++) {
    const ch = window[i];
    if ((ch === '.' || ch === '!' || ch === '?') && (i === window.length - 1 || /\s/.test(window[i + 1] ?? ''))) {
      sentenceEnds.push(i + 1);
    }
  }

  const minKeep = Math.floor(maxLength * 0.45);
  const viable = sentenceEnds.filter((end) => end >= minKeep && end <= maxLength);
  if (viable.length > 0) {
    return trimmed.slice(0, viable[viable.length - 1]!).trimEnd();
  }

  return truncateBio(trimmed, maxLength);
}

export function bioSnippet(artist: ArtistCard): string | undefined {
  if (artist.bio?.trim()) return excerptCompleteSentences(artist.bio);
  if (artist.tagline?.trim()) return artist.tagline.trim();
  return undefined;
}
```

Keep existing `truncateBio` as the fallback helper.

- [ ] **Step 4: Run test to verify it passes**

Same command as Step 2. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/lib/artists/rosterUtils.ts apps/web/src/lib/artists/rosterUtils.test.ts
git commit -m "fix: end artist roster bios on complete sentences"
```

---

### Task 2: Site defaults, nav blurbs, Organization founder

**Files:**
- Modify: `apps/web/src/lib/seo/site.ts`
- Modify: `apps/web/src/lib/seo/schema.ts`
- Modify: `apps/web/src/lib/nav.ts`
- Modify: `apps/web/src/lib/next/pageDefaults.ts`
- Modify: `apps/web/public/llms.txt` (only if banned phrases appear)

- [ ] **Step 1: Update `SITE_DESCRIPTION`**

In `apps/web/src/lib/seo/site.ts`:

```ts
export const SITE_DESCRIPTION =
  'Energize Music is a Lagos-based Afro-gospel and soul-fusion record label. Home to Greatman Takit, TY Bello, and Ellie Scotte, with NEXT, Energize Kids, and Energize Fest.';
```

- [ ] **Step 2: Add founder to Organization schema**

In `apps/web/src/lib/seo/schema.ts`, inside `buildOrganizationSchema()`, after `foundingLocation`:

```ts
founder: {
  '@type': 'Person',
  name: 'Tochukwu "Dr. Foy" Macfoy',
  jobTitle: 'Founder',
},
parentOrganization: {
  '@type': 'Organization',
  name: 'Same Energy Global',
},
```

- [ ] **Step 3: Rewrite initiative blurbs in `nav.ts`**

Replace `initiativesNav` blurbs with:

```ts
export const initiativesNav: InitiativeItem[] = [
  {
    label: 'Energize Kids',
    href: '/energize-kids',
    blurb:
      'Clean kids entertainment with music, Play Zone challenges, and artist Xade. Register a child at energize-kids.com.',
    image: '/initiatives/energize-kids.webp',
  },
  {
    label: 'NEXT',
    href: '/next',
    blurb:
      'Pan-African Afrogospel competition. Ten finalists earn a spot on the ENERGIZE Afrogospel Album and the launch stage.',
    image: '/initiatives/next.jpg',
  },
  {
    label: 'Energize Fest',
    href: '/events/energize-fest',
    blurb:
      'Annual live showcase for the full Energize Music roster. Next date: 1 December 2026. Venue TBA.',
    image: '/initiatives/energize-fest.webp',
  },
];
```

- [ ] **Step 4: Fix NEXT closed-message default**

In `apps/web/src/lib/next/pageDefaults.ts` (and the inline fallback string in `apps/web/src/pages/next.astro` if duplicated), replace any "next drop" wording with:

```ts
'Registration for this season has ended. Follow Energize Music for the next open window.';
```

- [ ] **Step 5: Grep and commit**

```bash
rg -n "voltage|beyond the catalog|feel the next drop|stay close|rooted in purpose|music with meaning|the movement|carried from Lagos" apps/web/src/lib apps/web/public/llms.txt
```

Expected after this task: matches may still exist in page components (later tasks). `nav.ts` and `site.ts` should be clean of banned phrases.

```bash
git add apps/web/src/lib/seo/site.ts apps/web/src/lib/seo/schema.ts apps/web/src/lib/nav.ts apps/web/src/lib/next/pageDefaults.ts apps/web/public/llms.txt
git commit -m "seo: tighten site defaults, nav blurbs, and organization schema"
```

---

### Task 3: Homepage copy + meta

**Files:**
- Modify: `apps/web/src/pages/index.astro`
- Modify: `apps/web/src/components/home/Hero.astro`
- Modify: `apps/web/src/components/home/HomeInitiatives.astro`
- Modify: `apps/web/src/components/home/HomeArtists.astro`
- Modify: `apps/web/src/components/home/HomeAbout.astro`
- Modify: `apps/web/src/components/home/HomeNewsletter.astro`

- [ ] **Step 1: Home meta in `index.astro`**

```astro
<BaseLayout
  title="Energize Music | Afro-Gospel Record Label from Lagos"
  description="Energize Music is a Lagos-based Afro-gospel and soul-fusion label home to Greatman Takit, TY Bello, and Ellie Scotte. Hear the roster and the story."
  keywords={[
    'Afro-gospel record label',
    'Nigerian gospel music label',
    'Energize Music',
    'Greatman Takit',
    'TY Bello',
    'Ellie Scotte',
  ]}
```

- [ ] **Step 2: Hero H1 + lead in `Hero.astro`**

Replace H1 and subcopy (keep "The Energy Different" line above):

```astro
<h1 class="hero-text-el hero-text-el-heading font-instrument mt-5 max-w-[min(100%,20rem)] text-[clamp(1.625rem,1.15rem+4.5vw,6.25rem)] leading-[0.95] tracking-tight text-white sm:mt-8 sm:max-w-2xl md:mt-9 md:max-w-4xl">
  The Afro-Gospel Label Behind Africa's Biggest Christian Voices
</h1>
<p class="hero-text-el hero-text-el-sub font-inter mt-4 max-w-xl text-sm text-white sm:mt-5 md:mt-7 md:text-base">
  Energize Music is a Lagos record label for Afro-gospel and soul-fusion listeners who want faith-filled music with real craft.
</p>
```

Do not change CTA structure; labels "Meet The Roster" / "Listen Now" may stay.

- [ ] **Step 3: Initiatives section chrome in `HomeInitiatives.astro`**

```astro
<p class="home-kicker">Label initiatives</p>
<h2 id="home-initiatives-title" class="home-title">
  What We're<br />Building Beyond Music
</h2>
<p class="home-initiatives__lead" data-home-reveal data-home-reveal-delay="70">
  NEXT finds new Afrogospel voices. Energize Kids serves families. Energize Fest puts the roster on one stage each year.
</p>
```

Add descriptive `alt` on initiative images using `item.label` (e.g. `alt={`${item.label} initiative`}`).

- [ ] **Step 4: Home artists + about + newsletter**

`HomeArtists.astro`:
```astro
<p class="home-kicker">The roster</p>
<h2 id="home-artists-title" class="home-title">
  Greatman Takit,<br />TY Bello, Ellie Scotte
</h2>
```
Set image `alt={`${artist.name}, Energize Music artist`}`.

`HomeAbout.astro` byline:
```astro
<p class="home-about__by" data-home-reveal data-home-reveal-delay="120">
  Tochukwu "Dr. Foy" Macfoy, Founder · former Content Director, Dentsu Nigeria
</p>
```

`HomeNewsletter.astro`:
```astro
<p class="home-kicker">Newsletter</p>
<h2 id="home-newsletter-title" class="home-title">
  New music and<br />label news by email
</h2>
<p class="home-newsletter__lead">
  Releases, artist updates, and show dates from Energize Music. No spam.
</p>
```

- [ ] **Step 5: Verify and commit**

```bash
rg -n "Rooted In Lagos|carried from Lagos|Beyond the catalog|Initiatives With Voltage|Feel the next|Stay close" apps/web/src/components/home apps/web/src/pages/index.astro
```

Expected: no matches.

```bash
git add apps/web/src/pages/index.astro apps/web/src/components/home
git commit -m "content: rewrite homepage copy and SEO meta"
```

---

### Task 4: About page (single mission/vision/values + story)

**Files:**
- Modify: `apps/web/src/pages/about.astro`
- Modify: `apps/web/src/components/about/AboutValues.astro`
- Modify: `apps/web/src/components/about/AboutStory.astro`

- [ ] **Step 1: About meta**

```astro
<BaseLayout
  title="About Energize Music | Our Story, Mission, and Team"
  description="Meet the team behind Energize Music: founder Dr. Foy, a Lagos label built on faith, culture, and music that travels beyond Nigeria."
  keywords={['Afro-gospel label mission', 'Energize Music team', 'Dr. Foy', 'Lagos']}
  breadcrumbs={crumbs({ name: 'About', path: '/about' })}
>
```

Ensure page shows one H1 "About Energize Music" via `AboutHero` / Sanity title (fallback already `About Energize Music`).

- [ ] **Step 2: Rewrite values section intro + keep single vision phrase**

In `AboutValues.astro`:

```ts
const values = [
  {
    label: 'Mission',
    title: 'Inspire Positive Emotions',
    body: 'We make and share Afro-gospel and soul-fusion music that uplifts families and travels well beyond Nigeria.',
    image: '/initiatives/next.jpg',
    imageAlt: 'NEXT Afrogospel talent initiative from Energize Music',
  },
  {
    label: 'Vision',
    title: 'One Billion Minds',
    body: 'To influence and inspire 1,000,000,000 minds with the good news, carried from Lagos to every corner of the earth.',
    image: '/initiatives/energize-fest.webp',
    imageAlt: 'Energize Fest live showcase crowd and stage',
  },
  {
    label: 'Values',
    title: 'Craft, Care, Clarity',
    body: 'Strong songs and lyrics, family-friendly content, cultural honesty, and work that still feels current to a global audience.',
    image: '/initiatives/energize-kids.webp',
    imageAlt: 'Energize Kids family-friendly entertainment',
  },
];
```

Replace heading block:

```astro
<p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-glow)]">What drives us</p>
<h2 id="about-values-heading" class="text-h2 mt-4">Mission, vision, and values</h2>
<p class="mt-5 max-w-md text-paper">
  Energize Music is an Afro-gospel and soul-fusion label based in Lagos, Nigeria. Parent company: Same Energy Global.
</p>
```

This is the **only** allowed "carried from Lagos…" occurrence sitewide after Task 3.

- [ ] **Step 3: De-duplicate AboutStory**

Replace "Music with meaning" chrome and fallback paragraphs so they do not restate mission/vision word-for-word:

```astro
<h2 class="text-h2 mt-4">How the label works</h2>
<p class="mt-5 text-paper">
  Same Energy Global is the parent company. From Lagos, the team signs artists, ships releases, and runs NEXT, Energize Kids, and Energize Fest.
</p>
```

Fallback body (when Sanity intro empty):

```astro
<p class="text-lead text-paper">
  Tochukwu "Dr. Foy" Macfoy built Energize Music after years in media and brand storytelling, including Content Director work at Dentsu Nigeria.
</p>
<p>
  The roster today includes Greatman Takit, TY Bello, and Ellie Scotte. The work spans records, live nights, and talent programs across Africa.
</p>
<p>
  We keep the bar high on craft and keep the content family-friendly, so the music can travel into homes, churches, and stages without losing its edge.
</p>
```

If Sanity `aboutPage.intro` already duplicates mission text, create a Sanity draft update in Task 9 rather than fighting Portable Text in code.

- [ ] **Step 4: Verify and commit**

```bash
rg -n "Rooted in purpose|Music with meaning|carried from Lagos" apps/web/src/components/about apps/web/src/pages/about.astro
```

Expected: one `carried from Lagos` hit (vision body only). No "Rooted in purpose" / "Music with meaning".

```bash
git add apps/web/src/pages/about.astro apps/web/src/components/about/AboutValues.astro apps/web/src/components/about/AboutStory.astro
git commit -m "content: rewrite About page and remove duplicate mission copy"
```

---

### Task 5: Artists index + detail SEO/H1

**Files:**
- Modify: `apps/web/src/pages/artists/index.astro`
- Modify: `apps/web/src/pages/artists/[slug].astro`
- Modify: `apps/web/src/components/artists/ArtistProfileHero.astro`

- [ ] **Step 1: Roster page meta**

```astro
title="Energize Music Artists | Greatman Takit, TY Bello, Ellie Scotte"
description="Meet the Energize Music roster. Afro-gospel and soul-fusion artists from Lagos making family-friendly music for a global audience."
keywords={['Afro-gospel artists', 'Greatman Takit', 'TY Bello', 'Ellie Scotte', 'Energize Music']}
```

- [ ] **Step 2: Artist detail meta (no mid-slice)**

In `artists/[slug].astro`, replace description builder with sentence-safe + specific format:

```ts
import { excerptCompleteSentences } from '../../lib/artists/rosterUtils';

const genreLabel = artist.genres?.[0] ?? 'Afro-Gospel';
const title = `${artist.name} | Afro-Gospel Artist | Energize Music`;
const description = excerptCompleteSentences(
  artist.tagline?.trim()
    ? `${artist.name} is an Energize Music artist (${genreLabel}). ${artist.tagline}. ${artist.bio}`
    : `${artist.name} is an Energize Music artist known for ${genreLabel}. ${artist.bio}`,
  155,
);
```

Pass `title={title}` and `description={description}` into `BaseLayout`.

Confirm MusicGroup `JsonLd` block remains.

- [ ] **Step 3: H1 includes name + genre**

In `ArtistProfileHero.astro`:

```astro
<h1 class="font-display text-[clamp(2rem,1.2rem+4vw,3.75rem)] leading-none tracking-tight text-paper">
  {artist.name}
  <span class="block mt-2 text-[clamp(1rem,0.85rem+1vw,1.35rem)] font-sans font-medium tracking-normal text-paper/80">
    {(artist.genres?.[0] ?? 'Afro-Gospel')} Artist
  </span>
</h1>
```

Improve avatar alt if empty: `alt={artist.photo.alt ?? `${artist.name} portrait`}`.

Keep layout classes; only text structure change inside the H1.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/pages/artists apps/web/src/components/artists/ArtistProfileHero.astro
git commit -m "seo: improve artist roster and profile meta and H1s"
```

---

### Task 6: Releases, Events, Fest defaults

**Files:**
- Modify: `apps/web/src/pages/releases/index.astro`
- Modify: `apps/web/src/pages/events/index.astro`
- Modify: `apps/web/src/lib/events/pageDefaults.ts`
- Optional Sanity draft for Fest `summary` in Task 9

- [ ] **Step 1: Releases meta**

```astro
title="Music Releases | Energize Music"
description="Stream the latest Afro-gospel and soul-fusion releases from Energize Music artists, including Greatman Takit, TY Bello, and Ellie Scotte."
keywords={['new Afro-gospel music', 'Energize Music releases', 'Greatman Takit', 'TY Bello']}
```

- [ ] **Step 2: Events meta + defaults**

`events/index.astro`:
```astro
title="Events | Energize Music"
description="Upcoming shows, block parties, and live concerts from Energize Music and its artists."
```

Replace soft defaults in `pageDefaults.ts`:

```ts
export const eventsPageDefaults: EventsPageSettings = {
  heroTitle: 'Live nights from Energize Music',
  heroLead: 'Festivals, showcases, and community stages. Energize Fest is set for 1 December 2026 (venue TBA).',
  heroCtaLabel: 'See upcoming dates',
  heroWordmark: 'LIVE SHOWS',
  heroBadgeTitle: 'ENERGY',
  heroBadgeSubtitle: 'Live',
  marqueeText: 'For Friends & Fans of Energize Music',
  qualityTitle: 'What to expect',
  qualityItems: [
    {
      title: 'Roster on stage',
      body: 'Nights built around Energize Music artists and guests from the wider Afrogospel scene.',
    },
    {
      title: 'Clear details',
      body: 'Dates, venues, and ticket links post here as soon as they are confirmed.',
    },
    {
      title: 'Community first',
      body: 'From block parties to Energize Fest, the room is made for fans, families, and the faith community.',
    },
  ],
  upcomingPageSize: 6,
  archivePageSize: 6,
};
```

Fest detail meta comes from Sanity `event.summary` (already decent). If `title` meta needs the spec string, Task 9 drafts:

- title stays `Energize Fest`
- page `<title>` can be overridden in `events/[slug].astro` when `slug === 'energize-fest'`:

```ts
const pageTitle =
  event.slug === 'energize-fest'
    ? 'Energize Fest | Annual Afro-Gospel Live Showcase'
    : event.title;
const pageDescription =
  event.slug === 'energize-fest'
    ? 'Energize Fest brings the full Energize Music roster together on one stage each year. See dates, lineup, and how to attend.'
    : (event.summary ?? `${event.title} by Energize Music`);
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/releases/index.astro apps/web/src/pages/events/index.astro apps/web/src/pages/events/[slug].astro apps/web/src/lib/events/pageDefaults.ts
git commit -m "seo: update releases and events page copy and meta"
```

---

### Task 7: NEXT page opening + meta (FAQ schema already present)

**Files:**
- Modify: `apps/web/src/pages/next.astro`

- [ ] **Step 1: Meta**

```astro
title="NEXT: Afrogospel Talent Competition | Energize Music"
description="NEXT is Energize Music's pan-African Afrogospel competition. Ten finalists win a spot on an album and a stage at the launch concert."
keywords={['Afrogospel talent competition', 'Christian music competition Africa', 'NEXT Energize Music']}
```

Keep FAQ array + `{faqSchema && <JsonLd data={faqSchema} />}` as-is (already wired).

- [ ] **Step 2: Hero lead (prize + timeline first)**

Keep H1: `Your Voice. Your Faith. Your Moment.`

Replace lead:

```astro
<p class="next-reveal next-hero__lead" style="--reveal-delay: 260ms">
  Ten finalists earn a place on the ENERGIZE Afrogospel Album and a set at the pan-African launch concert. Season path runs from submissions in May through the October launch.
</p>
```

Also update closedMessage fallback string in this file to match Task 2 (no "next drop").

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/next.astro
git commit -m "content: tighten NEXT hero copy and SEO meta"
```

---

### Task 8: Energize Kids page from public facts

**Files:**
- Modify: `apps/web/src/pages/energize-kids.astro`

- [ ] **Step 1: Meta + H1 + lead**

```astro
title="Energize Kids | Clean, Faith-Based Entertainment for Children"
description="Energize Kids brings clean, family-friendly music and activities to children across Nigeria, from Energize Music."
```

H1 example:

```astro
<h1 ...>Christian Kids Entertainment from Energize Music</h1>
<p ...>
  Energize Kids is the family wing of Energize Music: clean songs, movement games, learning prompts, and joy-first activities. Details and registration live on energize-kids.com.
</p>
```

- [ ] **Step 2: Rewrite pillars / highlights / event / Xade using only public facts**

Allowed facts only:
- Pillars: Music, Movement, Learning, Joy (tighten wording, do not invent programs)
- Xade: Afro-Gospel / Afrobeats / Hip-Hop; single "Prayer"
- Play Zone challenges (e.g. kind-word challenges)
- Child registration via parent/guardian
- "Crowned, Not Cloned" Zoom for parents/guardians on **25 July 2026**
- Powered by Energize Music and Energize Central
- CTA to `https://energize-kids.com/`

Set hero image alt: `Energize Kids colorful brand artwork`.

Do **not** invent an age range.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/energize-kids.astro
git commit -m "content: rewrite Energize Kids page from public site facts"
```

---

### Task 9: Blogs shell, Careers, Contact + Sanity draft script

**Files:**
- Modify: `apps/web/src/pages/blogs/index.astro`
- Modify: `apps/web/src/components/blogs/BlogsPageHeader.astro`
- Modify: `apps/web/src/pages/careers.astro`
- Modify: `apps/web/src/components/careers/CareersHero.astro`
- Modify: `apps/web/src/components/careers/CareersRoleList.astro` (empty copy if needed)
- Modify: `apps/web/src/pages/contact.astro`
- Create: `apps/studio/scripts/draft-copy-overhaul.mjs`

- [ ] **Step 1: Blogs shell**

`blogs/index.astro`:
```astro
title="Blog | Energize Music News and Stories"
description="News, artist stories, and behind the scenes updates from Energize Music, Lagos's home for Afro-gospel and soul-fusion."
```

`BlogsPageHeader.astro` H1 + lead:
```astro
<h1 id="blogs-page-title" class="blogs-header__title font-display">
  Afro-Gospel Music News and Stories
</h1>
<p class="blogs-header__lead">
  Label updates, artist stories, and release notes from Energize Music. New posts land here when there is real news to share.
</p>
```

Do not create blog posts.

- [ ] **Step 2: Careers + Contact meta/H1**

`careers.astro`:
```astro
title="Careers at Energize Music | Join the Team"
description="Explore open roles at Energize Music, a Lagos-based Afro-gospel and soul-fusion label building a global sound."
```

`CareersHero.astro` H1:
```astro
Join the Energize Music team in Lagos and beyond
```

Empty state already says "No open roles right now". Tighten empty copy to:

```astro
<p class="careers-roles__empty-copy">
  No open roles right now, but we are always looking for the right people. Send your info through Contact, or explore volunteer options below.
</p>
```

`contact.astro`:
```astro
title="Contact Energize Music"
description="Get in touch with Energize Music for bookings, press, artist submissions, or general inquiries."
```

Keep form field intents as-is unless labels contradict booking/press/NEXT/general.

- [ ] **Step 3: Create Sanity draft script**

Create `apps/studio/scripts/draft-copy-overhaul.mjs` that:
1. Loads `SANITY_WRITE_TOKEN`, `SANITY_STUDIO_PROJECT_ID` from `apps/studio/.env`
2. Fetches published career openings `eJ7skWqptDvdh6OpbU7OuT` (A&R Coordinator) and `kqd32DnwMDSkqBnWPznbwI` (Social Media Manager)
3. Writes **draft** versions with clear delete markers (does not delete published docs):

```js
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const envText = readFileSync(resolve(root, '../.env'), 'utf8');
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const client = createClient({
  projectId: env.SANITY_STUDIO_PROJECT_ID,
  dataset: env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const DELETE_IDS = ['eJ7skWqptDvdh6OpbU7OuT', 'kqd32DnwMDSkqBnWPznbwI'];

for (const id of DELETE_IDS) {
  const doc = await client.fetch('*[_id == $id][0]', { id });
  if (!doc) {
    console.log('skip missing', id);
    continue;
  }
  await client.createOrReplace({
    ...doc,
    _id: `drafts.${id}`,
    title: `[DELETE] ${doc.title}`,
  });
  console.log('drafted delete marker for', doc.title);
}

console.log('Done. In Studio: open each [DELETE] draft, then delete the published career document and discard the draft.');
```

Run:

```bash
node apps/studio/scripts/draft-copy-overhaul.mjs
```

Expected: two draft docs created; published careers still visible until user deletes in Studio (after which empty state shows).

Optional in same script (only if needed after reading current CMS intro/bios): draft patches for `aboutPage` intro and team bios that still say "excellence" repeatedly. Prefer minimal edits; skip if already specific.

- [ ] **Step 4: Commit code (not .env)**

```bash
git add apps/web/src/pages/blogs/index.astro apps/web/src/components/blogs/BlogsPageHeader.astro apps/web/src/pages/careers.astro apps/web/src/components/careers/CareersHero.astro apps/web/src/components/careers/CareersRoleList.astro apps/web/src/pages/contact.astro apps/studio/scripts/draft-copy-overhaul.mjs
git commit -m "content: update blogs, careers, contact SEO and Sanity draft script"
```

---

### Task 10: Sitewide verification + handoff note

**Files:**
- Modify only if greps find leftovers
- Optional: append short handoff checklist to the design spec or leave in PR description

- [ ] **Step 1: Ban-list and duplicate greps**

```bash
rg -n "beyond the catalog|feel the next drop|stay close|rooted in purpose|music with meaning|voltage|the movement|Feel the next|Initiatives With Voltage|Rooted In Lagos" apps/web/src apps/web/public
rg -n "carried from Lagos" apps/web/src
rg -n "\u2026" apps/web/src/components/artists apps/web/src/lib/artists
```

Expected:
- Ban list: zero hits in user-facing copy
- `carried from Lagos`: exactly one hit (`AboutValues.astro` vision)
- Artist UI: ellipsis only from fallback path in `truncateBio`, not mid-word permanent bios

- [ ] **Step 2: Build**

```bash
pnpm --filter @energize/web build
```

Expected: build succeeds (requires env `PUBLIC_SANITY_*` as in local `.env`).

- [ ] **Step 3: Schema spot-check**

In build output or preview HTML:
- Home includes Organization with `founder`
- `/next` includes `FAQPage`
- `/artists/greatman-takit` includes `MusicGroup`
- `/events/energize-fest` includes `MusicEvent`

- [ ] **Step 4: Final commit if cleanup needed**

```bash
git add -A
git status
git commit -m "chore: finish copy SEO overhaul verification cleanups"
```

Only commit if there are real cleanup diffs.

- [ ] **Step 5: User handoff (do not automate)**

Tell the user:
1. Studio: delete the two published fake careers (and discard `[DELETE]` drafts).
2. Studio: publish any other drafts from the script.
3. Deploy web.
4. Submit `https://energize-music.com/sitemap-index.xml` in Google Search Console.
5. Blog content calendar is a separate pass.
6. Sanity CDN image filename cleanup is a separate asset pass.

---

## Spec coverage checklist

| Spec item | Task |
|---|---|
| Homepage meta/H1/sections | 3 |
| Ban list + single Lagos phrase | 2, 3, 4, 10 |
| About de-dupe + Lagos base + no founding year | 4 |
| Artists roster cutoff fix | 1, 5 |
| Artist detail meta/H1/MusicGroup | 5 |
| Releases meta | 6 |
| Events/Fest meta + date honesty | 6, 9 |
| NEXT prize-first + FAQ schema | 7 |
| Kids public facts only | 8 |
| Blogs shell only | 9 |
| Careers fake jobs out + empty honesty | 9 |
| Contact meta | 9 |
| Organization founder | 2 |
| Breadcrumbs/canonical/sitemap | already present; verified in 10 |
| Sanity drafts only | 9 |
| No layout redesign | all tasks |
| Image alt improvements on touched surfaces | 3, 5, 8 |
| GSC submit / CDN rename | handoff only |

## Placeholder scan

No TBD / "similar to Task N" / "add appropriate error handling" steps remain. Exact strings and file paths are inlined above.
