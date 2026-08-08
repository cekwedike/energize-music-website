import type { MotionPrefs } from './prefs';

export function initTierFilter(_prefs: MotionPrefs): (() => void) | null {
  const tabsEl = document.getElementById('artist-tabs');
  const grid = document.getElementById('artist-grid');
  const emptyMsg = document.getElementById('artist-empty-filter');

  if (!tabsEl || !grid) return null;

  const applyFilter = (tier: string | undefined) => {
    let visible = 0;

    grid.querySelectorAll<HTMLElement>('[data-tier]').forEach((card) => {
      const show = tier === 'all' || card.dataset.tier === tier;
      card.classList.toggle('is-hidden', !show);
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    emptyMsg?.classList.toggle('hidden', visible > 0);
  };

  const onClick = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-tier]');
    if (!button || !tabsEl) return;

    tabsEl.querySelectorAll('button[data-tier]').forEach((btn) => btn.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');
    applyFilter(button.dataset.tier);
  };

  const onKeydown = (event: KeyboardEvent) => {
    const buttons = [...tabsEl.querySelectorAll<HTMLButtonElement>('button[data-tier]')];
    const current = buttons.findIndex((btn) => btn.getAttribute('aria-selected') === 'true');
    if (current < 0) return;

    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;

    event.preventDefault();
    buttons[next]?.click();
    buttons[next]?.focus();
  };

  tabsEl.addEventListener('click', onClick);
  tabsEl.addEventListener('keydown', onKeydown);

  return () => {
    tabsEl.removeEventListener('click', onClick);
    tabsEl.removeEventListener('keydown', onKeydown);
  };
}
