/**
 * Hero background video sources.
 *
 * Prefer H.264 MP4 for hardware decode (smoother on Windows/Safari), with WebM
 * as a secondary source. Set PUBLIC_HERO_VIDEO_URL to try a CDN URL first;
 * Hero.astro falls back to the local files if that request fails.
 */

/** Local H.264 source (hardware-friendly). */
export const HERO_VIDEO_MP4 = '/video/hero-bg.mp4';

/** Local VP9 source. */
export const HERO_VIDEO_WEBM = '/video/hero-bg.webm';

/** @deprecated Prefer HERO_VIDEO_MP4 / HERO_VIDEO_WEBM. Kept for CDN fallback path. */
export const HERO_VIDEO_LOCAL = HERO_VIDEO_MP4;

/** Optional CDN override from env. When unset, only local sources are used. */
export const HERO_VIDEO_CDN_URL =
  import.meta.env.PUBLIC_HERO_VIDEO_URL?.trim() || undefined;

/** Initial single-src when a CDN override is configured. */
export const HERO_VIDEO_SRC = HERO_VIDEO_CDN_URL ?? HERO_VIDEO_MP4;

/** True when Hero.astro should attach CDN error fallback to local files. */
export const HERO_VIDEO_USES_CDN_FALLBACK = Boolean(HERO_VIDEO_CDN_URL);

export const HERO_VIDEO_POSTER =
  import.meta.env.PUBLIC_HERO_VIDEO_POSTER ?? '/video/hero-bg-poster.webp';
