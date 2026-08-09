/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

/**
 * Bridge Astro's JSX types into the global JSX namespace.
 * Without this, the editor TypeScript service reports TS7026
 * ("no interface JSX.IntrinsicElements") on every HTML tag in .astro files.
 */
declare namespace JSX {
  type Element = astroHTML.JSX.Element;
  type IntrinsicElements = astroHTML.JSX.IntrinsicElements;
}

declare module '*.css' {}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_HERO_VIDEO_URL?: string;
  readonly PUBLIC_HERO_VIDEO_POSTER?: string;
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
