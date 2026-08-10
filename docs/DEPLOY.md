# Deploy

## Build

```bash
pnpm install
pnpm build
```

Output: `apps/web/dist/`

## Vercel (preview / share links)

Config lives in `apps/web/vercel.json` (and a root fallback `vercel.json`).

**Important:** Vercel may auto-detect Sanity Studio. Force the marketing site:

1. Project Settings → General → **Root Directory** = `apps/web` (not `apps/studio`)
2. Framework Preset = **Other**
3. Leave Build / Output / Install blank so `apps/web/vercel.json` wins
4. Env vars (check **Production** and **Preview**; `main` uses Production):
   - `PUBLIC_SANITY_PROJECT_ID` (from `apps/web/.env`)
   - `PUBLIC_SANITY_DATASET` = `production`
   - `PUBLIC_SANITY_API_VERSION` = `2024-01-01`
   - `PUBLIC_SITE_URL` = `https://energize-music.com`
   - `PUBLIC_FORM_ENDPOINT` (optional)
   Names are case-sensitive. After saving, trigger a **new** deploy (Redeploy).
5. Sanity Manage → CORS → add your `*.vercel.app` origin
6. Redeploy and share the preview URL

If the build fails with `Missing Sanity env` / Zod `Required`, the vars are not on that Vercel environment yet.

If the build log shows `sanity build` / `@energize/studio`, Root Directory is still pointing at Studio.

Production domain can stay on Hostinger; Vercel is fine as preview-only.

## Hostinger (production static)

Upload contents of `apps/web/dist/` to `public_html`.

### Manual

1. Zip `apps/web/dist/*`
2. Hostinger File Manager → `public_html`
3. Extract and overwrite

### SSL

Enable Hostinger SSL; `.htaccess` includes HTTPS redirect when available.

## GitHub Actions

If present, `.github/workflows/deploy.yml` can push to Hostinger on `main` / Sanity webhook.
Configure secrets per `docs/SECURITY.md`.
