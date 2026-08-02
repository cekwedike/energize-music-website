import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'volunteerInfo',
  title: 'Volunteer Info',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Intro copy', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'roleOptions',
      title: 'Role options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'signupUrl',
      title: 'Sign-up form URL',
      type: 'url',
      description: 'Where the "Join the volunteer list" button sends people — e.g. a Google Form link.',
    }),
    defineField({ name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Join the volunteer list' }),
  ],
  preview: { select: { title: 'heading' } },
});
