import { imageFragment } from './fragments';

export const artistCardFragment = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  tier,
  featured,
  displayOrder,
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
  displayOrder,
  photo${imageFragment},
  coverImage${imageFragment},
  tagline,
  genres,
  bio,
  quote,
  streaming
}`;

/** Numbered artists first (1, 2, …), then unnumbered, then name. */
const artistListOrder = /* groq */ `order(coalesce(displayOrder, 1000000) asc, name asc)`;

export const allArtistsQuery = /* groq */ `*[_type == "artist"] | ${artistListOrder} ${artistCardFragment}`;
// tier is internal CMS metadata only; public sort is displayOrder then name.

export const featuredArtistsQuery = /* groq */ `*[_type == "artist" && featured == true] | ${artistListOrder} ${artistCardFragment}`;

/** Homepage roster strip: only artists marked Featured on homepage. */
export const homeArtistsQuery = /* groq */ `*[_type == "artist" && featured == true && defined(photo.asset)] | ${artistListOrder} [0...8] ${artistCardFragment}`;

export const artistSlugsQuery = /* groq */ `*[_type == "artist" && defined(slug.current)]{ "slug": slug.current }`;

export const artistBySlugQuery = /* groq */ `*[_type == "artist" && slug.current == $slug][0] ${artistDetailFragment}`;
