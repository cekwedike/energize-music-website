import type { SanityImage, PortableTextBlock } from './common';
import type { Release } from './release';

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  date: string;
  cover: SanityImage;
  body: PortableTextBlock[];
  tags?: string[];
}

export interface NewsPostSummary {
  _id: string;
  title: string;
  slug: string;
  date: string;
  cover: SanityImage;
  tags?: string[];
  excerpt?: string;
}

export interface CareerOpening {
  _id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  description?: PortableTextBlock[];
  applyUrl: string;
}

export interface CareerOpeningSummary {
  _id: string;
  title: string;
  slug: string;
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

export interface AboutPage {
  _id: string;
  title: string;
  intro?: PortableTextBlock[];
  teamSectionTitle: string;
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

export interface VolunteerInfo {
  eyebrow?: string;
  heading: string;
  intro: string;
  roleOptionsLabel?: string;
  roleOptions?: string[];
  platformsLabel?: string;
  platforms?: string[];
  signupUrl?: string;
  ctaLabel?: string;
  fallbackCtaLabel?: string;
  fallbackCtaUrl?: string;
  secondaryLinkLabel?: string;
  secondaryLinkUrl?: string;
}

export interface CareersPageData {
  openings: CareerOpening[];
  volunteer: VolunteerInfo | null;
}

export interface ReleasesPage {
  _id: string;
  releaseSpotlights?: Release[];
}
