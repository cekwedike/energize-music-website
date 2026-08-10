import { imageFragment } from './fragments';

const eventCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  startDate,
  endDate,
  eventType,
  location,
  status,
  featured,
  cover${imageFragment},
  summary
`;

export const allEventsQuery = /* groq */ `*[_type == "event" && defined(slug.current)] | order(startDate desc){
  ${eventCardFields}
}`;

/** Events toggled Featured in Studio. Used for homepage Live Spotlight. */
export const featuredEventsQuery = /* groq */ `*[_type == "event" && featured == true && defined(slug.current)] | order(startDate asc){
  ${eventCardFields}
}`;

export const allEventSlugsQuery = /* groq */ `*[_type == "event" && defined(slug.current)]{
  "slug": slug.current
}`;

export const eventBySlugQuery = /* groq */ `*[_type == "event" && slug.current == $slug][0]{
  ${eventCardFields},
  shareImage${imageFragment},
  body,
  highlights[]{ title, body },
  lineup[]{
    name,
    role,
    revealState,
    photo${imageFragment},
    "artistSlug": artist->slug.current
  },
  ticketUrl,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaUrl
}`;

export const eventsPageQuery = /* groq */ `*[_id == "eventsPage"][0]{
  heroTitle,
  heroLead,
  heroCtaLabel,
  heroWordmark,
  heroWordmarkImage${imageFragment},
  heroBadgeTitle,
  heroBadgeSubtitle,
  marqueeText,
  qualityTitle,
  qualityItems[]{ title, body },
  "spotlightEvents": spotlightEvents[]->{
    ${eventCardFields}
  }[defined(_id) && defined(slug) && defined(title) && defined(startDate)],
  upcomingPageSize,
  archivePageSize
}`;
