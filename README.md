# Energize Music Website

Marketing site and Sanity Studio for [Energize Music](https://energize-music.com).

## Apps

| Package | Path | Purpose |
|---------|------|---------|
| `@energize/web` | `apps/web` | Astro site |
| `@energize/studio` | `apps/studio` | Sanity Studio |
| `@energize/shared` | `packages/shared` | Shared GROQ, types, validators |

## Requirements

- Node 20+
- pnpm 10.30.3 (see root `packageManager`)

## Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env   # if present; otherwise create env vars below
```

### Web env (`apps/web`)

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project |
| `PUBLIC_SANITY_DATASET` | Usually `production` |
| `PUBLIC_SANITY_API_VERSION` | e.g. `2024-01-01` |
| `PUBLIC_SITE_URL` | Canonical site URL |
| `PUBLIC_FORM_ENDPOINT` | Contact form endpoint (optional until wired) |
| `SANITY_READ_TOKEN` | Optional token for private datasets |

## Scripts

```bash
pnpm dev          # Astro site
pnpm dev:studio   # Sanity Studio
pnpm build        # shared + web production build
pnpm lint
pnpm typecheck
```

## Docs

- `docs/ARCHITECTURE.md` – monorepo overview
- `docs/CONTENT.md` – editor workflow
- `docs/DEPLOY.md` – hosting / CI deploy
- `docs/SECURITY.md` – security notes

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs install, lint, and build on `main` and pull requests. pnpm version is taken from `package.json` `packageManager`.
