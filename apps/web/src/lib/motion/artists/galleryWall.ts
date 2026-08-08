import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

export function initGalleryWall(prefs: MotionPrefs): (() => void) | null {
  if (prefs.reduced || prefs.mobile) return null;

  const section = document.querySelector<HTMLElement>('[data-gallery-wall]');
  const pin = section?.querySelector<HTMLElement>('.gallery-wall__pin');
  const track = section?.querySelector<HTMLElement>('[data-gallery-track]');
  const progress = section?.querySelector<HTMLElement>('[data-gallery-progress]');

  if (!section || !pin || !track) return null;

  const prints = track.querySelectorAll<HTMLElement>('[data-gallery-print]');
  if (prints.length < 2) return null;

  const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth + 120, window.innerHeight * 0.6);

  gsap.set(track, { x: 0 });

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 80),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 0.9,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (progress) progress.style.width = `${self.progress * 100}%`;
      },
    },
  });

  prints.forEach((print, index) => {
    gsap.fromTo(
      print,
      { rotate: index % 2 === 0 ? -3 : 3, y: index % 2 === 0 ? -20 : 30 },
      {
        rotate: index % 2 === 0 ? -1 : 1,
        y: index % 2 === 0 ? -24 : 32,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      },
    );
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
