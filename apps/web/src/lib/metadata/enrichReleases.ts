import type { EnrichedRelease, Release } from '@energize/shared';
import { urlForImage } from '../sanity/client';
import { fetchLinkMeta } from './fetchLinkMeta';

function pickSourceUrl(release: Release): string | undefined {
  if (release.sourceUrl?.trim()) return release.sourceUrl.trim();
  const links = release.links;
  if (!links) return undefined;
  return links.spotify ?? links.appleMusic ?? links.youtube;
}

function sanityCoverUrl(release: Release): string | undefined {
  if (!release.cover?.asset?.url) return undefined;
  return urlForImage(release.cover).width(600).height(600).fit('crop').auto('format').url();
}

function artistNamesFromSanity(release: Release): string[] {
  return release.artists?.map((artist) => artist.name).filter(Boolean) ?? [];
}

export async function enrichRelease(release: Release): Promise<EnrichedRelease> {
  const sourceUrl = pickSourceUrl(release);
  const meta = sourceUrl ? await fetchLinkMeta(sourceUrl) : null;

  const displayTitle = release.title || meta?.title;
  const coverUrl = sanityCoverUrl(release) ?? meta?.thumbnailUrl;
  const artistNames =
    artistNamesFromSanity(release).length > 0
      ? artistNamesFromSanity(release)
      : meta?.artistName
        ? [meta.artistName]
        : [];

  return {
    ...release,
    displayTitle: displayTitle ?? 'Untitled release',
    coverUrl,
    artistNames,
    externalUrl: sourceUrl,
    metaProvider: meta?.provider,
  };
}

export async function enrichReleases(releases: Release[]): Promise<EnrichedRelease[]> {
  return Promise.all(releases.map((release) => enrichRelease(release)));
}
