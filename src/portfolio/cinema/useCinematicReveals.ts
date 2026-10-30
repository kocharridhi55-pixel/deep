import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

/**
 * One cohesive scroll-motion layer applied to the existing sections (everything after the hero).
 * Only animates transform / opacity / filter / clip-path, so the layout and design stay identical.
 */
export function useCinematicReveals(enabled: boolean) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('main > section:not(#home)');

      sections.forEach((section) => {
        // Headings: masked line rise + blur-to-sharp
        section.querySelectorAll<HTMLElement>('h2').forEach((h) => {
          gsap.fromTo(
            h,
            { clipPath: 'inset(0 0 100% 0)', yPercent: 30, opacity: 0, filter: 'blur(8px)' },
            {
              clipPath: 'inset(0 0 -20% 0)', yPercent: 0, opacity: 1, filter: 'blur(0px)',
              duration: 1.2, ease: EASE,
              scrollTrigger: { trigger: h, start: 'top 88%', once: true },
            },
          );
        });

        // Kickers, paragraphs, list items, cards: gentle staggered rise
        const items = section.querySelectorAll<HTMLElement>(
          ':scope h3, :scope p, :scope li, :scope form > *, :scope article',
        );
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 28, filter: 'blur(4px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: EASE, stagger: 0.07, overwrite: true, clearProps: 'filter' },
            ),
        });

        // Images: rectangular mask reveal + slow cinematic zoom-out, then parallax drift
        section.querySelectorAll<HTMLImageElement>('img').forEach((img, i) => {
          const frame = img.parentElement as HTMLElement | null;
          if (!frame || img.closest('[data-no-reveal]')) return;
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            frame,
            { clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
            {
              clipPath: 'inset(0 0% 0 0%)', duration: 1.4, ease: 'power4.inOut',
              scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
            },
          );
          gsap.fromTo(img, { scale: 1.25 }, {
            scale: 1, duration: 2.2, ease: 'power2.out',
            scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
            clearProps: 'scale',
          });
          if (isDesktop) {
            gsap.fromTo(frame, { y: 30 }, {
              y: -30, ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
          }
        });

        // Atmospheric background glows drift at a slower depth (parallax)
        section.querySelectorAll<HTMLElement>(':scope > div.rounded-full.pointer-events-none').forEach((glow) => {
          gsap.fromTo(glow, { y: isDesktop ? 120 : 50 }, {
            y: isDesktop ? -120 : -50, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          });
        });

        // Slow tonal transition between sections
        gsap.fromTo(section, { opacity: 0.35 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 95%', end: 'top 55%', scrub: true },
        });
      });

      // Hero recedes gently as you scroll away (scroll-linked scale / opacity)
      const hero = document.querySelector<HTMLElement>('#home > div.max-w-7xl');
      if (hero) {
        gsap.to(hero, {
          yPercent: -8, scale: 0.97, opacity: 0.4, ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [enabled]);
}
