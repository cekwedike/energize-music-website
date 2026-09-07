import type { EventsPageSettings } from '@energize/shared';

/** Soft defaults only when the Events Page singleton has not been created yet. */
export const eventsPageDefaults: EventsPageSettings = {
  heroTitle: 'Live nights from Energize Music',
  heroLead:
    'Festivals, showcases, and community stages. Energize Fest is set for 1 December 2026 (venue TBA).',
  heroCtaLabel: 'See upcoming dates',
  heroWordmark: 'LIVE SHOWS',
  heroBadgeTitle: 'ENERGY',
  heroBadgeSubtitle: 'Live',
  marqueeText: 'For Friends & Fans of Energize Music',
  qualityTitle: 'What to expect',
  qualityItems: [
    {
      title: 'Roster on stage',
      body: 'Nights built around Energize Music artists and guests from the wider Afrogospel scene.',
    },
    {
      title: 'Clear details',
      body: 'Dates, venues, and ticket links post here as soon as they are confirmed.',
    },
    {
      title: 'Community first',
      body: 'From block parties to Energize Fest, the room is made for fans, families, and the faith community.',
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
