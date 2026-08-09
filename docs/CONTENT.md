# Editor workflow (Sanity)

## Studio "No response received" toast

If hosted Studio shows **Uncaught error: No response received** every ~45 seconds, publishing usually still works. This is a known Sanity dashboard SSE issue ([sanity-io/sanity#13239](https://github.com/sanity-io/sanity/issues/13239)): the Studio tries to sync dashboard "pinned items" and the connection times out.

**What to do:**

1. After **Publish**, refresh the document and confirm changes saved (or check the live site after deploy).
2. Hard refresh Studio (`Ctrl+Shift+R`) if the toast covers the Publish button.
3. Ignore the toast if publish succeeds. It is noise from a background connection, not a failed save.

This project’s Studio only uses Structure + Vision tools. The toast comes from Sanity’s hosted monitoring bundle, not from your content schema.

## Publish a release

1. Open Studio (`pnpm --filter studio dev` or hosted `energize-music-studio.sanity.studio`)
2. **Release** → New → title, slug, type, date, cover, artists, streaming URLs
3. Toggle **Featured on homepage** if it should appear in New music
4. **Publish** (not just Save). Draft releases are invisible on the site.
5. Rebuild and deploy the site (`pnpm build`, then upload `apps/web/dist/`). The live WordPress site at energize-music.com does not read Sanity until the Astro rebuild is deployed.
6. Local dev: new release URLs usually work on first visit after publish. If `/releases/their-slug` still 404s, restart `pnpm dev`.

## Publish news

**News post** → title, slug, date, cover, body → Publish.

## Site settings

**Site settings** singleton: SEO title, social links, footer text, announcement bar.

## Artists

1. **Artist** → fill in name, slug, photo, bio (required), optional tagline, genres, streaming links
2. **Publish** (not just Save). Draft artists redirect to the 404 page because the site only reads published content.
3. Local dev: new artist profile URLs usually work on first visit after publish. If `/artists/their-slug` still 404s, restart `pnpm dev` so static routes refresh.
4. Production: run `pnpm build` and deploy, or push to `main` so CI rebuilds. Each published artist gets `/artists/their-slug` automatically.

**Photo tips:** Use a portrait at least 1200px wide. TY Bello's first upload was 640×640, which can look soft when cropped large.

Set **Internal roster status** for CMS sorting only (not shown on the public site).
Mark **Featured on homepage** for the home grid.
