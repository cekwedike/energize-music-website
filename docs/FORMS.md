# Forms (Brevo)

Two forms, one Brevo account, **one API key**.

| Form | Where | Endpoint | What Brevo does |
|---|---|---|---|
| Be the first to know | Home page, bottom | `POST /api/subscribe` | Adds the email to your list (Contacts API) |
| Contact | `/contact` | `POST /api/contact` | Emails the message to the team (Transactional Email API), Reply-To is the sender. Optionally saves the sender as a contact. |

The endpoints are Vercel functions in `apps/web/api/`. The API key lives only in Vercel's environment variables and never reaches the browser.

## 1. Set up Brevo (one time)

1. **API key.** Brevo → profile menu → **SMTP & API** → **API Keys** → **Generate a new API key**. Name it `energize-music-website`. Copy it now; Brevo shows it once.
2. **Sender.** Brevo → **Senders, Domains & Dedicated IPs**.
   - Best: **Domains** → add `energize-music.com` and add the DKIM / DMARC records Brevo gives you at your DNS host (Hostinger). This stops contact emails landing in spam.
   - Then **Senders** → add `website@energize-music.com` (or any address on that domain).
3. **Lists.** Brevo → **Contacts** → **Lists** → create:
   - `Be the first to know`: note its **ID** (the number in the list row / URL).
   - `Website enquiries` (optional): note its ID.
4. **Double opt-in (optional, recommended).** Brevo → **Templates** → create a template from the "Double opt-in" type and activate it. Note the **template ID**. Create a simple "Thanks, you're confirmed" page URL to send people to (the home page works: `https://energize-music.com/#first-to-know`).

## 2. Add the environment variables in Vercel

Vercel → project → **Settings** → **Environment Variables**. Tick **Production** and **Preview** for each.

| Name | Required | Example |
|---|---|---|
| `BREVO_API_KEY` | Yes | `xkeysib-...` |
| `BREVO_NEWSLETTER_LIST_ID` | Yes | `3` |
| `BREVO_SENDER_EMAIL` | Yes (contact form) | `website@energize-music.com` (must be a verified Brevo sender) |
| `CONTACT_TO_EMAIL` | Yes (contact form) | `hello@energize-music.com` (comma-separate several inboxes) |
| `BREVO_SENDER_NAME` | No | `Energize Music Website` |
| `BREVO_CONTACT_LIST_ID` | No | `4` (also saves contact form senders to this list) |
| `BREVO_DOI_TEMPLATE_ID` | No | `12` (turns on double opt-in for the email list) |
| `BREVO_DOI_REDIRECT_URL` | With DOI | `https://energize-music.com/#first-to-know` |
| `FORMS_ALLOWED_ORIGINS` | No | Only if another domain posts to these endpoints, e.g. `https://energize-music.com` when the site is on Hostinger and the API on Vercel |

Then **Deployments** → latest → **Redeploy**. Functions read env vars at runtime, so no code change is needed.

## 3. Test

1. Open the deployed site, enter your own email in **Be the first to know**. It should say "You're on the list." and appear in the Brevo list (or you get a confirmation email if double opt-in is on).
2. Send a message from `/contact`. It should arrive in `CONTACT_TO_EMAIL`; hitting Reply answers the sender.
3. If a form says "This form is not set up yet", a required variable is missing. Vercel → **Logs** shows which one (`[forms] Missing environment variable ...`).
4. If it says "Something went wrong on our side", Brevo rejected the call. The log line shows Brevo's reason (usually an unverified sender or a wrong list ID).

## Hosting the static site somewhere other than Vercel

`astro dev` and Hostinger only serve static files, so `/api` does not exist there.

- Keep the API on Vercel, set `PUBLIC_FORMS_API_BASE=https://<your-vercel-domain>` for the static build, and set `FORMS_ALLOWED_ORIGINS` on Vercel to the static site's origin.
- Local testing of the API: `npx vercel dev` from `apps/web` (with the env vars in `apps/web/.env`).

## Analytics and ads (optional)

Set any of these (Vercel env, then redeploy). Each tag only loads when its ID is present, after the page is idle.

| Name | What |
|---|---|
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console "HTML tag" content value |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools `msvalidate.01` value |
| `PUBLIC_GA4_ID` | Google Analytics 4, `G-XXXXXXX` |
| `PUBLIC_GOOGLE_ADS_ID` | Google Ads tag, `AW-XXXXXXXXX` |
| `PUBLIC_GOOGLE_ADS_SIGNUP_LABEL` | Conversion label for email sign-ups |
| `PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Conversion label for contact messages |
| `PUBLIC_META_PIXEL_ID` | Meta (Instagram / Facebook) Pixel |

Successful form submissions send GA4 `sign_up` / `generate_lead`, the matching Google Ads conversions, and Meta `CompleteRegistration` / `Lead`.
