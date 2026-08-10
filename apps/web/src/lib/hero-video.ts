/**
 * Hero background video sources.
 *
 * The local file at public/video/hero-bg.mp4 is the primary source for production
 * reliability. Set PUBLIC_HERO_VIDEO_URL to try a CDN URL first; Hero.astro falls
 * back to the local file if that request fails.
 *
 * Reference CDN URL (same asset as hero-bg.mp4):
 * https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4
 */

/** Local fallback and default when no CDN override is configured. */
export const HERO_VIDEO_LOCAL = '/video/hero-bg.mp4';

/** Known CDN URL for the hero video (optional override via PUBLIC_HERO_VIDEO_URL). */
export const HERO_VIDEO_CDN =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';

/** Optional CDN override from env. When unset, only the local file is used. */
export const HERO_VIDEO_CDN_URL =
  import.meta.env.PUBLIC_HERO_VIDEO_URL?.trim() || undefined;

/** Initial `<video src>`: CDN when configured, otherwise local. */
export const HERO_VIDEO_SRC = HERO_VIDEO_CDN_URL ?? HERO_VIDEO_LOCAL;

/** True when Hero.astro should attach CDN error fallback to the local file. */
export const HERO_VIDEO_USES_CDN_FALLBACK = Boolean(HERO_VIDEO_CDN_URL);

export const HERO_VIDEO_POSTER = import.meta.env.PUBLIC_HERO_VIDEO_POSTER ?? '/video/hero-bg-poster.webp';
