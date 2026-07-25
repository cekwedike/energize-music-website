# Security

## Secrets

Never commit `.env`. Use GitHub Actions secrets for CI:

- `SANITY_READ_TOKEN`
- `HOSTINGER_SFTP_HOST`, `HOSTINGER_SFTP_USER`, `HOSTINGER_SFTP_PASSWORD`
- `SANITY_WEBHOOK_SECRET`
- `PUBLIC_FORM_ENDPOINT` (or Formspree ID)

Rotate any credentials embedded in git remotes; use SSH or `gh auth`.

## Sanity

- Read token for build only; editors use Studio login.
- Restrict CORS to production domain, localhost, and Studio host.

## Static site

- CSP and security headers via `apps/web/public/.htaccess`
- External links: `rel="noopener noreferrer"`
- Forms: honeypot + provider spam filtering

## CI

- `pnpm install --frozen-lockfile`
- `pnpm audit --audit-level=high` (fail on high/critical)

## Known waived advisories (Phase 1)

`pnpm audit` still flags advisories inside `apps/studio`'s `sanity` CLI toolchain
(`decompress`, `adm-zip`, `glob`/`brace-expansion` via `@sanity/cli` → `@architect/*`).
These are dev-only build/deploy tooling, not shipped in `apps/web/dist` or the
production bundle, and no patched `sanity` release exists yet upstream. Tracked via
Dependabot; re-check on every `sanity` version bump and remove this note once resolved.
