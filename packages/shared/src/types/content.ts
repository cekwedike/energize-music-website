import type { SanityImage, PortableTextBlock } from './common';

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
  heading: string;
  intro: string;
  roleOptions?: string[];
  platforms?: string[];
  signupUrl?: string;
  ctaLabel?: string;
}
