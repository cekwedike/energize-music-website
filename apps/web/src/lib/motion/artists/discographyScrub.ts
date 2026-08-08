import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

export function initHorizontalScrub(
  root: ParentNode,
  selector: string,
  prefs: MotionPrefs,
): (() => void) | null {
  if (prefs.reduced || prefs.mobile) return null;

  const section = root.querySelector<HTMLElement>(selector);
  const track = section?.querySelector<HTMLElement>('[data-scrub-track]');
  if (!section || !track) return null;

  const items = track.children.length;
  if (items < 3) return null;

  const getDistance = () => Math.max(track.scrollWidth - window.innerWidth + 96, window.innerHeight * 0.35);

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 48),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: () => `+=${getDistance()}`,
      scrub: 0.75,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function initExploreScrub(prefs: MotionPrefs): (() => void) | null {
  return initHorizontalScrub(document, '.artist-explore', prefs);
}

export function initDiscographyScrub(prefs: MotionPrefs): (() => void) | null {
  return initHorizontalScrub(document, '.artist-discography', prefs);
}
