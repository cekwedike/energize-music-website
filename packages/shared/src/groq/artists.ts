import { imageFragment } from './fragments';

export const artistCardFragment = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  tier,
  featured,
  photo${imageFragment}
}`;

export const artistDetailFragment = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  tier,
  photo${imageFragment},
  bio,
  streaming
}`;

export const allArtistsQuery = /* groq */ `*[_type == "artist"] | order(tier asc, name asc) ${artistCardFragment}`;

export const featuredArtistsQuery = /* groq */ `*[_type == "artist" && featured == true] | order(name asc) ${artistCardFragment}`;

export const artistBySlugQuery = /* groq */ `*[_type == "artist" && slug.current == $slug][0] ${artistDetailFragment}`;
