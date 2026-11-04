import { defineField, defineType } from 'sanity';

const lineupRevealOptions = [
  { title: 'Confirmed (show name + photo)', value: 'confirmed' },
  { title: 'TBA', value: 'tba' },
  { title: 'TBC', value: 'tbc' },
  { title: 'Surprise reveal', value: 'surprise' },
] as const;

const reservedShortLinks = new Set([
  '404',
  'about',
  'api',
  'artists',
  'blog',
  'contact',
  'energize-kids',
  'events',
  'llms',
  'next',
  'privacy',
  'releases',
  'terms',
]);

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description:
    'Create one page for each event. Every published event appears at /events/your-event-slug and can also appear in the Events directory.',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'page', title: 'Page Content' },
    { name: 'lineup', title: 'Lineup' },
    { name: 'tickets', title: 'Tickets & Buttons' },
  ],
  fields: [
    defineField({
      name: 'title',
      group: 'basics',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      group: 'basics',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (r) => r.required(),
      description:
        'This becomes the page link, such as /events/qol-gospel-rave. Click Generate, then keep it short and do not change it after sharing the link.',
    }),
    defineField({
      name: 'shortSlug',
      group: 'basics',
      title: 'Short link',
      type: 'slug',
      options: {
        source: 'title',
      },
      description:
        'The short link used by Copy Link, such as "qol" for energize-music.com/qol. Click Generate, then shorten it before publishing.',
      validation: (r) =>
        r.required().custom((value) => {
          const shortSlug = value?.current;
          if (!shortSlug) return 'Add a short link';
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(shortSlug)) {
            return 'Use lowercase letters, numbers, and hyphens only';
          }
          if (shortSlug.length > 24) return 'Keep the short link under 25 characters';
          if (reservedShortLinks.has(shortSlug)) return 'This link is already used by the website';
          return true;
        }),
    }),
    defineField({
      name: 'subtitle',
      group: 'basics',
      title: 'Subtitle',
      type: 'string',
      description: 'A short line under the event title. Shown in title case.',
    }),
    defineField({
      name: 'startDate',
      group: 'basics',
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
      group: 'basics',
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
      group: 'basics',
      title: 'Event type',
      type: 'string',
      options: {
        list: [
          { title: 'In person', value: 'physical' },
          { title: 'Online', value: 'virtual' },
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
      group: 'basics',
      title: 'Location',
      type: 'string',
      description:
        'Venue and city, e.g. "Eko Convention Centre, Lagos". Leave empty while unconfirmed: the site shows "Venue to be announced".',
    }),
    defineField({
      name: 'cover',
      group: 'basics',
      title: 'Cover / event image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (r) => r.required(),
      description: 'Full-width hero photo. Use a wide, high-resolution landscape image (at least 2400px).',
    }),
    defineField({
      name: 'shareImage',
      group: 'page',
      title: 'Social share image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'Optional. Overrides cover for Open Graph / social previews.',
    }),
    defineField({
      name: 'summary',
      group: 'page',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Two or three sentences. Shown near the start of the page and used for Google and share previews.',
    }),
    defineField({
      name: 'body',
      group: 'page',
      title: 'About the event',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
      description: 'Optional extra paragraphs under the summary.',
    }),
    defineField({
      name: 'highlights',
      group: 'page',
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
      description: 'Numbered cards under Event Details (two to four works best). Titles are shown in Title Case.',
    }),
    defineField({
      name: 'lineup',
      group: 'lineup',
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
      group: 'tickets',
      title: 'Ticket link',
      type: 'url',
      description: 'Leave empty until tickets are on sale. Until then the main button says "Get Ticket Alerts" and opens the email sign-up.',
    }),
    defineField({
      name: 'ctaLabel',
      group: 'tickets',
      title: 'Ticket button label',
      type: 'string',
      initialValue: 'Get Tickets',
      description: 'Used once a ticket link is set.',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      group: 'tickets',
      title: 'Second button label',
      type: 'string',
      initialValue: 'Partner With Us',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      group: 'tickets',
      title: 'Second button link',
      type: 'url',
      validation: (r) => r.uri({ allowRelative: true }),
      description: 'Defaults to the partnership contact form if empty.',
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
        ? new Date(startDate).toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date';
      const typeLabel =
        eventType === 'virtual' ? 'Online' : eventType === 'hybrid' ? 'Hybrid' : 'In person';

      return {
        title,
        subtitle: [dateLabel, location || 'Venue to be announced', typeLabel].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
