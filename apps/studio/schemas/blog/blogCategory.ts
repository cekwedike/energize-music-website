import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export default defineType({
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  icon: TagIcon,
  description: 'Topics used to group blog posts, e.g. "News", "Behind the Music", "Interviews". Readers filter the blog by these.',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Short and clear, 1 to 3 words. Shown on post cards and as a filter on the blog page.',
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the filter link (/blog?category=slug). Click "Generate" to create it from the name.',
      options: { source: 'title', maxLength: 48 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional. One sentence shown on the blog page when readers pick this category.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
      description: 'Lower numbers appear first in the category filter on the blog page.',
      validation: (rule) => rule.integer().min(0).max(999),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title: title || 'Untitled category', subtitle: slug ? `/blog?category=${slug}` : 'Missing slug' }),
  },
});
