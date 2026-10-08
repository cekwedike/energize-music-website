/**
 * Numbered pagination for lists that are fully rendered in the HTML (so every item stays crawlable).
 * Shows one page of items at a time and keeps the page in the URL (?page=2) so links and Back work.
 */

export interface PagerOptions {
  /** The <nav> element that receives the page buttons. */
  nav: HTMLElement;
  pageSize: number;
  /** URL query key, e.g. "page" or "past". */
  param: string;
  /** Element to scroll to when the page changes. */
  scrollTarget?: HTMLElement | null;
  label?: string;
  /** Called with the newly shown items after a reader changes page. */
  onPageChange?: (shown: HTMLElement[]) => void;
}

export interface Pager {
  /** Show page `page` of `items`, hiding the rest. Returns the page actually shown. */
  render(items: HTMLElement[], allItems: HTMLElement[], page?: number): number;
  readonly page: number;
}

/** Page numbers to show, with null for a "..." gap: 1 ... 4 5 6 ... 12 */
export function pageList(current: number, total: number): Array<number | null> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => pages.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => pages.add(n));
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: Array<number | null> = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}

const ARROW_LEFT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>';
const ARROW_RIGHT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>';

export function readPageParam(param: string): number {
  const value = Number(new URLSearchParams(window.location.search).get(param));
  return Number.isInteger(value) && value > 0 ? value : 1;
}

function writePageParam(param: string, page: number) {
  const url = new URL(window.location.href);
  if (page > 1) url.searchParams.set(param, String(page));
  else url.searchParams.delete(param);
  window.history.replaceState(null, '', url);
}

export function createPager(options: PagerOptions): Pager {
  const { nav, pageSize, param, scrollTarget, label = 'Pagination', onPageChange } = options;
  nav.setAttribute('aria-label', label);
  let current = readPageParam(param);
  let lastItems: HTMLElement[] = [];
  let lastAll: HTMLElement[] = [];

  const go = (page: number) => {
    pager.render(lastItems, lastAll, page);
    writePageParam(param, current);
    onPageChange?.(lastItems.slice((current - 1) * pageSize, current * pageSize));
    const target = scrollTarget ?? nav;
    const top = target.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    (lastItems[(current - 1) * pageSize]?.querySelector<HTMLElement>('a, button') ?? null)?.focus({ preventScroll: true });
  };

  const button = (content: string, page: number, attrs: { label: string; current?: boolean; disabled?: boolean; className: string }) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = attrs.className;
    el.innerHTML = content;
    el.setAttribute('aria-label', attrs.label);
    if (attrs.current) el.setAttribute('aria-current', 'page');
    if (attrs.disabled) el.disabled = true;
    else if (!attrs.current) el.addEventListener('click', () => go(page));
    return el;
  };

  const pager: Pager = {
    get page() {
      return current;
    },
    render(items, allItems, page = current) {
      lastItems = items;
      lastAll = allItems;
      const total = Math.max(1, Math.ceil(items.length / pageSize));
      current = Math.min(Math.max(1, page), total);

      allItems.forEach((item) => {
        item.hidden = true;
      });
      items.slice((current - 1) * pageSize, current * pageSize).forEach((item) => {
        item.hidden = false;
      });

      nav.replaceChildren();
      nav.hidden = total <= 1;
      if (total <= 1) return current;

      nav.append(
        button(`${ARROW_LEFT}<span>Previous</span>`, current - 1, {
          label: 'Previous page',
          disabled: current === 1,
          className: 'pager__step',
        }),
      );
      const list = document.createElement('span');
      list.className = 'pager__pages';
      pageList(current, total).forEach((n) => {
        if (n === null) {
          const gap = document.createElement('span');
          gap.className = 'pager__gap';
          gap.textContent = '…';
          gap.setAttribute('aria-hidden', 'true');
          list.append(gap);
        } else {
          list.append(button(String(n), n, { label: `Page ${n} of ${total}`, current: n === current, className: 'pager__num' }));
        }
      });
      nav.append(list);
      nav.append(
        button(`<span>Next</span>${ARROW_RIGHT}`, current + 1, {
          label: 'Next page',
          disabled: current === total,
          className: 'pager__step',
        }),
      );
      return current;
    },
  };

  return pager;
}
