const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'the', 'to', 'up', 'via', 'with']);

/**
 * Headline-style Title Case for CMS headings: "The full roster" -> "The Full Roster".
 * Words that already carry capitals after the first letter (NEXT, TY, DJ) are left alone.
 */
export function titleCase(text: string): string {
  const words = text.trim().split(/\s+/);
  return words
    .map((word, index) => {
      if (/[A-Z]/.test(word.slice(1))) return word;
      const lower = word.toLowerCase();
      const isEdge = index === 0 || index === words.length - 1;
      if (!isEdge && SMALL_WORDS.has(lower)) return lower;
      return lower.replace(/(^|[-/])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
    })
    .join(' ');
}
