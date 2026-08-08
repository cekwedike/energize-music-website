import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';
import { revealSplitText } from './splitText';
import { initMarqueeScroll } from './marqueeScroll';

gsap.registerPlugin(ScrollTrigger);

export function initPrismHero(prefs: MotionPrefs): () => void {
  const hero = document.querySelector<HTMLElement>('[data-prism-hero]');
  if (!hero) return () => {};

  const cleanups: Array<() => void> = [];

  if (prefs.reduced) {
    hero.classList.add('is-visible');
    return () => {};
  }

  hero.classList.add('is-visible');
  revealSplitText(hero, '[data-split-line]', { delay: 0.08, y: 95 });

  const mesh = hero.querySelector<HTMLElement>('.prism-hero__mesh');
  if (mesh && !prefs.mobile) {
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        mesh.style.transform = `translate3d(0, ${self.progress * 32}px, 0) scale(${1 + self.progress * 0.03})`;
      },
    });
    cleanups.push(() => trigger.kill());
  }

  const collage = hero.querySelector<HTMLElement>('[data-prism-collage]');
  if (collage && !prefs.mobile) {
    collage.querySelectorAll<HTMLElement>('.prism-hero__tile').forEach((tile, index) => {
      gsap.fromTo(
        tile,
        { y: 48 + index * 12, opacity: 0, rotate: index % 2 === 0 ? -4 : 4 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: 0.35 + index * 0.1,
          ease: 'power3.out',
        },
      );
    });
  }

  const marqueeCleanup = initMarqueeScroll(document, prefs);
  if (marqueeCleanup) cleanups.push(marqueeCleanup);

  return () => cleanups.forEach((fn) => fn());
}
