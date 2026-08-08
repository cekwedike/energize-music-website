import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';
import { revealSplitText } from './splitText';
import { initNoiseCanvas } from './noiseCanvas';
import { initMarqueeScroll } from './marqueeScroll';

gsap.registerPlugin(ScrollTrigger);

export function initIndexHero(prefs: MotionPrefs): () => void {
  const hero = document.querySelector<HTMLElement>('.artists-hero');
  if (!hero) return () => {};

  const cleanups: Array<() => void> = [];

  if (prefs.reduced) {
    hero.classList.add('is-visible');
    return () => {};
  }

  hero.classList.add('is-visible');

  revealSplitText(hero, '[data-split-line]', { delay: 0.1, y: 105 });

  gsap.fromTo(
    hero.querySelectorAll<HTMLElement>('.artists-reveal:not([data-split-line])'),
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.07,
      delay: 0.25,
      ease: 'power3.out',
    },
  );

  const canvas = hero.querySelector<HTMLCanvasElement>('[data-noise-canvas]');
  if (canvas) {
    cleanups.push(initNoiseCanvas({ canvas, prefs }));
  }

  const marqueeCleanup = initMarqueeScroll(hero, prefs);
  if (marqueeCleanup) cleanups.push(marqueeCleanup);

  const mesh = hero.querySelector<HTMLElement>('.artists-hero__mesh');
  if (mesh) {
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        mesh.style.transform = `translate3d(0, ${self.progress * 40}px, 0) scale(${1 + self.progress * 0.04})`;
      },
    });
    cleanups.push(() => trigger.kill());
  }

  const strip = hero.querySelector<HTMLElement>('.artists-hero__strip');
  if (strip && !prefs.mobile) {
    strip.querySelectorAll<HTMLElement>('.artists-hero__strip-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: 40 + index * 8, opacity: 0, rotate: 4 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          delay: 0.45 + index * 0.08,
          ease: 'power3.out',
        },
      );
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
