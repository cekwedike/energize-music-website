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
  sourceUrl
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


/** Newest release. The home page shows it when no spotlight is live. */
export const latestReleaseQuery = /* groq */ `*[_type == "release"] | order(releaseDate desc) [0] ${releaseCardFragment}`;

export const releaseBySlugQuery = /* groq */ `*[_type == "release" && slug.current == $slug][0] ${releaseDetailFragment}`;

/** Max 10 releases per artist profile (newest first). */
export const releasesByArtistSlugQuery = /* groq */ `*[_type == "release" && $slug in artists[]->slug.current] | order(releaseDate desc) [0...10] ${releaseCardFragment}`;
