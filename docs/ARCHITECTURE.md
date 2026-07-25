# Architecture

## Monorepo

- `apps/web` — Astro 7 static site → `dist/` for Hostinger (bumped from 5 in Phase 1 to clear high-severity XSS/SSRF advisories only patched in 6.4.6+)
- `apps/studio` — Sanity Studio v3
- `packages/shared` — GROQ fragments, Zod env, fallback seed data

## Data flow

Build time: Astro pages import `sanityClient` from `apps/web/src/lib/sanity/client.ts`
and run GROQ queries from `packages/shared/src/groq/*` → static HTML. `PUBLIC_SANITY_PROJECT_ID`,
`PUBLIC_SANITY_DATASET`, and `PUBLIC_SANITY_API_VERSION` are required (validated via
`parseSanityEnv` in `packages/shared`) — there is no unset-project fallback. Query-and-render
wiring per route lands in Phase 2.

## Motion islands

- `HeroScene` — React Three Fiber (client only, lazy)
- `ReleaseRunway` — GSAP ScrollTrigger
- `ContactForm` — React + honeypot

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```
