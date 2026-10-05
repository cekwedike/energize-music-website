import type { EventDetail } from '@energize/shared';
import { isPastEvent } from './format';

/**
 * Splits Fest editions into the next one coming up and the ones already held.
 * An edition moves to Past Events once its end (or start) time has passed; the daily
 * rebuild (api/rebuild.ts) makes that happen without anyone touching Sanity.
 */
export function splitFestEvents(events: EventDetail[]): { upcoming: EventDetail | null; past: EventDetail[] } {
  const upcoming = events.find((event) => !isPastEvent(event.startDate, event.endDate)) ?? null;
  const past = events.filter((event) => isPastEvent(event.startDate, event.endDate)).reverse();
  return { upcoming, past };
}
