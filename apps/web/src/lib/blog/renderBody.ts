/**
 * Renders a blog post body (Sanity Portable Text) to HTML.
 * Every piece of editor text is escaped and every link and colour is checked before it reaches the page.
 * Styling lives in styles/blog.css under the .pt-* class names used here.
 */
import {
  BLOG_FONTS,
  BLOG_TEXT_COLORS,
  BLOG_TEXT_SIZES,
  HEX_COLOR,
  parseMusicUrl,
  parseVideoUrl,
  type BlogImage,
  type EnrichedRelease,
  type PortableTextBlock,
} from '@energize/shared';
import { sanityImageUrl } from '../sanity/client';
import { hasAsset, imageUrl, parseRatio, responsiveImage } from './images';

/* ── Types for the body shapes returned by blogPostBySlugQuery ─────────── */

interface Span {
  _type: 'span';
  _key?: string;
  text?: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
  newTab?: boolean;
  target?: { _type?: string; slug?: string } | null;
  color?: string;
  customHex?: string;
  font?: string;
  size?: string;
  weight?: string;
  italic?: boolean;
  uppercase?: boolean;
}

interface TextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Span[];
  markDefs?: MarkDef[];
}

type Block = PortableTextBlock & Record<string, unknown>;

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderContext {
  /** Release cards resolved ahead of time (cover art can come from streaming links), keyed by block _key. */
  releases?: Map<string, EnrichedRelease>;
}

export interface RenderedBody {
  html: string;
  toc: TocItem[];
  /** True when the body has a slideshow gallery or a lightbox image, so the page can load its script. */
  interactive: boolean;
}

/* ── Escaping and safe values ──────────────────────────────────────────── */

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

export function safeHref(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const href = value.trim();
  return href && SAFE_HREF.test(href) ? href : null;
}

const isExternal = (href: string) => /^https?:\/\//i.test(href);

function linkAttrs(href: string, newTab = false): string {
  const external = isExternal(href);
  const blank = external || newTab;
  return `href="${escapeHtml(href)}"${blank ? ' target="_blank"' : ''}${external ? ' rel="noopener noreferrer"' : ''}`;
}

const pick = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

/** Where an internal link points, by document type. */
export function pathForDocument(target: { _type?: string; slug?: string } | null | undefined): string | null {
  if (!target?.slug) return null;
  const slug = encodeURIComponent(target.slug);
  if (target._type === 'post') return `/blog/${slug}`;
  if (target._type === 'release') return `/releases/${slug}`;
  if (target._type === 'artist') return `/artists/${slug}`;
  return null;
}

/* ── Inline text ───────────────────────────────────────────────────────── */

const DECORATORS: Record<string, [string, string]> = {
  strong: ['<strong>', '</strong>'],
  em: ['<em>', '</em>'],
  underline: ['<u>', '</u>'],
  'strike-through': ['<s>', '</s>'],
  code: ['<code class="pt-code">', '</code>'],
  highlight: ['<mark class="pt-mark">', '</mark>'],
  sup: ['<sup>', '</sup>'],
  sub: ['<sub>', '</sub>'],
};

const FONT_VALUES = BLOG_FONTS.map((font) => font.value);
const WEIGHTS = ['400', '500', '600', '700'];

