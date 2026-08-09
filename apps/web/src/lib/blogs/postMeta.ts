import type { PortableTextBlock } from '@energize/shared';

interface SpanChild {
  _type?: string;
  text?: string;
}

function blockText(block: PortableTextBlock): string {
  const children = (block.children as SpanChild[] | undefined) ?? [];
  return children.map((child) => child.text ?? '').join('');
}

export function portableTextToPlain(blocks: PortableTextBlock[] = []): string {
  return blocks
    .filter((block) => block._type === 'block')
    .map(blockText)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function estimateReadMinutes(blocks: PortableTextBlock[] = []): number {
  const words = portableTextToPlain(blocks).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function extractLeadParagraph(blocks: PortableTextBlock[] = []): string | null {
  const first = blocks.find(
    (block) =>
      block._type === 'block' &&
      (!(block.style as string | undefined) || block.style === 'normal') &&
      blockText(block).trim().length > 0,
  );
  if (!first) return null;
  return blockText(first).trim();
}

export function bodyWithoutLead(blocks: PortableTextBlock[] = []): PortableTextBlock[] {
  let skipped = false;
  return blocks.filter((block) => {
    if (
      !skipped &&
      block._type === 'block' &&
      (!(block.style as string | undefined) || block.style === 'normal') &&
      blockText(block).trim().length > 0
    ) {
      skipped = true;
      return false;
    }
    return true;
  });
}

export function formatPublishedDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRelatedDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}
