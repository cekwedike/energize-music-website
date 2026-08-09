import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['single', 'ep', 'album', 'compilation'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'releaseDate', title: 'Release date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'sourceUrl',
      title: 'Primary streaming URL',
      type: 'url',
      description:
        'Preferred Spotify, Apple Music, or YouTube link. If Cover is empty, the website pulls artwork from this URL (then falls back through Streaming links).',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description:
        'Optional if a streaming URL is set. Leave empty to auto-pull cover art from the primary streaming URL / streaming links.',
      validation: (rule) =>
        rule.custom((cover, context) => {
          const doc = context.document as {
            sourceUrl?: string;
            links?: { spotify?: string; appleMusic?: string; youtube?: string };
          } | undefined;

          const hasStreamingUrl = Boolean(
            doc?.sourceUrl?.trim() ||
              doc?.links?.spotify?.trim() ||
              doc?.links?.appleMusic?.trim() ||
              doc?.links?.youtube?.trim(),
          );

          if (!cover) {
            return (
              hasStreamingUrl ||
              'Add a cover image, or set a primary streaming URL / streaming link so artwork can be pulled automatically.'
            );
          }

          const asset = (cover as { asset?: { _ref?: string } | null }).asset;
          if (!asset?._ref) {
            return hasStreamingUrl
              ? true
              : 'Cover upload incomplete. Re-upload the image, or clear Cover and rely on a streaming URL.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (r) => r.required().min(1).max(10),
      description: 'Link up to 10 artists. Each artist profile shows their 10 most recent releases.',
    }),
    defineField({
      name: 'links',
      title: 'Streaming links',
      type: 'object',
      description:
        'Used for play buttons on the site. Also used as cover-art fallbacks (Spotify first, then Apple Music, then YouTube) when Cover is empty.',
      fields: [
        defineField({ name: 'spotify', type: 'url', title: 'Spotify' }),
        defineField({ name: 'appleMusic', type: 'url', title: 'Apple Music' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube' }),
      ],
    }),

    defineField({ name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'cover' },
  },
});
