import type { MotionPrefs } from './prefs';

interface NoiseCanvasOptions {
  canvas: HTMLCanvasElement;
  prefs: MotionPrefs;
}

export function initNoiseCanvas({ canvas, prefs }: NoiseCanvasOptions): () => void {
  if (prefs.reduced || prefs.mobile) {
    canvas.remove();
    return () => {};
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return () => {};
  }

  let width = 0;
  let height = 0;
  let frame = 0;
  let rafId = 0;
  let running = true;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.clientWidth;
    height = parent.clientHeight;
    canvas.width = Math.floor(width * 0.5);
    canvas.height = Math.floor(height * 0.5);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  const draw = () => {
    if (!running || !ctx) return;
    frame += 1;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const t = frame * 0.015;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);
      const wave =
        Math.sin(x * 0.04 + t) * 0.5 +
        Math.cos(y * 0.05 - t * 0.7) * 0.5 +
        Math.sin((x + y) * 0.02 + t * 1.2) * 0.35;
      const alpha = Math.floor(18 + wave * 14);
      data[i] = 77;
      data[i + 1] = 168;
      data[i + 2] = 255;
      data[i + 3] = alpha;
    }

    ctx.putImageData(imageData, 0, 0);
    rafId = requestAnimationFrame(draw);
  };

  resize();
  draw();

  const onResize = () => resize();
  window.addEventListener('resize', onResize, { passive: true });

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
  };
}
