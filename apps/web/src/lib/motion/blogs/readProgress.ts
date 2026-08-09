import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionPrefs } from '../artists/prefs';

gsap.registerPlugin(ScrollTrigger);

export function initReadProgress(prefs: MotionPrefs): () => void {
  const reader = document.querySelector<HTMLElement>('[data-blog-dispatch], [data-zine-reader]');
  const fill = document.querySelector<HTMLElement>('[data-read-progress]');
  const hero = document.querySelector<HTMLElement>('[data-dispatch-hero]');
  const heroImg = document.querySelector<HTMLElement>('.dispatch__hero-img');
  const title = document.querySelector<HTMLElement>('[data-dispatch-title]');
  const reveals = document.querySelectorAll<HTMLElement>('[data-dispatch-reveal]');
  const body = document.querySelector<HTMLElement>('[data-dispatch-body], [data-zine-body]');

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

  if (!prefs.reduced && heroImg && hero) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroImg.style.transform = `scale(${1.06 + self.progress * 0.08}) translateY(${self.progress * 36}px)`;
        },
      }),
    );
  }

  if (!prefs.reduced) {
    if (title) {
      gsap.fromTo(
        title,
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.08 },
      );
    }

    if (reveals.length > 0) {
      gsap.fromTo(
        reveals,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.18,
        },
      );
    }

    if (body) {
      gsap.fromTo(
        body,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: body,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }
  }

  return () => triggers.forEach((trigger) => trigger.kill());
}
