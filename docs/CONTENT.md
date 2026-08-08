# Editor workflow (Sanity)

## Publish a release

1. Open Studio (`pnpm --filter studio dev` or hosted `*.sanity.studio`)
2. **Release** → New → title, slug, type, date, cover, artists, streaming URLs
3. Toggle **Featured on home** if it should appear in New music
4. **Publish**
5. Wait for deploy (~5–15 min if webhook/CI configured) or ask dev to run `pnpm build`

## Publish news

**News post** → title, slug, date, cover, body → Publish.

## Site settings

**Site settings** singleton: SEO title, social links, footer text, announcement bar.

## Artists

1. **Artist** → fill in name, slug, photo, bio (required), optional tagline, genres, streaming links
2. **Publish** (not just Save). Draft changes do not appear on the site.
3. Local dev: refresh the page. If content still looks old, restart `pnpm dev` (dev now bypasses the Sanity CDN).
4. Production: run `pnpm build` and deploy, or push to `main` so CI rebuilds. Each published artist gets `/artists/their-slug` automatically.

**Photo tips:** Use a portrait at least 1200px wide. TY Bello's first upload was 640×640, which can look soft when cropped large.

Set **Internal roster status** for CMS sorting only (not shown on the public site).
Mark **Featured on homepage** for the home grid.
