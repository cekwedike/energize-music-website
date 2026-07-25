# Deploy (Hostinger static)

## Build

```bash
pnpm install
pnpm build
```

Upload contents of `apps/web/dist/` to `public_html`.

## GitHub Actions

Workflow `.github/workflows/deploy.yml` runs on push to `main` and on `repository_dispatch` (Sanity webhook).

Configure secrets per `docs/SECURITY.md`.

## Manual

1. Zip `apps/web/dist/*`
2. Hostinger File Manager → `public_html`
3. Extract and overwrite

## SSL

Enable Hostinger SSL; `.htaccess` includes HTTPS redirect when available.
