# Nav & Page Restructure (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trim the site's navigation and content model down to Home, Artists, Blogs, About Us, Careers, Contact — matching the live site's real structure — while keeping everything editable through Sanity Studio.

**Architecture:** Astro app (`apps/web`) reads content from a Sanity Studio (`apps/studio`) via typed GROQ queries defined in a shared package (`packages/shared`). Each task below either removes a page/schema/query/type trio together, or adds one (teamMember, volunteer info). No page in this app has its own database — everything routes through `packages/shared` types and queries, so schema, query, and page changes must stay in lockstep.

**Tech Stack:** Astro 7, Sanity Studio v3, TypeScript, GROQ, pnpm workspaces, Tailwind v4.

---

## Task 1: Remove the `service` schema and `/services` page

**Files:**
- Delete: `apps/studio/schemas/service.ts`
- Modify: `apps/studio/schemas/index.ts`
- Modify: `packages/shared/src/groq/content.ts`
- Modify: `packages/shared/src/types/content.ts`
- Delete: `apps/web/src/pages/services.astro`

- [ ] **Step 1: Delete the schema file**

Delete `apps/studio/schemas/service.ts`.

- [ ] **Step 2: Remove it from the schema index**

In `apps/studio/schemas/index.ts`, remove the `service` import and its entry in the `schemaTypes` array:

```ts
import siteSettings from './siteSettings';
import artist from './artist';
import release from './release';
import creator from './creator';
import partner from './partner';
import newsPost from './newsPost';
import pressAsset from './pressAsset';
import careerOpening from './careerOpening';
import universeItem from './universeItem';
import page from './page';

export const schemaTypes = [
  siteSettings,
  artist,
  release,
  creator,
  partner,
  newsPost,
  pressAsset,
  careerOpening,
  universeItem,
  page,
];
```

(This is an intermediate state — `creator`, `partner`, `pressAsset`, `universeItem` are removed in later tasks. Don't worry that they're still present here.)

- [ ] **Step 3: Remove the `allServicesQuery` export**

In `packages/shared/src/groq/content.ts`, delete this block:

```ts
export const allServicesQuery = /* groq */ `*[_type == "service"] | order(title asc){
  _id, title, "slug": slug.current, body, icon, contactIntent
}`;
```

- [ ] **Step 4: Remove the `Service` type**

In `packages/shared/src/types/content.ts`, delete:

```ts
export interface Service {
  _id: string;
  title: string;
  slug: string;
  body: PortableTextBlock[];
  icon?: string;
  contactIntent?: string;
}
```

- [ ] **Step 5: Delete the page**

Delete `apps/web/src/pages/services.astro`.

- [ ] **Step 6: Verify the workspace still type-checks**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors referencing `Service`, `allServicesQuery`, or `services.astro`.

- [ ] **Step 7: Commit**

```bash
git add apps/studio/schemas/service.ts apps/studio/schemas/index.ts packages/shared/src/groq/content.ts packages/shared/src/types/content.ts apps/web/src/pages/services.astro
git commit -m "Remove Services page and schema"
```

---

## Task 2: Remove the `pressAsset` schema and `/press` page

**Files:**
- Delete: `apps/studio/schemas/pressAsset.ts`
- Modify: `apps/studio/schemas/index.ts`
- Modify: `packages/shared/src/groq/content.ts`
- Modify: `packages/shared/src/groq/fragments.ts`
- Modify: `packages/shared/src/types/content.ts`
- Delete: `apps/web/src/pages/press.astro`

- [ ] **Step 1: Delete the schema file**

Delete `apps/studio/schemas/pressAsset.ts`.

- [ ] **Step 2: Remove it from the schema index**

In `apps/studio/schemas/index.ts`, remove the `pressAsset` import and array entry:

```ts
import siteSettings from './siteSettings';
import artist from './artist';
import release from './release';
import creator from './creator';
import partner from './partner';
import newsPost from './newsPost';
import careerOpening from './careerOpening';
import universeItem from './universeItem';
import page from './page';

export const schemaTypes = [
  siteSettings,
  artist,
  release,
  creator,
  partner,
  newsPost,
  careerOpening,
  universeItem,
  page,
];
```

