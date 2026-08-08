import gsap from 'gsap';
import type { MotionPrefs } from './prefs';

export function initCardTilt(root: ParentNode, prefs: MotionPrefs): () => void {
  if (prefs.reduced || prefs.mobile) return () => {};

  const cards = [...root.querySelectorAll<HTMLElement>('[data-tilt]')];
  if (cards.length === 0) return () => {};

  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    const photo = card.querySelector<HTMLElement>('.artist-card__photo, .roster-slot__photo');
    gsap.set(card, { transformPerspective: 900 });

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 8,
        duration: 0.45,
        ease: 'power2.out',
      });

      if (photo) {
        gsap.to(photo, {
          x: x * 14,
          y: y * 10,
          scale: 1.08,
          duration: 0.55,
          ease: 'power2.out',
        });
      }
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
      if (photo) {
        gsap.to(photo, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' });
      }
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);

    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      gsap.set(card, { clearProps: 'transform' });
      if (photo) gsap.set(photo, { clearProps: 'transform' });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
