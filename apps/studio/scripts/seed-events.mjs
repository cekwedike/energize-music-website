/**
 * Seed Events Page singleton + Energize Fest event (with cover upload).
 *
 * Usage:
 *   pnpm --filter @energize/studio seed:events
 */
import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const __dirname = dirname(fileURLToPath(import.meta.url));
const coverPath = resolve(
  __dirname,
  '../../web/public/initiatives/energize-fest.webp',
);

function block(_key, style, text) {
  return {
    _type: 'block',
    _key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${_key}-span`, text, marks: [] }],
  };
}

async function uploadCover() {
  if (!existsSync(coverPath)) {
    throw new Error(`Cover image not found at ${coverPath}`);
  }

  console.log('Uploading cover image…');
  return client.assets.upload('image', createReadStream(coverPath), {
    filename: 'energize-fest.webp',
    contentType: 'image/webp',
  });
}

async function seed() {
  console.log(`Seeding events content to ${projectId}/${dataset}…`);

  const asset = await uploadCover();
  const image = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: 'Energize Fest live stage',
  };

  const festId = 'event-energize-fest';

  await client.createOrReplace({
    _id: festId,
    _type: 'event',
    title: 'Energize Fest',
    slug: { _type: 'slug', current: 'energize-fest' },
    subtitle: 'Live at the heart of Afro-gospel culture',
    startDate: '2026-12-01T18:00:00.000Z',
    eventType: 'physical',
    location: '',
    status: 'announced',
    featured: true,
    cover: image,
    shareImage: image,
    summary:
      'An annual live showcase bringing the full Energize Music roster together on one stage. Afro-gospel and soul-fusion, built for the community.',
    body: [
      block(
        'about1',
        'normal',
        'Energize Fest is the night the label becomes a room: worship, culture, and the artists who carry the sound from Lagos to the world.',
      ),
      block(
        'about2',
        'normal',
        'Dates, lineup, and tickets land here first. Until then, get notified and partner with us as we build the stage.',
      ),
    ],
    highlights: [
      {
        _type: 'highlight',
        _key: 'h1',
        title: 'Live worship',
        body: 'Pan-African gospel and soul-fusion performances under one roof.',
      },
      {
        _type: 'highlight',
        _key: 'h2',
        title: 'Community',
        body: 'A gathering space for fans, artists, and families who share the Energize vision.',
      },
      {
        _type: 'highlight',
        _key: 'h3',
        title: 'Coming soon',
        body: 'Dates, lineup, and tickets will be announced here first.',
      },
    ],
    lineup: [
      {
        _type: 'lineupItem',
        _key: 'l1',
        revealState: 'confirmed',
        name: 'Energize Roster',
        role: 'Full label showcase',
      },
      {
        _type: 'lineupItem',
        _key: 'l2',
        revealState: 'tba',
        name: 'Guest Worship',
        role: 'Special appearances',
      },
      {
        _type: 'lineupItem',
        _key: 'l3',
        revealState: 'surprise',
        name: 'Community Stage',
        role: 'Local talent',
      },
    ],
    ctaLabel: 'Get notified',
    secondaryCtaLabel: 'Partner with us',
  });

  await client.createOrReplace({
    _id: 'eventsPage',
    _type: 'eventsPage',
    heroTitle: 'Find your perfect night wherever you are',
    heroLead:
      'Discover the best live music from Energize, tailored to the sound that moves you.',
    heroCtaLabel: 'Find an event',
    heroWordmark: 'LIVE SHOWS',
    heroWordmarkImage: image,
    heroBadgeTitle: 'ENERGY',
    heroBadgeSubtitle: 'on Stage',
    marqueeText: 'For Friends & Fans of Energize Music',
    qualityTitle: 'Our quality',
    qualityItems: [
      {
        _type: 'qualityItem',
        _key: 'q1',
        title: 'Curated Events',
        body: 'Every date is shaped around worship, culture, and a room that feels alive from the first song.',
      },
      {
        _type: 'qualityItem',
        _key: 'q2',
        title: 'Artist-First Stages',
        body: 'Built for the roster and the community around them, with room for surprise guests and new voices.',
      },
      {
        _type: 'qualityItem',
        _key: 'q3',
        title: 'Clear Next Steps',
        body: 'Dates, venues, and ticket links land here first so you never miss the drop.',
      },
    ],
    spotlightEvents: [{ _type: 'reference', _ref: festId, _key: 'spot1' }],
    upcomingPageSize: 6,
    archivePageSize: 6,
  });

  console.log('Published eventsPage + event-energize-fest.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
