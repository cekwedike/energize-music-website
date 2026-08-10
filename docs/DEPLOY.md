# Deploy

## Build

```bash
pnpm install
pnpm build
```

Output: `apps/web/dist/`

## Vercel (preview / share links)

Repo root `vercel.json` sets install, build, and output directory.

1. Import the GitHub repo in Vercel
2. Add env vars (Preview):
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET=production`
   - `PUBLIC_SANITY_API_VERSION=2024-01-01`
   - `PUBLIC_SITE_URL=https://energize-music.com`
   - `PUBLIC_FORM_ENDPOINT` (optional)
3. Add the Vercel preview origin in Sanity Manage → CORS
4. Share the `*.vercel.app` deployment URL

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
