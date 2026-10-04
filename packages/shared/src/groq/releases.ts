import { imageFragment } from './fragments';
import { artistCardFragment } from './artists';

export const releaseCardFragment = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  type,
  releaseDate,
  cover${imageFragment},
  "artists": coalesce(artists[]->${artistCardFragment}, [])[defined(_id)],
  links,
  sourceUrl,
  featured
}`;

export const releaseDetailFragment = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  type,
  releaseDate,
  cover${imageFragment},
  "artists": coalesce(artists[]->${artistCardFragment}, [])[defined(_id)],
  links,
  sourceUrl
}`;

export const allReleasesQuery = /* groq */ `*[_type == "release"] | order(releaseDate desc) ${releaseCardFragment}`;

export const featuredReleasesQuery = /* groq */ `*[_type == "release" && featured == true] | order(releaseDate desc) ${releaseCardFragment}`;

/** Homepage selected releases rail: Studio-featured releases first, then the newest, max 8. */
export const homeReleasesQuery = /* groq */ `*[_type == "release"] | order(coalesce(featured, false) desc, releaseDate desc) [0...8] ${releaseCardFragment}`;

/** Homepage latest project: the newest release, featured or not. */
export const latestReleaseQuery = /* groq */ `*[_type == "release" && defined(releaseDate)] | order(releaseDate desc) [0] ${releaseDetailFragment}`;

export const releaseBySlugQuery = /* groq */ `*[_type == "release" && slug.current == $slug][0] ${releaseDetailFragment}`;

/** Max 10 releases per artist profile (newest first). */
export const releasesByArtistSlugQuery = /* groq */ `*[_type == "release" && $slug in artists[]->slug.current] | order(releaseDate desc) [0...10] ${releaseCardFragment}`;
