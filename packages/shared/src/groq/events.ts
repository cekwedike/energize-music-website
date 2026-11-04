import { imageFragment } from './fragments';

const eventDetailProjection = /* groq */ `{
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

/** Every event with a usable public URL, ordered by date. */
export const eventsQuery = /* groq */ `*[_type == "event" && defined(slug.current) && defined(startDate)] | order(startDate asc) ${eventDetailProjection}`;

/** One event for its public detail page. */
export const eventBySlugQuery = /* groq */ `*[_type == "event" && slug.current == $slug][0] ${eventDetailProjection}`;
