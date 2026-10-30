import { useEffect } from 'react';
import { prefersReducedMotion } from './SmoothScroll';

/**
 * Desktop-only micro-interactions:
 * - restrained magnetic pull on primary buttons / CTA links
 * - subtle 3D perspective tilt on project preview images
 * Disabled on touch devices and for reduced-motion users.
 */
export default function Interactions() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const magnetSel = 'main a[href^="#"].inline-flex, main button[type="submit"], #home button, nav button';

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const mag = target.closest<HTMLElement>(magnetSel);
      if (mag) {
        const r = mag.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.25;
        mag.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), scale 0.32s cubic-bezier(0.34,1.56,0.64,1), translate 0.32s cubic-bezier(0.34,1.56,0.64,1), color 0.3s, background-color 0.3s, border-color 0.3s';
        mag.style.transform = `translate(${Math.max(-6, Math.min(6, x))}px, ${Math.max(-4, Math.min(4, y))}px)`;
        mag.dataset['magnet'] = '1';
      }
      if (target.tagName === 'IMG' && target.closest('#projects')) {
        const img = target.parentElement as HTMLElement;
        const r = img.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        img.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        img.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        img.dataset['tilt'] = '1';
      }
    };
    const onOut = (e: PointerEvent) => {
      const from = e.target as HTMLElement;
      const to = e.relatedTarget as HTMLElement | null;
      document.querySelectorAll<HTMLElement>('[data-magnet="1"], [data-tilt="1"]').forEach((el) => {
        if (el.contains(from) && !(to && el.contains(to))) {
          el.style.transform = '';
          delete el.dataset['magnet'];
          delete el.dataset['tilt'];
        }
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);
  return null;
}