function wrapAnnotation(html: string, def: MarkDef): string {
  switch (def._type) {
    case 'link': {
      const href = safeHref(def.href);
      return href ? `<a class="pt-link" ${linkAttrs(href, def.newTab)}>${html}</a>` : html;
    }
    case 'internalLink': {
      const href = pathForDocument(def.target);
      return href ? `<a class="pt-link" href="${escapeHtml(href)}">${html}</a>` : html;
    }
    case 'textColor': {
      const hex =
        def.color === 'custom'
          ? def.customHex && HEX_COLOR.test(def.customHex)
            ? def.customHex
            : undefined
          : BLOG_TEXT_COLORS.find((option) => option.value === def.color)?.hex;
      return hex ? `<span class="pt-color" style="color:${hex}">${html}</span>` : html;
    }
    case 'typography': {
      const classes: string[] = [];
      const styles: string[] = [];
      if (def.font && FONT_VALUES.includes(def.font)) classes.push(`pt-font-${def.font}`);
      const size = BLOG_TEXT_SIZES.find((option) => option.value === def.size);
      if (size) styles.push(`font-size:${size.em}em`);
      if (def.weight && WEIGHTS.includes(def.weight)) styles.push(`font-weight:${def.weight}`);
      if (def.italic) styles.push('font-style:italic');
      if (def.uppercase) classes.push('pt-caps');
      if (classes.length === 0 && styles.length === 0) return html;
      return `<span${classes.length ? ` class="${classes.join(' ')}"` : ''}${styles.length ? ` style="${styles.join(';')}"` : ''}>${html}</span>`;
    }
    default:
      return html;
  }
}

function renderSpan(span: Span, markDefs: MarkDef[]): string {
  let html = escapeHtml(span.text ?? '').replace(/\n/g, '<br />');
  if (!html) return '';
  for (const mark of span.marks ?? []) {
    const decorator = DECORATORS[mark];
    if (decorator) {
      html = `${decorator[0]}${html}${decorator[1]}`;
      continue;
    }
    const def = markDefs.find((item) => item._key === mark);
    if (def) html = wrapAnnotation(html, def);
  }
  return html;
}

export function renderInline(block: TextBlock): string {
  const markDefs = block.markDefs ?? [];
  return (block.children ?? []).map((span) => (span._type === 'span' ? renderSpan(span, markDefs) : '')).join('');
}

export function plainText(block: TextBlock): string {
  return (block.children ?? []).map((span) => span.text ?? '').join('');
}

/* ── Text blocks and lists ─────────────────────────────────────────────── */

function slugify(text: string): string {
  return (
    text
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64) || 'section'
  );
}

class HeadingIds {
  private used = new Set<string>();
  next(text: string): string {
    const base = slugify(text);
    let id = base;
    let n = 2;
    while (this.used.has(id)) id = `${base}-${n++}`;
    this.used.add(id);
    return id;
  }
}

function renderTextBlock(block: TextBlock, ids: HeadingIds, toc: TocItem[]): string {
  const inner = renderInline(block);
  const text = plainText(block).trim();
  if (!text) return '';

  const style = block.style ?? 'normal';
  const heading = style.match(/^h([1-6])$/);
  if (heading) {
    const level = Number(heading[1]);
    const id = ids.next(text);
    // Body "Heading 1" and "Heading 2" are both top-level sections in the contents list.
    if (level <= 3) toc.push({ id, text, level: level <= 2 ? 2 : 3 });
    return `<h${level} id="${id}" class="pt-h pt-h${level}">${inner}</h${level}>`;
  }

  switch (style) {
    case 'lead':
      return `<p class="pt-lead">${inner}</p>`;
    case 'blockquote':
      return `<blockquote class="pt-quote"><p>${inner}</p></blockquote>`;
    case 'center':
      return `<p class="pt-p pt-center">${inner}</p>`;
    case 'small':
      return `<p class="pt-small">${inner}</p>`;
    default:
      return `<p class="pt-p">${inner}</p>`;
  }
}

function listTag(type: string | undefined): { tag: 'ul' | 'ol'; className: string } {
  if (type === 'number') return { tag: 'ol', className: 'pt-list pt-list--number' };
  if (type === 'check') return { tag: 'ul', className: 'pt-list pt-list--check' };
  return { tag: 'ul', className: 'pt-list pt-list--bullet' };
}

