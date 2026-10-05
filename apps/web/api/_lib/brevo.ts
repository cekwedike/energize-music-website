/**
 * Shared helpers for the Brevo-backed form endpoints (/api/subscribe, /api/contact).
 * Files under api/_lib are not exposed as routes by Vercel.
 *
 * One Brevo API key covers both forms: the Contacts API stores subscribers,
 * the Transactional Email API delivers contact form messages.
 */

const BREVO_API = 'https://api.brevo.com/v3';

export class FormError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}

export function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function requireEnv(name: string): string {
  const value = env(name);
  if (!value) {
    console.error(`[forms] Missing environment variable ${name}`);
    throw new FormError('This form is not set up yet. Please try again later.', 503);
  }
  return value;
}

export function numberEnv(name: string): number | undefined {
  const value = env(name);
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    console.error(`[forms] ${name} must be a positive whole number, got "${value}"`);
    throw new FormError('This form is not set up yet. Please try again later.', 503);
  }
  return parsed;
}

export function requireNumberEnv(name: string): number {
  const value = numberEnv(name);
  if (value === undefined) requireEnv(name);
  return value as number;
}

/** Calls the Brevo REST API. Throws FormError with a safe message on failure. */
export async function brevo(path: string, body: unknown): Promise<Response> {
  const response = await fetch(`${BREVO_API}${path}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': requireEnv('BREVO_API_KEY'),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(`[forms] Brevo ${path} failed with ${response.status}: ${detail}`);
    throw new FormError('Something went wrong on our side. Please try again in a moment.', 502);
  }

  return response;
}

/* ---------- Request guards ---------- */

function allowedOrigins(): string[] {
  return (env('FORMS_ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

function requestHost(request: Request): string {
  return request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? new URL(request.url).host;
}

/** Same-origin requests always pass. Other origins must be listed in FORMS_ALLOWED_ORIGINS. */
function isAllowedOrigin(request: Request, origin: string | null): boolean {
  if (!origin) return true;
  try {
    if (new URL(origin).host === requestHost(request)) return true;
  } catch {
    return false;
  }
  return allowedOrigins().includes(origin.replace(/\/$/, ''));
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  if (!origin || !isAllowedOrigin(request, origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
}

export function json(request: Request, status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...corsHeaders(request),
    },
  });
}

export function preflight(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

/* Best-effort limiter. Serverless instances are short-lived, so this only slows bursts. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 8;

function rateLimit(request: Request, bucket: string): void {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (recent.length > MAX_HITS) {
    throw new FormError('Too many attempts. Please wait a few minutes and try again.', 429);
  }
}

/**
 * Runs a form handler with origin checks, rate limiting, JSON parsing, and uniform errors.
 * The handler returns the success message shown to the visitor.
 */
export async function handleForm(
  request: Request,
  bucket: string,
  handler: (payload: Record<string, unknown>) => Promise<string>,
): Promise<Response> {
  try {
    if (!isAllowedOrigin(request, request.headers.get('origin'))) {
      throw new FormError('Requests from this site are not allowed.', 403);
    }
    rateLimit(request, bucket);

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      throw new FormError('We could not read that submission. Please try again.');
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new FormError('We could not read that submission. Please try again.');
    }

    const message = await handler(payload as Record<string, unknown>);
    return json(request, 200, { ok: true, message });
  } catch (error) {
    if (error instanceof FormError) {
      return json(request, error.status, { ok: false, error: error.message });
    }
    console.error('[forms] Unexpected error', error);
    return json(request, 500, {
      ok: false,
      error: 'Something went wrong on our side. Please try again in a moment.',
    });
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
