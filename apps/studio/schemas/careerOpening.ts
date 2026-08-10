import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'careerOpening',
  title: 'Career',
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
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'type', title: 'Employment type', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'description',
      title: 'Job description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'applyUrl', title: 'Apply URL', type: 'url', validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', slug: 'slug.current' },
    prepare: ({ title, subtitle, slug }) => ({
      title,
      subtitle: slug ? `${subtitle ?? ''} · /careers/${slug}` : subtitle,
    }),
  },
});
