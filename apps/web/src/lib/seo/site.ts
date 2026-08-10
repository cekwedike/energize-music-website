import { socialLinks } from '../nav';

export const SITE_NAME = 'Energize Music';
export const SITE_LEGAL_NAME = 'Energize Music Affairs';
export const SITE_TAGLINE = 'The Energy Different';
export const SITE_DESCRIPTION =
  'Energize Music is a global Afro-gospel and soul-fusion label based around Lagos: artists, releases, live events, and initiatives including NEXT, Energize Kids, and Energize Fest.';
export const SITE_DEFAULT_OG = '/brand/logo.webp';
export const SITE_LOCALE = 'en_US';
export const SITE_GENRES = ['Afro-gospel', 'Soul fusion', 'Gospel', 'Afrobeats gospel'] as const;

export function getSiteUrl(): string {
  return (import.meta.env.PUBLIC_SITE_URL ?? 'https://energize-music.com').replace(/\/$/, '');
}

export function absoluteUrl(pathOrUrl = '/'): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function absoluteImageUrl(pathOrUrl?: string | null): string {
  return absoluteUrl(pathOrUrl?.trim() || SITE_DEFAULT_OG);
}

/** Social and platform profiles for Organization / MusicGroup sameAs. */
export function getOrganizationSameAs(): string[] {
  return socialLinks.map((link) => {
    try {
      const url = new URL(link.href);
      // Drop tracking params for cleaner entity graphs.
      url.search = '';
      url.hash = '';
      return url.toString();
    } catch {
      return link.href;
    }
  });
}

export function formatTitle(title: string): string {
  return title.includes('Energize') ? title : `${title} · ${SITE_NAME}`;
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};
