import type { PortableTextBlock } from './common';
import type { Release } from './release';

/** Sanity image with crop, focus point and the metadata the blog needs for sizing and blur-up. */
export interface BlogImage {
  _type?: string;
  _key?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  } | null;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
  caption?: string;
  credit?: string;
  decorative?: boolean;
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  _id: string;
  _type: 'teamMember' | 'artist';
  name: string;
  role?: string;
  /** Artistes only: links to their profile. */
  slug?: string;
  bio?: string;
  photo?: BlogImage;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  mainImage?: BlogImage;
  category?: Pick<BlogCategory, 'title' | 'slug'> | null;
  authors: BlogAuthor[];
  readingMinutes?: number;
}

export interface PostSeo {
  title?: string;
  description?: string;
  shareImage?: BlogImage;
  noIndex?: boolean;
}

export interface BlogRelatedArtist {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  photo?: BlogImage;
}

export interface Post extends PostCard {
  coverLayout?: 'contained' | 'immersive' | 'hidden';
  body: PortableTextBlock[];
  tags?: string[];
  seo?: PostSeo;
  relatedArtists: BlogRelatedArtist[];
  relatedReleases: Release[];
  relatedPosts: PostCard[];
  moreFromCategory: PostCard[];
  latestPosts: PostCard[];
}
