import { defineArrayMember, defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons';

const formatDate = (value?: string) =>
  value
    ? new Date(`${value}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

/** Status line shown under each spotlight in the list, using today's date in Lagos. */
function spotlightStatus(startsOn?: string, endsOn?: string): string {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date());
  if (endsOn && endsOn < today) return `Ended ${formatDate(endsOn)}`;
  if (startsOn && startsOn > today) return `Scheduled from ${formatDate(startsOn)}`;
  if (endsOn) return `Live until ${formatDate(endsOn)}`;
  return 'Live, no end date';
}

export default defineType({
  name: 'releasesPage',
  title: 'Release Spotlights',
  type: 'document',
  icon: StarIcon,
  description:
    'Releases featured at the top of the home page and the Releases page. Drag to reorder. With nothing live, the home page shows the newest release.',
  fields: [
    defineField({
      name: 'spotlights',
      title: 'Spotlights',
      type: 'array',
      validation: (rule) => rule.max(5),
      description:
        'Up to 5. The first live spotlight shows first; several live spotlights rotate. Dates are optional and switch over at midnight Lagos time.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'spotlight',
          fields: [
            defineField({
              name: 'release',
              title: 'Release',
              type: 'reference',
              to: [{ type: 'release' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'startsOn',
              title: 'Show from',
              type: 'date',
              options: { dateFormat: 'D MMM YYYY' },
              description: 'Optional. Leave empty to show it straight away.',
            }),
            defineField({
              name: 'endsOn',
              title: 'Show until',
              type: 'date',
              options: { dateFormat: 'D MMM YYYY' },
              description: 'Optional. Shown up to and including this day. Leave empty to keep it until you remove it.',
              validation: (rule) =>
                rule.custom((endsOn, context) => {
                  const startsOn = (context.parent as { startsOn?: string } | undefined)?.startsOn;
                  return endsOn && startsOn && endsOn < startsOn ? '"Show until" must be on or after "Show from".' : true;
                }),
            }),
          ],
          preview: {
            select: { title: 'release.title', media: 'release.cover', startsOn: 'startsOn', endsOn: 'endsOn' },
            prepare: ({ title, media, startsOn, endsOn }) => ({
              title: title || 'Choose a release',
              subtitle: spotlightStatus(startsOn, endsOn),
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Release Spotlights' }),
  },
});
