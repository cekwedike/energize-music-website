export const imageFragment = /* groq */ `{
  asset->{ _id, url },
  alt
}`;

export const fileFragment = /* groq */ `{
  asset->{ _id, url, originalFilename }
}`;

export const seoFragment = /* groq */ `{
  title,
  description,
  ogImage${imageFragment}
}`;
