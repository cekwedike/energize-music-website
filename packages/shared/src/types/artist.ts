import type { SanityImage } from './common';

export type ArtistTier = 'official' | 'legacy';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  instagram?: string;
  /** Feature.fm / pre-save / smart link. Used on releases; optional elsewhere. */
  smartLink?: string;
}

/** Card/list shape from GROQ (bio optional on cards). */
export interface ArtistCard {
  _id: string;
  name: string;
  slug: string;
/** Internal CMS roster status. Not displayed on the public website. */
  tier: ArtistTier;
  featured?: boolean;
  photo: SanityImage;
  tagline?: string;
  bio?: string;
  quote?: string;
  genres?: string[];
}

export interface Artist extends ArtistCard {
  bio: string;
  coverImage?: SanityImage;
  quote?: string;
  streaming?: StreamingLinks;
}
