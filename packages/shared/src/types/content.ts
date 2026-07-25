import type { SanityImage, SanityFile, SlugField, SeoFields } from './common';

export interface SiteSettings {
  title: string;
  description: string;
  seo?: SeoFields;
  socials?: Record<string, string>;
  announcementBar?: string;
  footerText?: string;
}

export interface Creator {
  _id: string;
  name: string;
  photo?: SanityImage;
  credits?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo: SanityImage;
  url?: string;
  order?: number;
}

export interface Service {
  _id: string;
  title: string;
  slug: SlugField;
  body: unknown;
  icon?: string;
  contactIntent?: string;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: SlugField;
  date: string;
  cover: SanityImage;
  body: unknown;
  tags?: string[];
}

export type PressAssetCategory = 'logo' | 'photo' | 'pdf';

export interface PressAsset {
  _id: string;
  title: string;
  category: PressAssetCategory;
  file: SanityFile;
}

export interface CareerOpening {
  _id: string;
  title: string;
  location: string;
  type: string;
  applyUrl: string;
}

export type UniverseCategory = 'podcast' | 'video' | 'event' | 'studio';

export interface UniverseItem {
  _id: string;
  title: string;
  category: UniverseCategory;
  media?: SanityImage;
  link?: string;
}
