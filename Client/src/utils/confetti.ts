import confetti from 'canvas-confetti';

export const sprinkleConfettiOnScreen = (
  container?: HTMLElement,
  styleOverrides?: Partial<CSSStyleDeclaration>
): void => {
  if (container) {
    const canvas = document.createElement('canvas');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';

    styleOverrides && Object.assign(canvas.style, styleOverrides);
    container?.appendChild(canvas);

    const styledConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    styledConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  } else {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};
