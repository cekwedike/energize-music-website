import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export default defineType({
  name: 'eventsPage',
  title: 'Events Landing Page',
  type: 'document',
  icon: CalendarIcon,
  description:
    'Hero, marquee, quality section, and spotlight picks for energizemusic.com/events. Add and edit individual events under Events > All Events.',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      initialValue: 'Find your perfect night wherever you are',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero lead',
      type: 'text',
      rows: 3,
      initialValue: 'Discover the best live music from Energize, tailored to the sound that moves you.',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA label',
      type: 'string',
      initialValue: 'Find an event',
    }),
    defineField({
      name: 'heroWordmark',
      title: 'Hero wordmark',
      type: 'string',
      initialValue: 'LIVE SHOWS',
      description: 'Large image-filled text in the hero, e.g. LIVE SHOWS.',
    }),
    defineField({
      name: 'heroWordmarkImage',
      title: 'Hero wordmark image fill',
      type: 'image',
      options: { hotspot: true },
      description: 'Image clipped inside the wordmark letters. Upload a stage photo for the LIVE SHOWS fill.',
    }),
    defineField({
      name: 'heroBadgeTitle',
      title: 'Hero badge title',
      type: 'string',
      initialValue: 'ENERGY',
    }),
    defineField({
      name: 'heroBadgeSubtitle',
      title: 'Hero badge subtitle',
      type: 'string',
      initialValue: 'on Stage',
      description: 'Shown under ENERGY. Keep mixed case, e.g. on Stage.',
    }),
    defineField({
      name: 'marqueeText',
      title: 'Marquee text',
      type: 'string',
      initialValue: 'For Friends & Fans of Energize Music',
    }),
    defineField({
      name: 'qualityTitle',
      title: 'Quality section title',
      type: 'string',
      initialValue: 'Our quality',
    }),
    defineField({
      name: 'qualityItems',
      title: 'Quality cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qualityItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'spotlightEvents',
      title: 'Spotlight events',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      validation: (r) => r.max(4),
      description: 'Featured events at the top of the listing. Leave empty to use featured events automatically.',
    }),
    defineField({
      name: 'upcomingPageSize',
      title: 'Upcoming events per page',
      type: 'number',
      initialValue: 6,
      validation: (r) => r.min(3).max(24),
    }),
    defineField({
      name: 'archivePageSize',
      title: 'Archive events per page',
      type: 'number',
      initialValue: 6,
      validation: (r) => r.min(3).max(24),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Events Landing Page' }),
  },
});
