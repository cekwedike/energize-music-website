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
        'Spotify, Apple Music, or YouTube link. Cover art and title can be fetched from this URL at build time if cover is missing.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (rule) =>
        rule.custom((cover, context) => {
          const doc = context.document as { sourceUrl?: string } | undefined;
          const hasSourceUrl = Boolean(doc?.sourceUrl?.trim());

          if (!cover) {
            return hasSourceUrl || 'Add a cover image or a primary streaming URL.';
          }

          const asset = (cover as { asset?: { _ref?: string } | null }).asset;
          if (!asset?._ref) {
            return 'Cover upload incomplete. Re-upload the image or remove the cover field and use a primary streaming URL instead.';
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
