import type { MotionPrefs } from './prefs';

export function observeMotionSections(
  selector: string,
  init: (section: HTMLElement, prefs: MotionPrefs) => (() => void) | null | void,
  prefs: MotionPrefs,
): () => void {
  const sections = [...document.querySelectorAll<HTMLElement>(selector)];
  if (sections.length === 0) return () => {};

  const cleanups: Array<() => void> = [];

  const runInit = (section: HTMLElement) => {
    const cleanup = init(section, prefs);
    if (typeof cleanup === 'function') cleanups.push(cleanup);
  };

  if (prefs.reduced || typeof IntersectionObserver === 'undefined') {
    sections.forEach(runInit);
    return () => cleanups.forEach((fn) => fn());
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runInit(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '140px 0px', threshold: 0.04 },
  );

  sections.forEach((section) => observer.observe(section));

  return () => {
    observer.disconnect();
    cleanups.forEach((fn) => fn());
  };
}
