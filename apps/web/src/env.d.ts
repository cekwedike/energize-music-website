/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference path="../.astro/types.d.ts" />

/**
 * Bridge Astro's JSX types into the global JSX namespace.
 * IntrinsicElements must be an interface (not a type alias) or the editor
 * reports TS7026 on every HTML tag in .astro files.
 */
declare namespace JSX {
  type Element = astroHTML.JSX.Element;
  interface IntrinsicElements extends astroHTML.JSX.IntrinsicElements {}
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
