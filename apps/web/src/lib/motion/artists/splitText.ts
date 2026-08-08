import gsap from 'gsap';

export function splitIntoChars(element: HTMLElement): HTMLElement[] {
  const text = element.textContent ?? '';
  element.textContent = '';
  element.setAttribute('aria-label', text);

  return [...text].map((char) => {
    const span = document.createElement('span');
    span.className = 'motion-char';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = char === ' ' ? '\u00a0' : char;
    element.appendChild(span);
    return span;
  });
}

export function revealSplitText(
  root: ParentNode,
  selector: string,
  options?: { delay?: number; stagger?: number; y?: number },
): gsap.core.Timeline | null {
  const lines = root.querySelectorAll<HTMLElement>(selector);
  if (lines.length === 0) return null;

  const delay = options?.delay ?? 0;
  const stagger = options?.stagger ?? 0.028;
  const y = options?.y ?? 110;

  const timeline = gsap.timeline({ delay });

  lines.forEach((line, lineIndex) => {
    gsap.set(line, { overflow: 'hidden', display: 'block', opacity: 1, y: 0 });
    const chars = splitIntoChars(line);

    timeline.fromTo(
      chars,
      { yPercent: y, rotateX: -40, opacity: 0 },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.85,
        stagger,
        ease: 'power4.out',
      },
      lineIndex * 0.12,
    );
  });

  return timeline;
}
