import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons';

export default defineType({
  name: 'volunteerInfo',
  title: 'Volunteer Info',
  type: 'document',
  icon: HeartIcon,
  description:
    'Volunteer section on the Careers page (/careers). Singleton: open Content → Volunteer Info in the sidebar. Document ID must stay volunteerInfo.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      description: 'Small uppercase line above the heading, e.g. "Serve with purpose".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro copy',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roleOptionsLabel',
      title: 'Role options section label',
      type: 'string',
      description: 'Heading above the role option chips, e.g. "Ways to help".',
    }),
    defineField({
      name: 'roleOptions',
      title: 'Role options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'platformsLabel',
      title: 'Platforms section label',
      type: 'string',
      description: 'Heading above the platform chips, e.g. "Platforms".',
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
      description: 'External sign-up link for the primary button, e.g. a Google Form.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary button label',
      type: 'string',
      description: 'Label when Sign-up form URL is set.',
      initialValue: 'Join the volunteer list',
    }),
    defineField({
      name: 'fallbackCtaLabel',
      title: 'Fallback button label',
      type: 'string',
      description: 'Primary button label when no sign-up URL is set, e.g. "Contact us to volunteer".',
    }),
    defineField({
      name: 'fallbackCtaUrl',
      title: 'Fallback button URL',
      type: 'string',
      description: 'Primary button link when no sign-up URL is set, e.g. /contact.',
    }),
    defineField({
      name: 'secondaryLinkLabel',
      title: 'Secondary link label',
      type: 'string',
      description: 'Optional text link below the primary button, e.g. "Questions? Reach The Team".',
    }),
    defineField({
      name: 'secondaryLinkUrl',
      title: 'Secondary link URL',
      type: 'string',
      description: 'Destination for the secondary link, e.g. /contact.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Volunteer Info' }),
  },
});
