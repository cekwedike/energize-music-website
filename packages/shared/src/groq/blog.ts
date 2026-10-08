import { imageFragment } from './fragments';
import { releaseCardFragment } from './releases';

/** Published posts whose publish date has arrived. Future-dated posts appear on the first rebuild after that date. */
const LIVE_POST = /* groq */ `_type == "post" && defined(slug.current) && defined(title) && publishedAt <= now()`;

/** Image with crop, focus point, size and blur-up placeholder. */
export const blogImageFragment = /* groq */ `{
  ...,
  asset->{ _id, url, metadata { lqip, dimensions { width, height, aspectRatio } } }
}`;

const authorFragment = /* groq */ `{
  _id,
  _type,
  name,
  "role": select(_type == "artist" => coalesce(tagline, "Energize Music artiste"), role),
  "slug": select(_type == "artist" => slug.current),
  "bio": select(_type == "teamMember" => bio),
  photo${imageFragment}
}`;

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  featured,
  mainImage${blogImageFragment},
  "category": category->{ title, "slug": slug.current },
  "authors": coalesce(authors[]->${authorFragment}, [])[defined(name)],
  "readingMinutes": round(length(pt::text(body)) / 5 / 200)
`;

export const postCardFragment = /* groq */ `{${postCardFields}}`;

/** Every live post, newest first, for the blog page and RSS feed. */
export const blogPostsQuery = /* groq */ `*[${LIVE_POST}] | order(publishedAt desc) ${postCardFragment}`;

/** Categories that have at least one live post, in their Studio order. */
export const blogCategoriesQuery = /* groq */ `*[_type == "blogCategory" && defined(slug.current) && count(*[${LIVE_POST} && references(^._id)]) > 0]
  | order(coalesce(order, 999) asc, title asc) { _id, title, "slug": slug.current, description }`;

export const blogPostSlugsQuery = /* groq */ `*[${LIVE_POST}].slug.current`;

const bodyFragment = /* groq */ `body[]{
  ...,
  _type == "block" => {
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => { ..., "target": reference->{ _type, "slug": slug.current } }
    }
  },
  _type == "blogImage" => ${blogImageFragment},
  _type == "blogGallery" => { ..., images[]${blogImageFragment} },
  _type == "blogReleaseCard" => { ..., "release": release->${releaseCardFragment} },
  _type == "blogArtistCard" => { ..., "artist": artist->{ _id, name, "slug": slug.current, tagline, photo${imageFragment} } }
}`;

export const blogPostBySlugQuery = /* groq */ `*[${LIVE_POST} && slug.current == $slug][0]{
  ${postCardFields},
  coverLayout,
  tags,
  seo { title, description, noIndex, shareImage${blogImageFragment} },
  "body": ${bodyFragment},
  "relatedArtists": coalesce(relatedArtists[]->{ _id, name, "slug": slug.current, tagline, photo${imageFragment} }, [])[defined(slug)],
  "relatedReleases": coalesce(relatedReleases[]->${releaseCardFragment}, [])[defined(slug)],
  "relatedPosts": *[${LIVE_POST} && _id in coalesce(^.relatedPosts[]._ref, [])] | order(publishedAt desc) ${postCardFragment},
  "moreFromCategory": select(
    defined(category._ref) => *[${LIVE_POST} && _id != ^._id && category._ref == ^.category._ref] | order(publishedAt desc) [0...3] ${postCardFragment},
    []
  ),
  "latestPosts": *[${LIVE_POST} && _id != ^._id] | order(publishedAt desc) [0...3] ${postCardFragment}
}`;
