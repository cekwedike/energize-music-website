import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { parseSanityEnv } from '@energize/shared';

const env = parseSanityEnv(import.meta.env as unknown as Record<string, string | undefined>);

export const sanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  // Skip Sanity CDN in dev so Studio publishes show up immediately after a refresh.
  useCdn: import.meta.env.PROD,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
