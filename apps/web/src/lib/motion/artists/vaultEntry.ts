import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';
import { initMarqueeScroll } from './marqueeScroll';
import { revealSplitText } from './splitText';

gsap.registerPlugin(ScrollTrigger);

export function initVaultEntry(prefs: MotionPrefs): () => void {
  const cleanups: Array<() => void> = [];

  const marqueeCleanup = initMarqueeScroll(document, prefs);
  if (marqueeCleanup) cleanups.push(marqueeCleanup);

  const entry = document.querySelector<HTMLElement>('[data-vault-entry]');
  if (entry && !prefs.reduced) {
    revealSplitText(entry, '[data-split-line]', { delay: 0.05, y: 90 });
  }

  return () => cleanups.forEach((fn) => fn());
}