- [ ] **Step 3: Remove the `allPressAssetsQuery` export**

In `packages/shared/src/groq/content.ts`, delete:

```ts
export const allPressAssetsQuery = /* groq */ `*[_type == "pressAsset"] | order(category asc){
  _id, title, category, file${fileFragment}
}`;
```

Also remove the now-unused `fileFragment` import from the top of that file — change:

```ts
import { imageFragment, fileFragment, seoFragment } from './fragments';
```

to:

```ts
import { imageFragment, seoFragment } from './fragments';
```

- [ ] **Step 4: Remove `fileFragment` itself and the `SanityFile`/`PressAsset` types**

`fileFragment` (in `packages/shared/src/groq/fragments.ts`) and `SanityFile` (in `packages/shared/src/types/common.ts`) were only used by press assets. Delete `fileFragment` from `fragments.ts`:

```ts
export const fileFragment = /* groq */ `{
  asset->{ _id, url, originalFilename }
}`;
```

Delete `SanityFile` from `common.ts`:

```ts
export interface SanityFile {
  asset: {
    _id: string;
    url: string;
    originalFilename?: string;
  };
}
```

In `packages/shared/src/types/content.ts`, delete:

```ts
export type PressAssetCategory = 'logo' | 'photo' | 'pdf';

export interface PressAsset {
  _id: string;
  title: string;
  category: PressAssetCategory;
  file: SanityFile;
}
```

And remove the now-unused `SanityFile` import at the top of that file if nothing else in it uses `SanityFile` (check first — `SanityImage` stays).

- [ ] **Step 5: Delete the page**

Delete `apps/web/src/pages/press.astro`.

- [ ] **Step 6: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors referencing `PressAsset`, `SanityFile`, `fileFragment`, or `press.astro`.

- [ ] **Step 7: Commit**

```bash
git add apps/studio/schemas/pressAsset.ts apps/studio/schemas/index.ts packages/shared/src/groq/content.ts packages/shared/src/groq/fragments.ts packages/shared/src/types/content.ts packages/shared/src/types/common.ts apps/web/src/pages/press.astro
git commit -m "Remove Press page and schema"
```

---

## Task 3: Remove `/energize-kids`

**Files:**
- Delete: `apps/web/src/pages/energize-kids.astro`

- [ ] **Step 1: Delete the page**

