import { imageFragment } from './fragments';
import { artistCardFragment } from './artists';

export const releaseCardFragment = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  type,
  releaseDate,
  cover${imageFragment},
  artists[]->${artistCardFragment},
  featured
}`;

export const releaseDetailFragment = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  type,
  releaseDate,
  cover${imageFragment},
  artists[]->${artistCardFragment},
  links
}`;

export const allReleasesQuery = /* groq */ `*[_type == "release"] | order(releaseDate desc) ${releaseCardFragment}`;

export const featuredReleasesQuery = /* groq */ `*[_type == "release" && featured == true] | order(releaseDate desc) ${releaseCardFragment}`;

export const releaseBySlugQuery = /* groq */ `*[_type == "release" && slug.current == $slug][0] ${releaseDetailFragment}`;
