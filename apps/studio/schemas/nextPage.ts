import { defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons';

export default defineType({
  name: 'nextPage',
  title: 'NEXT Page',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'submissionsOpen',
      title: 'Submissions open',
      type: 'boolean',
      initialValue: false,
      description: 'When off, submit buttons are hidden and a closed indicator is shown.',
    }),
    defineField({
      name: 'submitUrl',
      title: 'Submission / registration URL',
      type: 'url',
      description: 'External form link used by all Submit CTAs when submissions are open.',
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as { submissionsOpen?: boolean } | undefined;
          if (parent?.submissionsOpen && !value) {
            return 'Submission URL is required when submissions are open';
          }
          return true;
        }),
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit button label',
      type: 'string',
      initialValue: 'Submit Your Music',
    }),
    defineField({
      name: 'closedLabel',
      title: 'Closed badge label',
      type: 'string',
      initialValue: 'Submissions Closed',
    }),
    defineField({
      name: 'closedMessage',
      title: 'Closed message',
      type: 'text',
      rows: 2,
      initialValue: 'Registration for this season has ended. Follow Energize Music for the next drop.',
      description: 'Short line shown under the closed badge.',
    }),
  ],
  preview: {
    select: {
      open: 'submissionsOpen',
    },
    prepare({ open }) {
      return {
        title: 'NEXT Page',
        subtitle: open ? 'Submissions open' : 'Submissions closed',
      };
    },
  },
});
