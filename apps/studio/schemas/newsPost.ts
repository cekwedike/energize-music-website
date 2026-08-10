import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsPost',
  title: 'Blogs',
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
      name: 'date',
      title: 'Published date',
      type: 'datetime',
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'h:mm A',
        timeStep: 15,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'title', date: 'date', media: 'cover' },
    prepare({ title, date, media }) {
      const subtitle = date
        ? new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date set';

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
