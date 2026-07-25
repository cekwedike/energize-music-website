import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'creator',
  title: 'Producer / Writer',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'credits', title: 'Credits', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'credits', media: 'photo' } },
});
