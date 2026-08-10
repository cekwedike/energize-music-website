import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  const overflow = () => track.scrollWidth - window.innerWidth;
  // Only pin when the roster actually extends past the viewport.
  if (overflow() < 48) return;

  gsap.set(track, { x: 0 });

  gsap.to(track, {
    x: () => -Math.max(overflow() + 80, 0),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top+=68',
      end: () => `+=${Math.max(overflow() + 120, window.innerHeight * 0.55)}`,
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

function initReleaseStage(root: ParentNode, reduced: boolean) {
  const section = root.querySelector<HTMLElement>('[data-home-releases]');
  const cover = section?.querySelector<HTMLElement>('[data-home-release-cover]');
  const copy = section?.querySelector<HTMLElement>('[data-home-release-copy]');
  const rails = section?.querySelectorAll<HTMLElement>('[data-home-release-rail]');
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

  if (rails?.length) {
    tl.fromTo(
      rails,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out' },
      '-=0.4',
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
    { autoAlpha: 0, scale: 0.96 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    },
  );

  if (reduced || mobile) return;

  const overflow = () => track.scrollWidth - window.innerWidth;
  if (overflow() < 48) return;

  gsap.set(track, { x: 0 });

  gsap.to(track, {
    x: () => -Math.max(overflow(), 0),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top+=64',
      end: () => `+=${Math.max(overflow(), window.innerHeight * 0.75)}`,
      pin: true,
      scrub: 0.75,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

function initAbout(root: ParentNode, reduced: boolean) {
  const section = root.querySelector<HTMLElement>('[data-home-about]');
  const words = section?.querySelectorAll<HTMLElement>('[data-home-word]');
  if (!section || !words?.length) return;

  gsap.fromTo(
    words,
    { autoAlpha: 0, y: reduced ? 0 : 28, filter: reduced ? 'none' : 'blur(6px)' },
    {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
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
    thumb.style.transform = 'translateX(0)';
    return;
  }

  const ratio = stage.clientWidth / stage.scrollWidth;
  const thumbWidthPct = Math.max(ratio * 100, 18);
  thumb.style.width = `${thumbWidthPct}%`;

  const thumbWidthPx = (thumbWidthPct / 100) * track.clientWidth;
  const travel = Math.max(track.clientWidth - thumbWidthPx, 0);
  const progress = stage.scrollLeft / max;
  thumb.style.transform = `translateX(${progress * travel}px)`;
}

let hScrollMetersAbort: AbortController | null = null;
let homeMotionCtx: gsap.Context | null = null;

function disposeHScrollMeters() {
  hScrollMetersAbort?.abort();
  hScrollMetersAbort = null;
}

function disposeHomeMotion() {
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

export function initHomePage(): void {
  const root = document.querySelector<HTMLElement>('[data-home-page]');
  if (!root) {
    disposeHomeMotion();
    return;
  }

  // Tear down prior pins/tweens so re-entry (page-load, HMR, double boot) cannot
  // stack ScrollTrigger pin-spacers and blow out page height.
  disposeHomeMotion();

  const reduced = prefersReducedMotion();
  const mobile = isMobile();

  initMarquee(root, reduced);
  initHScrollMeters(root);

  if (reduced) {
    root
      .querySelectorAll<HTMLElement>(
        '[data-home-reveal], [data-home-artist], [data-home-initiative], [data-home-release-cover], [data-home-release-copy] > *, [data-home-release-rail], [data-home-word], [data-home-newsletter-form]',
      )
      .forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        el.style.visibility = 'visible';
      });
    return;
  }

  homeMotionCtx = gsap.context(() => {
    revealBasics(root);
    initArtistRunway(root, reduced, mobile);
    initReleaseStage(root, reduced);
    initInitiatives(root, reduced, mobile);
    initAbout(root, reduced);
    initNewsletter(root, reduced);
  }, root);

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
