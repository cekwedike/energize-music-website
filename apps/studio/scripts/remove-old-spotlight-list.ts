/**
 * Removes the retired "Old spotlight list" (releaseSpotlights) from the Release Spotlights document.
 * That field still held a reference to a release, which stopped the release being unpublished or deleted.
 *
 * Run with: pnpm --filter @energize/studio migrate:spotlights   (uses your `sanity login`)
 * Add `-- --dry` to print the plan without writing.
 */
import { getCliClient } from 'sanity/cli';

const DRY = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw' });

async function run() {
  const ids = await client.fetch<string[]>(`*[_id in ["releasesPage", "drafts.releasesPage"] && defined(releaseSpotlights)]._id`);
  if (ids.length === 0) {
    console.log('Nothing to do: the old spotlight list is already gone.');
    return;
  }
  console.log(ids.map((id) => `${id}: unset releaseSpotlights`).join('\n'));
  if (DRY) {
    console.log('\nDry run: nothing written.');
    return;
  }
  const tx = client.transaction();
  for (const id of ids) tx.patch(id, (patch) => patch.unset(['releaseSpotlights']));
  await tx.commit({ visibility: 'sync' });
  console.log('\nDone.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
