import { defineField, defineType } from 'sanity';

const lineupRevealOptions = [
  { title: 'Confirmed (show name + photo)', value: 'confirmed' },
  { title: 'TBA', value: 'tba' },
  { title: 'TBC', value: 'tbc' },
  { title: 'Surprise reveal', value: 'surprise' },
] as const;

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description:
    'Individual concerts, festivals, and live experiences. Each event gets its own page at /events/[slug].',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short line under the title, e.g. venue framing.',
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'h:mm A',
        timeStep: 15,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'h:mm A',
        timeStep: 15,
      },
    }),
    defineField({
      name: 'eventType',
      title: 'Event type',
      type: 'string',
      options: {
        list: [
          { title: 'Physical', value: 'physical' },
          { title: 'Virtual', value: 'virtual' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
        layout: 'radio',
      },
      initialValue: 'physical',
      validation: (r) => r.required(),
      description: 'Where the event happens: in person, online, or both.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description:
        'Venue, city, or stream link label. Leave empty if the venue is still TBA (the site will show “Venue TBA”).',
    }),
    defineField({
      name: 'status',
      title: 'Listing status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Confirmed', value: 'announced' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (r) => r.required(),
      description:
        'Controls listing placement (upcoming vs archive). Not shown next to venue TBA on the hero.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured / spotlight candidate',
      type: 'boolean',
      initialValue: false,
      description:
        'When on, this event can appear in the /events spotlight and on the homepage Live Spotlight. Homepage only shows events with this toggle enabled.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover / event image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (r) => r.required(),
      description: 'Used on cards, the event hero, and social share previews.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Social share image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'Optional. Overrides cover for Open Graph / social previews.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short teaser for cards, SEO, and share text.',
    }),
    defineField({
      name: 'body',
      title: 'About the night',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Event details',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        },
      ],
      description: 'Cards under Event details on the individual event page.',
    }),
    defineField({
      name: 'lineup',
      title: 'Lineup',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lineupItem',
          fields: [
            defineField({
              name: 'revealState',
              title: 'Reveal state',
              type: 'string',
              options: {
                list: [...lineupRevealOptions],
                layout: 'radio',
              },
              initialValue: 'confirmed',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name or working title',
              type: 'string',
              description:
                'Required when confirmed. For TBA/TBC/Surprise, optional working title shown under the tag.',
              validation: (r) =>
                r.custom((value, context) => {
                  const parent = context.parent as { revealState?: string } | undefined;
                  if (parent?.revealState === 'confirmed' && !value) {
                    return 'Name is required for confirmed lineup slots';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g. Headliner, Worship leader, Full label showcase',
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
              description: 'Shown for confirmed slots. Hidden on the site for TBA/TBC/Surprise.',
            }),
            defineField({
              name: 'artist',
              title: 'Roster artist',
              type: 'reference',
              to: [{ type: 'artist' }],
              description: 'Optional link to an artist on the roster (confirmed slots only).',
              hidden: ({ parent }) => parent?.revealState !== 'confirmed',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              revealState: 'revealState',
              media: 'photo',
            },
            prepare({ title, subtitle, revealState, media }) {
              const stateLabel =
                revealState === 'tba'
                  ? 'TBA'
                  : revealState === 'tbc'
                    ? 'TBC'
                    : revealState === 'surprise'
                      ? 'Surprise reveal'
                      : title || 'Lineup slot';
              return {
                title: stateLabel,
                subtitle: subtitle || revealState,
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket or RSVP URL',
      type: 'url',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'Get tickets',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      initialValue: 'Partner with us',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      title: 'Secondary CTA URL',
      type: 'url',
      description: 'Defaults to the contact page if empty.',
    }),
  ],
  orderings: [
    {
      title: 'Start date, newest',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start date, oldest',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      location: 'location',
      eventType: 'eventType',
      media: 'cover',
    },
    prepare({ title, startDate, location, eventType, media }) {
      const dateLabel = startDate
        ? new Date(startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date';
      const typeLabel =
        eventType === 'virtual' ? 'Virtual' : eventType === 'hybrid' ? 'Hybrid' : 'Physical';

      return {
        title,
        subtitle: [dateLabel, location || 'Venue TBA', typeLabel].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
