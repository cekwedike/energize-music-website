# Nav & Page Restructure — Phase 1

Date: 2026-08-02

## Context

The live site (energize-music.com) has a minimal structure: navbar with Home, Blogs,
Volunteer, Contact, plus a Team page outside the navbar. The local `apps/web` rebuild
is already further along and has accumulated pages (Artists, Releases, Services, News,
About, Careers, Press, Energize Kids) and Sanity schemas beyond that scope.

This phase realigns the rebuild's navigation and content model to a deliberately small,
Sanity-templated core, trimming pages that aren't part of the live site's structure.
Further pages will be redesigned and reintroduced later, one at a time.

## Goals

- Navbar becomes: Home · Artists · Blogs · About Us · Careers · Contact.
- "Team" becomes part of "About Us" (mission/vision/values copy + team grid), not a
  separate nav item.
- "Volunteer" is folded into the Careers page as a second section, not a separate route.
- News is renamed to Blogs (route and label), keeping the existing `newsPost` schema.
- Pages/schemas not part of this scope are removed outright: Releases, Services, Press,
  Energize Kids, and their supporting schemas/queries/types/components.
- Privacy and Terms stay live (footer-only, dropped from the navbar) — legal pages,
  different risk profile from marketing pages.
- Homepage sections tied to removed schemas are dropped; sections tied to schemas that
  stay (Artists, site mission teaser, newsletter) are kept as-is.
- Everything content-editable stays editable via Sanity Studio — no hardcoded copy for
  anything a non-technical editor would want to change.

## Non-goals

- No visual/design redesign of any page in this pass (explicitly deferred by the user).
- No new features beyond what's needed to realize the nav/page shape above (e.g. no
  real volunteer-signup backend — see below).
- Not touching the in-progress `HomeHero` WebGL work already uncommitted in the working
  tree.

## Navbar & page inventory

| Page | Route | Status |
|---|---|---|
| Home | `/` | Trimmed (see Homepage section) |
| Artists | `/artists` | Already Sanity-templated via `artist` schema — unchanged |
| Blogs | `/blogs` | Renamed from `/news`; same `newsPost` schema |
| About Us | `/about` | Rebuilt: mission/vision/values copy + team grid |
| Careers | `/careers` | Existing job-openings section + new Volunteer section |
| Contact | `/contact` | Unchanged |
| Privacy | `/privacy` | Kept, footer-only |
| Terms | `/terms` | Kept, footer-only |

**Removed entirely** (routes, components, schemas, groq queries, types):
- `/services` (`service` schema)
- `/press` (`pressAsset` schema)
- `/energize-kids`
- `creator` schema (`HomeCreators`)
- `partner` schema (`HomePartners`)
- `universeItem` schema (`HomeUniverse`)

**Correction (post-approval):** `release` is not purely a marketing page — it also
powers the Discography section on each Artist detail page
(`pages/artists/[slug].astro`) and the homepage hero's "Latest releases" CTA. Decision:
keep the `release` schema, its groq queries/types, `releases/[slug].astro` (detail
route), and `ReleaseCard`. Remove only the standalone browse-all-releases listing page
(`releases/index.astro`) and the `HomeNewMusic` homepage carousel (with its
`lib/motion/horizontalScroll.ts` helper, which nothing else uses). The hero's "Latest
releases" button is repointed to `/artists`.

## Content model changes

### New: `teamMember` schema
Fields: `name`, `role` (title), `bio` (text), `photo`, `order` (number, for manual
sort). Powers the About Us team grid.

Seed content (from the live site's Team page, entered as real starting content, fully
editable in Studio):
1. Tochukwu Macfoy — Founder
2. Charity Maduka MacFoy — Head of Projects and People
3. Teniola Akanni — Legal Partner
4. Excel Joab — Head of Music
5. Emmanuel Abadi — COO

(Bios as pulled from the live site; kept close to source wording.)

### Reused: `page` schema
About Us mission/vision/values copy is entered as Portable Text blocks on the existing
`page` document with slug `about` (already wired up in `about.astro`). Real copy
sourced from the live homepage: Afro-gospel & soul-fusion label description, mission
("We are here to inspire positive emotions"), vision ("to influence and inspire
1,000,000,000 minds with the good news"), and core values (excellence, positivity,
family-friendly, relevance).

### New: volunteer content
A `volunteer` object added as a section on a `page`-type document (slug `careers`, or
inline fields on `careerOpening`'s page context — implementation detail to settle in
the plan). Fields: intro copy, role options (list: Digital volunteer / Prayer
intercession community / Both), platform checkboxes (TikTok, X, Instagram), and a
`signupUrl` (editable link — e.g. a Google Form). No real backend: the CTA button links
out to `signupUrl`, same placeholder pattern as the existing newsletter form ("wires up
in Phase 4").

### Removed schemas
`release`, `service`, `pressAsset`, `creator`, `partner`, `universeItem` — plus their
groq queries in `packages/shared/src/groq/*` and types in
`packages/shared/src/types/*`.

## Homepage changes

Drop: `HomeNewMusic`, `HomeCreators`, `HomeUniverse`, `HomePartners`.

Keep as-is: `HomeHero`, `HomeArtists`, `HomeAboutTeaser`, `HomeNewsletter` — this
already matches the live homepage's real shape (mission teaser + featured artists +
newsletter signup).

## Package cleanup

After deletions, audit `apps/web/package.json`, `apps/studio/package.json`, and root
for dependencies that were only imported by deleted files, and uninstall them. Exact
candidates to be confirmed once deletions are complete (can't safely guess in advance —
e.g. `gsap`/`motion` may still be used by the in-progress Hero work and must not be
removed).

## Testing / verification

- `astro check` / `astro build` in `apps/web` succeeds with no broken imports.
- Sanity Studio (`apps/studio`) builds/starts with the updated schema list, no
  dangling references to removed types.
- Manual click-through: navbar links resolve, About Us renders mission copy + team
  grid, Careers renders openings + volunteer section, old routes (`/releases`,
  `/services`, `/press`, `/energize-kids`, `/news`) return 404 as expected.
