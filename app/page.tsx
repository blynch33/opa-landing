'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, FileSpreadsheet, ListChecks, ScanLine, Wallet } from 'lucide-react';
import { copy, links } from './copy';
import { SiteNav, SiteFooter } from './components/SiteChrome';
import { useReveal } from './components/useReveal';
import ProductShot from './components/ProductShot';
import ScanDemo from './components/ScanDemo';

const featureIcons = {
  scan: ScanLine,
  envelope: Wallet,
  check: ListChecks,
  export: FileSpreadsheet,
} as const;

// Counts up once when scrolled into view; jumps straight to the value under reduced motion.
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1400, 1);
        setShown(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref} className="tnum">{shown.toLocaleString()}</span>;
}

export default function Home() {
  const [receiptsScanned, setReceiptsScanned] = useState(0);
  useReveal();

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setReceiptsScanned(Number(data?.receiptsScanned) || 0))
      .catch(() => {});
  }, []);

  const { hero, showcase, features, who, pricing, faq, cta } = copy;

  return (
    <>
      <SiteNav home />

      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container">
            <h1 className="display">{hero.title}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="hero-actions">
              <a href={links.app} className="btn btn-primary">{hero.cta}</a>
              <a href={hero.moreHref} className="link-more">{hero.more}&nbsp;&rsaquo;</a>
            </div>
            <p className="footnote hero-note">{hero.microcopy}</p>

            <figure className="showcase">
              <div className="product-shot">
                <ProductShot />
              </div>
              <figcaption>
                <p className="title-3 showcase-line">{showcase.line}</p>
                {receiptsScanned > 0 && (
                  <p className="stats" aria-live="polite">
                    <strong><Counter value={receiptsScanned} /></strong>
                    {showcase.receiptsLabel}
                  </p>
                )}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="section section-alt" id="features" aria-label="Features">
          <div className="container">
            <div className="grid-2">
              {features.map((f) => {
                const Icon = featureIcons[f.icon];
                return (
                  <div key={f.title} className="card" data-reveal>
                    <Icon className="icon" strokeWidth={1.75} aria-hidden />
                    <h2 className="headline-sm">{f.title}</h2>
                    <p className="body-2">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS: scroll-driven demo (replaces the old four-step row) ===== */}
        <section id="how-it-works" aria-label="How it works">
          <ScanDemo />
        </section>

        {/* ===== WHO ===== */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="headline">{who.title}</h2>
            </div>
            <ul className="roles" data-reveal>
              {who.roles.map((r) => (
                <li key={r} className="card">{r}</li>
              ))}
            </ul>
            <p className="footnote roles-note">{who.footnote}</p>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section className="section" id="pricing">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="headline">{pricing.title}</h2>
            </div>

            <div className="card price-card" data-reveal>
              <p className="price tnum">
                {pricing.price}<small>{pricing.per}</small>
              </p>
              <ul className="checklist">
                {pricing.includes.map((f) => (
                  <li key={f}>
                    <Check size={18} strokeWidth={2.25} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={links.app} className="btn btn-primary btn-block">{pricing.cta}</a>
              <p className="footnote price-fine">{pricing.microcopy}</p>
              <p className="footnote price-foot">{pricing.footnote}</p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section section-alt" id="faq">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="headline">{faq.title}</h2>
            </div>
            <div className="faq" data-reveal>
              {faq.items.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <ChevronDown size={18} aria-hidden />
                  </summary>
                  <p className="answer">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="section cta">
          <div className="container" data-reveal>
            <h2 className="headline">{cta.title}</h2>
            <p className="lede">{cta.lede}</p>
            <a href={links.app} className="btn btn-primary">{cta.button}</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
