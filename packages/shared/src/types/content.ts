import type { SanityImage, SeoFields, PortableTextBlock } from './common';

export interface SiteSettings {
  title: string;
  description: string;
  seo?: SeoFields;
  socials?: Record<string, string>;
  announcementBar?: string;
  footerText?: string;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  date: string;
  cover: SanityImage;
  body: PortableTextBlock[];
  tags?: string[];
}

export interface CareerOpening {
  _id: string;
  title: string;
  location: string;
  type: string;
  applyUrl: string;
}

export interface Page {
  _id: string;
  title: string;
  slug: string;
  blocks: PortableTextBlock[];
}
