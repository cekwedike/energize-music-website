import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from '../artists/prefs';

gsap.registerPlugin(ScrollTrigger);

export function initReadProgress(prefs: MotionPrefs): () => void {
  const reader = document.querySelector<HTMLElement>('[data-zine-reader]');
  const fill = document.querySelector<HTMLElement>('[data-read-progress]');
  const heroImg = document.querySelector<HTMLElement>('.zine-reader__hero-img');
  const body = document.querySelector<HTMLElement>('[data-zine-body]');

  if (!reader || !fill) return () => {};

  const triggers: ScrollTrigger[] = [];

  triggers.push(
    ScrollTrigger.create({
      trigger: reader,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        fill.style.width = `${self.progress * 100}%`;
      },
    }),
  );

  if (!prefs.reduced && heroImg) {
    triggers.push(
      ScrollTrigger.create({
        trigger: reader,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroImg.style.transform = `scale(${1.1 + self.progress * 0.15}) translateY(${self.progress * 40}px)`;
        },
      }),
    );
  }

  if (!prefs.reduced && body) {
    gsap.fromTo(
      body,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: body,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }

  return () => triggers.forEach((t) => t.kill());
}
