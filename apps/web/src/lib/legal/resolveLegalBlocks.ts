import type { Page, PortableTextBlock } from '@energize/shared';

function blockText(block: PortableTextBlock): string {
  const children = (block as { children?: Array<{ text?: string }> }).children;
  if (!Array.isArray(children)) return '';
  return children.map((child) => child.text ?? '').join('');
}

/** Reject empty or leftover Phase-2 stub copy from CMS drafts. */
export function isUsableLegalBlocks(blocks: PortableTextBlock[] | undefined | null): boolean {
  if (!blocks?.length) return false;

  const joined = blocks.map(blockText).join(' ').toLowerCase();
  if (!joined.trim()) return false;
  if (joined.includes('wires up in phase')) return false;
  if (joined.includes('full terms content')) return false;
  if (joined.includes('full privacy content')) return false;

  return true;
}

export function resolveLegalBlocks(
  page: Page | null | undefined,
  fallback: PortableTextBlock[],
): PortableTextBlock[] {
  return isUsableLegalBlocks(page?.blocks) ? (page!.blocks as PortableTextBlock[]) : fallback;
}
