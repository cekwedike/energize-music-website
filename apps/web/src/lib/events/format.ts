import type { EventStatus, EventType, LineupRevealState } from '@energize/shared';

export function formatEventDate(dateIso: string): string {
  return new Date(dateIso)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
}

export function formatEventDateLong(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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
      return name?.trim() || 'Artist';
  }
}

export function lineupBadgeLabel(revealState: LineupRevealState | undefined): string | null {
  if (revealState === 'tba' || revealState === 'tbc' || revealState === 'surprise') {
    return lineupDisplayName(revealState);
  }
  return null;
}

export function isPastEvent(status: EventStatus, startDate: string): boolean {
  if (status === 'past') return true;
  return new Date(startDate).getTime() < Date.now();
}

export function isValidEventCard(
  event: { _id?: string; title?: string; slug?: string; startDate?: string } | null | undefined,
): boolean {
  if (!event?._id || !event.title?.trim() || !event.slug?.trim() || !event.startDate) {
    return false;
  }
  return !Number.isNaN(new Date(event.startDate).getTime());
}

export function formatEventStatus(status: EventStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'announced':
      return 'Confirmed';
    case 'past':
      return 'Past';
    default:
      return status;
  }
}

export function formatEventType(eventType?: EventType): string {
  switch (eventType) {
    case 'virtual':
      return 'Virtual';
    case 'hybrid':
      return 'Hybrid';
    case 'physical':
    default:
      return 'Physical';
  }
}

/** Normalize empty / TBA location copy so it never reads like a conflicting status. */
export function formatEventLocation(location?: string): string {
  const value = location?.trim();
  if (!value) return 'Venue TBA';

  const normalized = value.toLowerCase();
  if (
    normalized === 'tba' ||
    normalized === 'tbd' ||
    normalized === 'to be announced' ||
    normalized === 'to be decided' ||
    normalized === 'coming soon'
  ) {
    return 'Venue TBA';
  }

  return value;
}
