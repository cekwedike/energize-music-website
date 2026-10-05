import { imageFragment } from './fragments';

/** Every published Energize Fest edition, oldest first. The page splits them into upcoming and past. */
export const festEventsQuery = /* groq */ `*[_type == "event" && defined(startDate)] | order(startDate asc){
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
