import { imageFragment, seoFragment } from './fragments';

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  title,
  description,
  seo${seoFragment},
  socials,
  announcementBar,
  footerText
}`;

export const allNewsQuery = /* groq */ `*[_type == "newsPost"] | order(date desc){
  _id, title, "slug": slug.current, date, cover${imageFragment}, tags
}`;

export const newsBySlugQuery = /* groq */ `*[_type == "newsPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, date, cover${imageFragment}, body, tags
}`;

export const allCareerOpeningsQuery = /* groq */ `*[_type == "careerOpening"] | order(title asc){
  _id, title, location, type, applyUrl
}`;

export const pageBySlugQuery = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, blocks
}`;
