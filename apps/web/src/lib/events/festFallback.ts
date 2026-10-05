import type { EventDetail } from '@energize/shared';

export const ENERGIZE_FEST_SLUG = 'energize-fest';

/** Used only when Sanity has no Event with slug "energize-fest". A Sanity document replaces it. */
export const energizeFestFallback: EventDetail = {
  _id: 'energize-fest-fallback',
  title: 'Energize Fest',
  slug: ENERGIZE_FEST_SLUG,
  subtitle: 'The full Energize Music roster on one stage',
  startDate: '2026-12-01T18:00:00.000Z',
  eventType: 'physical',
  location: 'Venue to be announced',
  status: 'announced',
  cover: {
    asset: { _id: 'energize-fest-cover', url: '/initiatives/energize-fest.webp' },
    alt: 'Crowd at Energize Fest, the annual Energize Music live showcase',
  },
  summary:
    'Our annual live showcase. Energize Music artistes and guests from across the Afro-gospel scene share one stage for one night. The venue and tickets will be announced soon.',
  highlights: [
    {
      title: 'The full roster',
      body: 'Every Energize Music artiste on one stage, joined by guest performers from the wider Afro-gospel scene.',
    },
    {
      title: 'Tickets and venue',
      body: 'We are confirming the venue now. Join the list and you will hear first when tickets go on sale.',
    },
    {
      title: 'Made for families',
      body: 'A clean, joyful night out for fans, families, and church communities. Bring everyone.',
    },
  ],
  ctaLabel: 'Get ticket alerts',
  secondaryCtaLabel: 'Partner with us',
  secondaryCtaUrl: '/contact?intent=partnership',
};