Delete `apps/web/src/pages/energize-kids.astro`. (Its use of `PagePlaceholder` doesn't orphan that component — `404.astro`, `terms.astro`, and `privacy.astro` still use it.)

- [ ] **Step 2: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/energize-kids.astro
git commit -m "Remove Energize Kids placeholder page"
```

---

## Task 4: Remove the `creator`, `partner`, and `universeItem` schemas and their homepage sections

**Files:**
- Delete: `apps/studio/schemas/creator.ts`, `apps/studio/schemas/partner.ts`, `apps/studio/schemas/universeItem.ts`
- Modify: `apps/studio/schemas/index.ts`
- Modify: `packages/shared/src/groq/content.ts`
- Modify: `packages/shared/src/types/content.ts`
- Delete: `apps/web/src/components/home/HomeCreators.astro`, `apps/web/src/components/home/HomePartners.astro`, `apps/web/src/components/home/HomeUniverse.astro`
- Modify: `apps/web/src/pages/index.astro`

- [ ] **Step 1: Delete the three schema files**

Delete `apps/studio/schemas/creator.ts`, `apps/studio/schemas/partner.ts`, `apps/studio/schemas/universeItem.ts`.

- [ ] **Step 2: Update the schema index**

`apps/studio/schemas/index.ts` should now read:

```ts
import siteSettings from './siteSettings';
import artist from './artist';
import release from './release';
import newsPost from './newsPost';
import careerOpening from './careerOpening';
import page from './page';

export const schemaTypes = [
  siteSettings,
  artist,
  release,
  newsPost,
  careerOpening,
  page,
];
```

- [ ] **Step 3: Remove the groq queries**

In `packages/shared/src/groq/content.ts`, delete:

```ts
export const allCreatorsQuery = /* groq */ `*[_type == "creator"] | order(name asc){
  _id, name, photo${imageFragment}, credits
}`;

export const allPartnersQuery = /* groq */ `*[_type == "partner"] | order(order asc){
  _id, name, logo${imageFragment}, url, order
}`;
```

and:

```ts
export const allUniverseItemsQuery = /* groq */ `*[_type == "universeItem"] | order(title asc){
  _id, title, category, media${imageFragment}, link
}`;
```

- [ ] **Step 4: Remove the types**

In `packages/shared/src/types/content.ts`, delete `Creator`, `Partner`, `UniverseCategory`, and `UniverseItem`:

```ts
export interface Creator {
  _id: string;
  name: string;
  photo?: SanityImage;
  credits?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo: SanityImage;
  url?: string;
  order?: number;
}
```

```ts
export type UniverseCategory = 'podcast' | 'video' | 'event' | 'studio';

export interface UniverseItem {
  _id: string;
  title: string;
  category: UniverseCategory;
  media?: SanityImage;
  link?: string;
}
```

- [ ] **Step 5: Delete the homepage components**

Delete `apps/web/src/components/home/HomeCreators.astro`, `apps/web/src/components/home/HomePartners.astro`, `apps/web/src/components/home/HomeUniverse.astro`.

- [ ] **Step 6: Update the homepage**

`apps/web/src/pages/index.astro` should read:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HomeHero from '../components/home/HomeHero.astro';
import HomeArtists from '../components/home/HomeArtists.astro';
import HomeAboutTeaser from '../components/home/HomeAboutTeaser.astro';
import HomeNewsletter from '../components/home/HomeNewsletter.astro';
---

<BaseLayout
  title="Energize Music"
  description="Energize Music is a global Afro-gospel and soul-fusion label — artists, releases, and services distributed via Orchard (Sony Music)."
>
  <HomeHero />
  <HomeArtists />
  <HomeAboutTeaser />
  <HomeNewsletter />
</BaseLayout>
```

(`HomeNewMusic` is removed here too — see Task 5, which handles it together with the `/releases` listing page since both are release-related.)

- [ ] **Step 7: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors yet from this task (Task 5 still has `HomeNewMusic` imported — if `astro check` complains about it before Task 5 runs, that's expected and resolved next task; don't chase it here).

- [ ] **Step 8: Commit**

```bash
git add apps/studio/schemas/creator.ts apps/studio/schemas/partner.ts apps/studio/schemas/universeItem.ts apps/studio/schemas/index.ts packages/shared/src/groq/content.ts packages/shared/src/types/content.ts apps/web/src/components/home/HomeCreators.astro apps/web/src/components/home/HomePartners.astro apps/web/src/components/home/HomeUniverse.astro apps/web/src/pages/index.astro
git commit -m "Remove Producers, Partners, and Universe homepage sections"
```

---

## Task 5: Remove the `/releases` listing page and `HomeNewMusic`, keep release detail pages

**Files:**
- Delete: `apps/web/src/pages/releases/index.astro`
- Delete: `apps/web/src/components/home/HomeNewMusic.astro`
- Delete: `apps/web/src/lib/motion/horizontalScroll.ts`
- Modify: `apps/web/src/components/home/HomeHero.astro`

`release` schema, `releases/[slug].astro`, `ReleaseCard.astro`, and their groq queries/types **stay** — they power each Artist page's Discography section (`pages/artists/[slug].astro`), which is in scope for this site.

- [ ] **Step 1: Delete the listing page**

Delete `apps/web/src/pages/releases/index.astro`. (`releases/[slug].astro` stays — `ReleaseCard` links to `/releases/${release.slug}`, and that route must keep resolving.)

- [ ] **Step 2: Delete the homepage carousel and its motion helper**

Delete `apps/web/src/components/home/HomeNewMusic.astro` and `apps/web/src/lib/motion/horizontalScroll.ts` (confirmed nothing else imports `horizontalScroll`).

- [ ] **Step 3: Repoint the hero CTA**

In `apps/web/src/components/home/HomeHero.astro`, change the second button from linking to `/releases` to `/artists`, and reword it since "Meet the roster" already covers artists — point it at Blogs instead, which is a real remaining section:

```astro
  <div class="flex flex-wrap gap-4">
    <a
      href="/artists"
      class="rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:opacity-90"
    >
      Meet the roster
    </a>
    <a
      href="/blogs"
      class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
    >
      Latest news
    </a>
  </div>
```

- [ ] **Step 4: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors. `releases/[slug].astro` still resolves via `allReleasesQuery`/`releaseBySlugQuery`, both untouched.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages/releases/index.astro apps/web/src/components/home/HomeNewMusic.astro apps/web/src/lib/motion/horizontalScroll.ts apps/web/src/components/home/HomeHero.astro
git commit -m "Remove releases listing page and homepage carousel; keep release detail pages"
```

(Note: `git add` on deleted files stages the deletion — this is correct usage.)

---

## Task 6: Rename News to Blogs

**Files:**
- Move: `apps/web/src/pages/news/index.astro` → `apps/web/src/pages/blogs/index.astro`
- Move: `apps/web/src/pages/news/[slug].astro` → `apps/web/src/pages/blogs/[slug].astro`

- [ ] **Step 1: Move the listing page and update its copy/route references**

Move `apps/web/src/pages/news/index.astro` to `apps/web/src/pages/blogs/index.astro` with this content:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import NewsCard from '../../components/news/NewsCard.astro';
import { sanityClient } from '../../lib/sanity/client';
import { allNewsQuery, type NewsPost } from '@energize/shared';

const posts = await sanityClient.fetch<NewsPost[]>(allNewsQuery);
---

<BaseLayout title="Blogs" description="Announcements and news from Energize Music.">
  <section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
    <h1 class="text-h1">Blogs</h1>
    <p class="text-lead mt-4 max-w-xl text-paper/70">Announcements from Energize Music.</p>

    {
      posts.length === 0 ? (
        <p class="mt-10 text-paper/60">Posts will appear here once added in Sanity Studio.</p>
      ) : (
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard post={post} />
          ))}
        </div>
      )
    }
  </section>
</BaseLayout>
```

Delete the old `apps/web/src/pages/news/index.astro`.

- [ ] **Step 2: Move the detail page and update its route reference**

Move `apps/web/src/pages/news/[slug].astro` to `apps/web/src/pages/blogs/[slug].astro`. Content is identical except line 26, which changes from `` `/news/${post.slug}` `` to `` `/blogs/${post.slug}` ``:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PortableText from '../../components/portable/PortableText.astro';
import JsonLd from '../../components/seo/JsonLd.astro';
import { sanityClient, urlForImage } from '../../lib/sanity/client';
import { allNewsQuery, newsBySlugQuery, type NewsPost } from '@energize/shared';

export async function getStaticPaths() {
  const posts = await sanityClient.fetch<Pick<NewsPost, 'slug'>[]>(allNewsQuery);
  return posts.map((post) => ({ params: { slug: post.slug } }));
}

const { slug } = Astro.params;
const post = await sanityClient.fetch<NewsPost>(newsBySlugQuery, { slug });

const coverUrl = urlForImage(post.cover).width(1200).height(675).fit('crop').auto('format').url();
const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://energize-music.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: post.title,
  datePublished: post.date,
  image: [coverUrl],
  url: new URL(`/blogs/${post.slug}`, siteUrl).toString(),
  publisher: {
    '@type': 'Organization',
    name: 'Energize Music',
  },
};
---

