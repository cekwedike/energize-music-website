import type { StructureResolver } from 'sanity/structure';
import {
  CalendarIcon,
  DocumentIcon,
  DocumentTextIcon,
  HeartIcon,
  PlayIcon,
  StarIcon,
  UsersIcon,
} from '@sanity/icons';

/** Document types with custom sidebar entries (hide auto-generated duplicates). */
const HIDDEN_FROM_NAV = [
  'aboutPage',
  'volunteerInfo',
  'teamMember',
  'page',
  'releasesPage',
  'release',
  'event',
  'eventsPage',
  'nextPage',
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Page')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),
      S.listItem()
        .title('Releases')
        .icon(PlayIcon)
        .child(
          S.documentTypeList('release')
            .title('Releases')
            .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }]),
        ),
      S.listItem()
        .title('Spotlight A Release')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('releasesPage')
            .documentId('releasesPage')
            .title('Spotlight A Release'),
        ),
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('All Events')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('All Events')
                    .defaultOrdering([{ field: 'startDate', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Landing Page')
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType('eventsPage')
                    .documentId('eventsPage')
                    .title('Events Landing Page'),
                ),
            ]),
        ),
      S.listItem()
        .title('NEXT Page')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('nextPage')
            .documentId('nextPage')
            .title('NEXT Page'),
        ),
      S.listItem()
        .title('Important Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Important Pages')),
      S.listItem()
        .title('Team Members')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Volunteer Info')
        .icon(HeartIcon)
        .child(S.document().schemaType('volunteerInfo').documentId('volunteerInfo').title('Volunteer Info')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !HIDDEN_FROM_NAV.includes(id) : true;
      }),
    ]);
