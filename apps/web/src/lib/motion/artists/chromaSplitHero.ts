import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from './prefs';
import { revealSplitText } from './splitText';

gsap.registerPlugin(ScrollTrigger);

export function initChromaSplitHero(prefs: MotionPrefs): () => void {
  const hero = document.querySelector<HTMLElement>('[data-chroma-hero]');
  if (!hero) return () => {};

  const triggers: ScrollTrigger[] = [];

  if (prefs.reduced) {
    hero.classList.add('is-ready');
    const aperture = hero.querySelector<HTMLElement>('[data-chroma-aperture]');
    if (aperture) aperture.style.display = 'none';
    return () => {};
  }

  hero.classList.add('is-ready');

  revealSplitText(hero, '[data-split-line]', { delay: 0.08, y: 105, stagger: 0.032 });

  const typePanel = hero.querySelector<HTMLElement>('[data-chroma-type]');
  const photoPanel = hero.querySelector<HTMLElement>('[data-chroma-photo]');
  const photo = hero.querySelector<HTMLElement>('[data-chroma-lcp]')
    ?? hero.querySelector<HTMLElement>('.chroma-hero__photo');
  const aperture = hero.querySelector<HTMLElement>('[data-chroma-aperture]');
  const scan = hero.querySelector<HTMLElement>('[data-chroma-scan]');
  const nameLines = hero.querySelectorAll<HTMLElement>('[data-name-line]');

  if (aperture) {
    gsap.fromTo(
      aperture,
      { clipPath: 'inset(0 0 0 0)' },
      {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        delay: 0.15,
        ease: 'power4.inOut',
      },
    );
  }

  if (photo) {
    gsap.fromTo(
      photo,
      { scale: 1.18 },
      { scale: 1.04, duration: 1.4, delay: 0.2, ease: 'power3.out' },
    );
  }

  if (scan) {
    gsap.fromTo(
      scan,
      { opacity: 0.8, scaleY: 0 },
      {
        opacity: 0.35,
        scaleY: 1,
        duration: 0.9,
        delay: 0.5,
        ease: 'power2.out',
        transformOrigin: '50% 0%',
      },
    );
  }

  if (typePanel) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          typePanel.style.transform = `translateY(${p * 80}px)`;
          typePanel.style.opacity = String(1 - p * 0.35);
        },
      }),
    );
  }

  if (photoPanel && photo) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          photoPanel.style.transform = `translateY(${p * -40}px)`;
          photo.style.transform = `scale(${1.04 + p * 0.12}) translateY(${p * 30}px)`;
        },
      }),
    );
  }

  nameLines.forEach((line, index) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const offset = (index - nameLines.length / 2) * 12;
          line.style.transform = `translateX(${offset * self.progress}px)`;
        },
      }),
    );
  });

  const quote = document.querySelector<HTMLElement>('[data-monument-quote]');
  if (quote) {
    const words = quote.querySelectorAll<HTMLElement>('[data-quote-word]');
    words.forEach((word, index) => {
      gsap.fromTo(
        word,
        { y: 40, opacity: 0, rotate: index % 2 === 0 ? -2 : 2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          delay: index * 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });
  }

  return () => triggers.forEach((trigger) => trigger.kill());
}
