import { useEffect } from 'react';
import { animate, inView, stagger } from 'motion';
import {
  getDefaultViewMode,
  isValidViewMode,
  loadViewMode,
  saveViewMode,
  type ReleasesViewMode,
} from '../../lib/releases/viewMode';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function normalizeFilterSlug(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return 'all';
  return trimmed;
}

function revealSectionContent(section: HTMLElement): void {
  section.querySelectorAll<HTMLElement>('[data-motion]').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

function setActiveFilter(root: HTMLElement, slug: string, reduced: boolean): void {
  const activeSlug = normalizeFilterSlug(slug);
  root.dataset.filterActive = activeSlug;

  root.querySelectorAll<HTMLButtonElement>('[data-releases-filter]').forEach((pill) => {
    const pillSlug = normalizeFilterSlug(pill.dataset.filterSlug);
    const isActive = pillSlug === activeSlug;
    pill.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  const visibleSections: HTMLElement[] = [];

  root.querySelectorAll<HTMLElement>('[data-releases-section]').forEach((section) => {
    const artistSlug = section.dataset.artistSlug ?? '';
    const show = activeSlug === 'all' || artistSlug === activeSlug;
    section.dataset.filtered = show ? 'visible' : 'hidden';
    section.hidden = !show;

    if (show) {
      revealSectionContent(section);
      visibleSections.push(section);
    }
  });

  const scrollTarget = activeSlug === 'all' ? undefined : visibleSections[0];
  if (scrollTarget) {
    scrollTarget.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}

function setViewMode(root: HTMLElement, mode: ReleasesViewMode): void {
  root.dataset.viewMode = mode;

  root.querySelectorAll<HTMLButtonElement>('[data-releases-view]').forEach((button) => {
    const buttonMode = button.dataset.releasesView;
    const isActive = buttonMode === mode;
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

export default function ReleasesListingMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-releases-listing]');
    if (!root) return;

    const reduced = prefersReducedMotion();
    setActiveFilter(root, 'all', reduced);

    const initialMode = loadViewMode();
    setViewMode(root, initialMode);

    const filterCleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLButtonElement>('[data-releases-filter]').forEach((pill) => {
      const onFilter = () => {
        const slug = pill.dataset.filterSlug ?? 'all';
        setActiveFilter(root, slug, reduced);
      };
      pill.addEventListener('click', onFilter);
      filterCleanups.push(() => pill.removeEventListener('click', onFilter));
    });

    const viewCleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLButtonElement>('[data-releases-view]').forEach((button) => {
      const onView = () => {
        const mode = button.dataset.releasesView;
        if (!isValidViewMode(mode)) return;
        saveViewMode(mode);
        setViewMode(root, mode);
      };
      button.addEventListener('click', onView);
      viewCleanups.push(() => button.removeEventListener('click', onView));
    });

    const mobileQuery = window.matchMedia('(max-width: 1023px)');
    const onViewportChange = () => {
      try {
        if (sessionStorage.getItem('energize-releases-view-mode')) return;
      } catch {
        /* sessionStorage unavailable */
      }
      setViewMode(root, getDefaultViewMode());
    };
    mobileQuery.addEventListener('change', onViewportChange);
    viewCleanups.push(() => mobileQuery.removeEventListener('change', onViewportChange));

    if (reduced) {
      root.querySelectorAll<HTMLElement>('[data-motion]').forEach((el) => {
        el.style.opacity = '1';
      });
      return () => {
        filterCleanups.forEach((fn) => fn());
        viewCleanups.forEach((fn) => fn());
      };
    }

    const motionCleanups: Array<() => void> = [];

    root.querySelectorAll<HTMLElement>('[data-releases-section]').forEach((section) => {
      let hasAnimated = false;

      const stopInView = inView(
        section,
        () => {
          if (hasAnimated) return;
          hasAnimated = true;

          const identity = section.querySelector<HTMLElement>('[data-motion="stage-identity"]');
          if (identity) {
            animate(
              identity,
              { opacity: [0, 1], y: [24, 0] },
              { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            );
          }

          const reveals = section.querySelectorAll<HTMLElement>('[data-motion="reveal"]');
          if (reveals.length > 0) {
            animate(
              reveals,
              { opacity: [0, 1], y: [16, 0] },
              { duration: 0.55, delay: stagger(0.06), ease: [0.22, 1, 0.36, 1] },
            );
          }
        },
        { amount: 0.12 },
      );

      motionCleanups.push(() => stopInView());
    });

    return () => {
      filterCleanups.forEach((fn) => fn());
      viewCleanups.forEach((fn) => fn());
      motionCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
