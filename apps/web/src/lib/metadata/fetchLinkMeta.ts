export interface LinkMeta {
  title?: string;
  thumbnailUrl?: string;
  artistName?: string;
  provider?: string;
}

const DEFAULT_TIMEOUT_MS = 5000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Metadata fetch timed out')), timeoutMs);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

function parseOEmbedPayload(payload: Record<string, unknown>): LinkMeta {
  const title = typeof payload.title === 'string' ? payload.title : undefined;
  const thumbnailUrl = typeof payload.thumbnail_url === 'string' ? payload.thumbnail_url : undefined;
  const provider = typeof payload.provider_name === 'string' ? payload.provider_name : undefined;

  let artistName: string | undefined;
  if (title) {
    const byMatch = title.match(/^(.+?)\s[-–—]\s/);
    if (byMatch?.[1]) artistName = byMatch[1].trim();
  }

  return { title, thumbnailUrl, artistName, provider };
}

async function fetchOEmbed(endpoint: string, url: string, timeoutMs: number): Promise<LinkMeta | null> {
  const oembedUrl = `${endpoint}${encodeURIComponent(url)}`;
  const response = await withTimeout(fetch(oembedUrl, { headers: { Accept: 'application/json' } }), timeoutMs);
  if (!response.ok) return null;

  const payload = (await response.json()) as Record<string, unknown>;
  return parseOEmbedPayload(payload);
}

function parseOgTags(html: string): LinkMeta {
  const meta: LinkMeta = {};

  const titleMatch =
    html.match(/property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ??
    html.match(/content=["']([^"']+)["'][^>]*property=["']og:title["']/i) ??
    html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/i);

  const imageMatch =
    html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ??
    html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ??
    html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);

  if (titleMatch?.[1]) meta.title = decodeHtmlEntities(titleMatch[1]);
  if (imageMatch?.[1]) meta.thumbnailUrl = decodeHtmlEntities(imageMatch[1]);

  if (meta.title) {
    const byMatch = meta.title.match(/^(.+?)\s[-–—]\s/);
    if (byMatch?.[1]) meta.artistName = byMatch[1].trim();
  }

  return meta;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchOpenGraph(url: string, timeoutMs: number): Promise<LinkMeta | null> {
  const response = await withTimeout(
    fetch(url, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'EnergizeMusicBot/1.0 (+https://energize-music.com)',
      },
      redirect: 'follow',
    }),
    timeoutMs,
  );

  if (!response.ok) return null;

  const html = await response.text();
  const meta = parseOgTags(html);
  return meta.title || meta.thumbnailUrl ? meta : null;
}

function resolveOEmbedEndpoint(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'open.spotify.com') return `https://open.spotify.com/oembed?url=`;
    if (host === 'music.apple.com') return `https://music.apple.com/oembed?url=`;
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'www.youtube.com') {
      return `https://www.youtube.com/oembed?format=json&url=`;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Fetch link metadata at build time via oEmbed or Open Graph tags.
 * Returns partial metadata; callers should fall back to Sanity fields.
 */
export async function fetchLinkMeta(
  url: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<LinkMeta | null> {
  if (!url?.trim()) return null;

  try {
    const oembedEndpoint = resolveOEmbedEndpoint(url);
    if (oembedEndpoint) {
      const oembedMeta = await fetchOEmbed(oembedEndpoint, url, timeoutMs);
      if (oembedMeta?.title || oembedMeta?.thumbnailUrl) return oembedMeta;
    }

    return await fetchOpenGraph(url, timeoutMs);
  } catch {
    return null;
  }
}
