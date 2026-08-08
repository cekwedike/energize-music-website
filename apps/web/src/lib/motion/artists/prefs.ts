export interface MotionPrefs {
  reduced: boolean;
  mobile: boolean;
  desktop: boolean;
  enabled: boolean;
}

export function getMotionPrefs(): MotionPrefs {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const desktop = window.matchMedia('(min-width: 1024px)').matches;
  return { reduced, mobile, desktop, enabled: !reduced };
}

export function onMotionPrefsChange(callback: (prefs: MotionPrefs) => void): () => void {
  const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileMq = window.matchMedia('(max-width: 768px)');

  const handler = () => callback(getMotionPrefs());
  reducedMq.addEventListener('change', handler);
  mobileMq.addEventListener('change', handler);

  return () => {
    reducedMq.removeEventListener('change', handler);
    mobileMq.removeEventListener('change', handler);
  };
}
