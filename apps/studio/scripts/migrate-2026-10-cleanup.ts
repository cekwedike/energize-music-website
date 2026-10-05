/**
 * One-time content cleanup to match the October 2026 schema.
 * Run with: pnpm --filter @energize/studio migrate:2026-10   (uses your `sanity login`)
 * Add `-- --dry` to print the plan without writing.
 *
 * Back up first: npx sanity dataset export production backup.tar.gz
 */
import { getCliClient } from 'sanity/cli';
import { privacyBlocks, termsBlocks } from '../../web/src/lib/legal/fallbackContent';

const DRY = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw' });

const EFFECTIVE_DATE = '2026-10-05';
const FEST_ID = 'event-energize-fest';
const FEST_COVER_ASSET = 'image-44645085e3d1e440017b53ff45f0490b3c53a9af-5372x3586-webp';

/** Documents from removed schemas or the old site. All were checked to have no incoming references. */
async function obsoleteIds(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[
      _type in ["service", "universeItem", "siteSettings", "eventsPage", "newsPost", "careerOpening", "volunteerInfo"]
      || (_type == "page" && slug.current == "about")
    ]._id`,
  );
}

const key = (prefix: string, i: number) => `${prefix}${i}`;

const festHighlights = [
  {
    title: 'Live Performances',
    body: 'Energize Music artistes and special guests on one stage. The lineup will be announced soon.',
  },
  {
    title: 'Tickets and Venue',
    body: 'Venue and ticket links will be posted here as soon as they are confirmed.',
  },
  {
    title: 'Made for Families',
    body: 'A clean, joyful night out for fans, families, and church communities. Bring everyone.',
  },
].map((item, i) => ({ _key: key('h', i), _type: 'highlight', ...item }));

/** Small grammar fixes in published team bios (hyphenation and casing only, no new claims). */
const bioFixes: Array<[RegExp, string]> = [
  [/\bFintech\b/g, 'fintech'],
  [/\bwell rounded\b/g, 'well-rounded'],
  [/\bfull blown\b/g, 'full-blown'],
  [/\bday to day\b/g, 'day-to-day'],
  [/\bvoice over artist\b/g, 'voice-over artist'],
  [/\bon air personality\b/g, 'on-air personality'],
  [/\bdetail focused\b/g, 'detail-focused'],
  [/\bon air,/g, 'on air,'],
];

const looksLikeFileName = (alt?: string) => Boolean(alt && !/\s/.test(alt) && /[-_.]/.test(alt));

async function run() {
  const tx = client.transaction();
  const plan: string[] = [];

  // 1. Remove obsolete documents (and their drafts), refusing if anything still points at them.
  for (const id of await obsoleteIds()) {
    const refs = await client.fetch<number>(`count(*[references($id)])`, { id });
    if (refs > 0) throw new Error(`${id} is still referenced by ${refs} document(s). Aborting.`);
    tx.delete(id);
    tx.delete(`drafts.${id}`);
    plan.push(`delete ${id}`);
  }

  // 2. About Page: the long intro is no longer shown on the site.
  tx.patch('aboutPage', (p) => p.unset(['intro']).setIfMissing({ teamSectionTitle: 'Meet Our Team' }));
  plan.push('aboutPage: unset intro');

  // 3. Legal pages: cleaned copy and an explicit effective date.
  for (const [id, blocks] of [
    ['page-privacy', privacyBlocks],
    ['page-terms', termsBlocks],
  ] as const) {
    tx.patch(id, (p) => p.set({ blocks, effectiveDate: EFFECTIVE_DATE }));
    plan.push(`${id}: set ${blocks.length} blocks, effectiveDate ${EFFECTIVE_DATE}`);
  }

  // 4. Energize Fest: real details only. Venue, time, and lineup are left for the team to fill in.
  tx.createIfNotExists({
    _id: FEST_ID,
    _type: 'event',
    title: 'Energize Fest',
    slug: { _type: 'slug', current: 'energize-fest' },
    subtitle: 'The Annual Energize Music Live Showcase',
    startDate: '2026-12-01T17:00:00.000Z',
    eventType: 'physical',
    cover: {
      _type: 'image',
      alt: 'Performers and crowd at Energize Fest, the annual Energize Music live showcase',
      asset: { _type: 'reference', _ref: FEST_COVER_ASSET },
    },
    summary:
      'Our annual live showcase, bringing Energize Music artistes and special guests together for one night of Afro-gospel. Venue and ticket details will be announced soon.',
    highlights: festHighlights,
    ctaLabel: 'Get Tickets',
    secondaryCtaLabel: 'Partner With Us',
  });
  plan.push(`create ${FEST_ID} (if missing)`);

  // 5. Artiste and team photos whose alt text is just a file name.
  const people = await client.fetch<Array<{ _id: string; _type: string; name: string; role?: string; alt?: string }>>(
    `*[_type in ["artist", "teamMember"] && defined(photo.asset) && !(_id in path("drafts.**"))]{ _id, _type, name, role, "alt": photo.alt }`,
  );
  for (const person of people) {
    if (!person.alt || looksLikeFileName(person.alt)) {
      const alt =
        person._type === 'artist' ? `${person.name}, Energize Music artiste` : `${person.name}, ${person.role} at Energize Music`;
      tx.patch(person._id, (p) => p.set({ 'photo.alt': alt }));
      plan.push(`${person._id}: photo.alt = "${alt}"`);
    }
  }

  // 6. Team bio grammar.
  const team = await client.fetch<Array<{ _id: string; bio?: string }>>(
    `*[_type == "teamMember" && !(_id in path("drafts.**"))]{ _id, bio }`,
  );
  for (const member of team) {
    if (!member.bio) continue;
    const fixed = bioFixes.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), member.bio);
    if (fixed !== member.bio) {
      tx.patch(member._id, (p) => p.set({ bio: fixed }));
      plan.push(`${member._id}: bio grammar`);
    }
  }

  console.log(plan.join('\n'));
  if (DRY) {
    console.log('\nDry run: nothing written.');
    return;
  }
  await tx.commit({ visibility: 'sync' });
  console.log('\nDocuments updated.');

  // 7. Image assets nothing uses any more (old services, news, unused uploads).
  const orphans = await client.fetch<string[]>(`*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]._id`);
  for (const id of orphans) {
    await client.delete(id);
    console.log(`deleted asset ${id}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