<BaseLayout title={post.title} description={post.title}>
  <JsonLd data={jsonLd} />
  <article class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <p class="text-sm uppercase tracking-wide text-paper/50">{date}</p>
    <h1 class="text-h1 mt-3">{post.title}</h1>
    <img
      src={coverUrl}
      alt={post.cover.alt ?? post.title}
      class="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
    />
    <div class="mt-8">
      <PortableText value={post.body} />
    </div>
    {
      post.tags && post.tags.length > 0 && (
        <div class="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span class="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wide text-paper/60">
              {tag}
            </span>
          ))}
        </div>
      )
    }
  </article>
</BaseLayout>
```

Delete the old `apps/web/src/pages/news/[slug].astro`, then remove the now-empty `apps/web/src/pages/news/` directory.

- [ ] **Step 3: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors. Confirm `apps/web/src/pages/news/` no longer exists.

- [ ] **Step 4: Commit**

```bash
git add -A apps/web/src/pages/blogs apps/web/src/pages/news
git commit -m "Rename News route to Blogs"
```

---

## Task 7: Update the navbar and footer

**Files:**
- Modify: `apps/web/src/lib/nav.ts`
- Modify: `apps/web/src/components/ui/SiteFooter.astro`

- [ ] **Step 1: Rewrite `nav.ts`**

Replace the contents of `apps/web/src/lib/nav.ts`:

```ts
export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Artists', href: '/artists' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export interface SocialLink {
  label: string;
  href: string;
}

