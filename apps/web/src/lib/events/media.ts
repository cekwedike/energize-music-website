import type { SanityImage } from '@energize/shared';
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

/** The whole poster at a given width, never cropped. */
export function getEventPosterUrl(cover: SanityImage | undefined, width: number): string | null {
  if (!cover?.asset) return null;
  if (cover.asset.url?.startsWith('/')) return cover.asset.url;

  try {
    return urlForImage(cover).width(width).fit('max').auto('format').url();
  } catch {
    return cover.asset.url ?? null;
  }
}

/** Link previews need 1200 x 630. The poster is padded in the site background so its text is not cut off. */
export function getEventShareImageUrl(cover: SanityImage | undefined): string | null {
  if (!cover?.asset) return null;
  if (!cover.asset.url || cover.asset.url.startsWith('/')) return cover.asset.url ?? null;

  // Built by hand: the image URL builder crops to the requested shape before padding.
  return `${cover.asset.url}?w=1200&h=630&fit=fill&bg=fafaf8&auto=format`;
}

/** Width / height of the poster. Falls back to landscape while no image is set. */
export function getEventPosterRatio(cover: SanityImage | undefined): number {
  const size = cover?.asset?.metadata?.dimensions;
  return size?.width && size?.height ? size.width / size.height : 4 / 3;
}
