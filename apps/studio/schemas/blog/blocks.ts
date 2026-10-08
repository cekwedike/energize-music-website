/**
 * Building blocks editors can drop into a blog post with the "+" (Insert) menu:
 * images, galleries, videos, music players, quotes, callouts, buttons and cards.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  BlockquoteIcon,
  BulbOutlineIcon,
  ImageIcon,
  ImagesIcon,
  LaunchIcon,
  MicrophoneIcon,
  PlayIcon,
  RemoveIcon,
  StarIcon,
} from '@sanity/icons';
import { parseMusicUrl, parseVideoUrl } from '../../../../packages/shared/src/blog/embeds';

/** Accepts site paths ("/releases/..."), https links, email and phone links. */
export function validLinkTarget(value: unknown): true | string {
  if (value === undefined || value === null || value === '') return true;
  if (typeof value !== 'string') return 'Enter a link.';
  if (/^\/(?!\/)/.test(value) || /^#/.test(value)) return true;
  if (/^(mailto|tel):/i.test(value)) return true;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) || 'Links must start with https://, /, mailto: or tel:';
  } catch {
    return 'Enter a full link starting with https://, or a site path starting with /';
  }
}

const altField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description:
    'Describe the picture for people using screen readers and for Google, e.g. "Greatman Takit singing on stage at Energize Fest". Leave empty only if "Decorative image" is on.',
  validation: (rule) =>
    rule.custom((alt, context) => {
      const parent = context.parent as { decorative?: boolean; asset?: unknown } | undefined;
      if (!parent?.asset || parent.decorative) return true;
      return alt?.trim() ? true : 'Add alt text, or turn on "Decorative image".';
    }).max(180),
});

const decorativeField = defineField({
  name: 'decorative',
  title: 'Decorative image',
  type: 'boolean',
  initialValue: false,
  description: 'Turn on only for purely decorative pictures (patterns, textures). Screen readers will skip it.',
});

/* ── Image ───────────────────────────────────────────────────────────── */

export const blogImage = defineType({
  name: 'blogImage',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  description:
    'Upload or pick a photo. Click the crop icon on the image to crop it and set the focus point (the part that must never be cut off).',
  options: { hotspot: true },
  fields: [
    altField,
    decorativeField,
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional. Shown in small text under the image.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'credit',
      title: 'Photo credit',
      type: 'string',
      description: 'Optional. Photographer or source, e.g. "Photo: TY Bello". Shown after the caption.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'large',
      description:
        'How wide the image appears. "Full bleed" runs edge to edge across the screen. Small and Medium can sit beside text using Position.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large (text width)', value: 'large' },
          { title: 'Wide (wider than text)', value: 'wide' },
          { title: 'Full bleed (edge to edge)', value: 'full' },
        ],
      },
    }),
    defineField({
      name: 'align',
      title: 'Position',
      type: 'string',
      initialValue: 'center',
      description: 'Only for Small and Medium images. Left or Right lets the text wrap around the image on larger screens.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Centre', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      hidden: ({ parent }) => !['small', 'medium'].includes((parent as { size?: string } | undefined)?.size ?? ''),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Shape (aspect ratio)',
      type: 'string',
      initialValue: 'original',
      description: 'Crops the image to this shape around the focus point you set. "Original" keeps your crop as it is.',
      options: {
        list: [
          { title: 'Original', value: 'original' },
          { title: 'Landscape 16:9', value: '16:9' },
          { title: 'Landscape 3:2', value: '3:2' },
          { title: 'Landscape 4:3', value: '4:3' },
          { title: 'Square 1:1', value: '1:1' },
          { title: 'Portrait 4:5', value: '4:5' },
          { title: 'Portrait 2:3', value: '2:3' },
          { title: 'Cinematic 21:9', value: '21:9' },
        ],
      },
    }),
    defineField({
      name: 'filter',
      title: 'Filter',
      type: 'string',
      initialValue: 'none',
      description: 'Optional colour treatment applied on the website. The original upload is never changed.',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Black and white', value: 'mono' },
          { title: 'Warm', value: 'warm' },
          { title: 'Cool', value: 'cool' },
          { title: 'Vivid', value: 'vivid' },
          { title: 'Faded film', value: 'faded' },
        ],
      },
    }),
    defineField({
      name: 'rounded',
      title: 'Rounded corners',
      type: 'boolean',
      initialValue: true,
      description: 'On by default to match the rest of the site. Turn off for square corners.',
    }),
    defineField({
      name: 'link',
      title: 'Link when clicked',
      type: 'string',
      description: 'Optional. A full link (https://...) or a site path (/releases/...). Leave empty for no link.',
      validation: (rule) => rule.custom(validLinkTarget),
    }),
  ],
  preview: {
    select: { media: 'asset', caption: 'caption', alt: 'alt', size: 'size' },
    prepare: ({ media, caption, alt, size }) => ({
      title: caption || alt || 'Image',
      subtitle: `Image · ${size ?? 'large'}`,
      media,
    }),
  },
});

