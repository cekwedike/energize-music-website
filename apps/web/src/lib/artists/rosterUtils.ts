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
    color: 'var(--color-accent)',
    glow: 'color-mix(in srgb, var(--color-accent) 13.2%, transparent)',
    muted: 'color-mix(in srgb, var(--color-accent) 33%, transparent)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, color-mix(in srgb, var(--color-bg) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent) 22.8%, transparent) 38%, color-mix(in srgb, var(--color-bg) 88%, transparent) 100%)',
  },
  {
    color: '#a3a3a3',
    glow: 'rgba(163, 163, 163, 0.18)',
    muted: 'rgba(163, 163, 163, 0.55)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, color-mix(in srgb, var(--color-bg) 35%, transparent) 0%, rgba(163, 163, 163, 0.32) 38%, color-mix(in srgb, var(--color-bg) 90%, transparent) 100%)',
  },
  {
    color: 'var(--color-accent)',
    glow: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
    muted: 'color-mix(in srgb, var(--color-accent) 27.5%, transparent)',
    panelInk: '#fafaf8',
    duotone:
      'linear-gradient(160deg, color-mix(in srgb, var(--color-bg) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent) 17%, transparent) 38%, color-mix(in srgb, var(--color-bg) 88%, transparent) 100%)',
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

/** Prefer ending on a full sentence. Only use ellipsis when no sentence boundary fits. */
export function excerptCompleteSentences(text: string, maxLength = 220): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const window = trimmed.slice(0, maxLength + 1);
  const sentenceEnds: number[] = [];
  for (let i = 0; i < window.length; i++) {
    const ch = window[i];
    if (
      (ch === '.' || ch === '!' || ch === '?') &&
      (i === window.length - 1 || /\s/.test(window[i + 1] ?? ''))
    ) {
      sentenceEnds.push(i + 1);
    }
  }

  const minKeep = Math.floor(maxLength * 0.45);
  const viable = sentenceEnds.filter((end) => end >= minKeep && end <= maxLength);
  if (viable.length > 0) {
    return trimmed.slice(0, viable[viable.length - 1]!).trimEnd();
  }

  return truncateBio(trimmed, maxLength);
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
  if (artist.bio?.trim()) return excerptCompleteSentences(artist.bio);
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
