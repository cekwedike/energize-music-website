import type { SanityImage, PortableTextBlock } from './common';
import type { Release } from './release';

/** Legal pages (Privacy, Terms) edited under "Legal Pages" in Studio. */
export interface Page {
  _id: string;
  title: string;
  slug: string;
  effectiveDate?: string;
  blocks: PortableTextBlock[];
}

export interface AboutPage {
  _id: string;
  title: string;
  teamSectionTitle?: string;
  teamSectionIntro?: string;
}

export interface TeamMemberSocial {
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: SanityImage;
  social?: TeamMemberSocial;
  order?: number;
}

/** One entry in Studio > Release Spotlights. Dates are YYYY-MM-DD and both ends are inclusive. */
export interface ReleaseSpotlight {
  release: Release | null;
  startsOn?: string;
  endsOn?: string;
}

export interface ReleasesPage {
  _id: string;
  spotlights?: ReleaseSpotlight[];
}
