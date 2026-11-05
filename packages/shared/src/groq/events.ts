import { imageFragment } from './fragments';

/** Event posters keep their real size, so the site can show them uncropped. */
const posterFragment = /* groq */ `{
  asset->{
    _id,
    url,
    metadata{ dimensions{ width, height } }
  },
  alt
}`;

const eventDetailProjection = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  "shortSlug": shortSlug.current,
  subtitle,
  startDate,
  endDate,
  eventType,
  location,
  cover${posterFragment},
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
