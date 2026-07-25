import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'universeItem',
  title: 'Universe Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['podcast', 'video', 'event', 'studio'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'media', title: 'Media', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'media' } },
});
