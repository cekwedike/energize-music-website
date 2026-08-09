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

/** Normalize storefront URLs so oEmbed endpoints accept them more reliably. */
export function normalizeStreamingUrl(url: string): string {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');

    // Apple Music oEmbed often 404s on less-common storefronts (e.g. /rw/).
    // Prefer the US storefront path while keeping the rest of the URL.
    if (host === 'music.apple.com') {
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && /^[a-z]{2}$/i.test(parts[0]) && parts[0].toLowerCase() !== 'us') {
        parts[0] = 'us';
        parsed.pathname = `/${parts.join('/')}`;
      }
      return parsed.toString();
    }

    // Spotify share URLs with ?si= work, but strip tracking noise for cache friendliness.
    if (host === 'open.spotify.com') {
      parsed.searchParams.delete('si');
      return parsed.toString();
    }

    return parsed.toString();
  } catch {
    return url.trim();
  }
}

function resolveOEmbedEndpoint(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'open.spotify.com') return `https://open.spotify.com/oembed?url=`;
    if (host === 'music.apple.com') return `https://music.apple.com/oembed?url=`;
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') {
      return `https://www.youtube.com/oembed?format=json&url=`;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Fetch link metadata at build/dev time via oEmbed or Open Graph tags.
 * Returns partial metadata; callers should fall back to Sanity fields.
 */
export async function fetchLinkMeta(
  url: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<LinkMeta | null> {
  if (!url?.trim()) return null;

  const normalized = normalizeStreamingUrl(url);

  try {
    const oembedEndpoint = resolveOEmbedEndpoint(normalized);
    if (oembedEndpoint) {
      const oembedMeta = await fetchOEmbed(oembedEndpoint, normalized, timeoutMs);
      if (oembedMeta?.title || oembedMeta?.thumbnailUrl) return oembedMeta;
    }

    return await fetchOpenGraph(normalized, timeoutMs);
  } catch {
    return null;
  }
}
