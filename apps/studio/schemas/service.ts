import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
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
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'icon', title: 'Icon name', type: 'string' }),
    defineField({
      name: 'contactIntent',
      title: 'Contact intent',
      type: 'string',
      options: { list: ['a&r', 'press', 'partnership', 'booking', 'general'] },
    }),
  ],
  preview: { select: { title: 'title' } },
});
