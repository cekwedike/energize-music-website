import type { SanityImage, PortableTextBlock } from './common';

export type EventType = 'physical' | 'virtual' | 'hybrid';
export type LineupRevealState = 'confirmed' | 'tba' | 'tbc' | 'surprise';

export interface EventHighlight {
  title: string;
  body: string;
}

export interface EventLineupItem {
  name?: string;
  role?: string;
  revealState: LineupRevealState;
  photo?: SanityImage;
  artistSlug?: string;
  /** Roster artiste photo, used when the slot has no photo of its own. */
  artistPhoto?: SanityImage;
}

export interface EventDetail {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  startDate: string;
  endDate?: string;
  eventType?: EventType;
  location?: string;
  cover?: SanityImage;
  shareImage?: SanityImage;
  summary?: string;
  body?: PortableTextBlock[];
  highlights?: EventHighlight[];
  lineup?: EventLineupItem[];
  ticketUrl?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
}
