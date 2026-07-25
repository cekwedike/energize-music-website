import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pressAsset',
  title: 'Press Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['logo', 'photo', 'pdf'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'file', title: 'File', type: 'file', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
});
