import { useEffect } from 'react';
import { animate, inView, scroll, stagger } from 'motion';

const COLLAPSE_BREAKPOINT = 1024;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCollapsibleViewport(): boolean {
  return window.matchMedia(`(max-width: ${COLLAPSE_BREAKPOINT - 1}px)`).matches;
}

function setPanelCollapsed(
  panel: HTMLElement,
  toggle: HTMLButtonElement,
  body: HTMLElement,
  collapsed: boolean,
) {
  panel.dataset.collapsed = collapsed ? 'true' : 'false';
  toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  body.hidden = collapsed;

  const label = toggle.querySelector<HTMLElement>('.roster-card__toggle-label');
  if (label) {
    label.textContent = collapsed ? 'Show bio' : 'Hide bio';
  }
}

function syncRosterInfoPanels() {
  const collapsible = isCollapsibleViewport();

  document.querySelectorAll<HTMLElement>('[data-roster-info-panel]').forEach((panel) => {
    const toggle = panel.querySelector<HTMLButtonElement>('[data-roster-info-toggle]');
    const body = panel.querySelector<HTMLElement>('[data-roster-info-body]');
    if (!toggle || !body) return;

    if (collapsible) {
      const collapsed = panel.dataset.collapsed !== 'false';
      setPanelCollapsed(panel, toggle, body, collapsed);
    } else {
      setPanelCollapsed(panel, toggle, body, false);
    }
  });
}

export default function ArtistsRosterMotion() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    document.querySelectorAll<HTMLAnchorElement>('[data-roster-pill]').forEach((pill) => {
      pill.addEventListener('click', (event) => {
        event.preventDefault();
        const index = Number(pill.dataset.index);
        const section = document.querySelector<HTMLElement>(`[data-roster-section][data-index="${index}"]`);
        section?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });
    });

    syncRosterInfoPanels();

    const collapseQuery = window.matchMedia(`(max-width: ${COLLAPSE_BREAKPOINT - 1}px)`);
    const onCollapseChange = () => syncRosterInfoPanels();
    collapseQuery.addEventListener('change', onCollapseChange);

    const toggleCleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLButtonElement>('[data-roster-info-toggle]').forEach((toggle) => {
      const panel = toggle.closest<HTMLElement>('[data-roster-info-panel]');
      const body = panel?.querySelector<HTMLElement>('[data-roster-info-body]');
      if (!panel || !body) return;

      const onToggle = () => {
        if (!isCollapsibleViewport()) return;
        const collapsed = panel.dataset.collapsed !== 'false';
        setPanelCollapsed(panel, toggle, body, !collapsed);
      };

      toggle.addEventListener('click', onToggle);
      toggleCleanups.push(() => toggle.removeEventListener('click', onToggle));
    });

    if (reduced) {
      return () => {
        collapseQuery.removeEventListener('change', onCollapseChange);
        toggleCleanups.forEach((fn) => fn());
      };
    }

    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('[data-roster-section]').forEach((section) => {
      let hasAnimated = false;

      const stopInView = inView(
        section,
        () => {
          if (hasAnimated) return;
          hasAnimated = true;

          const reveals = section.querySelectorAll<HTMLElement>('[data-motion="reveal"]');
          animate(
            reveals,
            { y: [14, 0] },
            { duration: 0.65, delay: stagger(0.06), ease: [0.22, 1, 0.36, 1] },
          );

          const bgName = section.querySelector<HTMLElement>('[data-motion="bg-name"]');
          if (bgName) {
            animate(bgName, { x: ['-2%', '0%'] }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
          }

          section.querySelectorAll<HTMLElement>('[data-motion="portrait"]').forEach((portrait) => {
            animate(portrait, { scale: [1.02, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
          });
        },
        { amount: 0.22 },
      );

      cleanups.push(() => stopInView());

      section.querySelectorAll<HTMLElement>('[data-motion="portrait"]').forEach((portrait) => {
        const stopScroll = scroll(animate(portrait, { y: ['0%', '6%'] }), {
          target: section,
          offset: ['start end', 'end start'],
        });
        cleanups.push(() => stopScroll());
      });
    });

    return () => {
      collapseQuery.removeEventListener('change', onCollapseChange);
      toggleCleanups.forEach((fn) => fn());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
