import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins `container` and translates `track` horizontally as the user scrolls
 * past it, turning a normal vertical scroll into a horizontal runway.
 * Returns a cleanup function that kills the ScrollTrigger + tween.
 */
export function initHorizontalScroll(container: HTMLElement, track: HTMLElement): () => void {
  const distance = () => Math.max(0, track.scrollWidth - container.clientWidth);

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${distance()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(track, { clearProps: 'transform' });
  };
}
