/**
 * POST /api/subscribe
 * Adds an email to the Brevo "Be the first to know" list.
 *
 * Env: BREVO_API_KEY, BREVO_NEWSLETTER_LIST_ID
 * Optional double opt-in: BREVO_DOI_TEMPLATE_ID + BREVO_DOI_REDIRECT_URL
 */
import { z } from 'zod';
import { FormError, brevo, handleForm, numberEnv, preflight, requireEnv, requireNumberEnv } from './_lib/brevo.js';

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  firstName: z.string().trim().max(100).optional().default(''),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional().default(''),
});

export function OPTIONS(request: Request): Response {
  return preflight(request);
}

export function POST(request: Request): Promise<Response> {
  return handleForm(request, 'subscribe', async (payload) => {
    const parsed = subscribeSchema.safeParse(payload);
    if (!parsed.success) {
      // Bots that fill the honeypot get a quiet success so they learn nothing.
      if (typeof payload.company === 'string' && payload.company.length > 0) return "You're on the list.";
      throw new FormError('Please enter a valid email address.');
    }

    const { email, firstName } = parsed.data;
    const listId = requireNumberEnv('BREVO_NEWSLETTER_LIST_ID');
    const attributes = firstName ? { FIRSTNAME: firstName } : undefined;

    const doiTemplateId = numberEnv('BREVO_DOI_TEMPLATE_ID');
    if (doiTemplateId) {
      await brevo('/contacts/doubleOptinConfirmation', {
        email,
        attributes,
        includeListIds: [listId],
        templateId: doiTemplateId,
        redirectionUrl: requireEnv('BREVO_DOI_REDIRECT_URL'),
      });
      return 'Almost done. Check your inbox and tap the link to confirm.';
    }

    await brevo('/contacts', {
      email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    });
    return "You're on the list. We'll let you know first.";
  });
}
