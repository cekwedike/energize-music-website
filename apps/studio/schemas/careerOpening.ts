import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'careerOpening',
  title: 'Career',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'type', title: 'Employment type', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'applyUrl', title: 'Apply URL', type: 'url', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'location' } },
});
