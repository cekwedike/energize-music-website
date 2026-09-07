/**
 * Draft-only Sanity helpers for the copy/SEO overhaul.
 * Creates [DELETE] draft markers for fake career openings.
 * Does not delete published documents. User finishes in Studio.
 *
 * Run from repo root or apps/studio:
 *   node apps/studio/scripts/draft-copy-overhaul.mjs
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const envText = readFileSync(resolve(root, '../.env'), 'utf8');
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const projectId = env.SANITY_STUDIO_PROJECT_ID;
const token = env.SANITY_WRITE_TOKEN;
const dataset = env.SANITY_STUDIO_DATASET || 'production';

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_WRITE_TOKEN in apps/studio/.env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const DELETE_IDS = ['eJ7skWqptDvdh6OpbU7OuT', 'kqd32DnwMDSkqBnWPznbwI'];

for (const id of DELETE_IDS) {
  const doc = await client.fetch('*[_id == $id][0]', { id });
  if (!doc) {
    console.log('skip missing', id);
    continue;
  }
  const { _rev, ...rest } = doc;
  await client.createOrReplace({
    ...rest,
    _id: `drafts.${id}`,
    title: `[DELETE] ${doc.title}`,
  });
  console.log('drafted delete marker for', doc.title);
}

console.log(
  'Done. In Studio: open each [DELETE] draft, then delete the published career document and discard the draft.',
);
