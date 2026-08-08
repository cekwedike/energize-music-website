import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from '../artists/prefs';
import { revealSplitText } from '../artists/splitText';

gsap.registerPlugin(ScrollTrigger);

export function initZineMasthead(prefs: MotionPrefs): () => void {
  const masthead = document.querySelector<HTMLElement>('[data-zine-masthead]');
  if (!masthead || prefs.reduced) return () => {};

  revealSplitText(masthead, '[data-split-line]', { delay: 0.05, y: 80 });

  return () => {};
}

export function initZineCards(prefs: MotionPrefs): () => void {
  const cards = document.querySelectorAll<HTMLElement>('[data-zine-card]');
  if (cards.length === 0 || prefs.reduced) return () => {};

  const triggers: ScrollTrigger[] = [];

  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 60, opacity: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  });

  return () => triggers.forEach((t) => t.kill());
}