/* ── Gallery ─────────────────────────────────────────────────────────── */

export const blogGallery = defineType({
  name: 'blogGallery',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  description: 'Two or more photos shown together as a grid or a swipeable slideshow.',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Drag to reorder. 2 to 12 images. Click an image to add alt text, a caption and crop it.',
      options: { layout: 'grid' },
      validation: (rule) => rule.required().min(2).max(12),
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            altField,
            decorativeField,
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional. Shown under this image (grid) or on the slide (slideshow).',
              validation: (rule) => rule.max(200),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      description: 'Grid shows every photo at once. Mosaic makes the first photo big. Slideshow lets readers swipe through.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Grid (2 columns)', value: 'grid' },
          { title: 'Grid (3 columns)', value: 'grid3' },
          { title: 'Mosaic (first photo large)', value: 'mosaic' },
          { title: 'Slideshow (swipe)', value: 'carousel' },
        ],
      },
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Photo shape',
      type: 'string',
      initialValue: '4:5',
      description: 'Every photo in the gallery is cropped to this shape around its focus point so the gallery lines up.',
      options: {
        list: [
          { title: 'Square 1:1', value: '1:1' },
          { title: 'Portrait 4:5', value: '4:5' },
          { title: 'Landscape 3:2', value: '3:2' },
          { title: 'Landscape 16:9', value: '16:9' },
        ],
      },
    }),
    defineField({
      name: 'caption',
      title: 'Gallery caption',
      type: 'string',
      description: 'Optional. One line under the whole gallery.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'wide',
      title: 'Wider than text',
      type: 'boolean',
      initialValue: true,
      description: 'On: the gallery spreads wider than the text column on large screens.',
    }),
  ],
  preview: {
    select: { images: 'images', caption: 'caption', layout: 'layout' },
    prepare: ({ images, caption, layout }) => ({
      title: caption || 'Gallery',
      subtitle: `${images?.length ?? 0} images · ${layout ?? 'grid'}`,
      media: images?.[0],
    }),
  },
});

/* ── Video ───────────────────────────────────────────────────────────── */

