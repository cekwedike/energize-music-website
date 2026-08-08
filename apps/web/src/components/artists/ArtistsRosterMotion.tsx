import { useEffect } from 'react';
import { animate, inView, scroll, stagger } from 'motion';

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
        const section = document.querySelector<HTMLElement>(`[data-roster-section][data-index="${index}"]`);
        section?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
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

          const bgName = section.querySelector<HTMLElement>('[data-motion="bg-name"]');
          if (bgName) {
            animate(bgName, { x: ['-2%', '0%'] }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
          }

          const portrait = section.querySelector<HTMLElement>('[data-motion="portrait"]');
          if (portrait) {
            animate(portrait, { scale: [1.02, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
          }
        },
        { amount: 0.22 },
      );

      cleanups.push(() => stopInView());

      const portrait = section.querySelector<HTMLElement>('[data-motion="portrait"]');
      if (portrait) {
        const stopScroll = scroll(animate(portrait, { y: ['0%', '6%'] }), {
          target: section,
          offset: ['start end', 'end start'],
        });
        cleanups.push(() => stopScroll());
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
