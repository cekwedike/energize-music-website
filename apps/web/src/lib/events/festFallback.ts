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
  location: 'Venue TBA',
  status: 'announced',
  cover: {
    asset: { _id: 'energize-fest-cover', url: '/initiatives/energize-fest.webp' },
    alt: 'Energize Fest',
  },
  summary:
    'Our annual live showcase. Energize Music artists and guests from the wider Afrogospel scene, together for one night. Venue and tickets to be announced.',
  highlights: [
    {
      title: 'Roster on stage',
      body: 'Nights built around Energize Music artists and guests from the wider Afrogospel scene.',
    },
    {
      title: 'Clear details',
      body: 'Venue and ticket links post here as soon as they are confirmed.',
    },
    {
      title: 'Community first',
      body: 'The room is made for fans, families, and the faith community.',
    },
  ],
  ctaLabel: 'Get updates',
  secondaryCtaLabel: 'Partner with us',
  secondaryCtaUrl: '/contact?intent=partnership',
};
