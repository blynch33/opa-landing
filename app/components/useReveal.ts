'use client';

import { useEffect } from 'react';

/**
 * Subtle fade-up for elements marked `data-reveal`.
 * Content is visible by default (no JS = no hidden content). On mount,
 * anything already on screen is marked visible before `html.js` turns the
 * hidden state on, so there is no flash. CSS skips it under reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) return;
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.classList.add('is-visible');
    });
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.filter((el) => !el.classList.contains('is-visible')).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
