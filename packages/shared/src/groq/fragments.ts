/** crop and hotspot carry the editor's crop and focal point from the Studio, so image URLs honour them. */
export const imageFragment = /* groq */ `{
  asset->{ _id, url },
  crop,
  hotspot,
  alt
}`;
