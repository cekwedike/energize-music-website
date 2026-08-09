import type { ArtistCard, EnrichedRelease } from '@energize/shared';

export interface GroupedArtistReleases {
  artistId: string;
  name: string;
  slug: string;
  photo?: ArtistCard['photo'];
  tagline?: string;
  releases: EnrichedRelease[];
  latestReleaseDate: string;
}

export function groupReleasesByArtist(releases: EnrichedRelease[]): GroupedArtistReleases[] {
  const map = new Map<string, GroupedArtistReleases>();

  for (const release of releases) {
    for (const artist of release.artists ?? []) {
      if (!artist?._id || !artist.name || !artist.slug) continue;

      let group = map.get(artist._id);
      if (!group) {
        group = {
          artistId: artist._id,
          name: artist.name,
          slug: artist.slug,
          photo: artist.photo,
          tagline: artist.tagline,
          releases: [],
          latestReleaseDate: release.releaseDate,
        };
        map.set(artist._id, group);
      }

      if (!group.releases.some((entry) => entry._id === release._id)) {
        group.releases.push(release);
      }

      if (release.releaseDate > group.latestReleaseDate) {
        group.latestReleaseDate = release.releaseDate;
      }
    }
  }

  return [...map.values()]
    .filter((group) => group.releases.length > 0)
    .map((group) => ({
      ...group,
      releases: [...group.releases].sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
      ),
    }))
    .sort(
      (a, b) => new Date(b.latestReleaseDate).getTime() - new Date(a.latestReleaseDate).getTime(),
    );
}
