/**
 * Photo heroes on the events pages ([data-evh]). Only the photographs move: they drift slightly
 * against the pointer, and sink and slow-zoom as the section scrolls past. Text stays still.
 * Off for reduced motion.
 */
export function initHeroes(scope: ParentNode = document) {
  const heroes = Array.from(scope.querySelectorAll<HTMLElement>('[data-evh]'));
  if (!heroes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const update = () => {
    const vh = window.innerHeight;
    heroes.forEach((hero) => {
      const box = hero.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      // -1 as it enters from below, 0 when it fills the screen, 1 as it leaves at the top.
      const p = Math.max(-1, Math.min(1, -box.top / Math.max(box.height, 1)));
      hero.style.setProperty('--hp', p.toFixed(3));
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  if (fine) {
    heroes.forEach((hero) => {
      hero.addEventListener('pointermove', (event) => {
        const box = hero.getBoundingClientRect();
        hero.style.setProperty('--hx', ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
        hero.style.setProperty('--hy', ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
      });
      hero.addEventListener('pointerleave', () => {
        hero.style.setProperty('--hx', '0');
        hero.style.setProperty('--hy', '0');
      });
    });
  }
}
