import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Lenis smooth scrolling synced with GSAP ScrollTrigger. Anchor links (#about…) glide smoothly. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
      touchMultiplier: 1.4,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Stop page scroll while a modal (fixed overlay with overflow) is open
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
