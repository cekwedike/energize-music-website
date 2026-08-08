import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';

gsap.registerPlugin(ScrollTrigger);

export function initMuseumWall(prefs: MotionPrefs): (() => void) | null {
  if (prefs.reduced || prefs.mobile) return null;

  const section = document.querySelector<HTMLElement>('[data-museum-wall]');
  const pin = section?.querySelector<HTMLElement>('[data-museum-pin]');
  const track = section?.querySelector<HTMLElement>('[data-museum-track]');

  if (!section || !pin || !track || track.children.length < 2) return null;

  const getDistance = () => Math.max(track.scrollWidth - window.innerWidth + 100, window.innerHeight * 0.5);

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 60),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top 15%',
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 0.85,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function initChannelSurf(prefs: MotionPrefs): (() => void) | null {
  if (prefs.reduced) return null;

  const track = document.querySelector<HTMLElement>('[data-channel-track]');
  if (!track) return null;

  track.style.animation = 'none';

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: 35,
    repeat: -1,
  });

  let scrollTrigger: ScrollTrigger | null = null;

  if (!prefs.mobile) {
    const section = document.querySelector<HTMLElement>('[data-channel-surf]');
    if (section) {
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const speed = gsap.utils.clamp(0.5, 2.5, Math.abs(velocity) / 800 + 0.8);
          tween.timeScale(speed);
        },
      });
    }
  }

  return () => {
    scrollTrigger?.kill();
    gsap.killTweensOf(track);
  };
}
