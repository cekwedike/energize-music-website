export interface MotionPrefs {
  reduced: boolean;
  mobile: boolean;
}

export function getMotionPrefs(): MotionPrefs {
  return {
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mobile: window.matchMedia('(max-width: 899px)').matches,
  };
}
