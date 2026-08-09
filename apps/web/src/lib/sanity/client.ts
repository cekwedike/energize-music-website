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

type SanityImageSource = Parameters<typeof builder.image>[0];

function hasImageAsset(source: SanityImageSource | null | undefined): source is SanityImageSource {
  if (!source || typeof source !== 'object') return false;
  const asset = (source as { asset?: { _ref?: string; _id?: string; url?: string } | null }).asset;
  return Boolean(asset && (asset._ref || asset._id || asset.url));
}

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/** Build a CDN URL only when the Sanity image has a valid asset reference. */
export function sanityImageUrl(
  source: SanityImageSource | null | undefined,
  options?: { width?: number; height?: number; fit?: 'crop' | 'max' | 'min' | 'clip' | 'scale' },
): string | undefined {
  if (!hasImageAsset(source)) return undefined;

  let image = urlForImage(source);
  if (options?.width) image = image.width(options.width);
  if (options?.height) image = image.height(options.height);
  if (options?.fit) image = image.fit(options.fit);
  return image.auto('format').url();
}
