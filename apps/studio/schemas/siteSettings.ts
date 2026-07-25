import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Site description', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({ name: 'ogImage', type: 'image', title: 'OG Image' }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube' }),
        defineField({ name: 'spotify', type: 'url', title: 'Spotify' }),
        defineField({ name: 'tiktok', type: 'url', title: 'TikTok' }),
      ],
    }),
    defineField({ name: 'announcementBar', title: 'Announcement bar', type: 'string' }),
    defineField({ name: 'footerText', title: 'Footer text', type: 'string' }),
  ],
  preview: { select: { title: 'title' } },
});
