import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMotionPrefs } from '../artists/prefs';
import { initReadProgress } from './readProgress';

export function initBlogPost(): () => void {
  const prefs = getMotionPrefs();
  const cleanups: Array<() => void> = [];

  cleanups.push(initReadProgress(prefs));

  requestAnimationFrame(() => ScrollTrigger.refresh());

  const onPageHide = () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };

  window.addEventListener('pagehide', onPageHide, { once: true });

  return () => {
    window.removeEventListener('pagehide', onPageHide);
    onPageHide();
  };
}
