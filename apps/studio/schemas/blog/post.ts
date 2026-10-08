import { defineArrayMember, defineField, defineType } from 'sanity';
import { ComposeIcon, EarthGlobeIcon, ImageIcon, InfoOutlineIcon, LinkIcon } from '@sanity/icons';

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date';

export default defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: ComposeIcon,
  description: 'Articles shown on the Blog page (linked in the website footer). Only published posts appear on the site.',
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon, default: true },
    { name: 'media', title: 'Cover image', icon: ImageIcon },
    { name: 'details', title: 'Details', icon: InfoOutlineIcon },
    { name: 'related', title: 'Related', icon: LinkIcon },
    { name: 'seo', title: 'SEO and sharing', icon: EarthGlobeIcon },
  ],
  fields: [
    /* ── Content ── */
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The headline. Clear beats clever: aim for under 70 characters so it fits on Google and social cards.',
      validation: (rule) => [
        rule.required().min(5).max(120),
        rule.max(70).warning('Titles over 70 characters get cut off on Google.'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug (web address)',
      type: 'slug',
      group: 'content',
      description:
        'The end of the post link: energize-music.com/blog/your-slug. Click "Generate" to create it from the title. Avoid changing it after publishing, or shared links will break.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'One or two sentences that sell the post. Shown on blog cards, under the headline, and as the Google description unless SEO overrides it.',
      validation: (rule) => [
        rule.required().min(30).max(240),
        rule.max(160).warning('Over 160 characters: Google may shorten it. Add a shorter SEO description if needed.'),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'blogBody',
      group: 'content',
      description:
        'Write the post here. Style menu: Normal, Intro, Heading 1 to 6, Quote. Toolbar: bold, italic, highlight, colour, font, links. Use the Insert (+) menu for images, galleries, videos, music players, pull quotes, callouts, buttons and cards. Tip: start sections with Heading 2; the post title is already the main heading.',
      validation: (rule) => rule.required().min(1),
    }),

    /* ── Cover image ── */
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      group: 'media',
      description:
        'Shown at the top of the post, on blog cards and when the post is shared on WhatsApp or social media. Landscape works best (at least 1600 px wide). Click the crop icon to set the focus point so faces never get cut off.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the picture for screen readers and Google, e.g. "TY Bello recording in the studio".',
          validation: (rule) =>
            rule
              .custom((alt, context) => {
                const parent = context.parent as { asset?: unknown } | undefined;
                return !parent?.asset || alt?.trim() ? true : 'Add alt text for the cover image.';
              })
              .max(180),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional. Shown under the cover image on the post page.',
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: 'credit',
          title: 'Photo credit',
          type: 'string',
          description: 'Optional, e.g. "Photo: TY Bello".',
          validation: (rule) => rule.max(120),
        }),
      ],
      validation: (rule) => rule.required().warning('Posts look much better with a cover image. Without one, a branded placeholder is used.'),
    }),
    defineField({
      name: 'coverLayout',
      title: 'Cover style on the post page',
      type: 'string',
      group: 'media',
      initialValue: 'contained',
      description:
        'Contained: the image sits under the headline. Immersive: the headline is laid over a full-width image (best for strong, simple photos). Hidden: no cover on the post page, but it is still used on cards and when sharing.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Contained', value: 'contained' },
          { title: 'Immersive', value: 'immersive' },
          { title: 'Hidden', value: 'hidden' },
        ],
      },
    }),

    /* ── Details ── */
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      group: 'details',
      initialValue: () => new Date().toISOString(),
      description:
        'Shown on the post and used to sort the blog (newest first). Set a future date to hold a published post back until the site rebuilds on or after that day.',
      options: { dateFormat: 'D MMM YYYY', timeFormat: 'HH:mm' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last updated',
      type: 'datetime',
      group: 'details',
      description: 'Optional. Set this when you make a meaningful update so readers see "Updated ...". Leave empty otherwise.',
      options: { dateFormat: 'D MMM YYYY', timeFormat: 'HH:mm' },
      validation: (rule) =>
        rule.custom((updatedAt, context) => {
          const publishedAt = (context.document as { publishedAt?: string } | undefined)?.publishedAt;
          return updatedAt && publishedAt && updatedAt < publishedAt ? '"Last updated" must be after the publish date.' : true;
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'details',
      to: [{ type: 'blogCategory' }],
      description: 'The main topic. Create new ones under Blog > Categories. Readers can filter the blog by category.',
      options: { disableNew: false },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'details',
      description: 'Optional keywords, e.g. "Afro-gospel", "Live", "Studio". Press Enter after each one. Shown at the end of the post and used for SEO.',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.max(10).unique(),
    }),
    defineField({
      name: 'authors',
      title: 'Written by',
      type: 'array',
      group: 'details',
      description:
        'Pick one or more people from Team Members or Artistes. Their photo and role are shown with the post. Leave empty to credit "Energize Music".',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'teamMember' }, { type: 'artist' }] })],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature at the top of the blog',
      type: 'boolean',
      group: 'details',
      initialValue: false,
      description:
        'Shows this post in the large spot at the top of the Blog page. If several posts are featured, the newest one wins. If none are, the newest post is used.',
    }),

    /* ── Related ── */
    defineField({
      name: 'relatedArtists',
      title: 'Artistes in this post',
      type: 'array',
      group: 'related',
      description: 'Optional. Shown as cards at the end of the post so readers can explore the artistes mentioned.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artist' }] })],
      validation: (rule) => rule.max(4).unique(),
    }),
    defineField({
      name: 'relatedReleases',
      title: 'Releases in this post',
      type: 'array',
      group: 'related',
      description: 'Optional. Shown as "Listen now" cards at the end of the post.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'release' }] })],
      validation: (rule) => rule.max(4).unique(),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Read next',
      type: 'array',
      group: 'related',
      description:
        'Optional. Pick up to 3 posts to suggest at the end. Leave empty and the site suggests the newest posts from the same category.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
      validation: (rule) =>
        rule
          .max(3)
          .unique()
          .custom((refs, context) => {
            const selfId = String(context.document?._id ?? '').replace(/^drafts\./, '');
            const pointsToSelf = (refs as Array<{ _ref?: string }> | undefined)?.some((ref) => ref._ref === selfId);
            return pointsToSelf ? 'A post cannot suggest itself.' : true;
          }),
    }),

    /* ── SEO ── */
    defineField({
      name: 'seo',
      title: 'Search and social sharing',
      type: 'object',
      group: 'seo',
      description: 'All optional. Leave empty to use the title, summary and cover image.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          description: 'Replaces the title in Google results and browser tabs. Aim for 50 to 60 characters. " | Energize Music" is added automatically.',
          validation: (rule) => rule.max(70).warning('Over 70 characters: Google will shorten it.'),
        }),
        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          rows: 2,
          description: 'Replaces the summary in Google results and link previews. Aim for 120 to 160 characters.',
          validation: (rule) => rule.max(170).warning('Over 160 characters: Google will shorten it.'),
        }),
        defineField({
          name: 'shareImage',
          title: 'Share image',
          type: 'image',
          description:
            'Optional. A different image for WhatsApp, X, Facebook and LinkedIn previews. Best size 1200 x 630 px. Leave empty to use the cover image.',
          options: { hotspot: true },
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from Google',
          type: 'boolean',
          initialValue: false,
          description: 'Turn on to keep this post out of search results. It still appears on the blog page.',
        }),
      ],
    }),
  ],
  orderings: [
    { title: 'Publish date, newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Publish date, oldest first', name: 'publishedAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
    { title: 'Title A to Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', publishedAt: 'publishedAt', media: 'mainImage', category: 'category.title', featured: 'featured' },
    prepare: ({ title, publishedAt, media, category, featured }) => ({
      title: title || 'Untitled post',
      subtitle: [featured ? '★ Featured' : '', formatDate(publishedAt), category].filter(Boolean).join(' · '),
      media,
    }),
  },
});
