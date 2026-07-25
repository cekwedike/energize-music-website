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

Set **Tier**: official | collaborator | legacy.
Mark **Featured** for home grid.
