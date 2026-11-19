/**
 * Behaviour for the event page (components/events/EventDetailView.astro): the rolling countdown,
 * the lineup list toggle, the ticket dock, and, unless reduced motion is on, the moving title,
 * the poster glide, the word-by-word summary, the lineup photo trail and the leaning ticket link.
 */
import { getLenis } from '../smoothScroll';

export function initEventPage(root: HTMLElement | null) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  /* ---------- Countdown: only the digits that change roll over ---------- */
  const clock = root?.querySelector<HTMLElement>('[data-countdown]');
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

  /* ---------- Full lineup list ---------- */
  const allButton = root?.querySelector<HTMLButtonElement>('[data-ev-all]');
  const full = root?.querySelector<HTMLElement>('[data-ev-full]');
  if (allButton && full) {
    const label = allButton.textContent ?? '';
    allButton.addEventListener('click', () => {
      const open = full.classList.contains('sr-only');
      full.classList.toggle('sr-only', !open);
      allButton.setAttribute('aria-expanded', String(open));
      allButton.textContent = open ? 'Hide the list' : label;
    });
  }

  /* ---------- Dock: shows after the first screen, steps aside at the close ---------- */
  const dock = root?.querySelector<HTMLElement>('[data-ev-dock]');
  const close = root?.querySelector<HTMLElement>('[data-ev-close]');
  const firstActions = root?.querySelector<HTMLElement>('.ev-actions');
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

  if (root && !reduced) {
    /* ---------- Moving title: speeds up and thickens with scroll ---------- */
    const runs = Array.from(root.querySelectorAll<HTMLElement>('[data-ev-run]'));
    const type = root.querySelector<HTMLElement>('[data-ev-type]');
    const tilt = root.querySelector<HTMLElement>('[data-ev-tilt]');
    const offsets = runs.map(() => 0);
    let boost = 0;
    let lastY = window.scrollY;
    let pointer = { x: 0, y: 0 };
    let lean = { x: 0, y: 0 };
    let typeOn = true;

    if (type && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (typeOn = entry.isIntersecting)).observe(type);
    }
    if (fine) {
      window.addEventListener('pointermove', (event) => {
        pointer = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 };
      });
    }

    let previous = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(64, now - previous) / 1000;
      previous = now;
      const lenis = getLenis();
      const velocity = lenis ? Math.abs(lenis.velocity) : Math.abs(window.scrollY - lastY) / Math.max(dt, 0.001) / 60;
      lastY = window.scrollY;
      boost = lerp(boost, Math.min(velocity / 30, 1), 0.08);

      if (typeOn) {
        runs.forEach((run, i) => {
          const copy = run.querySelector<HTMLElement>('.ev-run__copy');
          const width = copy?.offsetWidth ?? 1;
          const dir = i === 0 ? -1 : 1;
          offsets[i] = (offsets[i] + dir * (40 + boost * 520) * dt) % width;
          run.style.setProperty('--x', `${(dir === -1 ? offsets[i] : offsets[i] - width).toFixed(1)}px`);
          run.style.setProperty('--wght', String(Math.round(300 + boost * 600)));
        });
      }
      if (tilt) {
        lean = { x: lerp(lean.x, pointer.x, 0.08), y: lerp(lean.y, pointer.y, 0.08) };
        tilt.style.setProperty('--lean-x', `${(lean.y * -8).toFixed(2)}deg`);
        tilt.style.setProperty('--lean-y', `${(lean.x * 10).toFixed(2)}deg`);
        tilt.style.setProperty('--shadow-x', `${(lean.x * -40).toFixed(1)}px`);
        tilt.style.setProperty('--shadow-y', `${(28 + lean.y * -20).toFixed(1)}px`);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    /* ---------- Wide screens: the poster glides from centre to its pinned column ---------- */
    const stage = root.querySelector<HTMLElement>('[data-ev-stage]');
    const glide = root.querySelector<HTMLElement>('[data-ev-glide]');
    if (stage && glide) {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        getLenis()?.on('scroll', ScrollTrigger.update);

        gsap.matchMedia().add('(min-width: 1100px)', () => {
          const pin = glide.parentElement as HTMLElement;
          const toCentre = () => {
            const box = pin.getBoundingClientRect();
            return window.innerWidth / 2 - (box.left + box.width / 2);
          };
          const span = () => `+=${window.innerHeight * 0.45}`;
          gsap.fromTo(
            glide,
            { x: toCentre, rotate: -2.5 },
            {
              x: 0,
              rotate: 0,
              ease: 'none',
              scrollTrigger: { trigger: stage, start: 'top top', end: span, scrub: 0.8, invalidateOnRefresh: true },
            },
          );
          gsap.fromTo(
            '.ev-head, .ev-facts',
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: {
                trigger: stage,
                start: () => `top+=${window.innerHeight * 0.3} top`,
                end: () => `+=${window.innerHeight * 0.3}`,
                scrub: 0.6,
              },
            },
          );
          gsap.to('[data-ev-type]', {
            opacity: 0,
            y: () => -window.innerHeight * 0.25,
            ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * 0.7}`, scrub: true },
          });
          gsap.to('[data-ev-bar]', {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * 0.3}`, scrub: true },
          });
        });
      });
    }

    /* ---------- Summary: words light up as they pass the reading line ---------- */
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-ev-words] .ev-about__word'));
    if (words.length) {
      root.querySelector('[data-ev-words]')?.classList.add('is-live');
      const light = () => {
        const line = window.innerHeight * 0.7;
        words.forEach((word) => word.classList.toggle('is-lit', word.getBoundingClientRect().top < line));
      };
      window.addEventListener('scroll', light, { passive: true });
      light();
    }

    /* ---------- Lineup: names fill in; on a mouse the photo trails the pointer ---------- */
    const lineup = root.querySelector<HTMLElement>('[data-ev-lineup]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-ev-act]'));
    const float = root.querySelector<HTMLImageElement>('[data-ev-float]');
    if (lineup && fine && float) {
      let goal = { x: 0, y: 0 };
      let at = { x: 0, y: 0 };
      items.forEach((item) => {
        item.addEventListener('pointerenter', (event) => {
          const box = lineup.getBoundingClientRect();
          goal = { x: event.clientX - box.left, y: event.clientY - box.top };
          if (!float.classList.contains('is-on')) at = { ...goal };
          items.forEach((other) => other.classList.toggle('is-on', other === item));
          lineup.classList.add('is-hovering');
          float.classList.toggle('is-on', Boolean(item.dataset.photo));
          if (item.dataset.photo) float.src = item.dataset.photo;
        });
        item.addEventListener('pointerleave', () => {
          item.classList.remove('is-on');
          lineup.classList.remove('is-hovering');
          float.classList.remove('is-on');
        });
      });
      lineup.addEventListener('pointermove', (event) => {
        const box = lineup.getBoundingClientRect();
        goal = { x: event.clientX - box.left, y: event.clientY - box.top };
      });
      const follow = () => {
        const vx = goal.x - at.x;
        at = { x: lerp(at.x, goal.x, 0.14), y: lerp(at.y, goal.y, 0.14) };
        float.style.setProperty('--fx', `${at.x.toFixed(1)}px`);
        float.style.setProperty('--fy', `${at.y.toFixed(1)}px`);
        float.style.setProperty('--fr', `${Math.max(-14, Math.min(14, vx * 0.06)).toFixed(2)}deg`);
        requestAnimationFrame(follow);
      };
      requestAnimationFrame(follow);
    } else if ('IntersectionObserver' in window) {
      // Touch screens: list names fill in as they cross the middle of the screen.
      const io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-on', entry.isIntersecting)),
        { rootMargin: '-40% 0px -40% 0px' },
      );
      root.querySelectorAll('.ev-list__item').forEach((item) => io.observe(item));
    }

    /* ---------- Close: the ticket link leans toward the pointer ---------- */
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
}
