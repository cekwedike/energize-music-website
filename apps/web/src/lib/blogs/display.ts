import type { NewsPost, NewsPostSummary } from '@energize/shared';
import { urlForImage } from '../sanity/client';
import { formatRelatedDate } from './postMeta';

type CategorizedPost = Pick<NewsPostSummary, 'tags'> | Pick<NewsPost, 'tags'>;

export function getPostCoverUrl(
  post: NewsPostSummary,
  width: number,
  height: number,
): string {
  return urlForImage(post.cover).width(width).height(height).fit('crop').auto('format').url();
}

export function getPostCategory(post: CategorizedPost): string {
  const tag = post.tags?.find((item) => item.trim().length > 0);
  return tag ?? 'Story';
}

export function truncateExcerpt(text: string | undefined, maxLength = 120): string {
  const normalized = (text ?? '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}

export function formatSidebarDate(dateIso: string): string {
  return formatRelatedDate(dateIso);
}
