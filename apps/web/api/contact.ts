/**
 * POST /api/contact
 * Emails a contact form message to the team through Brevo, with Reply-To set to the sender.
 *
 * Env: BREVO_API_KEY, BREVO_SENDER_EMAIL, CONTACT_TO_EMAIL
 * Optional: BREVO_SENDER_NAME, BREVO_CONTACT_LIST_ID (also saves the sender as a Brevo contact)
 */
import { z } from 'zod';
import { FormError, brevo, env, escapeHtml, handleForm, numberEnv, preflight, requireEnv } from './_lib/brevo.js';

// Keep in step with contactIntents in packages/shared/src/validators/contactForm.ts.
const intentLabels = {
  'a&r': 'A&R / music submission',
  press: 'Press',
  partnership: 'Partnership',
  booking: 'Booking',
  general: 'General',
} as const;

type Intent = keyof typeof intentLabels;
const intents = Object.keys(intentLabels) as [Intent, ...Intent[]];

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(200),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(254),
  intent: z.enum(intents).catch('general'),
  message: z.string().trim().min(10, 'Please add a little more detail to your message.').max(5000),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional().default(''),
});

export function OPTIONS(request: Request): Response {
  return preflight(request);
}

export function POST(request: Request): Promise<Response> {
  return handleForm(request, 'contact', async (payload) => {
    if (typeof payload.company === 'string' && payload.company.length > 0) {
      return 'Thanks. Your message is on its way to the team.';
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      throw new FormError(parsed.error.issues[0]?.message ?? 'Please check the form and try again.');
    }

    const { name, email, intent, message } = parsed.data;
    const topic = intentLabels[intent];
    const recipients = requireEnv('CONTACT_TO_EMAIL')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean)
      .map((address) => ({ email: address }));

    const html = `
      <h2 style="margin:0 0 12px;font-family:Arial,sans-serif">New message from energize-music.com</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Topic</td><td>${escapeHtml(topic)}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#888;margin-top:24px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    `;

    await brevo('/smtp/email', {
      sender: {
        email: requireEnv('BREVO_SENDER_EMAIL'),
        name: env('BREVO_SENDER_NAME') ?? 'Energize Music Website',
      },
      to: recipients,
      replyTo: { email, name },
      subject: `[${topic}] New message from ${name}`,
      htmlContent: html,
      textContent: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
      tags: ['website-contact', intent],
    });

    // Saving the sender as a contact is a bonus. The message is already delivered, so never fail on it.
    const contactListId = numberEnv('BREVO_CONTACT_LIST_ID');
    if (contactListId) {
      await brevo('/contacts', {
        email,
        attributes: { FIRSTNAME: name.split(/\s+/)[0] },
        listIds: [contactListId],
        updateEnabled: true,
      }).catch(() => undefined);
    }

    return "Thanks. Your message is on its way and we'll reply by email.";
  });
}