// Placeholder handles — wire to siteSettings.socials once Sanity content is seeded.
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/energizemusic' },
  { label: 'YouTube', href: 'https://youtube.com/@energizemusic' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E' },
  { label: 'TikTok', href: 'https://tiktok.com/@energizemusic' },
];
```

This drops `initiativesNav` (was Energize Kids-only) and removes Press from `secondaryNav`.

- [ ] **Step 2: Update the footer**

In `apps/web/src/components/ui/SiteFooter.astro`, remove the `initiativesNav` import and its rendering block. Change the import line:

```ts
import { primaryNav, secondaryNav, initiativesNav, socialLinks } from '../../lib/nav';
```

to:

```ts
import { primaryNav, secondaryNav, socialLinks } from '../../lib/nav';
```

And remove this block from the "Company" `<nav>`:

```astro
          {
            initiativesNav.map((link) => (
              <li>
                <a href={link.href} class="text-paper/75 transition hover:text-[var(--color-gold)]">
                  {link.label}
                </a>
              </li>
            ))
          }
```

- [ ] **Step 3: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors referencing `initiativesNav`.

Run: `pnpm --filter @energize/web run dev` briefly (or `astro build`) and confirm the navbar renders: Home, Artists, Blogs, About Us, Careers, Contact — six links, no Services/Releases/Press/Energize Kids.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/lib/nav.ts apps/web/src/components/ui/SiteFooter.astro
git commit -m "Update navbar to Home, Artists, Blogs, About Us, Careers, Contact"
```

---

## Task 8: Add the `teamMember` schema and query

**Files:**
- Create: `apps/studio/schemas/teamMember.ts`
- Modify: `apps/studio/schemas/index.ts`
- Modify: `packages/shared/src/groq/content.ts`
- Modify: `packages/shared/src/types/content.ts`

- [ ] **Step 1: Create the schema**

Create `apps/studio/schemas/teamMember.ts`:

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
```

- [ ] **Step 2: Register it in the schema index**

`apps/studio/schemas/index.ts` should now read:

```ts
import siteSettings from './siteSettings';
import artist from './artist';
import release from './release';
import newsPost from './newsPost';
import careerOpening from './careerOpening';
import teamMember from './teamMember';
import page from './page';

export const schemaTypes = [
  siteSettings,
  artist,
  release,
  newsPost,
  careerOpening,
  teamMember,
  page,
];
```

- [ ] **Step 3: Add the groq query**

In `packages/shared/src/groq/content.ts`, add (near `pageBySlugQuery`):

```ts
export const allTeamMembersQuery = /* groq */ `*[_type == "teamMember"] | order(order asc, name asc){
  _id, name, role, bio, photo${imageFragment}
}`;
```

- [ ] **Step 4: Add the type**

In `packages/shared/src/types/content.ts`, add:

```ts
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: SanityImage;
  order?: number;
}
```

- [ ] **Step 5: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add apps/studio/schemas/teamMember.ts apps/studio/schemas/index.ts packages/shared/src/groq/content.ts packages/shared/src/types/content.ts
git commit -m "Add teamMember schema and query"
```

---

## Task 9: Rebuild the About Us page with mission copy and team grid

**Files:**
- Modify: `apps/web/src/pages/about.astro`

Mission/vision/values/description copy below is adapted from the live site (energize-music.com) as real starting content, fully editable afterward via the `page` document (slug `about`) in Sanity Studio.

