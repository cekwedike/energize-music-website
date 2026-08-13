import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'release',
  title: 'Releases',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['single', 'ep', 'album', 'compilation'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'releaseDate', title: 'Release date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'sourceUrl',
      title: 'Primary streaming URL',
      type: 'url',
      description:
        'Preferred Spotify, Apple Music, or YouTube link. If Cover is empty, the website pulls artwork from this URL (then falls back through Streaming links).',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description:
        'Optional. Leave empty to auto-pull cover art from Primary streaming URL, then Spotify → Apple Music → YouTube.',
    }),

    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(10)
          .custom(async (artistRefs, context) => {
            if (!Array.isArray(artistRefs) || artistRefs.length === 0) return true;

            const client = context.getClient({ apiVersion: '2024-01-01' });
            const docId =
              typeof context.document?._id === 'string' ? context.document._id : '';
            const publishedId = docId.replace(/^drafts\./, '');
            // Only exclude once the doc has a real id. Empty strings would match nothing
            // useful and can mis-count when a new draft is already in the dataset.
            const excludeIds =
              publishedId.length > 0 ? [publishedId, `drafts.${publishedId}`] : [];
            const maxReleasesPerArtist = 20;

            for (const ref of artistRefs) {
              const artistId =
                typeof ref === 'object' &&
                ref !== null &&
                '_ref' in ref &&
                typeof (ref as { _ref?: unknown })._ref === 'string'
                  ? (ref as { _ref: string })._ref
                  : undefined;
              if (!artistId) continue;

              // Deduplicate draft + published pairs so one release counts once.
              const count = await client.fetch<number>(
                `count(array::unique(*[
                  _type == "release"
                  && $artistId in artists[]._ref
                  && !(_id in $excludeIds)
                ]{
                  "id": select(
                    _id in path("drafts.**") => string::split(_id, "drafts.")[1],
                    _id
                  )
                }.id))`,
                { artistId, excludeIds },
              );

              if (count >= maxReleasesPerArtist) {
                return `Each artist can appear on at most ${maxReleasesPerArtist} releases. One selected artist already has ${count}. Retire or reassign an older release before adding another.`;
              }
            }

            return true;
          }),
      description:
        'Link up to 10 artists. Each artist profile shows their 10 most recent releases. The releases page shows up to 20 per artist.',
    }),
    defineField({
      name: 'links',
      title: 'Streaming links',
      type: 'object',
      description:
        'Used for play buttons on the site. Also used as cover-art fallbacks (Spotify first, then Apple Music, then YouTube) when Cover is empty.',
      fields: [
        defineField({ name: 'spotify', type: 'url', title: 'Spotify' }),
        defineField({ name: 'appleMusic', type: 'url', title: 'Apple Music' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube' }),
        defineField({
          name: 'smartLink',
          type: 'url',
          title: 'Feature.fm / Pre-save / Smart link',
          description:
            'Optional aggregator link (Feature.fm, Linkfire, ToneDen, etc.) that houses all platform listen/pre-save options.',
        }),
      ],
    }),

    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      initialValue: false,
      description:
        'Shows this release as the homepage Now Spinning pick (newest featured wins). Toggle off and rebuild the site to remove it. To spotlight a release on /releases, use Spotlight A Release in the sidebar.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'cover' },
  },
});
