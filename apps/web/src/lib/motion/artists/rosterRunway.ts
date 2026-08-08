import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

export function initRosterRunway(prefs: MotionPrefs): (() => void) | null {
  if (prefs.reduced || prefs.mobile) return null;

  const section = document.querySelector<HTMLElement>('[data-artist-runway]');
  const track = section?.querySelector<HTMLElement>('[data-runway-track]');
  if (!section || !track) return null;

  const cards = track.querySelectorAll<HTMLElement>('.artist-card');
  if (cards.length < 2) return null;

  const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth + 120, window.innerHeight * 0.5);

  gsap.set(track, { x: 0 });

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 80),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 0.85,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { scale: 0.92, rotate: index % 2 === 0 ? -2 : 2 },
      {
        scale: 1,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
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
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section) trigger.kill();
    });
  };
}
