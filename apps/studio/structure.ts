import type { StructureResolver } from 'sanity/structure';
import {
  CalendarIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  PlayIcon,
  StarFilledIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons';

/** Every document type the website reads, in the order editors use them. Nothing else is listed. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Artistes')
        .icon(MicrophoneIcon)
        .child(
          S.documentTypeList('artist')
            .title('Artistes')
            .defaultOrdering([
              { field: 'displayOrder', direction: 'asc' },
              { field: 'name', direction: 'asc' },
            ]),
        ),
      S.listItem()
        .title('Releases')
        .icon(PlayIcon)
        .child(
          S.documentTypeList('release')
            .title('Releases')
            .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }]),
        ),
      S.listItem()
        .title('Release Spotlights')
        .icon(StarIcon)
        .child(S.document().schemaType('releasesPage').documentId('releasesPage').title('Release Spotlights')),
      S.divider(),
      S.listItem()
        .title('Energize Fest')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('event')
            .title('Energize Fest Editions')
            .defaultOrdering([{ field: 'startDate', direction: 'desc' }]),
        ),
      S.listItem()
        .title('NEXT Page')
        .icon(StarIcon)
        .child(S.document().schemaType('nextPage').documentId('nextPage').title('NEXT Page')),
      S.divider(),
      S.listItem()
        .title('Blog')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .icon(ComposeIcon)
                .child(
                  S.documentTypeList('post')
                    .title('All Posts')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Featured Posts')
                .icon(StarFilledIcon)
                .child(
                  S.documentTypeList('post')
                    .title('Featured Posts')
                    .filter('_type == "post" && featured == true')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Posts by Category')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('blogCategory')
                    .title('Posts by Category')
                    .child((categoryId) =>
                      S.documentTypeList('post')
                        .title('Posts')
                        .filter('_type == "post" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                    ),
                ),
              S.divider(),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('blogCategory')
                    .title('Categories')
                    .defaultOrdering([
                      { field: 'order', direction: 'asc' },
                      { field: 'title', direction: 'asc' },
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('About Page')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),
      S.listItem()
        .title('Team Members')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.listItem()
        .title('Legal Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Legal Pages')),
    ]);
