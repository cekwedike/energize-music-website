/**
 * Hero background video.
 *
 * hero-bg.mp4 is cut losslessly from the ADML music video (stream copy, no re-encode), so it is
 * exactly as sharp as the source and serves every device. Set PUBLIC_HERO_VIDEO_URL to try a CDN
 * URL first; Hero.astro falls back to the local file if that request fails.
 */

/** Local H.264 source (hardware-friendly, plays in every browser). */
export const HERO_VIDEO_MP4 = '/video/hero-bg.mp4';

/** Optional CDN override from env. When unset, only local sources are used. */
export const HERO_VIDEO_CDN_URL =
  import.meta.env.PUBLIC_HERO_VIDEO_URL?.trim() || undefined;

/** Initial single-src when a CDN override is configured. */
export const HERO_VIDEO_SRC = HERO_VIDEO_CDN_URL ?? HERO_VIDEO_MP4;

/** True when Hero.astro should attach CDN error fallback to local files. */
export const HERO_VIDEO_USES_CDN_FALLBACK = Boolean(HERO_VIDEO_CDN_URL);

export const HERO_VIDEO_POSTER =
  import.meta.env.PUBLIC_HERO_VIDEO_POSTER ?? '/video/hero-bg-poster.webp';