/** Renders consecutive list items from `start`, nesting deeper levels inside the previous item. */
function renderList(items: TextBlock[], start: number, level: number): [string, number] {
  const type = items[start].listItem;
  const { tag, className } = listTag(type);
  const parts: string[] = [];
  let index = start;

  while (index < items.length) {
    const item = items[index];
    const itemLevel = item.level ?? 1;
    if (itemLevel < level) break;
    if (itemLevel === level && item.listItem !== type) break;

    if (itemLevel > level) {
      const [nested, next] = renderList(items, index, itemLevel);
      if (parts.length > 0) parts[parts.length - 1] = parts[parts.length - 1].replace(/<\/li>$/, `${nested}</li>`);
      else parts.push(`<li class="pt-li pt-li--bare">${nested}</li>`);
      index = next;
      continue;
    }

    parts.push(`<li class="pt-li">${renderInline(item)}</li>`);
    index += 1;
  }

  return [`<${tag} class="${className}">${parts.join('')}</${tag}>`, index];
}

/* ── Custom blocks ─────────────────────────────────────────────────────── */

const FILTERS = ['none', 'mono', 'warm', 'cool', 'vivid', 'faded'] as const;

function figcaption(caption?: unknown, credit?: unknown): string {
  const text = typeof caption === 'string' ? caption.trim() : '';
  const by = typeof credit === 'string' ? credit.trim() : '';
  if (!text && !by) return '';
  return `<figcaption class="pt-caption">${escapeHtml(text)}${
    by ? `${text ? ' ' : ''}<span class="pt-credit">${escapeHtml(by)}</span>` : ''
  }</figcaption>`;
}

function imgTag(
  image: BlogImage,
  options: { maxWidth: number; ratio?: number; sizes: string; className?: string; eager?: boolean; lightbox?: boolean },
): string {
  const responsive = responsiveImage(image, options);
  if (!responsive) return '';
  const alt = image.decorative ? '' : (image.alt ?? '').trim();
  const placeholder = responsive.lqip ? ` style="background-image:url('${escapeHtml(responsive.lqip)}')"` : '';
  const zoom = options.lightbox ? imageUrl(image, 2400) : undefined;
  return `<img class="pt-img${options.className ? ` ${options.className}` : ''}" src="${escapeHtml(responsive.src)}" srcset="${escapeHtml(
    responsive.srcset,
  )}" sizes="${options.sizes}" width="${responsive.width}" height="${responsive.height}" alt="${escapeHtml(alt)}" loading="${
    options.eager ? 'eager' : 'lazy'
  }" decoding="async"${placeholder}${zoom ? ` data-lightbox="${escapeHtml(zoom)}"` : ''} />`;
}

function renderImage(block: Block): string {
  const image = block as unknown as BlogImage & {
    size?: string;
    align?: string;
    aspectRatio?: string;
    filter?: string;
    rounded?: boolean;
    link?: string;
  };
  if (!hasAsset(image)) return '';

  const size = pick(image.size, ['small', 'medium', 'large', 'wide', 'full'] as const, 'large');
  const align = size === 'small' || size === 'medium' ? pick(image.align, ['left', 'center', 'right'] as const, 'center') : 'center';
  const filter = pick(image.filter, FILTERS, 'none');
  const rounded = image.rounded !== false && size !== 'full';
  const maxWidth = { small: 720, medium: 1000, large: 1600, wide: 2000, full: 2400 }[size];
  const sizes = {
    small: '(min-width: 768px) 20rem, 100vw',
    medium: '(min-width: 768px) 28rem, 100vw',
    large: '(min-width: 768px) 44rem, 100vw',
    wide: '(min-width: 1024px) 64rem, 100vw',
    full: '100vw',
  }[size];
  const link = safeHref(image.link);
  const img = imgTag(image, {
    maxWidth,
    ratio: parseRatio(image.aspectRatio),
    sizes,
    className: `pt-filter-${filter}${rounded ? ' pt-rounded' : ''}`,
    lightbox: !link,
  });
  const media = link ? `<a class="pt-img-link" ${linkAttrs(link)}>${img}</a>` : img;

  return `<figure class="pt-figure pt-figure--${size} pt-figure--align-${align}">${media}${figcaption(image.caption, image.credit)}</figure>`;
}

