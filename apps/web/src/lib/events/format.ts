import type { EventType, LineupRevealState } from '@energize/shared';

export function formatEventDate(dateIso: string): string {
  return new Date(dateIso)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Africa/Lagos',
    })
    .toUpperCase();
}

export function formatEventDateLong(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  });
}

export function lineupDisplayName(
  revealState: LineupRevealState | undefined,
  name?: string,
): string {
  switch (revealState) {
    case 'tba':
      return 'TBA';
    case 'tbc':
      return 'TBC';
    case 'surprise':
      return 'Surprise Reveal';
    default:
      return name?.trim() || 'Artiste';
  }
}

export function lineupBadgeLabel(revealState: LineupRevealState | undefined): string | null {
  if (revealState === 'tba' || revealState === 'tbc' || revealState === 'surprise') {
    return lineupDisplayName(revealState);
  }
  return null;
}

export function isPastEvent(startDate: string, endDate?: string): boolean {
  return new Date(endDate ?? startDate).getTime() < Date.now();
}

export function formatEventType(eventType?: EventType): string {
  switch (eventType) {
    case 'virtual':
      return 'Online';
    case 'hybrid':
      return 'Hybrid';
    case 'physical':
    default:
      return 'In person';
  }
}

/** Normalize empty / TBA location copy so it never reads like a conflicting status. */
export function formatEventLocation(location?: string): string {
  const value = location?.trim();
  if (!value) return 'Venue to be announced';

  const normalized = value.toLowerCase();
  if (
    normalized === 'tba' ||
    normalized === 'tbd' ||
    normalized === 'to be announced' ||
    normalized === 'to be decided' ||
    normalized === 'coming soon' ||
    normalized === 'venue tba'
  ) {
    return 'Venue to be announced';
  }

  return value;
}

const LAGOS = 'Africa/Lagos';

/** The parts a ticket prints: "11", "December", "2026", "Friday", "4 PM". */
export function eventDateParts(dateIso: string) {
  const date = new Date(dateIso);
  const part = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleString('en-GB', { ...options, timeZone: LAGOS });
  const time = date
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: LAGOS })
    .replace(':00', '');
  return {
    day: part({ day: 'numeric' }),
    month: part({ month: 'long' }),
    monthShort: part({ month: 'short' }),
    year: part({ year: 'numeric' }),
    weekday: part({ weekday: 'long' }),
    time,
  };
}
