import confetti from 'canvas-confetti';

/**
 * Triggers an elegant, luxury confetti celebration.
 * Colors: Champagne Gold, Warm Gold, Rose Gold, Soft Ivory, and Rich Wine.
 * Designed to look sophisticated and executive rather than childish.
 */
export function fireLuxuryCelebration() {
  const count = 180;
  const defaults = {
    origin: { y: 0.72 },
    colors: ['#D4AF37', '#F3E5AB', '#E6C687', '#E8B4B8', '#FDF8F0', '#7A1E53', '#B8860B'],
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage fireworks-like luxury shower
  fire(0.25, {
    spread: 30,
    startVelocity: 45,
    scalar: 0.9,
    shapes: ['circle'],
  });

  fire(0.2, {
    spread: 65,
    startVelocity: 35,
    scalar: 1.1,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.92,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.94,
    scalar: 1.2,
    shapes: ['star'],
  });

  fire(0.1, {
    spread: 140,
    startVelocity: 40,
    scalar: 0.7,
  });

  // Secondary soft drift from both sides after 300ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#D4AF37', '#F3E5AB', '#E8B4B8'],
      scalar: 0.9,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#D4AF37', '#F3E5AB', '#E8B4B8'],
      scalar: 0.9,
    });
  }, 300);
}