function renderGallery(block: Block): string {
  const images = ((block.images as BlogImage[] | undefined) ?? []).filter(hasAsset);
  if (images.length === 0) return '';
  const layout = pick(block.layout, ['grid', 'grid3', 'mosaic', 'carousel'] as const, 'grid');
  const ratio = parseRatio(typeof block.aspectRatio === 'string' ? block.aspectRatio : '4:5') ?? 4 / 5;
  const wide = block.wide !== false;
  const sizes = layout === 'carousel' ? '(min-width: 768px) 32rem, 85vw' : layout === 'grid3' ? '(min-width: 768px) 22rem, 50vw' : '(min-width: 768px) 32rem, 50vw';

  const items = images
    .map((image, index) => {
      const big = layout === 'mosaic' && index === 0;
      const img = imgTag(image, { maxWidth: big ? 1600 : 1000, ratio, sizes: big ? '(min-width: 768px) 44rem, 100vw' : sizes, lightbox: true });
      const caption = image.caption?.trim() ? `<figcaption class="pt-gallery__caption">${escapeHtml(image.caption)}</figcaption>` : '';
      return `<figure class="pt-gallery__item${big ? ' pt-gallery__item--big' : ''}">${img}${caption}</figure>`;
    })
    .join('');

  const carouselControls =
    layout === 'carousel'
      ? `<div class="pt-carousel__controls"><button type="button" class="pt-carousel__btn" data-carousel-prev aria-label="Previous photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button><button type="button" class="pt-carousel__btn" data-carousel-next aria-label="Next photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button></div>`
      : '';
  const trackAttrs = layout === 'carousel' ? ' data-carousel-track tabindex="0" role="region" aria-label="Photo slideshow"' : '';

  return `<figure class="pt-gallery pt-gallery--${layout}${wide ? ' pt-gallery--wide' : ''}"${
    layout === 'carousel' ? ' data-carousel' : ''
  }><div class="pt-gallery__track"${trackAttrs}>${items}</div>${carouselControls}${figcaption(block.caption)}</figure>`;
}

function renderVideo(block: Block): string {
  const video = parseVideoUrl(block.url as string | undefined);
  if (!video) return '';
  const ratio = pick(block.aspectRatio, ['16:9', '1:1', '9:16'] as const, '16:9');
  const title = escapeHtml((block.title as string | undefined)?.trim() || 'Video');
  return `<figure class="pt-embed pt-embed--video pt-embed--${ratio.replace(':', 'x')}"><div class="pt-embed__frame"><iframe src="${escapeHtml(
    video.embedUrl,
  )}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>${figcaption(
    block.caption,
  )}</figure>`;
}

function renderMusic(block: Block): string {
  const music = parseMusicUrl(block.url as string | undefined);
  if (!music) return '';
  const size = pick(block.size, ['auto', 'compact', 'tall'] as const, 'auto');
  const compact = size === 'auto' ? music.compact : size === 'compact';
  const height = music.provider === 'spotify' ? (compact ? 152 : 352) : compact ? 175 : 450;
  const title = escapeHtml((block.title as string | undefined)?.trim() || 'Music player');
  return `<div class="pt-embed pt-embed--music"><iframe src="${escapeHtml(music.embedUrl)}" title="${title}" height="${height}" loading="lazy" allow="autoplay *; clipboard-write; encrypted-media *; fullscreen *; picture-in-picture"></iframe></div>`;
}

