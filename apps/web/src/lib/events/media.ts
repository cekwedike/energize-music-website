import type { EventCard, SanityImage } from '@energize/shared';
import { urlForImage } from '../sanity/client';

export function getEventCoverUrl(
  cover: SanityImage | undefined,
  width: number,
  height: number,
): string | null {
  if (!cover?.asset) return null;

  if (cover.asset.url?.startsWith('/')) {
    return cover.asset.url;
  }

  try {
    return urlForImage(cover).width(width).height(height).fit('crop').auto('format').url();
  } catch {
    return cover.asset.url ?? null;
  }
}

export function getEventCardCover(event: EventCard, width = 900, height = 1100): string | null {
  return getEventCoverUrl(event.cover, width, height);
}
