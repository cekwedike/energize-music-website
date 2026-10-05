/**
 * GET /api/rebuild
 * Called once a day by the Vercel cron in vercel.json (23:00 UTC, just after midnight in Lagos).
 * Triggers a fresh build so date-based content, like release spotlights, starts and ends on time.
 *
 * Env: VERCEL_DEPLOY_HOOK_URL (the project deploy hook), CRON_SECRET (Vercel sends it as a Bearer token).
 */
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const hook = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  if (!hook) {
    console.error('[rebuild] Missing VERCEL_DEPLOY_HOOK_URL');
    return new Response('Not configured', { status: 503 });
  }

  const response = await fetch(hook, { method: 'POST' });
  console.log(`[rebuild] Deploy hook responded ${response.status}`);
  return new Response(response.ok ? 'Rebuild triggered' : 'Deploy hook failed', { status: response.ok ? 200 : 502 });
}
