import { useEffect } from 'react';
import { animate, inView, stagger } from 'motion';
import { scrollToElement } from '../../lib/smoothScroll';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ArtistsRosterMotion() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    document.querySelectorAll<HTMLAnchorElement>('[data-roster-pill]').forEach((pill) => {
      pill.addEventListener('click', (event) => {
        event.preventDefault();
        const index = Number(pill.dataset.index);
        const section = document.querySelector<HTMLElement>(
          `[data-roster-section][data-index="${index}"]`,
        );
        if (section) scrollToElement(section);
      });
    });

    if (reduced) return;

    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('[data-roster-section]').forEach((section) => {
      let hasAnimated = false;

      const stopInView = inView(
        section,
        () => {
          if (hasAnimated) return;
          hasAnimated = true;

          const reveals = section.querySelectorAll<HTMLElement>('[data-motion="reveal"]');
          animate(
            reveals,
            { y: [14, 0] },
            { duration: 0.65, delay: stagger(0.06), ease: [0.22, 1, 0.36, 1] },
          );

          section.querySelectorAll<HTMLElement>('[data-motion="portrait"]').forEach((portrait) => {
            animate(portrait, { scale: [1.02, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
          });
        },
        { amount: 0.22 },
      );

      cleanups.push(() => stopInView());
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
