/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference path="../.astro/types.d.ts" />

/**
 * Satisfy editor TS2875 when jsxImportSource is "astro" but package
 * export resolution is incomplete under the workspace TypeScript server.
 */
declare module 'astro/jsx-runtime' {
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    type Element = any;
  }
  export function Fragment(props: any, ...children: any[]): any;
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any): any;
}

declare module 'astro/jsx-dev-runtime' {
  export * from 'astro/jsx-runtime';
}

declare namespace astroHTML.JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  interface ImgHTMLAttributes {
    fetchpriority?: 'high' | 'low' | 'auto';
  }

  interface LinkHTMLAttributes {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '*.css' {}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_FORMS_API_BASE?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_GOOGLE_ADS_ID?: string;
  readonly PUBLIC_GOOGLE_ADS_SIGNUP_LABEL?: string;
  readonly PUBLIC_GOOGLE_ADS_LEAD_LABEL?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_HERO_VIDEO_URL?: string;
  readonly PUBLIC_HERO_VIDEO_POSTER?: string;
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
