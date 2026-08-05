import { z } from 'zod';

export const sanityEnvSchema = z.object({
  PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  PUBLIC_SANITY_API_VERSION: z.string().min(1),
});

export const publicEnvSchema = sanityEnvSchema.extend({
  PUBLIC_SITE_URL: z.string().url(),
  PUBLIC_FORM_ENDPOINT: z.string().min(1),
});

export const serverEnvSchema = z.object({
  SANITY_READ_TOKEN: z.string().optional(),
});

export type SanityEnv = z.infer<typeof sanityEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseSanityEnv(env: Record<string, string | undefined>): SanityEnv {
  return sanityEnvSchema.parse(env);
}

// Full public env, including form/site URL. Only needed once the contact form (Phase 4) lands.
export function parsePublicEnv(env: Record<string, string | undefined>): PublicEnv {
  return publicEnvSchema.parse(env);
}
