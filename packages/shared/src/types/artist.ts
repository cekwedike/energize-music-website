import type { SanityImage, SlugField } from './common';

export type ArtistTier = 'official' | 'collaborator' | 'legacy';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  instagram?: string;
}

export interface Artist {
  _id: string;
  name: string;
  slug: SlugField;
  tier: ArtistTier;
  featured?: boolean;
  photo: SanityImage;
  bio: string;
  streaming?: StreamingLinks;
}
