interface Span {
  _type: 'span';
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}

interface TextBlock {
  _type: 'block';
  style?: string;
  children: Span[];
  markDefs?: MarkDef[];
}

const SAFE_HREF = /^(https?:|mailto:|tel:|\/|#)/i;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSpan(span: Span, markDefs: MarkDef[]): string {
  let html = escapeHtml(span.text);
  for (const mark of span.marks ?? []) {
    if (mark === 'strong') {
      html = `<strong>${html}</strong>`;
    } else if (mark === 'em') {
      html = `<em>${html}</em>`;
    } else {
      const def = markDefs.find((d) => d._key === mark);
      if (def?._type === 'link' && def.href && SAFE_HREF.test(def.href)) {
        const external = /^https?:/i.test(def.href);
        html = `<a href="${escapeHtml(def.href)}" class="underline decoration-[var(--color-accent)] underline-offset-2 hover:text-[var(--color-accent)]"${
          external ? ' target="_blank" rel="noopener noreferrer"' : ''
        }>${html}</a>`;
      }
    }
  }
  return html;
}

export function renderBlockHtml(block: TextBlock): string {
  return (block.children ?? []).map((span) => renderSpan(span, block.markDefs ?? [])).join('');
}

export type BlockTagName = 'p' | 'h2' | 'h3' | 'h4' | 'blockquote';

export const blockTagByStyle: Record<string, BlockTagName> = {
  normal: 'p',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  blockquote: 'blockquote',
};
