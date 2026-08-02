export const imageFragment = /* groq */ `{
  asset->{ _id, url },
  alt
}`;

export const seoFragment = /* groq */ `{
  title,
  description,
  ogImage${imageFragment}
}`;
