import type { Release, ReleaseSpotlight, ReleasesPage, SpotlightBadge } from '@energize/shared';

/** Today's date in Lagos as YYYY-MM-DD, so spotlight dates switch at local midnight. */
export function lagosToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(now);
}

export type LiveSpotlight = ReleaseSpotlight & { release: Release };

/**
 * Spotlights live right now (release plus badge and message), in the order arranged in Studio.
 * "Show from" and "Show until" are both inclusive; an empty date means no limit on that side.
 * The site is static, so a daily rebuild (api/rebuild.ts, scheduled in vercel.json) keeps this current.
 */
export function activeSpotlightEntries(page: ReleasesPage | null | undefined, today = lagosToday()): LiveSpotlight[] {
  return (page?.spotlights ?? []).filter(
    (entry): entry is LiveSpotlight =>
      Boolean(entry.release) && (!entry.startsOn || entry.startsOn <= today) && (!entry.endsOn || entry.endsOn >= today),
  );
}

/** Just the releases of the live spotlights, in Studio order. */
export function activeSpotlights(page: ReleasesPage | null | undefined, today = lagosToday()): Release[] {
  return activeSpotlightEntries(page, today).map((entry) => entry.release);
}

/** How long "Automatic" keeps saying "New release" after the release date. */
const NEW_RELEASE_DAYS = 42;

/** True when the release date is still ahead (Lagos time). */
export function isUpcoming(releaseDate: string | undefined, today = lagosToday()): boolean {
  return Boolean(releaseDate && releaseDate.slice(0, 10) > today);
}

/** Badge text for a spotlight. "auto" follows the release date: Coming [date], then New release, then Out now. */
export function spotlightBadgeLabel(
  badge: SpotlightBadge | undefined,
  releaseDate: string | undefined,
  today = lagosToday(),
): string | null {
  switch (badge) {
    case 'none':
      return null;
    case 'outNow':
      return 'Out now';
    case 'new':
      return 'New release';
    case 'comingSoon':
      return 'Coming soon';
    case 'presave':
      return 'Pre-save now';
    case 'exclusive':
      return 'Exclusive';
    default: {
      const date = releaseDate?.slice(0, 10);
      if (!date) return 'Out now';
      if (date > today) {
        const label = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
        return `Coming ${label}`;
      }
      const ageDays = (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86_400_000;
      return ageDays <= NEW_RELEASE_DAYS ? 'New release' : 'Out now';
    }
  }
}
