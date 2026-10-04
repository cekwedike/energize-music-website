import type { PortableTextBlock } from '@energize/shared';

export interface AboutValue {
  title: string;
  body: string;
}

function blockText(block: PortableTextBlock): string {
  const children = Array.isArray(block.children) ? (block.children as { text?: string }[]) : [];
  return children
    .map((child) => child.text ?? '')
    .join('')
    .trim();
}

const isHeading = (block: PortableTextBlock) =>
  block._type === 'block' && typeof block.style === 'string' && /^h[1-6]$/.test(block.style);

/**
 * The About intro in Studio is story paragraphs followed by heading + text pairs
 * (Mission, Vision, Values). Split it so the page can show a short story and a numbered list.
 */
export function splitAboutIntro(blocks: PortableTextBlock[] = []): { story: string[]; values: AboutValue[] } {
  const story: string[] = [];
  const values: AboutValue[] = [];
  let current: AboutValue | null = null;

  for (const block of blocks) {
    if (block._type !== 'block') continue;
    if (isHeading(block)) {
      current = { title: blockText(block), body: '' };
      values.push(current);
      continue;
    }
    const text = blockText(block);
    if (!text) continue;
    if (current) current.body = current.body ? `${current.body} ${text}` : text;
    else story.push(text);
  }

  return { story, values: values.filter((value) => value.title && value.body) };
}
