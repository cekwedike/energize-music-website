import { z } from 'zod';

export const contactIntents = [
  'a&r',
  'press',
  'partnership',
  'booking',
  'general',
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  intent: z.enum(contactIntents),
  message: z.string().min(1).max(5000),
  // Honeypot: must stay empty; bots that fill it are rejected.
  company: z.string().max(0).optional().default(''),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
