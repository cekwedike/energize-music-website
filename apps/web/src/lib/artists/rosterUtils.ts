import type { ArtistCard } from '@energize/shared';

export interface RosterAccent {
  color: string;
  glow: string;
  muted: string;
  panelInk: string;
  duotone: string;
}

/** Brand-token accent rotation: glow blue, neutral mono, glow-cyan. */
export const ROSTER_ACCENTS: RosterAccent[] = [
  {
    color: 'var(--color-glow)',
    glow: 'rgba(77, 168, 255, 0.22)',
    muted: 'rgba(77, 168, 255, 0.55)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, rgba(11, 11, 13, 0.35) 0%, rgba(77, 168, 255, 0.38) 38%, rgba(11, 11, 13, 0.88) 100%)',
  },
  {
    color: '#a3a3a3',
    glow: 'rgba(163, 163, 163, 0.18)',
    muted: 'rgba(163, 163, 163, 0.55)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, rgba(11, 11, 13, 0.35) 0%, rgba(163, 163, 163, 0.32) 38%, rgba(11, 11, 13, 0.9) 100%)',
  },
  {
    color: 'var(--color-glow-cyan)',
    glow: 'rgba(103, 232, 249, 0.2)',
    muted: 'rgba(103, 232, 249, 0.55)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, rgba(11, 11, 13, 0.35) 0%, rgba(103, 232, 249, 0.34) 38%, rgba(11, 11, 13, 0.88) 100%)',
  },
];

export function getRosterAccent(index: number): RosterAccent {
  return ROSTER_ACCENTS[index % ROSTER_ACCENTS.length]!;
}

export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function getShortLabel(name: string, maxLength = 18): string {
  const trimmed = name.trim();
  if (trimmed.length <= maxLength) return trimmed.toUpperCase();
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`.toUpperCase();
}

export function truncateBio(text: string, maxLength = 220): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  const base = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${base.trimEnd()}…`;
}

export function truncateQuote(text: string, maxLength = 72): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  const base = lastSpace > maxLength * 0.55 ? slice.slice(0, lastSpace) : slice;
  return `${base.trimEnd()}…`;
}

export function bioSnippet(artist: ArtistCard): string | undefined {
  if (artist.bio?.trim()) return truncateBio(artist.bio);
  if (artist.tagline?.trim()) return artist.tagline.trim();
  return undefined;
}

export function rosterPortraitLabel(artist: ArtistCard): string {
  if (artist.tagline?.trim()) return artist.tagline.trim().toUpperCase();
  const genres = artist.genres?.filter(Boolean) ?? [];
  if (genres.length > 0) return genres.slice(0, 2).join(' · ').toUpperCase();
  return 'ENERGIZE ARTIST';
}

export interface RosterNavItem {
  index: number;
  slug: string;
  name: string;
  shortLabel: string;
}

export function buildRosterNavItems(artists: ArtistCard[]): RosterNavItem[] {
  return artists.map((artist, index) => ({
    index,
    slug: artist.slug,
    name: artist.name,
    shortLabel: getShortLabel(artist.name),
  }));
}

/** Dot position on pager track: evenly spaced from 0% to 100%. */
export function pagerDotPosition(index: number, total: number): number {
  if (total <= 1) return 50;
  return (index / (total - 1)) * 100;
}
