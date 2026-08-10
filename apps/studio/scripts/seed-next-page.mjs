/**
 * Seed NEXT Page singleton (submission gate + URL).
 *
 * Usage:
 *   pnpm --filter @energize/studio seed:next
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID');
  process.exit(1);
}

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seed() {
  console.log(`Seeding NEXT page settings to ${projectId}/${dataset}…`);

  await client.createOrReplace({
    _id: 'nextPage',
    _type: 'nextPage',
    submissionsOpen: false,
    submitUrl: 'https://tally.so/r/ob7Px1',
    submitLabel: 'Submit Your Music',
    closedLabel: 'Submissions Closed',
    closedMessage:
      'Registration for this season has ended. Follow Energize Music for the next drop.',
  });

  console.log('Published nextPage.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
