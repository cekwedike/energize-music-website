/**
 * Client helper for the Brevo-backed form endpoints in apps/web/api.
 * Same origin by default (Vercel). Set PUBLIC_FORMS_API_BASE to call a different host,
 * for example when the static build is served from Hostinger.
 */
import { trackEvent } from './analytics';

export type FormResult = { ok: true; message: string } | { ok: false; message: string };

const API_BASE = (import.meta.env.PUBLIC_FORMS_API_BASE ?? '').replace(/\/$/, '');
const NETWORK_ERROR = 'We could not reach the server. Check your connection and try again.';

export async function submitForm(
  endpoint: 'subscribe' | 'contact',
  data: Record<string, string>,
): Promise<FormResult> {
  try {
    const response = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = (await response.json().catch(() => null)) as { ok?: boolean; message?: string; error?: string } | null;

    if (response.ok && body?.ok) {
      trackEvent(endpoint === 'subscribe' ? 'sign_up' : 'generate_lead', { method: endpoint === 'subscribe' ? 'email_list' : 'contact_form' });
      return { ok: true, message: body.message ?? 'Thank you.' };
    }
    return { ok: false, message: body?.error ?? NETWORK_ERROR };
  } catch {
    return { ok: false, message: NETWORK_ERROR };
  }
}

/** Reads a form into a plain string map (files and empty entries are skipped). */
export function formToObject(form: HTMLFormElement): Record<string, string> {
  const data: Record<string, string> = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string') data[key] = value;
  });
  return data;
}
