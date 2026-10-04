import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Offset so anchored sections land below the sticky header. Lenis already honours a
 * CSS scroll-margin-top, so only add the header offset when the target has none.
 */
function offsetFor(target: HTMLElement): number {
  if (parseFloat(getComputedStyle(target).scrollMarginTop) > 0) return 0;
  const header = document.getElementById('site-header');
  return -((header?.offsetHeight ?? 64) + 16);
}

function onAnchorClick(event: MouseEvent) {
  if (!lenis || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link || link.target === '_blank') return;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;

  event.preventDefault();
  lenis.scrollTo(target, { offset: offsetFor(target) });
  history.pushState(null, '', url.hash);
}

/** One Lenis instance per page. Off for reduced motion; touch keeps native scrolling. */
export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: true,
  });

  document.addEventListener('click', onAnchorClick);
  return lenis;
}

/** Scroll to a section, smoothly when Lenis is running. */
export function scrollToElement(element: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(element, { offset: offsetFor(element) });
  } else {
    element.scrollIntoView({ block: 'start' });
  }
}

/** Pause smooth scrolling while an overlay (the mobile menu) is open. */
export function setScrollLocked(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
