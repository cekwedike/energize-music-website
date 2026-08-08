import { imageFragment } from './fragments';

export const artistCardFragment = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  tier,
  featured,
  photo${imageFragment},
  tagline,
  bio,
  quote,
  genres
}`;

export const artistDetailFragment = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  tier,
  featured,
  photo${imageFragment},
  coverImage${imageFragment},
  tagline,
  genres,
  bio,
  quote,
  streaming
}`;

export const allArtistsQuery = /* groq */ `*[_type == "artist"] | order(featured desc, tier asc, name asc) ${artistCardFragment}`;
// tier in order() is internal CMS sorting only; the website does not display artist tiers.

export const featuredArtistsQuery = /* groq */ `*[_type == "artist" && featured == true] | order(name asc) ${artistCardFragment}`;

export const artistSlugsQuery = /* groq */ `*[_type == "artist" && defined(slug.current)]{ "slug": slug.current }`;

export const artistBySlugQuery = /* groq */ `*[_type == "artist" && slug.current == $slug][0] ${artistDetailFragment}`;
