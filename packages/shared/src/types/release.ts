import type { SanityImage, SlugField } from './common';
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
  slug: SlugField;
  type: ReleaseType;
  releaseDate: string;
  cover: SanityImage;
  artists: Artist[];
  links?: ReleaseLinks;
  featured?: boolean;
}
