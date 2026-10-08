import { imageFragment } from './fragments';
import { releaseCardFragment } from './releases';

export const pageBySlugQuery = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, effectiveDate, blocks
}`;

export const aboutPageQuery = /* groq */ `*[_id == "aboutPage"][0]{
  _id, title, teamSectionTitle, teamSectionIntro
}`;

export const allTeamMembersQuery = /* groq */ `*[_type == "teamMember" && defined(name) && defined(role)] | order(coalesce(order, 999) asc, name asc){
  _id, name, role, bio, order, photo${imageFragment}, social
}`;

export const releasesPageQuery = /* groq */ `*[_id == "releasesPage"][0]{
  _id,
  "spotlights": spotlights[]{
    startsOn,
    endsOn,
    badge,
    message,
    "release": release->${releaseCardFragment}
  }
}`;
