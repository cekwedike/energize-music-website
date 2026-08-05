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
      title: 'Status',
      type: 'string',
      options: { list: ['official', 'legacy'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', validation: (r) => r.required() }),
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
  preview: {
    select: { title: 'name', subtitle: 'tier', media: 'photo' },
  },
});
