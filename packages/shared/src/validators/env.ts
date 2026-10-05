import { z } from 'zod';

export const sanityEnvSchema = z.object({
  PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  PUBLIC_SANITY_API_VERSION: z.string().min(1),
});

export const publicEnvSchema = sanityEnvSchema.extend({
  PUBLIC_SITE_URL: z.string().url(),
  // Empty means the forms post to /api on the same host (Vercel).
  PUBLIC_FORMS_API_BASE: z.union([z.literal(''), z.string().url()]).optional(),
});

export const serverEnvSchema = z.object({
  SANITY_READ_TOKEN: z.string().optional(),
  // Brevo form endpoints (apps/web/api). One key covers both forms.
  BREVO_API_KEY: z.string().optional(),
  BREVO_NEWSLETTER_LIST_ID: z.string().optional(),
  BREVO_CONTACT_LIST_ID: z.string().optional(),
  BREVO_SENDER_EMAIL: z.string().email().optional(),
  BREVO_SENDER_NAME: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),
});

export type SanityEnv = z.infer<typeof sanityEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseSanityEnv(env: Record<string, string | undefined>): SanityEnv {
  return sanityEnvSchema.parse(env);
}

// Full public env, including the site URL and the optional forms API host.
export function parsePublicEnv(env: Record<string, string | undefined>): PublicEnv {
  return publicEnvSchema.parse(env);
}
