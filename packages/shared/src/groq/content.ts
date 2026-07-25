import { imageFragment, fileFragment, seoFragment } from './fragments';

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  title,
  description,
  seo${seoFragment},
  socials,
  announcementBar,
  footerText
}`;

export const allCreatorsQuery = /* groq */ `*[_type == "creator"] | order(name asc){
  _id, name, photo${imageFragment}, credits
}`;

export const allPartnersQuery = /* groq */ `*[_type == "partner"] | order(order asc){
  _id, name, logo${imageFragment}, url, order
}`;

export const allServicesQuery = /* groq */ `*[_type == "service"] | order(title asc){
  _id, title, "slug": slug.current, body, icon, contactIntent
}`;

export const allNewsQuery = /* groq */ `*[_type == "newsPost"] | order(date desc){
  _id, title, "slug": slug.current, date, cover${imageFragment}, tags
}`;

export const newsBySlugQuery = /* groq */ `*[_type == "newsPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, date, cover${imageFragment}, body, tags
}`;

export const allPressAssetsQuery = /* groq */ `*[_type == "pressAsset"] | order(category asc){
  _id, title, category, file${fileFragment}
}`;

export const allCareerOpeningsQuery = /* groq */ `*[_type == "careerOpening"] | order(title asc){
  _id, title, location, type, applyUrl
}`;

export const allUniverseItemsQuery = /* groq */ `*[_type == "universeItem"] | order(title asc){
  _id, title, category, media${imageFragment}, link
}`;