export const blogVideo = defineType({
  name: 'blogVideo',
  title: 'Video (YouTube or Vimeo)',
  type: 'object',
  icon: PlayIcon,
  description: 'Paste a YouTube or Vimeo link. The video plays inside the article.',
  fields: [
    defineField({
      name: 'url',
      title: 'Video link',
      type: 'url',
      description: 'For example https://www.youtube.com/watch?v=... or https://youtu.be/... or https://vimeo.com/...',
      validation: (rule) =>
        rule.required().custom((url) => (!url || parseVideoUrl(url) ? true : 'Paste a YouTube or Vimeo video link.')),
    }),
    defineField({
      name: 'title',
      title: 'Video title',
      type: 'string',
      description: 'Short name of the video, read out by screen readers, e.g. "ADML (Official Music Video)".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional. Shown under the video.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Shape',
      type: 'string',
      initialValue: '16:9',
      description: 'Use Vertical for YouTube Shorts or phone-shot clips.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Widescreen 16:9', value: '16:9' },
          { title: 'Square 1:1', value: '1:1' },
          { title: 'Vertical 9:16', value: '9:16' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', url: 'url' },
    prepare: ({ title, url }) => ({ title: title || 'Video', subtitle: url || 'No link yet', media: PlayIcon }),
  },
});

/* ── Music player ────────────────────────────────────────────────────── */

export const blogMusicEmbed = defineType({
  name: 'blogMusicEmbed',
  title: 'Music player (Spotify or Apple Music)',
  type: 'object',
  icon: MicrophoneIcon,
  description: 'Paste a Spotify or Apple Music link to a song, album or playlist. Readers can listen without leaving the page.',
  fields: [
    defineField({
      name: 'url',
      title: 'Spotify or Apple Music link',
      type: 'url',
      description: 'Use "Share > Copy link" in Spotify or Apple Music and paste it here.',
      validation: (rule) =>
        rule
          .required()
          .custom((url) => (!url || parseMusicUrl(url) ? true : 'Paste a Spotify or Apple Music song, album or playlist link.')),
    }),
    defineField({
      name: 'title',
      title: 'Player title',
      type: 'string',
      description: 'What is playing, e.g. "Flames Of A Wild Fire by Greatman Takit". Read out by screen readers.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'size',
      title: 'Player size',
      type: 'string',
      initialValue: 'auto',
      description: 'Auto picks a short player for single songs and a tall one for albums and playlists.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Auto', value: 'auto' },
          { title: 'Compact', value: 'compact' },
          { title: 'Tall (shows tracklist)', value: 'tall' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', url: 'url' },
    prepare: ({ title, url }) => ({ title: title || 'Music player', subtitle: url || 'No link yet', media: MicrophoneIcon }),
  },
});

/* ── Pull quote ──────────────────────────────────────────────────────── */

export const blogPullQuote = defineType({
  name: 'blogPullQuote',
  title: 'Pull quote',
  type: 'object',
  icon: BlockquoteIcon,
  description:
    'A big, eye-catching quote that breaks up the article. For a normal quoted paragraph, use the "Quote" text style instead.',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      description: 'Without quotation marks; the website adds them.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'attribution',
      title: 'Who said it',
      type: 'string',
      description: 'Optional, e.g. "Greatman Takit".',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'role',
      title: 'Their role or source',
      type: 'string',
      description: 'Optional, e.g. "Energize Music artiste" or "Interview, 2026".',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      initialValue: 'classic',
      description: 'Classic: large serif text with a blue rule. Statement: centred, extra large. Panel: on a soft blue card.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Classic', value: 'classic' },
          { title: 'Statement', value: 'statement' },
          { title: 'Panel', value: 'panel' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
    prepare: ({ title, subtitle }) => ({ title: title ? `“${title}”` : 'Pull quote', subtitle, media: BlockquoteIcon }),
  },
});

/* ── Callout ─────────────────────────────────────────────────────────── */

export const blogCallout = defineType({
  name: 'blogCallout',
  title: 'Callout box',
  type: 'object',
  icon: BulbOutlineIcon,
  description: 'A highlighted box for tips, notes, key details (dates, venues) or warnings.',
  fields: [
    defineField({
      name: 'tone',
      title: 'Type',
      type: 'string',
      initialValue: 'info',
      description: 'Changes the colour and icon of the box.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Info (blue)', value: 'info' },
          { title: 'Tip (green)', value: 'tip' },
          { title: 'Note (gold)', value: 'note' },
          { title: 'Important (red)', value: 'warning' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'Optional. A short bold line at the top of the box, e.g. "Good to know".',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      description: 'Bold, italic, links and bullet lists work here.',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Link',
                    type: 'string',
                    description: 'A full link (https://...) or a site path (/releases/...).',
                    validation: (rule) => rule.required().custom(validLinkTarget),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', tone: 'tone', body: 'body' },
    prepare: ({ title, tone, body }) => {
      const firstText = (body as Array<{ children?: Array<{ text?: string }> }> | undefined)?.[0]?.children
        ?.map((child) => child.text ?? '')
        .join('');
      return { title: title || firstText || 'Callout', subtitle: `Callout · ${tone ?? 'info'}`, media: BulbOutlineIcon };
    },
  },
});

/* ── Divider ─────────────────────────────────────────────────────────── */

export const blogDivider = defineType({
  name: 'blogDivider',
  title: 'Divider',
  type: 'object',
  icon: RemoveIcon,
  description: 'A visual break between sections.',
  fields: [
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      initialValue: 'line',
      description: 'Line: a thin rule. Stars: three small stars. Space: extra breathing room with nothing shown.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Stars', value: 'stars' },
          { title: 'Space', value: 'space' },
        ],
      },
    }),
  ],
  preview: {
    select: { variant: 'variant' },
    prepare: ({ variant }) => ({ title: 'Divider', subtitle: variant ?? 'line', media: RemoveIcon }),
  },
});

