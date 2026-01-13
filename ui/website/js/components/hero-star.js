/**
 * Hero Star Stroke Animation
 * Smoothly animates SVG viewBox from star dimensions to oblong dimensions during movement
 */

export function initializeHeroStar() {
  const heroStar = document.querySelector('.hero__star');
  if (!heroStar) return;

  const strokes = heroStar.querySelectorAll('.hero__star-stroke');
  if (strokes.length === 0) return;

  const startTime = 2000; // Animation starts at 2s
  const duration = 2000; // Runs for 2s
  const updateInterval = 16; // ~60fps

  const start = { w: 135, h: 540, rx: 67.5, gx: 67.5, gy: 539.277 };
  const end = { w: 193, h: 958, rx: 96.3, gx: 96.3, gy: 957.6 };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function updateSymbol(symbol, progress) {
    const eased = easeInOutCubic(progress);
    const w = start.w + (end.w - start.w) * eased;
    const h = start.h + (end.h - start.h) * eased;
    const rx = start.rx + (end.rx - start.rx) * eased;
    const gx = start.gx + (end.gx - start.gx) * eased;
    const gy = start.gy + (end.gy - start.gy) * eased;

    symbol.setAttribute('viewBox', `0 0 ${w} ${h}`);
    
    const rect = symbol.querySelector('rect');
    if (rect) {
      rect.setAttribute('width', w.toString());
      rect.setAttribute('height', (h - 0.4).toString());
      rect.setAttribute('rx', rx.toString());
    }

    const gradient = symbol.querySelector('linearGradient');
    if (gradient) {
      gradient.setAttribute('x1', gx.toString());
      gradient.setAttribute('x2', gx.toString());
      gradient.setAttribute('y2', gy.toString());
    }
  }

  setTimeout(() => {
    const startTimestamp = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      strokes.forEach((stroke) => {
        const symbolId = stroke.querySelector('use')?.getAttribute('href')?.substring(1);
        const symbol = symbolId ? document.querySelector(`#${symbolId}`) : null;
        if (symbol) updateSymbol(symbol, progress);
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, startTime);
}

