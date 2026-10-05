import { imageFragment } from './fragments';

export const eventBySlugQuery = /* groq */ `*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  startDate,
  endDate,
  eventType,
  location,
  cover${imageFragment},
  shareImage${imageFragment},
  summary,
  body,
  highlights[]{ title, body },
  lineup[]{
    name,
    role,
    revealState,
    photo${imageFragment},
    "artistSlug": artist->slug.current,
    "artistPhoto": artist->photo${imageFragment}
  },
  ticketUrl,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaUrl
}`;
