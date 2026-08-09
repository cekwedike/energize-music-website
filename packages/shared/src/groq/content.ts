import { imageFragment } from './fragments';
import { releaseCardFragment } from './releases';

export const allNewsQuery = /* groq */ `*[_type == "newsPost"] | order(date desc){
  _id, title, "slug": slug.current, date, cover${imageFragment}, tags
}`;

export const allNewsListQuery = /* groq */ `*[_type == "newsPost"] | order(date desc){
  _id, title, "slug": slug.current, date, cover${imageFragment}, tags,
  "excerpt": pt::text(body)
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

export const aboutPageQuery = /* groq */ `*[_id == "aboutPage"][0]{
  _id, title, intro, teamSectionTitle, teamSectionIntro
}`;

export const allTeamMembersQuery = /* groq */ `*[_type == "teamMember" && defined(name) && defined(role)] | order(coalesce(order, 999) asc, name asc){
  _id, name, role, bio, order, photo${imageFragment}, social
}`;

export const volunteerInfoQuery = /* groq */ `*[_type == "volunteerInfo"][0]{
  heading, intro, roleOptions, platforms, signupUrl, ctaLabel
}`;

export const releasesPageQuery = /* groq */ `*[_id == "releasesPage"][0]{
  _id,
  "releaseSpotlights": releaseSpotlights[]->${releaseCardFragment}
}`;
