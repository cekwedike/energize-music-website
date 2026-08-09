/**
 * Hero background video source.
 *
 * Download from CDN and place at public/video/hero-bg.mp4:
 * https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4
 *
 * Override with PUBLIC_HERO_VIDEO_URL in .env (e.g. while the local file is missing).
 */
export const HERO_VIDEO_CDN =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';

export const HERO_VIDEO_SRC = import.meta.env.PUBLIC_HERO_VIDEO_URL ?? '/video/hero-bg.mp4';

export const HERO_VIDEO_POSTER = import.meta.env.PUBLIC_HERO_VIDEO_POSTER ?? '/video/hero-bg-poster.webp';
