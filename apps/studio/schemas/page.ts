import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Legal Page',
  type: 'document',
  description: 'Privacy Policy and Terms of Service. The About page has its own entry in the sidebar.',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
      description: 'Use "privacy" or "terms". These are the pages linked in the footer.',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective date',
      type: 'date',
      options: { dateFormat: 'D MMMM YYYY' },
      validation: (r) => r.required(),
      description: 'Shown as "Effective ..." at the top of the page. Update it whenever the wording changes.',
    }),
    defineField({
      name: 'blocks',
      title: 'Content blocks',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
      ],
      description: 'The page text. Use Heading 2 for section titles.',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({
      title: title || 'Untitled page',
      subtitle: slug ? `/${slug}` : 'Missing slug',
    }),
  },
});
