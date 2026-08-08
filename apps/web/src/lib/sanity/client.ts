import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { parseSanityEnv } from '@energize/shared';

const env = parseSanityEnv(import.meta.env as unknown as Record<string, string | undefined>);

export const sanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  // Always hit the live API so builds and dev reflect the latest published CMS content.
  useCdn: false,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
