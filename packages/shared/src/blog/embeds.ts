/**
 * Turns pasted YouTube, Vimeo, Spotify and Apple Music links into safe embed URLs.
 * Studio uses these to validate links; the website uses them to build the players.
 */

export interface VideoEmbed {
  provider: 'youtube' | 'vimeo';
  id: string;
  embedUrl: string;
}

export interface MusicEmbed {
  provider: 'spotify' | 'appleMusic';
  embedUrl: string;
  /** Tracks and episodes need a short player; albums and playlists a tall one. */
  compact: boolean;
}

function parseUrl(value: string | undefined | null): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
}

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseVideoUrl(value: string | undefined | null): VideoEmbed | null {
  const url = parseUrl(value);
  if (!url) return null;
  const host = url.hostname.replace(/^www\.|^m\./, '');

  let youtubeId: string | null = null;
  if (host === 'youtu.be') youtubeId = url.pathname.slice(1).split('/')[0] ?? null;
  if (host === 'youtube.com' || host === 'music.youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') youtubeId = url.searchParams.get('v');
    else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      youtubeId = match?.[1] ?? null;
    }
  }
  if (youtubeId && YOUTUBE_ID.test(youtubeId)) {
    return { provider: 'youtube', id: youtubeId, embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0` };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const match = url.pathname.match(/(?:^|\/)(\d{6,})(?:\/|$)/);
    if (match) return { provider: 'vimeo', id: match[1], embedUrl: `https://player.vimeo.com/video/${match[1]}?dnt=1` };
  }

  return null;
}

const SPOTIFY_KINDS = ['track', 'album', 'playlist', 'artist', 'episode', 'show'];

export function parseMusicUrl(value: string | undefined | null): MusicEmbed | null {
  const url = parseUrl(value);
  if (!url) return null;
  const host = url.hostname.replace(/^www\./, '');

  if (host === 'open.spotify.com') {
    const parts = url.pathname.split('/').filter(Boolean).filter((part) => !part.startsWith('intl-') && part !== 'embed');
    const [kind, id] = parts;
    if (kind && id && SPOTIFY_KINDS.includes(kind) && /^[A-Za-z0-9]+$/.test(id)) {
      return {
        provider: 'spotify',
        embedUrl: `https://open.spotify.com/embed/${kind}/${id}`,
        compact: kind === 'track' || kind === 'episode',
      };
    }
  }

  if (host === 'music.apple.com' || host === 'embed.music.apple.com') {
    const path = url.pathname.replace(/\/+$/, '');
    if (/^\/[a-z]{2}\/(album|playlist|song|music-video)\//.test(path)) {
      const trackId = url.searchParams.get('i');
      const isSong = path.includes('/song/') || Boolean(trackId);
      return {
        provider: 'appleMusic',
        embedUrl: `https://embed.music.apple.com${path}${trackId ? `?i=${encodeURIComponent(trackId)}` : ''}`,
        compact: isSong,
      };
    }
  }

  return null;
}