- [ ] **Step 1: Rewrite `about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PortableText from '../components/portable/PortableText.astro';
import { sanityClient, urlForImage } from '../lib/sanity/client';
import { pageBySlugQuery, allTeamMembersQuery, type Page, type TeamMember } from '@energize/shared';

const page = await sanityClient.fetch<Page | null>(pageBySlugQuery, { slug: 'about' });
const team = await sanityClient.fetch<TeamMember[]>(allTeamMembersQuery);
---

<BaseLayout title="About Us" description="Energize Music's mission, vision, values, and the team behind it.">
  <section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
    <h1 class="text-h1">About Energize Music</h1>
    {
      page ? (
        <div
          id="about-reveal"
          class="about-reveal mt-10 [&_h2]:text-h3 [&_h2]:mt-12 [&_h2]:first:mt-0"
        >
          <PortableText value={page.blocks} />
        </div>
      ) : (
        <div class="mt-10 space-y-6 text-paper/80">
          <p>
            Energize Music is an Afro-gospel &amp; soul-fusion record label providing
            high-quality, family-friendly, uplifting music — built on the belief that
            music has the power to connect people and speak to audiences everywhere.
          </p>
          <p><strong class="text-paper">Mission:</strong> We are here to inspire positive emotions.</p>
          <p><strong class="text-paper">Vision:</strong> To influence and inspire 1,000,000,000 minds with the good news.</p>
          <p>
            <strong class="text-paper">Values:</strong> Excellence in music and lyrics, positivity
            and uplifting content, family-friendly material across cultures, and relevance to
            global audiences.
          </p>
        </div>
      )
    }
  </section>

  {
    team.length > 0 && (
      <section class="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <h2 class="text-h2">Our Team</h2>
        <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div>
              {member.photo?.asset && (
                <img
                  src={urlForImage(member.photo).width(400).height(400).fit('crop').auto('format').url()}
                  alt={member.photo.alt ?? member.name}
                  loading="lazy"
                  class="aspect-square w-full rounded-lg object-cover"
                />
              )}
              <p class="mt-4 font-medium text-paper">{member.name}</p>
              <p class="text-sm text-[var(--color-gold)]">{member.role}</p>
              <p class="mt-2 text-sm text-paper/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
</BaseLayout>

<style>
  .about-reveal.is-ready > :global(*) {
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
  }

  .about-reveal.is-ready.is-visible > :global(*) {
    opacity: 1;
    transform: translateY(0);
  }

  .about-reveal.is-ready.is-visible > :global(*:nth-child(1)) {
    transition-delay: 0ms;
  }
  .about-reveal.is-ready.is-visible > :global(*:nth-child(2)) {
    transition-delay: 60ms;
  }
  .about-reveal.is-ready.is-visible > :global(*:nth-child(3)) {
    transition-delay: 120ms;
  }
  .about-reveal.is-ready.is-visible > :global(*:nth-child(4)) {
    transition-delay: 180ms;
  }
  .about-reveal.is-ready.is-visible > :global(*:nth-child(n + 5)) {
    transition-delay: 240ms;
  }
</style>

<script>
  const el = document.getElementById('about-reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (el && !prefersReducedMotion) {
    el.classList.add('is-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
  }
</script>
```

Note: the fallback mission copy only renders if no `page` document with slug `about` exists yet in Sanity — once that document is created in Studio with the mission/vision/values as Portable Text, it takes over automatically. The team grid is independent and always Sanity-driven.

- [ ] **Step 2: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/about.astro
git commit -m "Rebuild About Us page with mission copy and team grid"
```

---

## Task 10: Add volunteer content model and section on the Careers page

**Files:**
- Create: `apps/studio/schemas/volunteerInfo.ts`
- Modify: `apps/studio/schemas/index.ts`
- Modify: `packages/shared/src/groq/content.ts`
- Modify: `packages/shared/src/types/content.ts`
- Modify: `apps/web/src/pages/careers.astro`

The volunteer sign-up has no backend of its own (matches the existing newsletter form's placeholder pattern). It's a singleton document so there's exactly one editable volunteer section, with a `signupUrl` field that a non-technical editor points at whatever external form (e.g. a Google Form) collects sign-ups.

- [ ] **Step 1: Create the schema**

Create `apps/studio/schemas/volunteerInfo.ts`:

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'volunteerInfo',
  title: 'Volunteer Info',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Intro copy', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'roleOptions',
      title: 'Role options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'signupUrl',
      title: 'Sign-up form URL',
      type: 'url',
      description: 'Where the "Join the volunteer list" button sends people — e.g. a Google Form link.',
    }),
    defineField({ name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Join the volunteer list' }),
  ],
  preview: { select: { title: 'heading' } },
});
```

