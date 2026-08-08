import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

/**
 * CSS handles the seamless infinite loop (translate -50% on duplicated content).
 * GSAP only modulates animation speed from scroll velocity on desktop.
 */
export function initMarqueeScroll(root: ParentNode, prefs: MotionPrefs): (() => void) | null {
  const track = root.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track) return null;

  const baseDuration = Number(track.dataset.marqueeDuration) || 48;
  const reducedDuration = baseDuration * 2.5;

  track.style.setProperty('--marquee-duration', `${prefs.reduced ? reducedDuration : baseDuration}s`);

  if (prefs.reduced || prefs.mobile) return null;

  const wrap = track.closest('[data-marquee-wrap]');
  if (!wrap) return null;

  const trigger = ScrollTrigger.create({
    trigger: wrap,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity());
      const speed = gsap.utils.clamp(0.55, 2.4, velocity / 900 + 0.75);
      track.style.setProperty('--marquee-duration', `${baseDuration / speed}s`);
    },
  });

  return () => trigger.kill();
}
