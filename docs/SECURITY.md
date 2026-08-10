# Security

## Secrets

Never commit `.env` files. Use GitHub Actions secrets for CI:

- `PUBLIC_SANITY_PROJECT_ID`
- `SANITY_READ_TOKEN` (optional; build currently uses the public Sanity API)
- `FORM_ENDPOINT` / `PUBLIC_FORM_ENDPOINT`
- Hostinger / deploy secrets only when deploy automation is restored

Rotate any credential that may have been shared outside a private machine.
Local Studio write tokens (`SANITY_WRITE_TOKEN`) are for seed scripts only and must stay gitignored.

## Sanity

- Public project id + dataset are expected for a public marketing site.
- Restrict CORS in Sanity Manage to production domain, localhost, and Studio host.
- Do not put write tokens in `PUBLIC_*` env vars or client-side code.

## Static site headers

Security headers ship in `apps/web/public/.htaccess` for Apache / Hostinger:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- HTTPS redirect

External links use `rel="noopener noreferrer"`. Contact form includes a honeypot field.

## Disclosure

`/.well-known/security.txt` points security contacts to the public contact page.

## CI

- `pnpm install --frozen-lockfile`
- `pnpm audit --audit-level=high` (currently `continue-on-error` because Sanity CLI toolchain advisories are upstream / not shipped in `apps/web/dist`)

## Known waived advisories

`pnpm audit` may flag advisories inside `apps/studio`'s Sanity CLI toolchain
(`decompress`, `adm-zip`, `glob` / `brace-expansion` via `@sanity/cli`).
These are dev-only build/deploy tooling, not shipped in the production static site.
Tracked via Dependabot; re-check on Sanity version bumps.