/* ── Button ──────────────────────────────────────────────────────────── */

export const blogButton = defineType({
  name: 'blogButton',
  title: 'Button',
  type: 'object',
  icon: LaunchIcon,
  description: 'A call-to-action button, e.g. "Stream the album", "Get tickets", "Pre-save now".',
  fields: [
    defineField({
      name: 'label',
      title: 'Button text',
      type: 'string',
      description: 'Short and action-led, 2 to 4 words.',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'A full link (https://...) or a site path (/releases/...).',
      validation: (rule) => rule.required().custom(validLinkTarget),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      initialValue: 'primary',
      description: 'Primary is a solid blue button. Outline is lighter, for a secondary action.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
    }),
    defineField({
      name: 'align',
      title: 'Position',
      type: 'string',
      initialValue: 'left',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Centre', value: 'center' },
        ],
      },
    }),
    defineField({
      name: 'newTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
      description: 'Links to other websites always open in a new tab. Turn this on to do the same for site links.',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Button', subtitle, media: LaunchIcon }),
  },
});

/* ── Release and artiste cards ───────────────────────────────────────── */

export const blogReleaseCard = defineType({
  name: 'blogReleaseCard',
  title: 'Release card',
  type: 'object',
  icon: PlayIcon,
  description: 'Shows a release from the Releases list with its cover, artiste and streaming links.',
  fields: [
    defineField({
      name: 'release',
      title: 'Release',
      type: 'reference',
      to: [{ type: 'release' }],
      description: 'Pick a published release. Its cover and links update automatically.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Short note',
      type: 'string',
      description: 'Optional. One line shown on the card, e.g. "Out now on all platforms".',
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: { title: 'release.title', media: 'release.cover', note: 'note' },
    prepare: ({ title, media, note }) => ({ title: title || 'Choose a release', subtitle: note || 'Release card', media: media ?? PlayIcon }),
  },
});

export const blogArtistCard = defineType({
  name: 'blogArtistCard',
  title: 'Artiste card',
  type: 'object',
  icon: StarIcon,
  description: 'Shows an artiste from the Artistes list with their photo and a link to their profile.',
  fields: [
    defineField({
      name: 'artist',
      title: 'Artiste',
      type: 'reference',
      to: [{ type: 'artist' }],
      description: 'Pick a published artiste.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Short note',
      type: 'string',
      description: 'Optional. Replaces the artiste tagline on the card for this post.',
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'artist.name', media: 'artist.photo' },
    prepare: ({ title, media }) => ({ title: title || 'Choose an artiste', subtitle: 'Artiste card', media: media ?? StarIcon }),
  },
});

export const blogBlockTypes = [
  blogImage,
  blogGallery,
  blogVideo,
  blogMusicEmbed,
  blogPullQuote,
  blogCallout,
  blogDivider,
  blogButton,
  blogReleaseCard,
  blogArtistCard,
];
