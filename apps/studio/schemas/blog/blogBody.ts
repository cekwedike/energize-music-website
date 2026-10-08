/**
 * The rich text editor used for the body of a blog post.
 * Text styles (Normal, Heading 1 to 6, Quote...) are in the style dropdown,
 * formatting (bold, colour, font...) in the toolbar, and images, videos and cards in the Insert (+) menu.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  ColorWheelIcon,
  DocumentTextIcon,
  HighlightIcon,
  LinkIcon,
  TextIcon,
} from '@sanity/icons';
import { BLOG_FONTS, BLOG_TEXT_COLORS, BLOG_TEXT_SIZES, HEX_COLOR } from '../../../../packages/shared/src/blog/styleOptions';
import { blogBlockTypes, validLinkTarget } from './blocks';
import {
  CenteredStyle,
  HighlightDecorator,
  LeadStyle,
  SmallStyle,
  SubscriptDecorator,
  SuperscriptDecorator,
  TextColorAnnotation,
  TypographyAnnotation,
} from './editorPreviews';

export default defineType({
  name: 'blogBody',
  title: 'Article body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Intro paragraph (larger)', value: 'lead', component: LeadStyle },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Heading 5', value: 'h5' },
        { title: 'Heading 6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Centred paragraph', value: 'center', component: CenteredStyle },
        { title: 'Small print', value: 'small', component: SmallStyle },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
        { title: 'Checklist', value: 'check' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strikethrough', value: 'strike-through' },
          { title: 'Highlight', value: 'highlight', icon: HighlightIcon, component: HighlightDecorator },
          { title: 'Inline code', value: 'code' },
          { title: 'Superscript', value: 'sup', icon: () => 'x²', component: SuperscriptDecorator },
          { title: 'Subscript', value: 'sub', icon: () => 'x₂', component: SubscriptDecorator },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'Link',
                type: 'string',
                description:
                  'A full link (https://...), a site path (/releases/...), an email (mailto:hello@...) or phone (tel:+234...). For a page on this site you can also use "Link to a page on this site" instead.',
                validation: (rule) => rule.required().custom(validLinkTarget),
              }),
              defineField({
                name: 'newTab',
                title: 'Open in a new tab',
                type: 'boolean',
                initialValue: false,
                description: 'Links to other websites always open in a new tab. Turn this on to do the same for site links.',
              }),
            ],
          }),
          defineArrayMember({
            name: 'internalLink',
            title: 'Link to a page on this site',
            type: 'object',
            icon: DocumentTextIcon,
            description: 'Links to a blog post, release or artiste. The link keeps working even if its slug changes.',
            fields: [
              defineField({
                name: 'reference',
                title: 'Page',
                type: 'reference',
                to: [{ type: 'post' }, { type: 'release' }, { type: 'artist' }],
                description: 'Search for a blog post, release or artiste.',
                validation: (rule) => rule.required(),
              }),
            ],
          }),
          defineArrayMember({
            name: 'textColor',
            title: 'Text colour',
            type: 'object',
            icon: ColorWheelIcon,
            components: { annotation: TextColorAnnotation },
            fields: [
              defineField({
                name: 'color',
                title: 'Colour',
                type: 'string',
                description: 'Brand colours that stay readable on the site. Choose "Custom" to type your own.',
                initialValue: 'blue',
                options: {
                  list: [
                    ...BLOG_TEXT_COLORS.map(({ title, value, hex }) => ({ title: `${title} (${hex})`, value })),
                    { title: 'Custom colour...', value: 'custom' },
                  ],
                },
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: 'customHex',
                title: 'Custom colour (hex code)',
                type: 'string',
                description:
                  'A hex code such as #2563eb. Pick a dark enough colour so the text stays easy to read on a light background.',
                hidden: ({ parent }) => (parent as { color?: string } | undefined)?.color !== 'custom',
                validation: (rule) =>
                  rule.custom((hex, context) => {
                    if ((context.parent as { color?: string } | undefined)?.color !== 'custom') return true;
                    return hex && HEX_COLOR.test(hex) ? true : 'Enter a hex code like #2563eb.';
                  }),
              }),
            ],
          }),
          defineArrayMember({
            name: 'typography',
            title: 'Font and size',
            type: 'object',
            icon: TextIcon,
            components: { annotation: TypographyAnnotation },
            description: 'Change the font, size or weight of the selected words. Leave a field empty to keep the normal look.',
            fields: [
              defineField({
                name: 'font',
                title: 'Font',
                type: 'string',
                description: 'Leave empty to keep the paragraph font.',
                options: { list: BLOG_FONTS.map(({ title, value }) => ({ title, value })) },
              }),
              defineField({
                name: 'size',
                title: 'Size',
                type: 'string',
                description: 'Relative to the surrounding text. Leave empty to keep the normal size.',
                options: { list: BLOG_TEXT_SIZES.map(({ title, value }) => ({ title, value })) },
              }),
              defineField({
                name: 'weight',
                title: 'Weight',
                type: 'string',
                description: 'How thick the letters are. Leave empty to keep the normal weight.',
                options: {
                  list: [
                    { title: 'Regular', value: '400' },
                    { title: 'Medium', value: '500' },
                    { title: 'Semibold', value: '600' },
                    { title: 'Bold', value: '700' },
                  ],
                },
              }),
              defineField({
                name: 'italic',
                title: 'Italic',
                type: 'boolean',
                description: 'Slanted letters. Same as the Italic button, kept here so a style can be set in one place.',
              }),
              defineField({
                name: 'uppercase',
                title: 'ALL CAPS',
                type: 'boolean',
                description: 'Shows the words in capitals with a little extra letter spacing.',
              }),
            ],
          }),
        ],
      },
    }),
    ...blogBlockTypes.map((type) => defineArrayMember({ type: type.name })),
  ],
});
