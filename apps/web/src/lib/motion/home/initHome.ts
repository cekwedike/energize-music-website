import { getLenis } from '../../smoothScroll';
import type GSAP from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

type GsapBundle = {
  gsap: typeof GSAP;
  ScrollTrigger: typeof ScrollTriggerType;
};

let gsapBundle: Promise<GsapBundle> | null = null;
let gsap!: typeof GSAP;
let ScrollTrigger!: typeof ScrollTriggerType;

function loadGsap(): Promise<GsapBundle> {
  gsapBundle ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ default: gsapMod }, { ScrollTrigger: ScrollTriggerMod }]) => {
      gsapMod.registerPlugin(ScrollTriggerMod);
      gsap = gsapMod;
      ScrollTrigger = ScrollTriggerMod;
      return { gsap: gsapMod, ScrollTrigger: ScrollTriggerMod };
    },
  );
  return gsapBundle;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile(): boolean {
  return window.matchMedia('(max-width: 899px)').matches;
}

function revealBasics(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-home-reveal]').forEach((node) => {
    const delay = Number(node.dataset.homeRevealDelay || 0);
    gsap.fromTo(
      node,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          once: true,
        },
      },
    );
  });
}

function initArtistRunway(root: ParentNode, mobile: boolean) {
  const section = root.querySelector<HTMLElement>('[data-home-artists]');
  const track = section?.querySelector<HTMLElement>('[data-home-artists-track]');
  const cards = track?.querySelectorAll<HTMLElement>('[data-home-artist]');
  if (!section || !track || !cards?.length) return;

  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 56, rotateY: mobile ? 0 : 12 },
    {
      autoAlpha: 1,
      y: 0,
      rotateY: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    },
  );
}

function initReleaseStage(root: ParentNode, reduced: boolean) {
  const section = root.querySelector<HTMLElement>('[data-home-releases]');
  const cover = section?.querySelector<HTMLElement>('[data-home-release-cover]');
  const copy = section?.querySelector<HTMLElement>('[data-home-release-copy]');
  if (!section || !cover) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 78%', once: true },
  });

  tl.fromTo(
    cover,
    { autoAlpha: 0, scale: 1.12, rotate: reduced ? 0 : -6 },
    { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.15, ease: 'power3.out' },
  );

  if (copy) {
    tl.fromTo(
      copy.children,
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
      '-=0.65',
    );
  }
}

function initInitiatives(root: ParentNode) {
  const section = root.querySelector<HTMLElement>('[data-home-initiatives]');
  const track = section?.querySelector<HTMLElement>('[data-home-initiatives-track]');
  const panels = track?.querySelectorAll<HTMLElement>('[data-home-initiative]');
  if (!section || !track || !panels?.length) return;

  gsap.fromTo(
    panels,
    { y: 28 },
    {
      y: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    },
  );
}

function initNewsletter(root: ParentNode) {
  const section = root.querySelector<HTMLElement>('[data-home-newsletter]');
  const form = section?.querySelector<HTMLElement>('[data-home-newsletter-form]');
  if (!section) return;

  if (form) {
    gsap.fromTo(
      form,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 84%', once: true },
      },
    );
  }
}

function syncHScrollThumb(stage: HTMLElement, thumb: HTMLElement) {
  const track = thumb.parentElement;
  if (!track) return;

  const max = stage.scrollWidth - stage.clientWidth;
  if (max <= 1) {
    thumb.style.width = '100%';
    thumb.style.transform = 'translate3d(0, 0, 0)';
    return;
  }

  const ratio = stage.clientWidth / stage.scrollWidth;
  const thumbWidthPct = Math.max(ratio * 100, 18);
  thumb.style.width = `${thumbWidthPct}%`;

  const thumbWidthPx = (thumbWidthPct / 100) * track.clientWidth;
  const travel = Math.max(track.clientWidth - thumbWidthPx, 0);
  const progress = stage.scrollLeft / max;
  thumb.style.transform = `translate3d(${progress * travel}px, 0, 0)`;
}

let hScrollMetersAbort: AbortController | null = null;
interface HomeMotionContext {
  revert: () => void;
}

let homeMotionCtx: HomeMotionContext | null = null;
let refreshAbort: AbortController | null = null;

function disposeHScrollMeters() {
  hScrollMetersAbort?.abort();
  hScrollMetersAbort = null;
}

function disposeHomeMotion() {
  refreshAbort?.abort();
  refreshAbort = null;
  homeMotionCtx?.revert();
  homeMotionCtx = null;
  disposeHScrollMeters();
}

function initHScrollMeters(root: ParentNode) {
  disposeHScrollMeters();
  const abort = new AbortController();
  hScrollMetersAbort = abort;
  const { signal } = abort;

  root.querySelectorAll<HTMLElement>('[data-home-h-scroll]').forEach((stage) => {
    const wrap = stage.closest('.home-h-scroll');
    const thumb = wrap?.querySelector<HTMLElement>('[data-home-h-scroll-thumb]');
    if (!thumb) return;

    // At most one thumb update per frame, however many scroll events fire.
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncHScrollThumb(stage, thumb);
      });
    };
    syncHScrollThumb(stage, thumb);
    stage.addEventListener('scroll', update, { passive: true, signal });
    window.addEventListener('resize', update, { passive: true, signal });
  });
}

/** Re-measure pin distances after images/fonts settle so spacers match the track. */
function schedulePinRefresh(root: HTMLElement) {
  refreshAbort?.abort();
  const abort = new AbortController();
  refreshAbort = abort;
  const { signal } = abort;

  const refresh = () => {
    if (signal.aborted) return;
    ScrollTrigger.refresh();
  };

  requestAnimationFrame(refresh);
  window.addEventListener('load', refresh, { once: true, signal });

  root
    .querySelectorAll<HTMLImageElement>(
      '[data-home-initiatives] img, [data-home-artists] img',
    )
    .forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', refresh, { once: true, signal });
      img.addEventListener('error', refresh, { once: true, signal });
    });

  window.setTimeout(refresh, 400);
}

export async function initHomePage(): Promise<void> {
  const root = document.querySelector<HTMLElement>('[data-home-page]');
  if (!root) {
    disposeHomeMotion();
    return;
  }

  disposeHomeMotion();

  const reduced = prefersReducedMotion();
  const mobile = isMobile();

  initHScrollMeters(root);

  if (reduced) return;

  await loadGsap();
  // Keep ScrollTrigger in step with Lenis smooth scrolling.
  getLenis()?.on('scroll', ScrollTrigger.update);

  homeMotionCtx = gsap.context(() => {
    revealBasics(root);
    initArtistRunway(root, mobile);
    initReleaseStage(root, reduced);
    initInitiatives(root);
    initNewsletter(root);
  }, root);

  schedulePinRefresh(root);
}
