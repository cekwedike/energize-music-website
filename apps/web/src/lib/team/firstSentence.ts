/** First sentence of a bio. Titles like "Dr." do not end a sentence. */
export function firstSentence(text?: string): string | undefined {
  if (!text) return text;
  const match = text.match(/^.+?(?<!\b(?:Dr|Mr|Mrs|Ms|St|Jr|Sr|Prof))[.!?](?=\s|$)/);
  return match?.[0]?.trim() ?? text;
}

/** Full bio split into paragraphs (blank lines in Sanity separate them). */
export function bioParagraphs(text?: string): string[] {
  return (text ?? '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}
