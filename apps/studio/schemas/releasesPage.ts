import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export default defineType({
  name: 'releasesPage',
  title: 'Spotlight A Release',
  type: 'document',
  icon: PlayIcon,
  description:
    'Choose which releases appear in the spotlight card at the top of the /releases page. Leave empty to hide the spotlight.',
  fields: [
    defineField({
      name: 'releaseSpotlights',
      title: 'Spotlight releases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'release' }] }],
      validation: (Rule) => Rule.max(5),
      description:
        'Select up to 5 releases for the spotlight card with tabs. The spotlight is hidden until you add at least one release here.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Spotlight A Release' }),
  },
});
