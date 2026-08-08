import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';
import { revealSplitText } from './splitText';

gsap.registerPlugin(ScrollTrigger);

export function initProfileScroll(prefs: MotionPrefs): () => void {
  const hero = document.querySelector<HTMLElement>('.artist-profile-hero');
  if (!hero) return () => {};

  if (prefs.reduced) {
    hero.classList.add('is-visible');
    return () => {};
  }

  hero.classList.add('is-visible');

  const photo = hero.querySelector<HTMLElement>('.artist-profile-hero__photo');
  const vignette = hero.querySelector<HTMLElement>('.artist-profile-hero__vignette');
  const grain = hero.querySelector<HTMLElement>('.artist-profile-hero__grain');
  const content = hero.querySelector<HTMLElement>('.artist-profile-hero__content');

  revealSplitText(hero, '[data-split-line]', { delay: 0.15, y: 120 });

  gsap.fromTo(
    hero.querySelectorAll<HTMLElement>('.artist-hero-reveal:not([data-split-line])'),
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.35,
      ease: 'power3.out',
    },
  );

  const triggers: ScrollTrigger[] = [];

  if (photo) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          photo.style.transform = `scale(${1.04 + p * 0.14}) translateY(${p * 48}px)`;
        },
      }),
    );
  }

  if (vignette) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          vignette.style.opacity = String(0.85 + self.progress * 0.15);
        },
      }),
    );
  }

  if (grain && !prefs.mobile) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          grain.style.transform = `translateY(${self.progress * -30}px)`;
        },
      }),
    );
  }

  if (content) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          content.style.transform = `translateY(${self.progress * 60}px)`;
        },
      }),
    );
  }

  const quote = document.querySelector<HTMLElement>('.artist-quote blockquote');
  if (quote) {
    triggers.push(
      ScrollTrigger.create({
        trigger: quote,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 0.6,
        onUpdate: (self) => {
          quote.style.transform = `translateY(${(1 - self.progress) * 24}px)`;
        },
      }),
    );
  }

  return () => triggers.forEach((trigger) => trigger.kill());
}