function renderPullQuote(block: Block): string {
  const quote = typeof block.quote === 'string' ? block.quote.trim() : '';
  if (!quote) return '';
  const variant = pick(block.variant, ['classic', 'statement', 'panel'] as const, 'classic');
  const who = typeof block.attribution === 'string' ? block.attribution.trim() : '';
  const role = typeof block.role === 'string' ? block.role.trim() : '';
  const cite = who || role
    ? `<figcaption class="pt-pullquote__cite">${who ? `<span class="pt-pullquote__name">${escapeHtml(who)}</span>` : ''}${
        role ? `<span class="pt-pullquote__role">${escapeHtml(role)}</span>` : ''
      }</figcaption>`
    : '';
  return `<figure class="pt-pullquote pt-pullquote--${variant}"><blockquote><p>${escapeHtml(quote).replace(/\n/g, '<br />')}</p></blockquote>${cite}</figure>`;
}

const CALLOUT_ICONS: Record<string, string> = {
  info: '<circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" />',
  tip: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />',
  note: '<path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h3" />',
  warning: '<path d="M12 3l9.5 17h-19L12 3z" /><path d="M12 10v4M12 17.5v.01" />',
};

function renderCallout(block: Block): string {
  const tone = pick(block.tone, ['info', 'tip', 'note', 'warning'] as const, 'info');
  const body = renderBlocks((block.body as Block[] | undefined) ?? [], new HeadingIds(), [], {}).html;
  if (!body) return '';
  const title = typeof block.title === 'string' && block.title.trim() ? `<p class="pt-callout__title">${escapeHtml(block.title)}</p>` : '';
  return `<aside class="pt-callout pt-callout--${tone}"${tone === 'warning' ? ' role="note"' : ''}><svg class="pt-callout__icon" viewBox="0 0 24 24" aria-hidden="true">${
    CALLOUT_ICONS[tone]
  }</svg><div class="pt-callout__body">${title}${body}</div></aside>`;
}

function renderDivider(block: Block): string {
  const variant = pick(block.variant, ['line', 'stars', 'space'] as const, 'line');
  if (variant === 'stars') return '<div class="pt-divider pt-divider--stars" role="separator"><span aria-hidden="true">✦ ✦ ✦</span></div>';
  if (variant === 'space') return '<div class="pt-divider pt-divider--space" aria-hidden="true"></div>';
  return '<hr class="pt-divider pt-divider--line" />';
}

function renderButton(block: Block): string {
  const href = safeHref(block.href);
  const label = typeof block.label === 'string' ? block.label.trim() : '';
  if (!href || !label) return '';
  const variant = pick(block.variant, ['primary', 'outline'] as const, 'primary');
  const align = pick(block.align, ['left', 'center'] as const, 'left');
  return `<p class="pt-button-row pt-button-row--${align}"><a class="pt-button pt-button--${variant}" ${linkAttrs(
    href,
    block.newTab === true,
  )}><span>${escapeHtml(label)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></p>`;
}

const RELEASE_TYPES: Record<string, string> = { single: 'Single', ep: 'EP', album: 'Album', compilation: 'Compilation' };

function renderReleaseCard(block: Block, context: RenderContext): string {
  const release = context.releases?.get(block._key);
  if (!release?.slug) return '';
  const title = release.displayTitle || release.title;
  const year = release.releaseDate ? new Date(release.releaseDate).getUTCFullYear() : '';
  const meta = [RELEASE_TYPES[release.type] ?? '', year].filter(Boolean).join(' / ');
  const artists = release.artistNames.join(', ');
  const note = typeof block.note === 'string' && block.note.trim() ? `<span class="pt-card__note">${escapeHtml(block.note)}</span>` : '';
  const cover = release.coverUrl
    ? `<img class="pt-card__media pt-card__media--square" src="${escapeHtml(release.coverUrl)}" alt="" width="160" height="160" loading="lazy" decoding="async" />`
    : '<span class="pt-card__media pt-card__media--square pt-card__media--empty" aria-hidden="true"></span>';
  return `<a class="pt-card pt-card--release" href="/releases/${encodeURIComponent(release.slug)}">${cover}<span class="pt-card__text"><span class="pt-card__kicker">${escapeHtml(
    meta || 'Release',
  )}</span><span class="pt-card__title">${escapeHtml(title)}</span>${artists ? `<span class="pt-card__sub">${escapeHtml(artists)}</span>` : ''}${note}<span class="pt-card__cta">Listen now</span></span></a>`;
}

