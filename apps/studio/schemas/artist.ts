import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Internal roster status',
      type: 'string',
      options: {
        list: [
          { title: 'Official roster', value: 'official' },
          { title: 'Legacy catalog', value: 'legacy' },
        ],
        layout: 'radio',
      },
      initialValue: 'official',
      description:
        'Internal CMS label only. The public website does not display artist tiers or categorization.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
      description:
        'Shows this artist in the homepage roster strip. Toggle off and rebuild the site to remove them.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description:
        'Optional. Controls artist order across the site (1 = first, 2 = second, …). Artists without a number appear after those with a number.',
      validation: (rule) => rule.integer().min(1).max(999),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'Portrait for roster cards and profile pages. Use at least 1200px width for best quality.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description:
        'Optional wide banner for the artist profile hero. If empty, the Energize logo is used as the cover.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short line under the name on the artist page (e.g. "Afro-gospel visionary").',
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (rule) => rule.required().min(1).max(40),
        },
      ],
      options: { layout: 'list' },
      description: 'Add one genre per row (e.g. Afro-Gospel, Afrobeats).',
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'quote',
      title: 'Pull quote',
      type: 'text',
      description: 'Optional quote shown on the artist profile page.',
    }),
    defineField({
      name: 'streaming',
      title: 'Streaming links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', type: 'url', title: 'Spotify' }),
        defineField({ name: 'appleMusic', type: 'url', title: 'Apple Music' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube' }),
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'tier', media: 'photo', displayOrder: 'displayOrder' },
    prepare: ({ title, subtitle, media, displayOrder }) => ({
      title,
      subtitle:
        displayOrder != null
          ? `#${displayOrder} · ${subtitle ?? 'artist'}`
          : subtitle
            ? `${subtitle} · unnumbered`
            : 'unnumbered',
      media,
    }),
  },
});
