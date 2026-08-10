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

export const allCareerOpeningsQuery = /* groq */ `*[_type == "careerOpening" && defined(slug.current)] | order(title asc){
  _id, title, "slug": slug.current, location, type, applyUrl
}`;

export const careerOpeningBySlugQuery = /* groq */ `*[_type == "careerOpening" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, location, type, description, applyUrl
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

export const volunteerInfoQuery = /* groq */ `*[_id == "volunteerInfo"][0]{
  eyebrow,
  heading,
  intro,
  roleOptionsLabel,
  roleOptions,
  platformsLabel,
  platforms,
  signupUrl,
  ctaLabel,
  fallbackCtaLabel,
  fallbackCtaUrl,
  secondaryLinkLabel,
  secondaryLinkUrl
}`;

export const careersPageQuery = /* groq */ `{
  "openings": *[_type == "careerOpening" && defined(slug.current)] | order(title asc){
    _id, title, "slug": slug.current, location, type, applyUrl
  },
  "volunteer": *[_id == "volunteerInfo"][0]{
    eyebrow,
    heading,
    intro,
    roleOptionsLabel,
    roleOptions,
    platformsLabel,
    platforms,
    signupUrl,
    ctaLabel,
    fallbackCtaLabel,
    fallbackCtaUrl,
    secondaryLinkLabel,
    secondaryLinkUrl
  }
}`;

export const releasesPageQuery = /* groq */ `*[_id == "releasesPage"][0]{
  _id,
  "releaseSpotlights": releaseSpotlights[]->${releaseCardFragment}
}`;
