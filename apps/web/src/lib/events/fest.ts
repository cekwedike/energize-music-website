import type { EventDetail } from '@energize/shared';
import { isPastEvent } from './format';

/**
 * Splits events into the next one coming up and the ones already held.
 * An event moves to Past Events once its end (or start) time has passed; the daily
 * rebuild (api/rebuild.ts) makes that happen without anyone touching Sanity.
 */
export function splitEvents(events: EventDetail[]): { upcoming: EventDetail[]; past: EventDetail[] } {
  const upcoming = events.filter((event) => !isPastEvent(event.startDate, event.endDate));
  const past = events.filter((event) => isPastEvent(event.startDate, event.endDate)).reverse();
  return { upcoming, past };
}
