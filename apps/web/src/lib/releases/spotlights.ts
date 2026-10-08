import type { Release, ReleasesPage } from '@energize/shared';

/** Today's date in Lagos as YYYY-MM-DD, so spotlight dates switch at local midnight. */
export function lagosToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(now);
}

/**
 * Releases to spotlight right now, in the order arranged in Studio.
 * "Show from" and "Show until" are both inclusive; an empty date means no limit on that side.
 * The site is static, so a daily rebuild (api/rebuild.ts, scheduled in vercel.json) keeps this current.
 */
export function activeSpotlights(page: ReleasesPage | null | undefined, today = lagosToday()): Release[] {
  return (page?.spotlights ?? [])
    .filter((entry) => entry.release && (!entry.startsOn || entry.startsOn <= today) && (!entry.endsOn || entry.endsOn >= today))
    .map((entry) => entry.release as Release);
}
