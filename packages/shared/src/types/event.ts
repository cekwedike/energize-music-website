import type { SanityImage, PortableTextBlock } from './common';

export type EventStatus = 'upcoming' | 'announced' | 'past';
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
}

export interface EventCard {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  startDate: string;
  endDate?: string;
  eventType?: EventType;
  location?: string;
  status: EventStatus;
  featured?: boolean;
  cover?: SanityImage;
  summary?: string;
}

export interface EventDetail extends EventCard {
  shareImage?: SanityImage;
  body?: PortableTextBlock[];
  highlights?: EventHighlight[];
  lineup?: EventLineupItem[];
  ticketUrl?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
}

export interface EventsPageQualityItem {
  title: string;
  body: string;
}

export interface EventsPageSettings {
  heroTitle: string;
  heroLead?: string;
  heroCtaLabel?: string;
  heroWordmark?: string;
  heroWordmarkImage?: SanityImage;
  heroBadgeTitle?: string;
  heroBadgeSubtitle?: string;
  marqueeText?: string;
  qualityTitle?: string;
  qualityItems?: EventsPageQualityItem[];
  spotlightEvents?: EventCard[];
  upcomingPageSize?: number;
  archivePageSize?: number;
}