- [ ] **Step 2: Register it in the schema index**

`apps/studio/schemas/index.ts` should now read:

```ts
import siteSettings from './siteSettings';
import artist from './artist';
import release from './release';
import newsPost from './newsPost';
import careerOpening from './careerOpening';
import teamMember from './teamMember';
import volunteerInfo from './volunteerInfo';
import page from './page';

export const schemaTypes = [
  siteSettings,
  artist,
  release,
  newsPost,
  careerOpening,
  teamMember,
  volunteerInfo,
  page,
];
```

- [ ] **Step 3: Add the groq query**

In `packages/shared/src/groq/content.ts`, add:

```ts
export const volunteerInfoQuery = /* groq */ `*[_type == "volunteerInfo"][0]{
  heading, intro, roleOptions, platforms, signupUrl, ctaLabel
}`;
```

- [ ] **Step 4: Add the type**

In `packages/shared/src/types/content.ts`, add:

```ts
export interface VolunteerInfo {
  heading: string;
  intro: string;
  roleOptions?: string[];
  platforms?: string[];
  signupUrl?: string;
  ctaLabel?: string;
}
```

- [ ] **Step 5: Add the volunteer section to the Careers page**

Modify `apps/web/src/pages/careers.astro` — add the `volunteerInfoQuery` fetch and a new section after the openings list, before the closing `</BaseLayout>`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { sanityClient } from '../lib/sanity/client';
import { allCareerOpeningsQuery, volunteerInfoQuery, type CareerOpening, type VolunteerInfo } from '@energize/shared';

const openings = await sanityClient.fetch<CareerOpening[]>(allCareerOpeningsQuery);
const volunteer = await sanityClient.fetch<VolunteerInfo | null>(volunteerInfoQuery);
---

