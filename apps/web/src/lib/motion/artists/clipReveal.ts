import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

export function initClipReveal(root: ParentNode, prefs: MotionPrefs): () => void {
  if (prefs.reduced) {
    root.querySelectorAll('[data-clip-reveal]').forEach((el) => el.classList.add('is-revealed'));
    return () => {};
  }

  const items = [...root.querySelectorAll<HTMLElement>('[data-clip-reveal]')];
  if (items.length === 0) return () => {};

  gsap.set(items, {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    opacity: 0.35,
    y: 36,
  });

  const triggers = items.map((item, index) =>
    ScrollTrigger.create({
      trigger: item,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay: (index % 4) * 0.06,
          ease: 'power3.out',
          onComplete: () => item.classList.add('is-revealed'),
        });
      },
    }),
  );

  return () => triggers.forEach((trigger) => trigger.kill());
}
