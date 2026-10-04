/** First sentence of a bio. Titles like "Dr." do not end a sentence. */
export function firstSentence(text?: string): string | undefined {
  if (!text) return text;
  const match = text.match(/^.+?(?<!\b(?:Dr|Mr|Mrs|Ms|St|Jr|Sr|Prof))[.!?](?=\s|$)/);
  return match?.[0]?.trim() ?? text;
}
