import type { EnrichedRelease, Release } from '@energize/shared';
import { sanityImageUrl } from '../sanity/client';
import { fetchLinkMeta, type LinkMeta } from './fetchLinkMeta';

/** Prefer primary sourceUrl, then Spotify → Apple Music → YouTube (for listen CTA). */
export function collectStreamingUrls(release: Release): string[] {
  const urls: string[] = [];
  const push = (value?: string) => {
    const trimmed = value?.trim();
    if (!trimmed) return;
    if (!urls.includes(trimmed)) urls.push(trimmed);
  };

  push(release.sourceUrl);
  push(release.links?.spotify);
  push(release.links?.appleMusic);
  push(release.links?.youtube);
  return urls;
}

/**
 * Cover artwork candidates. Spotify oEmbed is the most reliable thumbnail source,
 * so it is tried before Apple / YouTube even when sourceUrl points elsewhere.
 */
export function collectCoverCandidateUrls(release: Release): string[] {
  const urls: string[] = [];
  const push = (value?: string) => {
    const trimmed = value?.trim();
    if (!trimmed) return;
    if (!urls.includes(trimmed)) urls.push(trimmed);
  };

  push(release.links?.spotify);
  push(release.sourceUrl);
  push(release.links?.appleMusic);
  push(release.links?.youtube);
  return urls;
}

function sanityCoverUrl(release: Release, size = 600): string | undefined {
  return sanityImageUrl(release.cover, { width: size, height: size, fit: 'crop' });
}

function artistNamesFromSanity(release: Release): string[] {
  return (
    release.artists
      ?.filter((artist): artist is NonNullable<typeof artist> => Boolean(artist?._id && artist.name))
      .map((artist) => artist.name) ?? []
  );
}

/** Try each streaming URL until we get usable metadata (especially a cover thumbnail). */
async function fetchBestLinkMeta(urls: string[]): Promise<LinkMeta | null> {
  let best: LinkMeta | null = null;

  for (const url of urls) {
    const meta = await fetchLinkMeta(url);
    if (!meta) continue;

    if (!best) best = meta;
    if (meta.thumbnailUrl) {
      return {
        ...best,
        ...meta,
        thumbnailUrl: meta.thumbnailUrl,
        title: meta.title ?? best.title,
        artistName: meta.artistName ?? best.artistName,
        provider: meta.provider ?? best.provider,
      };
    }

    best = {
      ...best,
      title: best.title ?? meta.title,
      artistName: best.artistName ?? meta.artistName,
      provider: best.provider ?? meta.provider,
    };
  }

  return best;
}

export async function enrichRelease(
  release: Release,
  options?: { coverSize?: number },
): Promise<EnrichedRelease> {
  const streamingUrls = collectStreamingUrls(release);
  const coverUrls = collectCoverCandidateUrls(release);
  const primaryUrl = streamingUrls[0];
  const coverSize = options?.coverSize ?? 600;
  const sanityCover = sanityCoverUrl(release, coverSize);

  // Always attempt link metadata when a Sanity cover asset is missing so
  // Spotify / Apple Music / YouTube can supply artwork automatically.
  const meta = !sanityCover && coverUrls.length > 0 ? await fetchBestLinkMeta(coverUrls) : null;

  const displayTitle = release.title || meta?.title;
  const coverUrl = sanityCover ?? meta?.thumbnailUrl;
  const sanityArtists = artistNamesFromSanity(release);
  const artistNames =
    sanityArtists.length > 0 ? sanityArtists : meta?.artistName ? [meta.artistName] : [];

  return {
    ...release,
    displayTitle: displayTitle ?? 'Untitled release',
    coverUrl,
    artistNames,
    externalUrl: primaryUrl,
    metaProvider: meta?.provider,
  };
}

export async function enrichReleases(releases: Release[]): Promise<EnrichedRelease[]> {
  return Promise.all(releases.map((release) => enrichRelease(release)));
}
