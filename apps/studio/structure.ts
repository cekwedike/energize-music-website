import type { StructureResolver } from 'sanity/structure';
import { DocumentTextIcon, UsersIcon } from '@sanity/icons';

const SINGLETONS = ['aboutPage', 'volunteerInfo'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
      S.divider(),
      S.listItem()
        .title('Volunteer Info')
        .child(S.document().schemaType('volunteerInfo').documentId('volunteerInfo').title('Volunteer Info')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !SINGLETONS.includes(id) : true;
      }),
    ]);
