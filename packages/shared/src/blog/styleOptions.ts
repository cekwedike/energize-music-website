/**
 * Text colours, fonts and sizes editors can pick in the blog editor.
 * Studio reads this file for its menus; the website reads it to render the choices.
 * Every colour passes WCAG AA contrast on the site's light background.
 */

export interface TextColorOption {
  title: string;
  value: string;
  hex: string;
}

export const BLOG_TEXT_COLORS: TextColorOption[] = [
  { title: 'Energize blue', value: 'blue', hex: '#2563eb' },
  { title: 'Deep blue', value: 'deepBlue', hex: '#1d4ed8' },
  { title: 'Ink black', value: 'ink', hex: '#0b0b0d' },
  { title: 'Soft grey', value: 'grey', hex: '#5c5c63' },
  { title: 'Gold', value: 'gold', hex: '#a16207' },
  { title: 'Ember orange', value: 'orange', hex: '#c2410c' },
  { title: 'Red', value: 'red', hex: '#b42318' },
  { title: 'Rose', value: 'rose', hex: '#be185d' },
  { title: 'Purple', value: 'purple', hex: '#7c3aed' },
  { title: 'Green', value: 'green', hex: '#15803d' },
  { title: 'Teal', value: 'teal', hex: '#0f766e' },
];

export interface FontOption {
  title: string;
  value: string;
  /** CSS font-family stack. The web fonts are already loaded on every page. */
  stack: string;
}

export const BLOG_FONTS: FontOption[] = [
  { title: 'Fraunces (display serif)', value: 'display', stack: "'Fraunces', Georgia, serif" },
  { title: 'Instrument Serif (elegant)', value: 'instrument', stack: "'Instrument Serif', Georgia, serif" },
  { title: 'Inter (clean sans)', value: 'sans', stack: "'Inter', system-ui, sans-serif" },
  { title: 'Monospace (typewriter)', value: 'mono', stack: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace" },
];

export interface SizeOption {
  title: string;
  value: string;
  /** Relative to the paragraph size, so it scales with headings too. */
  em: number;
}

export const BLOG_TEXT_SIZES: SizeOption[] = [
  { title: 'Small', value: 'sm', em: 0.85 },
  { title: 'Large', value: 'lg', em: 1.2 },
  { title: 'Extra large', value: 'xl', em: 1.5 },
  { title: 'Huge', value: '2xl', em: 2 },
];

export const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
