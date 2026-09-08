/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference path="../.astro/types.d.ts" />

/**
 * The workspace TypeScript server typechecks .astro files as JSX.
 * Provide IntrinsicElements so every HTML tag is typed (avoids TS7026).
 * Astro's own language tools still use astroHTML.JSX for richer checking.
 */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

/** HTML `fetchpriority` is valid; older DOM/Astro attribute typings omit it. */
declare namespace astroHTML.JSX {
  interface ImgHTMLAttributes {
    fetchpriority?: 'high' | 'low' | 'auto';
  }

  interface LinkHTMLAttributes {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
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
