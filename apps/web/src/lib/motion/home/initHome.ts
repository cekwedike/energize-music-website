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

/** Horizontal travel needed to reveal the full track inside the viewport. */
function trackOverflow(track: HTMLElement): number {
  return Math.max(track.scrollWidth - window.innerWidth, 0);
}

/**
 * Pin a section and scrub its track sideways. End distance matches overflow 1:1
 * so we do not leave a long blank pin-spacer after the cards finish moving.
 */
function pinHorizontalTrack(options: {
  section: HTMLElement;
  track: HTMLElement;
  headerOffset: number;
  scrub: number;
}): void {
  const { section, track, headerOffset, scrub } = options;

  const overflow = () => trackOverflow(track);
  if (overflow() < 48) return;

  gsap.set(track, { x: 0, force3D: true });

  gsap.to(track, {
    x: () => -overflow(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: `top top+=${headerOffset}`,
      end: () => `+=${overflow()}`,
      pin: true,
      pinSpacing: true,
      // transform pin survives body overflow-x:clip and ancestor compositing;
      // fixed pins were leaving a blank void while the track scrubbed.
      pinType: 'transform',
      scrub,
      invalidateOnRefresh: true,
      anticipatePin: 0,
      fastScrollEnd: true,
    },
  });
}

function initArtistRunway(root: ParentNode, reduced: boolean, mobile: boolean) {
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

  if (reduced || mobile || cards.length < 3) return;
  pinHorizontalTrack({ section, track, headerOffset: 68, scrub: 0.65 });
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

  if (reduced) return;

  gsap.to(cover, {
    yPercent: -10,
    rotate: 2,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initInitiatives(root: ParentNode, reduced: boolean, mobile: boolean) {
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

  if (reduced || mobile) return;
  pinHorizontalTrack({ section, track, headerOffset: 64, scrub: 0.75 });
}

function initAbout(root: ParentNode) {
  const section = root.querySelector<HTMLElement>('[data-home-about]');
  const words = section?.querySelectorAll<HTMLElement>('[data-home-word]');
  if (!section || !words?.length) return;

  gsap.fromTo(
    words,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 76%', once: true },
    },
  );
}

function initNewsletter(root: ParentNode, reduced: boolean) {
  const section = root.querySelector<HTMLElement>('[data-home-newsletter]');
  const glow = section?.querySelector<HTMLElement>('[data-home-newsletter-glow]');
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

  if (!glow || reduced) return;

  gsap.to(glow, {
    scale: 1.2,
    opacity: 0.65,
    duration: 3.4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

function initMarquee(root: ParentNode, reduced: boolean) {
  root.querySelectorAll<HTMLElement>('[data-home-marquee]').forEach((track) => {
    const duration = Number(track.dataset.homeMarqueeDuration || 26);
    track.style.setProperty('--home-marquee-duration', `${reduced ? duration * 2.2 : duration}s`);
  });
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

    const update = () => syncHScrollThumb(stage, thumb);
    update();
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

  initMarquee(root, reduced);
  initHScrollMeters(root);

  if (reduced) return;

  await loadGsap();

  homeMotionCtx = gsap.context(() => {
    revealBasics(root);
    initArtistRunway(root, reduced, mobile);
    initReleaseStage(root, reduced);
    initInitiatives(root, reduced, mobile);
    initAbout(root);
    initNewsletter(root, reduced);
  }, root);

  schedulePinRefresh(root);
}
