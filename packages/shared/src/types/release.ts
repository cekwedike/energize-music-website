import type { SanityImage } from './common';
import type { Artist } from './artist';

export type ReleaseType = 'single' | 'ep' | 'album' | 'compilation';

export interface ReleaseLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

export interface Release {
  _id: string;
  title: string;
  slug: string;
  type: ReleaseType;
  releaseDate: string;
  cover?: SanityImage;
  artists: Artist[];
  links?: ReleaseLinks;
  sourceUrl?: string;
  featured?: boolean;
}

/** Release enriched with build-time link metadata for the frontend. */
export interface EnrichedRelease extends Release {
  displayTitle: string;
  coverUrl?: string;
  artistNames: string[];
  externalUrl?: string;
  metaProvider?: string;
}
