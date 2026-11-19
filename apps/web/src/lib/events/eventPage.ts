/**
 * Behaviour for the event page (components/events/EventDetailView.astro): the countdown in the hero,
 * the ticket dock, and, unless reduced motion is on, the pinned sideways lineup rail
 * and the closing ticket button leaning toward the pointer.
 */
import { getLenis } from '../smoothScroll';

export function initEventPage(root: HTMLElement | null) {
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Countdown ---------- */
  const clock = root.querySelector<HTMLElement>('[data-countdown]');
  const target = clock ? new Date(clock.dataset.countdown ?? '').getTime() : NaN;
  if (clock && !Number.isNaN(target)) {
    const daysWord = clock.querySelector<HTMLElement>('[data-days-word]');
    const write = (unit: string, value: string) => {
      const cell = clock.querySelector<HTMLElement>(`[data-unit="${unit}"]`);
      if (!cell || cell.dataset.value === value) return;
      const before = cell.dataset.value ?? '';
      cell.dataset.value = value;
      cell.replaceChildren(
        ...value.split('').map((char, i) => {
          const digit = document.createElement('span');
          digit.className = 'ev-clock__digit';
          digit.textContent = char;
          if (!reduced && before && before[i] !== char) digit.classList.add('is-rolling');
          return digit;
        }),
      );
    };
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const s = Math.floor(diff / 1000);
      const days = Math.floor(s / 86400);
      write('days', String(days));
      if (daysWord) daysWord.textContent = days === 1 ? 'day' : 'days';
      write('hrs', pad(Math.floor((s % 86400) / 3600)));
      write('min', pad(Math.floor((s % 3600) / 60)));
      write('sec', pad(s % 60));
      if (diff === 0) window.clearInterval(timer);
    };
    const timer = window.setInterval(tick, 1000);
    tick();
  }

  /* ---------- Dock: shows once the first ticket button scrolls away, steps aside at the close ---------- */
  const dock = root.querySelector<HTMLElement>('[data-ev-dock]');
  const close = root.querySelector<HTMLElement>('[data-ev-close]');
  const firstActions = root.querySelector<HTMLElement>('.ev-actions');
  if (dock && 'IntersectionObserver' in window) {
    let pastActions = false;
    let atClose = false;
    const update = () => dock.classList.toggle('is-shown', pastActions && !atClose);
    if (firstActions) {
      new IntersectionObserver(([entry]) => {
        pastActions = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      }).observe(firstActions);
    }
    if (close) {
      new IntersectionObserver(([entry]) => {
        atClose = entry.isIntersecting;
        update();
      }).observe(close);
    }
  }

  if (reduced) return;

  /* ---------- Long lineups: on wide screens the section pins and vertical scroll drives the rail sideways ---------- */
  const rail = root.querySelector<HTMLElement>('[data-ev-lineup="rail"]');
  const track = rail?.querySelector<HTMLElement>('[data-ev-rail-track]');
  if (rail && track) {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      getLenis()?.on('scroll', ScrollTrigger.update);
      gsap.matchMedia().add('(min-width: 900px)', () => {
        rail.classList.add('is-pinned');
        const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            // Pinning moves the section in the DOM, which can stop the shared reveal from firing for its heading.
            onToggle: () => rail.querySelectorAll('.scroll-reveal').forEach((el) => el.classList.add('is-visible')),
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          rail.classList.remove('is-pinned');
        };
      });
      // Images load late and change the track width; measure again once they have.
      window.addEventListener('load', () => ScrollTrigger.refresh());
    });
  }

  /* ---------- Close: the ticket button leans toward the pointer ---------- */
  const magnet = root.querySelector<HTMLElement>('[data-ev-magnet]');
  if (fine && close && magnet) {
    close.addEventListener('pointermove', (event) => {
      const box = magnet.getBoundingClientRect();
      magnet.style.setProperty('--mx', `${((event.clientX - (box.left + box.width / 2)) * 0.12).toFixed(1)}px`);
      magnet.style.setProperty('--my', `${((event.clientY - (box.top + box.height / 2)) * 0.18).toFixed(1)}px`);
    });
    close.addEventListener('pointerleave', () => {
      magnet.style.setProperty('--mx', '0px');
      magnet.style.setProperty('--my', '0px');
    });
  }
}
