import type { BlogImage } from '@energize/shared';
import { urlForImage } from '../sanity/client';

const WIDTHS = [480, 720, 960, 1280, 1600, 2000, 2400];

/** "16:9" -> 1.777...; "original" or anything unknown -> undefined. */
export function parseRatio(value: string | undefined): number | undefined {
  const match = value?.match(/^(\d+):(\d+)$/);
  if (!match) return undefined;
  const ratio = Number(match[1]) / Number(match[2]);
  return Number.isFinite(ratio) && ratio > 0 ? ratio : undefined;
}

export function hasAsset<T extends BlogImage>(image: T | null | undefined): image is T & { asset: { _id: string; url: string } } {
  return Boolean(image?.asset?._id);
}

/** Width / height of the image after the editor's crop, used to reserve space and avoid layout shift. */
export function croppedRatio(image: BlogImage): number {
  const dims = image.asset?.metadata?.dimensions;
  if (!dims?.width || !dims.height) return 3 / 2;
  const crop = image.crop;
  const width = dims.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0));
  const height = dims.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0));
  return width > 0 && height > 0 ? width / height : dims.aspectRatio || 3 / 2;
}

export interface ResponsiveImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
  lqip?: string;
}

/**
 * Responsive URLs for a Sanity image. With a ratio the image is cropped around the focus point;
 * without one the editor's crop is kept. Never upscales past the original width.
 */
export function responsiveImage(image: BlogImage, options: { maxWidth: number; ratio?: number }): ResponsiveImage | null {
  if (!hasAsset(image)) return null;
  const ratio = options.ratio ?? croppedRatio(image);
  const original = image.asset.metadata?.dimensions?.width ?? options.maxWidth;
  const cap = Math.min(options.maxWidth, Math.max(original, 320));
  const widths = [...WIDTHS.filter((width) => width < cap), cap];

  const build = (width: number) => {
    let builder = urlForImage(image as never).width(width).auto('format').quality(82);
    if (options.ratio) builder = builder.height(Math.round(width / ratio)).fit('crop');
    return builder.url();
  };

  try {
    return {
      src: build(Math.min(cap, 1280)),
      srcset: widths.map((width) => `${build(width)} ${width}w`).join(', '),
      width: cap,
      height: Math.round(cap / ratio),
      lqip: image.asset.metadata?.lqip,
    };
  } catch {
    // A broken asset reference should drop the image, never fail the build.
    return null;
  }
}

/** Single URL, e.g. for Open Graph images or the lightbox. */
export function imageUrl(image: BlogImage | null | undefined, width: number, height?: number): string | undefined {
  if (!hasAsset(image)) return undefined;
  try {
    let builder = urlForImage(image as never).width(width).auto('format').quality(85);
    if (height) builder = builder.height(height).fit('crop');
    return builder.url();
  } catch {
    return undefined;
  }
}

/** JPEG share image for WhatsApp, X and Facebook previews (some crawlers still reject WebP). */
export function shareImageUrl(image: BlogImage | null | undefined): string | undefined {
  if (!hasAsset(image)) return undefined;
  try {
    return urlForImage(image as never).width(1200).height(630).fit('crop').format('jpg').quality(85).url();
  } catch {
    return undefined;
  }
}

/** CSS object-position from the editor's focus point, so cropped covers keep faces in frame. */
export function focusPosition(image: BlogImage | null | undefined): string {
  const hotspot = image?.hotspot;
  if (!hotspot) return '50% 30%';
  const crop = image?.crop;
  const left = crop?.left ?? 0;
  const top = crop?.top ?? 0;
  const width = 1 - left - (crop?.right ?? 0);
  const height = 1 - top - (crop?.bottom ?? 0);
  const clamp = (value: number) => Math.min(100, Math.max(0, Math.round(value * 100)));
  return `${clamp(width > 0 ? (hotspot.x - left) / width : 0.5)}% ${clamp(height > 0 ? (hotspot.y - top) / height : 0.3)}%`;
}
