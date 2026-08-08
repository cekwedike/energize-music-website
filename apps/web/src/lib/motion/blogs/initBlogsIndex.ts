import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMotionPrefs } from '../artists/prefs';
import { initZineMasthead, initZineCards } from './zineIndex';

export function initBlogsIndex(): () => void {
  const prefs = getMotionPrefs();
  const cleanups: Array<() => void> = [];

  cleanups.push(initZineMasthead(prefs));
  cleanups.push(initZineCards(prefs));

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
