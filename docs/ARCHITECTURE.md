# Architecture

## Monorepo

- `apps/web` — Astro 7 static site (`dist/` for hosting)
- `apps/studio` — Sanity Studio
- `packages/shared` — GROQ fragments, Zod env helpers, shared types

## Data flow

At build time, Astro pages import `sanityClient` from `apps/web/src/lib/sanity/client.ts` and run GROQ queries from `packages/shared/src/groq/*` into static HTML.

Required env: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION` (validated via `parseSanityEnv` in `packages/shared`).

## Motion

- Homepage: GSAP ScrollTrigger runway / reveals (`lib/motion/home/initHome.ts`)
- Artists roster: Motion One via `ArtistsRosterMotion` React island
- Blog posts: read-progress + reveal (`lib/motion/blogs/*`)
- Global scroll reveals: IntersectionObserver in `BaseLayout`

## Commands

```bash
pnpm install
pnpm dev
pnpm dev:studio
pnpm build
pnpm lint
pnpm typecheck
```
