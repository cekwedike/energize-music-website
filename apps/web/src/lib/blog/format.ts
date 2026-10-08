import type { BlogAuthor, PostCard } from '@energize/shared';
import { listNames } from '../seo/site';

/** "8 October 2026", shown in Lagos time so late-evening posts keep the right date. */
export function formatPostDate(iso: string | undefined, month: 'long' | 'short' = 'long'): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'Africa/Lagos' });
}

export function readingLabel(minutes: number | null | undefined): string {
  return `${Math.max(1, Math.round(minutes ?? 1))} min read`;
}

export function authorNames(authors: BlogAuthor[] | undefined): string {
  const names = (authors ?? []).map((author) => author.name).filter(Boolean);
  return names.length ? listNames(names) : 'Energize Music';
}

/** Featured post first if one is ticked in Studio, otherwise the newest. */
export function pickFeatured(posts: PostCard[]): PostCard | undefined {
  return posts.find((post) => post.featured) ?? posts[0];
}
