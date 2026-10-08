import type { APIRoute } from 'astro';
import { blogPostsQuery, type PostCard } from '@energize/shared';
import { sanityClient } from '../../lib/sanity/client';
import { authorNames } from '../../lib/blog/format';
import { shareImageUrl } from '../../lib/blog/images';
import { absoluteUrl } from '../../lib/seo/site';

const xml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** RSS feed of the newest posts, built with the site so feed readers and newsletters can pick up new stories. */
export const GET: APIRoute = async () => {
  let posts: PostCard[] = [];
  try {
    posts = await sanityClient.fetch<PostCard[]>(blogPostsQuery);
  } catch {
    posts = [];
  }

  const items = posts
    .slice(0, 30)
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const image = shareImageUrl(post.mainImage);
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${xml(post.excerpt ?? '')}</description>
      <dc:creator>${xml(authorNames(post.authors))}</dc:creator>${post.category?.title ? `\n      <category>${xml(post.category.title)}</category>` : ''}${
        image ? `\n      <enclosure url="${xml(image)}" type="image/jpeg" length="0" />` : ''
      }
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Energize Music Blog</title>
    <link>${xml(absoluteUrl('/blog'))}</link>
    <atom:link href="${xml(absoluteUrl('/blog/rss.xml'))}" rel="self" type="application/rss+xml" />
    <description>News, studio stories, artiste interviews and the faith behind the music, from Energize Music in Lagos.</description>
    <language>en</language>${posts[0] ? `\n    <lastBuildDate>${new Date(posts[0].updatedAt ?? posts[0].publishedAt).toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
