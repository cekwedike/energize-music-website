export type ReleasesViewMode = 'grid' | 'list' | 'compact';

const STORAGE_KEY = 'energize-releases-view-mode';

export function getDefaultViewMode(): ReleasesViewMode {
  if (typeof window === 'undefined') return 'grid';
  return window.matchMedia('(max-width: 1023px)').matches ? 'list' : 'grid';
}

export function loadViewMode(): ReleasesViewMode {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'grid' || stored === 'list' || stored === 'compact') return stored;
  } catch {
    /* sessionStorage unavailable */
  }
  return getDefaultViewMode();
}

export function saveViewMode(mode: ReleasesViewMode): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* sessionStorage unavailable */
  }
}

export function isValidViewMode(value: string | undefined): value is ReleasesViewMode {
  return value === 'grid' || value === 'list' || value === 'compact';
}