function renderArtistCard(block: Block): string {
  const artist = block.artist as { name?: string; slug?: string; tagline?: string; photo?: BlogImage } | null | undefined;
  if (!artist?.slug || !artist.name) return '';
  const photo = sanityImageUrl(artist.photo as never, { width: 320, height: 320, fit: 'crop' });
  const note = typeof block.note === 'string' && block.note.trim() ? block.note.trim() : artist.tagline ?? '';
  const media = photo
    ? `<img class="pt-card__media pt-card__media--round" src="${escapeHtml(photo)}" alt="" width="160" height="160" loading="lazy" decoding="async" />`
    : '<span class="pt-card__media pt-card__media--round pt-card__media--empty" aria-hidden="true"></span>';
  return `<a class="pt-card pt-card--artist" href="/artists/${encodeURIComponent(artist.slug)}">${media}<span class="pt-card__text"><span class="pt-card__kicker">Energize Music artiste</span><span class="pt-card__title">${escapeHtml(
    artist.name,
  )}</span>${note ? `<span class="pt-card__sub">${escapeHtml(note)}</span>` : ''}<span class="pt-card__cta">View profile</span></span></a>`;
}

/* ── Main entry ────────────────────────────────────────────────────────── */

function renderBlocks(blocks: Block[], ids: HeadingIds, toc: TocItem[], context: RenderContext): RenderedBody {
  const parts: string[] = [];
  let interactive = false;
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    if (!block || typeof block !== 'object') {
      index += 1;
      continue;
    }

    if (block._type === 'block' && (block as unknown as TextBlock).listItem) {
      const run: TextBlock[] = [];
      while (index < blocks.length && blocks[index]?._type === 'block' && (blocks[index] as unknown as TextBlock).listItem) {
        run.push(blocks[index] as unknown as TextBlock);
        index += 1;
      }
      let cursor = 0;
      while (cursor < run.length) {
        const [html, next] = renderList(run, cursor, run[cursor].level ?? 1);
        parts.push(html);
        cursor = next;
      }
      continue;
    }

    switch (block._type) {
      case 'block':
        parts.push(renderTextBlock(block as unknown as TextBlock, ids, toc));
        break;
      case 'blogImage':
      case 'image':
        parts.push(renderImage(block));
        interactive ||= hasAsset(block as unknown as BlogImage) && !safeHref(block.link);
        break;
      case 'blogGallery':
        parts.push(renderGallery(block));
        interactive = true;
        break;
      case 'blogVideo':
        parts.push(renderVideo(block));
        break;
      case 'blogMusicEmbed':
        parts.push(renderMusic(block));
        break;
      case 'blogPullQuote':
        parts.push(renderPullQuote(block));
        break;
      case 'blogCallout':
        parts.push(renderCallout(block));
        break;
      case 'blogDivider':
        parts.push(renderDivider(block));
        break;
      case 'blogButton':
        parts.push(renderButton(block));
        break;
      case 'blogReleaseCard':
        parts.push(renderReleaseCard(block, context));
        break;
      case 'blogArtistCard':
        parts.push(renderArtistCard(block));
        break;
      default:
        break;
    }
    index += 1;
  }

  return { html: parts.filter(Boolean).join('\n'), toc, interactive };
}

export function renderBlogBody(blocks: PortableTextBlock[] | null | undefined, context: RenderContext = {}): RenderedBody {
  return renderBlocks((blocks ?? []) as Block[], new HeadingIds(), [], context);
}

/** Plain text of the whole body, for word counts and feeds. */
export function bodyToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  return ((blocks ?? []) as Block[])
    .filter((block) => block._type === 'block')
    .map((block) => plainText(block as unknown as TextBlock))
    .join('\n\n');
}
