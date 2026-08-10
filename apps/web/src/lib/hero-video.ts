/**
 * Hero background video sources.
 *
 * The local file at public/video/hero-bg.webm is the primary source for production
 * reliability. Set PUBLIC_HERO_VIDEO_URL to try a CDN URL first; Hero.astro falls
 * back to the local file if that request fails.
 */

/** Local fallback and default when no CDN override is configured. */
export const HERO_VIDEO_LOCAL = '/video/hero-bg.webm';

/** Optional CDN override from env. When unset, only the local file is used. */
export const HERO_VIDEO_CDN_URL =
  import.meta.env.PUBLIC_HERO_VIDEO_URL?.trim() || undefined;

/** Initial `<video src>`: CDN when configured, otherwise local. */
export const HERO_VIDEO_SRC = HERO_VIDEO_CDN_URL ?? HERO_VIDEO_LOCAL;

/** True when Hero.astro should attach CDN error fallback to the local file. */
export const HERO_VIDEO_USES_CDN_FALLBACK = Boolean(HERO_VIDEO_CDN_URL);

export const HERO_VIDEO_POSTER = import.meta.env.PUBLIC_HERO_VIDEO_POSTER ?? '/video/hero-bg-poster.webp';
