import type { SanityImage } from './common';

export type ArtistTier = 'official' | 'legacy';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  instagram?: string;
}

export interface Artist {
  _id: string;
  name: string;
  /** Flattened by GROQ as `"slug": slug.current` — a plain string, not `{ current }`. */
  slug: string;
  tier: ArtistTier;
  featured?: boolean;
  photo: SanityImage;
  bio: string;
  streaming?: StreamingLinks;
}