<BaseLayout title="Careers" description="Open roles and volunteer opportunities at Energize Music.">
  <section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
    <h1 class="text-h1">Careers</h1>
    <p class="text-lead mt-4 max-w-xl text-paper/70">
      Join the team building Energize Music’s global, family-friendly catalog.
    </p>

    {
      openings.length === 0 ? (
        <p class="mt-10 text-paper/60">
          No open roles right now. Reach out via <a href="/contact" class="underline hover:text-[var(--color-gold)]">Contact</a> to Introduce Yourself.
        </p>
      ) : (
        <ul class="mt-10 divide-y divide-white/10 border-t border-white/10">
          {openings.map((role) => (
            <li class="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-paper">{role.title}</p>
                <p class="mt-1 text-sm text-paper/60">
                  {role.location} &middot; {role.type}
                </p>
              </div>
              <a
                href={role.applyUrl}
                class="inline-block shrink-0 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                Apply
              </a>
            </li>
          ))}
        </ul>
      )
    }

    <p class="mt-10 text-sm text-paper/50">
      General applications are also welcome via
      {' '}
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="underline hover:text-[var(--color-gold)]">
        LinkedIn
      </a>.
    </p>
  </section>

  {
    volunteer && (
      <section class="border-t border-white/10 bg-[var(--color-ink-raised)]">
        <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h2 class="text-h2">{volunteer.heading}</h2>
          <p class="text-lead mt-4 text-paper/70">{volunteer.intro}</p>

          {
            volunteer.roleOptions && volunteer.roleOptions.length > 0 && (
              <div class="mt-8">
                <p class="text-sm font-semibold uppercase tracking-wide text-paper/50">Ways to help</p>
                <ul class="mt-3 flex flex-wrap gap-2">
                  {volunteer.roleOptions.map((role) => (
                    <li class="rounded-full border border-white/20 px-4 py-2 text-sm text-paper/80">{role}</li>
                  ))}
                </ul>
              </div>
            )
          }

          {
            volunteer.platforms && volunteer.platforms.length > 0 && (
              <div class="mt-6">
                <p class="text-sm font-semibold uppercase tracking-wide text-paper/50">Platforms</p>
                <ul class="mt-3 flex flex-wrap gap-2">
                  {volunteer.platforms.map((platform) => (
                    <li class="rounded-full border border-white/20 px-4 py-2 text-sm text-paper/80">{platform}</li>
                  ))}
                </ul>
              </div>
            )
          }

          {
            volunteer.signupUrl ? (
              <a
                href={volunteer.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="mt-10 inline-block rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:opacity-90"
              >
                {volunteer.ctaLabel ?? 'Join the volunteer list'}
              </a>
            ) : (
              <p class="mt-10 text-sm text-paper/50">
                Sign-up link isn’t configured yet — add one in Sanity Studio under Volunteer Info.
              </p>
            )
          }
        </div>
      </section>
    )
  }
</BaseLayout>
```

- [ ] **Step 6: Verify**

Run: `pnpm --filter @energize/web run typecheck`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add apps/studio/schemas/volunteerInfo.ts apps/studio/schemas/index.ts packages/shared/src/groq/content.ts packages/shared/src/types/content.ts apps/web/src/pages/careers.astro
git commit -m "Add volunteer section to Careers page"
```

---

## Task 11: Full workspace build verification

**Files:** none (verification only)

- [ ] **Step 1: Type-check and build the web app**

Run: `pnpm --filter @energize/web run build`
Expected: succeeds with no errors. This runs `astro check && astro build`, which will catch any remaining broken imports, unresolved types, or dangling references to removed schemas/queries.

- [ ] **Step 2: Confirm removed routes 404 and kept routes resolve**

Run: `pnpm --filter @energize/web run preview` in the background, then check:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/services
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/press
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/energize-kids
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/news
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/releases
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/blogs
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/about
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/careers
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/privacy
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/terms
```

Expected: `404` for `/services`, `/press`, `/energize-kids`, `/news`, `/releases`. `200` for `/blogs`, `/about`, `/careers`, `/privacy`, `/terms`.

Stop the preview server afterward.

- [ ] **Step 3: Build the Studio**

Run: `pnpm --filter @energize/studio run build` (runs `sanity build`)
Expected: succeeds with no schema errors, confirming `schemaTypes` in `apps/studio/schemas/index.ts` has no dangling imports.

- [ ] **Step 4: No commit** — this task is verification only, nothing to stage.

---

## Task 12: Audit and remove unused packages

**Files:**
- Possibly modify: `apps/web/package.json`, `apps/studio/package.json`
- Modify: `pnpm-lock.yaml` (auto-updated by pnpm)

Removing pages/schemas in Tasks 1–6 didn't remove any npm dependency imports outright (checked during planning: `gsap`, `motion`, `clsx`, `zod`, `tailwind-merge` are all still used by code that stays — e.g. `HomeHero`/`ArtistCard` motion, `packages/shared` validators, `lib/utils.ts`). This task re-confirms that after the actual deletions, rather than trusting the pre-check.

- [ ] **Step 1: Check each `apps/web` dependency for remaining usage**

Run, one at a time, from the repo root:

```bash
grep -rl "from 'gsap'\|from \"gsap\"" apps/web/src
grep -rl "from 'motion" apps/web/src
grep -rl "from 'clsx'" apps/web/src
grep -rl "from 'zod'" apps/web/src packages/shared/src
grep -rl "tailwind-merge" apps/web/src
```

Expected: each returns at least one file (confirming the package is still used). If any command returns nothing, that package is now unused.

- [ ] **Step 2: Remove any package that had zero matches**

For each dependency confirmed unused in Step 1, run (example for a hypothetical unused `foo`):

```bash
pnpm --filter @energize/web remove foo
```

If Step 1 found usage for all five packages (the expected outcome), skip this step — there's nothing to remove.

- [ ] **Step 3: Verify the build still passes**

Run: `pnpm --filter @energize/web run build`
Expected: succeeds.

- [ ] **Step 4: Commit (only if Step 2 made changes)**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "Remove unused dependencies"
```

If nothing was removed in Step 2, skip this commit — there's nothing to commit.
