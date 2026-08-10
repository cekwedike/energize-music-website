export const nextPageQuery = /* groq */ `*[_id == "nextPage"][0]{
  submissionsOpen,
  submitUrl,
  submitLabel,
  closedLabel,
  closedMessage
}`;
