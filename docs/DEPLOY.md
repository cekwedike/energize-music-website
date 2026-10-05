# Deploy

## How content gets onto the live site (plain English)

1. You edit and **Publish** in Sanity Studio.
2. The marketing site is a **static** Astro build. It does **not** read Sanity on every visitor click.
3. A rebuild copies the latest published Sanity content into HTML files (`apps/web/dist/`).
4. Those files must be uploaded (Hostinger) or rebuilt on Vercel.

So: blogs are **not hardcoded**. They come from Sanity at build time. If you delete a post in Studio and still see it live, you are looking at an **old build**.

## Build (manual)

```bash
pnpm install
pnpm build
```

Output: `apps/web/dist/`

## Automatic rebuild when Sanity changes

Workflow: `.github/workflows/deploy-content.yml`

It runs when:

- Sanity sends a webhook (`repository_dispatch` / `sanity-rebuild`)
- Or you click **Run workflow** in GitHub Actions

### 1. GitHub secrets

Repo → Settings → Secrets and variables → Actions:

| Secret | Required | Purpose |
|--------|----------|---------|
| `PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project id |
| `SANITY_READ_TOKEN` | Optional | Private dataset / draft access (public dataset usually fine without it) |
| `PUBLIC_FORMS_API_BASE` | Optional | Only for Hostinger builds: the Vercel host that serves `/api` |
| `PUBLIC_GA4_ID`, `PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Analytics and Search Console |
| `VERCEL_DEPLOY_HOOK_URL` | Optional | Triggers a Vercel rebuild |
| `FTP_SERVER` | Optional | Hostinger FTP host |
| `FTP_USERNAME` | Optional | Hostinger FTP user |
| `FTP_PASSWORD` | Optional | Hostinger FTP password |

For Hostinger FTP deploy, set all three `FTP_*` secrets. Files upload to `public_html/`.

For Vercel-only preview/production, set `VERCEL_DEPLOY_HOOK_URL` (Vercel → Project → Settings → Git → Deploy Hooks).

### 2. GitHub token for Sanity → Actions

Create a fine-grained personal access token (or classic PAT) with permission to trigger workflows on this repo (`contents: write` / ability to create `repository_dispatch`).

Save it somewhere safe. You will paste it into the Sanity webhook Authorization header.

### 3. Sanity webhook

1. Open [Sanity Manage](https://www.sanity.io/manage) → project **Energize Music** → **API** → **Webhooks**
2. Create webhook:
   - **Name:** `Rebuild site`
   - **URL:** `https://api.github.com/repos/cekwedike/energize-music-website/dispatches`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete (and ideally only after publish)
   - **HTTP method:** POST
   - **HTTP headers:**
     - `Accept`: `application/vnd.github+json`
     - `Authorization`: `Bearer YOUR_GITHUB_PAT`
     - `X-GitHub-Api-Version`: `2022-11-28`
     - `Content-Type`: `application/json`
   - **Projection / body** (static JSON):

```json
{
  "event_type": "sanity-rebuild",
  "client_payload": {
    "source": "sanity"
  }
}
```

3. Save. Publish or delete a blog in Studio. Check GitHub → Actions → **Deploy content**.

### Simpler Vercel-only path

If the site you care about is on Vercel:

1. Create a Deploy Hook in Vercel
2. Point the Sanity webhook **URL** straight at that Deploy Hook (POST, no GitHub PAT needed)
3. Skip FTP secrets

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
   - Brevo form variables (`BREVO_API_KEY`, list IDs, sender, `CONTACT_TO_EMAIL`): see `docs/FORMS.md`
   - Optional SEO / ads IDs (`PUBLIC_GA4_ID`, `PUBLIC_GOOGLE_SITE_VERIFICATION`, ...): see `docs/FORMS.md`
   Names are case-sensitive. After saving, trigger a **new** deploy (Redeploy).
5. Sanity Manage → CORS → add your `*.vercel.app` origin
6. Redeploy and share the preview URL

If the build fails with `Missing Sanity env` / Zod `Required`, the vars are not on that Vercel environment yet.

If the build log shows `sanity build` / `@energize/studio`, Root Directory is still pointing at Studio.

## Hostinger (production static)

Upload contents of `apps/web/dist/` to `public_html`, or use the FTP secrets above so Actions uploads after each Sanity rebuild.

Hostinger serves static files only, so the `/api` form endpoints must stay on Vercel. Build with `PUBLIC_FORMS_API_BASE` set to the Vercel host and add the Hostinger origin to `FORMS_ALLOWED_ORIGINS` on Vercel (see `docs/FORMS.md`).

### Manual

1. Zip `apps/web/dist/*`
2. Hostinger File Manager → `public_html`
3. Extract and overwrite

### SSL

Enable Hostinger SSL; `.htaccess` includes HTTPS redirect when available.

## Local development

`pnpm dev` fetches Sanity on each request. After Publish in Studio, hard-refresh the browser (`Ctrl+Shift+R`). Restart `pnpm dev` if a new route still 404s.
