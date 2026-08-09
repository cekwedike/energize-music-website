import type { StructureResolver } from 'sanity/structure';
import { DocumentIcon, DocumentTextIcon, PlayIcon, StarIcon, UsersIcon } from '@sanity/icons';

/** Document types with custom sidebar entries (hide auto-generated duplicates). */
const HIDDEN_FROM_NAV = [
  'aboutPage',
  'volunteerInfo',
  'teamMember',
  'page',
  'releasesPage',
  'release',
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
        .child(S.document().schemaType('volunteerInfo').documentId('volunteerInfo').title('Volunteer Info')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !HIDDEN_FROM_NAV.includes(id) : true;
      }),
    ]);
