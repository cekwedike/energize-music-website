import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentTextIcon,
  description:
    'Main About page content: mission, vision, values, and team section intro. Not the same as slug-based pages under Important Pages.',
  fields: [
    defineField({
      name: 'title',
      title: 'Page heading',
      type: 'string',
      initialValue: 'About Energize Music',
      validation: (rule) => rule.required(),
      description: 'Main heading shown at the top of the About page.',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Mission, vision, values, and other introductory copy. Use headings (H2) to separate sections.',
    }),
    defineField({
      name: 'teamSectionTitle',
      title: 'Team section heading',
      type: 'string',
      initialValue: 'Meet Our Team',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'teamSectionIntro',
      title: 'Team section intro',
      type: 'text',
      rows: 3,
      description: 'Optional short line above the team grid.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
