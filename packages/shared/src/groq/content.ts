import { imageFragment } from './fragments';

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

export const allTeamMembersQuery = /* groq */ `*[_type == "teamMember"] | order(order asc, name asc){
  _id, name, role, bio, photo${imageFragment}
}`;

export const volunteerInfoQuery = /* groq */ `*[_type == "volunteerInfo"][0]{
  heading, intro, roleOptions, platforms, signupUrl, ctaLabel
}`;
