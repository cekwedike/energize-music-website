import type { EventsPageSettings } from '@energize/shared';

/** Soft defaults only when the Events Page singleton has not been created yet. */
export const eventsPageDefaults: EventsPageSettings = {
  heroTitle: 'Find your perfect night wherever you are',
  heroLead: 'Discover the best live music from Energize, tailored to the sound that moves you.',
  heroCtaLabel: 'Find an event',
  heroWordmark: 'LIVE SHOWS',
  heroBadgeTitle: 'ENERGY',
  heroBadgeSubtitle: 'on Stage',
  marqueeText: 'For Friends & Fans of Energize Music',
  qualityTitle: 'Our quality',
  qualityItems: [
    {
      title: 'Curated Events',
      body: 'Every date is shaped around worship, culture, and a room that feels alive from the first song.',
    },
    {
      title: 'Artist-First Stages',
      body: 'Built for the roster and the community around them, with room for surprise guests and new voices.',
    },
    {
      title: 'Clear Next Steps',
      body: 'Dates, venues, and ticket links land here first so you never miss the drop.',
    },
  ],
  upcomingPageSize: 6,
  archivePageSize: 6,
};

export function mergeEventsPageSettings(
  settings: EventsPageSettings | null | undefined,
): EventsPageSettings {
  return {
    ...eventsPageDefaults,
    ...settings,
    qualityItems:
      settings?.qualityItems && settings.qualityItems.length > 0
        ? settings.qualityItems
        : eventsPageDefaults.qualityItems,
    upcomingPageSize: settings?.upcomingPageSize ?? eventsPageDefaults.upcomingPageSize,
    archivePageSize: settings?.archivePageSize ?? eventsPageDefaults.archivePageSize,
  };
}
