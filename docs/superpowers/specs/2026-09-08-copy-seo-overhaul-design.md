# Copy + SEO Overhaul Design

**Date:** 2026-09-08  
**Project:** Energize Music website (Astro + Sanity)  
**Status:** Approved for planning  

## Goal

Replace generic, repetitive, AI-sounding site copy with human, specific, SEO-solid text on every page. Do not change layout, components, or styling unless a content change needs a small structural fix (for example, a bio that was cut mid-sentence).

Keep the brand tagline **The Energy Different** exactly as it appears in the design (marquee, footer, hero overlay).

## Brand facts (ground truth)

- Energize Music is an Afro-gospel and soul-fusion record label based in Lagos, Nigeria.
- Founded by Tochukwu "Dr. Foy" Macfoy.
- Roster: Greatman Takit, TY Bello, Ellie Scotte.
- Initiatives: NEXT (pan-African Afrogospel talent competition), Energize Kids (family-friendly kids entertainment), Energize Fest (annual live showcase).
- Parent company: Same Energy Global.
- Founding year: **unknown. Do not state a founding year.**

## Decisions locked in

| Topic | Decision |
|---|---|
| Approach | Code-first rewrite of Astro copy/meta; Sanity entity updates via write-token CLI |
| Sanity publish | Save CMS changes as **drafts only**; user reviews and publishes in Studio |
| Sanity MCP | Blocked for Energize Music org (MCP only sees BEA). Use `SANITY_WRITE_TOKEN` in `apps/studio/.env` |
| Energize Kids | Use only public facts from [energize-kids.com](https://energize-kids.com/) |
| Careers | Remove fake A&R Coordinator and Social Media Manager openings; page says no open roles |
| Founding year | Omit |

## Content rules (every page)

1. No AI-sounding filler. Banned phrases: "beyond the catalog", "feel the next drop", "stay close", "rooted in purpose", "music with meaning", "voltage", "the movement". Phrase **"carried from Lagos to every corner of the earth"** may appear in **one** strong place only (About vision). Remove it from the homepage and any other repeats.
2. Unique meta title (under 60 characters) and meta description (under 155 characters) per page, built around a real search term.
3. Exactly one H1 that includes the page’s main keyword.
4. Simple reading level. Short sentences. No jargon.
5. No sentence repeated word-for-word across pages.
6. Descriptive image alt text (artist name + context, not just "photo").
7. FAQ JSON-LD on pages with FAQ (NEXT).
8. Organization schema on homepage (already sitewide; verify). MusicGroup or Person on each artist page (verify existing).
9. No permanent mid-sentence `…` cutoffs in user-facing bios. Roster excerpts must end on complete sentences, with a clear path to the full bio.
10. No em dashes in user-facing copy, Sanity descriptions, or code comments (project rule).

## Architecture notes

Most marketing copy and all static-page meta live in Astro. Sanity holds entity bodies (artists, releases, events, blogs, careers, team) and a few landing singletons. There are no dedicated Sanity SEO fields today; this pass does **not** add them.

- Meta pipeline: page `title` / `description` → `BaseLayout` → `SEO.astro` → `formatTitle()` (skips suffix if title already contains "Energize").
- Existing JSON-LD helpers in `apps/web/src/lib/seo/schema.ts` and `JsonLd.astro`.
- Sitemap already via `@astrojs/sitemap`; robots.txt points to `sitemap-index.xml`.

## Out of scope

- Layout, visual redesign, new UI components (except tiny fixes for truncated copy).
- Inventing founding year, Fest venue/tickets, or Kids age ranges.
- Writing filler blog posts.
- Renaming Sanity CDN image hashes (follow-up; needs asset re-upload).
- Submitting the sitemap in Google Search Console (user does after deploy).
- Adding Studio `seoTitle` / `metaDescription` schema fields (possible later project).

---

## Page-by-page plan

### Homepage `/`

**Keywords:** Afro-gospel record label; Nigerian gospel music label  

**Meta title:** Energize Music | Afro-Gospel Record Label from Lagos  
**Meta description:** Energize Music is a Lagos-based Afro-gospel and soul-fusion label home to Greatman Takit, TY Bello, and Ellie Scotte. Hear the roster and the story.

**H1:** Replace "Rooted In Lagos. Reaching The World." with a factual claim such as:  
`The Afro-Gospel Label Behind Africa's Biggest Christian Voices`  
(Tighten if the claim feels too absolute during implementation; keep it keyword-clear and brand-true.)

**Sections:**
- Opening line under H1: one sentence on what the label does and who it is for. No metaphors.
- Roster teaser: name all three artists with a few words on each sound.
- Initiatives: rename off "Initiatives With Voltage" / "Beyond the catalog" to plain language (e.g. "What We're Building Beyond Music"). Outcome lines:
  - NEXT: 10 finalists get a spot on an album and a stage.
  - Kids: Xade, single "Prayer", child registration, and/or Crowned Not Cloned Zoom event.
  - Fest: annual; date 1 December 2026; venue TBA.
- Belief / founder quote: keep Dr. Foy’s quote; add one-line credit (founder; former Content Director at Dentsu Nigeria).
- Newsletter: keep short; drop "Feel the next drop first."
- Remove homepage use of "carried from Lagos…".

**Primary files:** `pages/index.astro`, `components/home/Hero.astro`, `HomeInitiatives.astro`, `HomeAbout.astro`, `HomeNewsletter.astro`, `HomeArtists.astro`, `lib/nav.ts`.

### About `/about`

**Keywords:** Afro-gospel label mission; Energize Music team  

**Meta title:** About Energize Music | Our Story, Mission, and Team  
**Meta description:** Meet the team behind Energize Music: founder Dr. Foy, a Lagos label built on faith, culture, and music that travels beyond Nigeria.

**H1:** About Energize Music  

**Content:**
- Near top: based in Lagos; parent Same Energy Global; no founding year.
- Mission / vision / values written **once** (keep scroll cards; remove duplicate plain paragraphs below).
- Replace "Rooted in purpose" heading.
- Keep vision’s one allowed "carried from Lagos…" use with the 1 billion minds claim.
- Team bios: Sanity drafts; keep specific career detail; vary language (cut repeated "excellence").

**Primary files:** `pages/about.astro`, `components/about/AboutValues.astro`, `AboutStory.astro`, `AboutTeam.astro`; Sanity `aboutPage`, `teamMember`.

### Artists `/artists` and `/artists/[slug]`

**Keywords:** Afro-gospel artists; Greatman Takit music; TY Bello songs; Ellie Scotte gospel singer  

**Roster meta title:** Energize Music Artists | Greatman Takit, TY Bello, Ellie Scotte  
**Roster meta description:** Meet the Energize Music roster. Afro-gospel and soul-fusion artists from Lagos making family-friendly music for a global audience.

**Fixes:**
- Roster cards must not show mid-sentence cuts. Use complete short excerpts (first 1–2 full sentences) plus a clear "Full bio" link. Adjust `truncateBio` usage or feed sentence-safe blurbs.
- Detail pages: H1 with artist name + genre tag; meta format `[Artist Name] | Afro-Gospel Artist | Energize Music`; description with one specific fact; verify MusicGroup JSON-LD; keep discography and streaming links.
- Sanity drafts only if bio/tagline needs polish (full bios already exist in CMS).

### Releases `/releases` and detail pages

**Keywords:** new Afro-gospel music; Energize Music releases  

**Meta title:** Music Releases | Energize Music  
**Meta description:** Stream the latest Afro-gospel and soul-fusion releases from Energize Music artists, including Greatman Takit, TY Bello, and Ellie Scotte.

Each listing: artist name, release date, one specific line about the song/project, streaming link. Detail pages keep/generate meta that names the specific release.

### NEXT `/next`

**Keywords:** Afrogospel talent competition; Christian music competition Africa  

**Meta title:** NEXT: Afrogospel Talent Competition | Energize Music  
**Meta description:** NEXT is Energize Music's pan-African Afrogospel competition. Ten finalists win a spot on an album and a stage at the launch concert.

Keep structure (journey timeline, FAQ). Keep tagline "Your Voice. Your Faith. Your Moment." Opening paragraph states prize and timeline in plain words first. Confirm FAQPage JSON-LD.

### Energize Kids `/energize-kids`

**Keywords:** Christian kids entertainment Nigeria; family-friendly gospel music kids  

**Meta title:** Energize Kids | Clean, Faith-Based Entertainment for Children  
**Meta description:** Energize Kids brings clean, family-friendly music and activities to children across Nigeria, from Energize Music.

**Allowed public facts only:**
- Music, movement, learning, joy pillars (tighten wording; no inventing programs).
- Featured artist Xade; single "Prayer".
- Play Zone / happy challenges.
- Parent/guardian child registration.
- "Crowned, Not Cloned" Zoom event for parents/guardians, 25 July 2026.
- Powered by Energize Music and Energize Central.
- CTA to https://energize-kids.com/

Do not invent an age range.

### Energize Fest `/events/energize-fest`

**Keywords:** Afrogospel live concert; gospel music festival Lagos  

**Meta title:** Energize Fest | Annual Afro-Gospel Live Showcase  
**Meta description:** Energize Fest brings the full Energize Music roster together on one stage each year. See dates, lineup, and how to attend.

Known: startDate 2026-12-01. Venue TBA. Tickets TBA. Event schema already on event detail pages; fill richer fields when confirmed.

### Events `/events`

**Keywords:** Energize Music events; gospel concerts Lagos  

**Meta title:** Events | Energize Music  
**Meta description:** Upcoming shows, block parties, and live concerts from Energize Music and its artists.

List with real dates/locations. Prefer the known Fest date over vague "on stage soon" headings when a date exists.

### Blogs `/blogs`

**Keywords:** Afro-gospel music news; gospel music industry Africa  

**Meta title:** Blog | Energize Music News and Stories  
**Meta description:** News, artist stories, and behind the scenes updates from Energize Music, Lagos's home for Afro-gospel and soul-fusion.

Shell only: correct meta + clear H1. No filler posts. Flag that blog content needs a separate content calendar.

### Careers `/careers`

**Keywords:** music industry jobs Lagos; record label careers Nigeria  

**Meta title:** Careers at Energize Music | Join the Team  
**Meta description:** Explore open roles at Energize Music, a Lagos-based Afro-gospel and soul-fusion label building a global sound.

Remove fake openings (A&R Coordinator, Social Media Manager) as Sanity drafts / draft deletions. Page copy: no open roles right now; always looking; how to send info (contact path).

### Contact `/contact`

**Keywords:** contact Energize Music  

**Meta title:** Contact Energize Music  
**Meta description:** Get in touch with Energize Music for bookings, press, artist submissions, or general inquiries.

Functional form only beyond meta. Keep inquiry types sensible (booking, press, NEXT, general).

---

## Technical SEO checklist

1. Verify Organization + WebSite graph (sitewide via `BaseLayout`). Add founder to Organization if data is readily available without layout churn.
2. BreadcrumbList on interior pages via existing `crumbs()` pattern.
3. Keep per-page canonical tags.
4. Sitemap already present; document GSC submit as a user post-deploy step.
5. Flag Sanity CDN hash filenames as a later asset pass.
6. Descriptive alt text on images touched in this pass.

## Delivery order

1. Site defaults (`SITE_DESCRIPTION`, nav blurbs, ban-list cleanup).
2. Homepage.
3. About (code + Sanity team/about drafts).
4. Artists (roster excerpt fix + metas; optional Sanity polish drafts).
5. Releases + Events / Fest.
6. NEXT (opening + FAQ schema verify).
7. Energize Kids.
8. Blogs shell + Careers + Contact (including fake job removal drafts).
9. Schema audit.
10. Final grep: ban list, em dashes, duplicate sentences, permanent `…` cutoffs.

## Verification

- Build `apps/web`.
- Grep banned phrases and mid-sentence UI cutoffs.
- Spot-check JSON-LD: home, NEXT, one artist, Fest.
- Confirm career removals exist as drafts (published dataset unchanged until user publishes).

## User handoff after implementation

1. Review and publish Sanity drafts in Studio.
2. Deploy the web app.
3. Submit `https://energize-music.com/sitemap-index.xml` in Google Search Console.
4. Optional later: re-upload assets with readable filenames; add Studio SEO fields if editors need them.

## Success criteria

- Every listed page has unique meta title/description and one keyword H1.
- Banned filler is gone (except the single allowed "carried from Lagos…" on About vision).
- Roster and bios never end mid-sentence as permanent UI copy.
- Fake careers removed from drafts awaiting publish; careers page states no open roles honestly.
- Kids copy is specific and sourced only from public kids-site facts.
- Layout and styling unchanged aside from necessary copy-structure fixes.
