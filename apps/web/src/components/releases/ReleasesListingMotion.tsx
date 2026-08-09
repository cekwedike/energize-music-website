import { useEffect } from 'react';
import { animate, inView, stagger } from 'motion';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setActiveFilter(root: HTMLElement, slug: string) {
  root.dataset.filterActive = slug;

  root.querySelectorAll<HTMLButtonElement>('[data-releases-filter]').forEach((pill) => {
    const isActive = pill.dataset.releasesFilter === slug;
    pill.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  root.querySelectorAll<HTMLElement>('[data-releases-section]').forEach((section) => {
    const artistSlug = section.dataset.artistSlug ?? '';
    const show = slug === 'all' || artistSlug === slug;
    section.dataset.filtered = show ? 'visible' : 'hidden';
    section.hidden = !show;
  });
}

export default function ReleasesListingMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-releases-listing]');
    if (!root) return;

    const reduced = prefersReducedMotion();
    setActiveFilter(root, 'all');

    const filterCleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLButtonElement>('[data-releases-filter]').forEach((pill) => {
      const onFilter = () => {
        const slug = pill.dataset.releasesFilter ?? 'all';
        setActiveFilter(root, slug);
      };
      pill.addEventListener('click', onFilter);
      filterCleanups.push(() => pill.removeEventListener('click', onFilter));
    });

    if (reduced) {
      root.querySelectorAll<HTMLElement>('[data-motion]').forEach((el) => {
        el.style.opacity = '1';
      });
      return () => {
        filterCleanups.forEach((fn) => fn());
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
      motionCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
