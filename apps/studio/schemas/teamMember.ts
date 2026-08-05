import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'role',
      title: 'Role / title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
      description: 'Job title shown under the name, e.g. "Founder" or "Head of Music".',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(20).max(1200),
      description: 'Short biography (1–3 sentences). Plain text only.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the photo for screen readers. Defaults to the member name if left empty.',
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      description: 'Optional. Only filled links appear on the site.',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'twitter', title: 'X (Twitter)', type: 'url' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0).max(999),
      description: 'Lower numbers appear first in the team grid (0 = first).',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo', order: 'order' },
    prepare: ({ title, subtitle, media, order }) => ({
      title,
      subtitle: order != null ? `${subtitle} · #${order}` : subtitle,
      media,
    }),
  },
});
