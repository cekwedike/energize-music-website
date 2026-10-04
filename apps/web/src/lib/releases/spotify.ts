const SPOTIFY_PATH = /^\/(?:intl-[a-z-]+\/)?(album|track|playlist|artist|episode|show)\/([A-Za-z0-9]+)/;

/** Turn an open.spotify.com share link into its embed player URL. */
export function spotifyEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'open.spotify.com') return undefined;
    const match = parsed.pathname.match(SPOTIFY_PATH);
    if (!match) return undefined;
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator`;
  } catch {
    return undefined;
  }
}

export function releaseYear(releaseDate?: string): string {
  if (!releaseDate) return '';
  const year = new Date(releaseDate).getFullYear();
  return Number.isNaN(year) ? '' : String(year);
}
