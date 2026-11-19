'use client';

/**
 * ScanDemo: Apple-product-page-style scroll story in three beats.
 *
 *   1. Snap it.            Phone scans a paper receipt, OCR fields light up.
 *   2. It files itself.    Receipt becomes a row in an envelope; Spent / Remaining tick.
 *   3. Wrap in one click.  Status flips to Reconciled, top sheet + Export to Hot Budget.
 *
 * Modes (picked from media queries, SSR renders "static"):
 *   scroll  wide screens: ~300vh track with a sticky 100vh stage, progress 0..1
 *           from one rAF-throttled scroll listener (gated by IntersectionObserver).
 *   stack   ≤ 734px: beats stacked, each plays once when it scrolls into view.
 *   static  prefers-reduced-motion (and no-JS / first paint): end states, stacked.
 *
 * Every animated property is a CSS custom property (--sd-*) in 0..1 that the
 * stylesheet maps onto transform / opacity only. Visuals are aria-hidden; the
 * headlines are real text.
 */

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import styles from './ScanDemo.module.css';

// ===== Copy =====
export type ScanDemoBeat = { title: string; body: string };
export type ScanDemoProps = {
  eyebrow?: string;
  title?: string;
  beats?: Partial<ScanDemoBeat>[];
  id?: string;
  className?: string;
};

const DEFAULT_BEATS: ScanDemoBeat[] = [
  { title: 'Snap it.', body: 'Point your phone at the receipt. OPA reads the vendor, date and total for you.' },
  { title: 'It files itself.', body: 'The receipt lands in the right envelope. Spent and Remaining update on the spot.' },
  { title: 'Wrap in one click.', body: 'Reconcile the envelope and the top sheet is ready, line by line, for Hot Budget.' },
];

// ===== Numbers (fictional job) =====
const FLOAT = 1500;
const RECEIPT_TOTAL = 48.17;
const SPENT_AFTER = 1232.57;
const SPENT_BEFORE = SPENT_AFTER - RECEIPT_TOTAL; // 1184.40
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const money = (n: number) => usd.format(Math.round(n * 100) / 100);

// ===== Animation vars =====
const KEYS = ['scan', 'scanO', 'ocr1', 'ocr2', 'ocr3', 'shrink', 'card', 'row', 'count', 'flip', 'sheet', 'exp'] as const;
type Key = (typeof KEYS)[number];
type Vars = Record<Key, number>;

const ZERO: Vars = { scan: 0, scanO: 0, ocr1: 0, ocr2: 0, ocr3: 0, shrink: 0, card: 0, row: 0, count: 0, flip: 0, sheet: 0, exp: 0 };
const BEAT_END: Vars[] = [
  { ...ZERO, scan: 1, ocr1: 1, ocr2: 1, ocr3: 1 },
  { ...ZERO, card: 1, row: 1, count: 1 },
  { ...ZERO, card: 1, row: 1, count: 1, flip: 1, sheet: 1, exp: 1 },
];
const BEAT_START: Vars[] = [{ ...ZERO }, { ...ZERO, card: 1 }, { ...ZERO, card: 1, row: 1, count: 1 }];

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lin = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));
const seg = (x: number, a: number, b: number) => easeInOut(lin(x, a, b));
const scanOpacity = (s: number) => (s <= 0 || s >= 1 ? 0 : Math.min(1, s * 8, (1 - s) * 8));

/** Scroll timeline: p is 0..1 over the whole track. Beats are thirds. */
function scrollVars(p: number): Vars {
  const scan = lin(p, 0.04, 0.17);
  return {
    scan,
    scanO: scanOpacity(scan),
    ocr1: seg(p, 0.15, 0.2),
    ocr2: seg(p, 0.19, 0.24),
    ocr3: seg(p, 0.23, 0.28),
    shrink: seg(p, 0.36, 0.46),
    card: seg(p, 0.4, 0.49),
    row: seg(p, 0.47, 0.55),
    count: seg(p, 0.53, 0.62),
    flip: seg(p, 0.7, 0.75),
    sheet: seg(p, 0.78, 0.88),
    exp: seg(p, 0.88, 0.94),
  };
}

/** Time timeline for the stacked (narrow) version. ms since the beat started. */
const STACK_DURATION = [2100, 1700, 1800];
function stackVars(beat: number, ms: number): Vars {
  if (beat === 0) {
    const scan = lin(ms, 250, 1450);
    return { ...ZERO, scan, scanO: scanOpacity(scan), ocr1: seg(ms, 1300, 1600), ocr2: seg(ms, 1500, 1800), ocr3: seg(ms, 1700, 2000) };
  }
  if (beat === 1) return { ...ZERO, card: 1, row: seg(ms, 250, 850), count: seg(ms, 750, 1650) };
  return { ...ZERO, card: 1, row: 1, count: 1, flip: seg(ms, 250, 600), sheet: seg(ms, 750, 1350), exp: seg(ms, 1300, 1750) };
}

const receiptsLabel = (row: number) => (row >= 0.5 ? '12 receipts' : '11 receipts');

function varStyle(v: Vars): CSSProperties {
  const out: Record<string, string> = {};
  for (const k of KEYS) out[`--sd-${k}`] = String(v[k]);
  return out as CSSProperties;
}

function setText(el: Element | null, text: string) {
  if (el && el.textContent !== text) el.textContent = text;
}

/** Write vars + counter text straight to the DOM (no React render per frame). */
function applyVars(el: HTMLElement, v: Vars) {
  for (const k of KEYS) el.style.setProperty(`--sd-${k}`, v[k].toFixed(4));
  const spent = SPENT_BEFORE + RECEIPT_TOTAL * v.count;
  el.querySelectorAll('[data-sd="spent"]').forEach((n) => setText(n, money(spent)));
  el.querySelectorAll('[data-sd="remaining"]').forEach((n) => setText(n, money(FLOAT - spent)));
  el.querySelectorAll('[data-sd="receipts"]').forEach((n) => setText(n, receiptsLabel(v.row)));
}

// ===== Mode =====
type Mode = 'scroll' | 'stack' | 'static';
const MQ_REDUCE = '(prefers-reduced-motion: reduce)';
const MQ_NARROW = '(max-width: 734px)';

function subscribeMode(cb: () => void) {
  const a = window.matchMedia(MQ_REDUCE);
  const b = window.matchMedia(MQ_NARROW);
  a.addEventListener('change', cb);
  b.addEventListener('change', cb);
  return () => {
    a.removeEventListener('change', cb);
    b.removeEventListener('change', cb);
  };
}
function getMode(): Mode {
  if (window.matchMedia(MQ_REDUCE).matches) return 'static';
  return window.matchMedia(MQ_NARROW).matches ? 'stack' : 'scroll';
}
const getServerMode = (): Mode => 'static';

// ===== Visual pieces (all decorative, rendered inside aria-hidden wrappers) =====
function Phone() {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.island} />
        <div className={styles.viewfinder}>
          <span className={`${styles.corner} ${styles.cTL}`} />
          <span className={`${styles.corner} ${styles.cTR}`} />
          <span className={`${styles.corner} ${styles.cBL}`} />
          <span className={`${styles.corner} ${styles.cBR}`} />
          <div className={styles.receipt}>
            <div className={styles.scanClip}>
              <div className={styles.scanLine} />
            </div>
            <p className={styles.rVendor}>
              <span className={`${styles.hl} ${styles.hl1}`} data-label="Vendor">LARCHMONT HARDWARE</span>
            </p>
            <p className={styles.rAddr}>214 N Larchmont Blvd</p>
            <p className={styles.rAddr}>Los Angeles, CA 90004</p>
            <p className={styles.rMeta}>
              <span className={`${styles.hl} ${styles.hl2}`} data-label="Date">11/14/26</span>
              <span>2:41 PM</span>
            </p>
            <div className={styles.rRule} />
            <p className={styles.rLine}><span>GAFFER TAPE 2&quot; BLK x2</span><span>25.98</span></p>
            <p className={styles.rLine}><span>ZIP TIES 8&quot; 100CT</span><span>6.99</span></p>
            <p className={styles.rLine}><span>SASH CORD #8 100FT</span><span>11.02</span></p>
            <div className={styles.rRule} />
            <p className={styles.rLine}><span>SUBTOTAL</span><span>43.99</span></p>
            <p className={styles.rLine}><span>TAX 9.50%</span><span>4.18</span></p>
            <p className={`${styles.rLine} ${styles.rTotal}`}>
              <span>TOTAL</span>
              <span className={`${styles.hl} ${styles.hl3}`} data-label="Total">$48.17</span>
            </p>
            <p className={styles.rThanks}>VISA •••• 4417 · THANK YOU</p>
            <div className={styles.rZig} />
          </div>
        </div>
        <div className={styles.shutterBar}>
          <span className={styles.shutter} />
        </div>
      </div>
    </div>
  );
}

function StatusPill() {
  return (
    <span className={styles.pillStack}>
      <span className={`${styles.pill} ${styles.pillOpen}`}>
        <span className={styles.pillDot} />
        Open
      </span>
      <span className={`${styles.pill} ${styles.pillOk}`}>Reconciled ✓</span>
    </span>
  );
}

function EnvelopeCard({ v, compact = false }: { v: Vars; compact?: boolean }) {
  const spent = SPENT_BEFORE + RECEIPT_TOTAL * v.count;
  return (
    <div className={`${styles.card} ${styles.envCard}`}>
      <div className={styles.envHead}>
        <span className={styles.envIcon}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
            <path d="M3.5 7l8.5 6 8.5-6" />
          </svg>
        </span>
        <div className={styles.envTitles}>
          <p className={styles.envTitle}>
            Petty cash · Art · <span className={styles.nowrap} data-sd="receipts">{receiptsLabel(v.row)}</span>
          </p>
          <p className={styles.envSub}>Rosa Delgado · Art Dept</p>
        </div>
        <StatusPill />
      </div>
      {!compact && (
        <div className={styles.envBody}>
          <div className={styles.stats}>
            <div>
              <p className={styles.statLabel}>Spent</p>
              <p className={styles.statValue} data-sd="spent">{money(spent)}</p>
            </div>
            <div className={styles.statRight}>
              <p className={styles.statLabel}>Remaining</p>
              <p className={`${styles.statValue} ${styles.statOk}`} data-sd="remaining">{money(FLOAT - spent)}</p>
            </div>
          </div>
          <div className={styles.meter}>
            <span className={styles.meterFill} />
          </div>
          <p className={styles.meterSub}>of {money(FLOAT)} float</p>
          <ul className={styles.rows}>
            <li className={`${styles.row} ${styles.rowNew}`}>
              <span className={styles.rowThumb} />
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>Larchmont Hardware</span>
                <span className={styles.rowSub}>Nov 14 · Expendables</span>
              </span>
              <span className={styles.rowAmt}>{money(RECEIPT_TOTAL)}</span>
            </li>
            <li className={`${styles.row} ${styles.rowOld}`}>
              <span className={styles.rowThumb} />
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>Michaels</span>
                <span className={styles.rowSub}>Nov 13 · Set dressing</span>
              </span>
              <span className={styles.rowAmt}>{money(214.06)}</span>
            </li>
            <li className={`${styles.row} ${styles.rowOld}`}>
              <span className={styles.rowThumb} />
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>Smart &amp; Final</span>
                <span className={styles.rowSub}>Nov 12 · Props</span>
              </span>
              <span className={styles.rowAmt}>{money(96.18)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const SHEET_LINES: [string, string, number][] = [
  ['61', 'Set dressing purchases', 612.4],
  ['62', 'Props purchases', 388.92],
  ['64', 'Expendables', 231.25],
];

function TopSheet() {
  return (
    <div className={`${styles.card} ${styles.sheet}`}>
      <div className={styles.sheetHead}>
        <p className={styles.sheetTitle}>Top sheet</p>
        <p className={styles.sheetSub}>Petty cash · Art · 12 receipts</p>
      </div>
      <div className={styles.sheetCols}>
        <span>Line</span>
        <span>Description</span>
        <span className={styles.num}>Actual</span>
      </div>
      {SHEET_LINES.map(([line, desc, amt]) => (
        <div key={line} className={styles.sheetRow}>
          <span className={styles.sheetLine}>{line}</span>
          <span className={styles.sheetDesc}>{desc}</span>
          <span className={styles.num}>{money(amt)}</span>
        </div>
      ))}
      <div className={`${styles.sheetRow} ${styles.sheetTotal}`}>
        <span />
        <span className={styles.sheetDesc}>Total</span>
        <span className={styles.num}>{money(SPENT_AFTER)}</span>
      </div>
      <div className={styles.sheetFoot}>
        <span className={styles.exportPill}>
          Export to Hot Budget
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function BeatVisual({ beat, v }: { beat: number; v: Vars }) {
  if (beat === 0) return <Phone />;
  if (beat === 1) return <EnvelopeCard v={v} />;
  return (
    <div className={styles.beat3Visual}>
      <EnvelopeCard v={v} compact />
      <div className={styles.sheetWrap}>
        <TopSheet />
      </div>
    </div>
  );
}

// ===== Component =====
export default function ScanDemo({ eyebrow = 'How it works', title = 'From pocket to top sheet.', beats, id, className }: ScanDemoProps) {
  const mode = useSyncExternalStore(subscribeMode, getMode, getServerMode);
  const headingId = useId();
  const copy = DEFAULT_BEATS.map((d, i) => ({ ...d, ...(beats?.[i] ?? {}) }));

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  // ---- Scroll mode: sticky stage driven by scroll progress ----
  useEffect(() => {
    if (mode !== 'scroll') return;
    const track = trackRef.current;
    const stage = stageRef.current;
    const wrap = sceneWrapRef.current;
    if (!track || !stage || !wrap) return;

    let raf = 0;
    let inView = !('IntersectionObserver' in window);

    const fit = () => {
      const s = Math.min(1, wrap.clientHeight / 540, wrap.clientWidth / 520);
      stage.style.setProperty('--sd-fit', String(Math.max(0.5, s)));
    };
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;
      applyVars(stage, scrollVars(p));
      const b = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
      if (b !== activeRef.current) {
        activeRef.current = b;
        setActive(b);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (inView) schedule();
    };
    const onResize = () => {
      fit();
      schedule();
    };

    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) schedule();
        },
        { rootMargin: '10% 0px 10% 0px' },
      );
      io.observe(track);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    fit();
    schedule();
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);

  // ---- Stack mode: each beat plays once when it scrolls into view ----
  useEffect(() => {
    if (mode !== 'stack') return;
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>('[data-sd-beat]'));
    const rafs = new Set<number>();

    const play = (el: HTMLElement) => {
      const beat = Number(el.dataset.sdBeat);
      const dur = STACK_DURATION[beat];
      const t0 = performance.now();
      const tick = (now: number) => {
        const ms = now - t0;
        applyVars(el, stackVars(beat, ms));
        if (ms < dur) {
          const id = requestAnimationFrame(tick);
          rafs.add(id);
        }
      };
      rafs.add(requestAnimationFrame(tick));
    };

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => applyVars(el, BEAT_END[Number(el.dataset.sdBeat)]));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          play(e.target as HTMLElement);
        });
      },
      { threshold: 0.45 },
    );
    items.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      rafs.forEach((id) => cancelAnimationFrame(id));
    };
  }, [mode]);

  const rootClass = [styles.root, styles[mode], className].filter(Boolean).join(' ');

  return (
    <section id={id} className={rootClass} aria-labelledby={headingId}>
      <header className={styles.intro}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
      </header>

      {mode === 'scroll' ? (
        <div ref={trackRef} className={styles.track}>
          <div ref={stageRef} className={styles.stage} style={varStyle(ZERO)}>
            <div className={styles.copyCol}>
              <div className={styles.headlines}>
                {copy.map((b, i) => (
                  <div key={i} className={`${styles.headline} ${i === active ? styles.isActive : ''}`}>
                    <h3 className={styles.beatTitle}>{b.title}</h3>
                    <p className={styles.beatBody}>{b.body}</p>
                  </div>
                ))}
              </div>
              <div className={styles.dots} aria-hidden="true">
                {copy.map((_, i) => (
                  <span key={i} className={`${styles.dot} ${i === active ? styles.dotOn : ''}`} />
                ))}
              </div>
            </div>
            <div ref={sceneWrapRef} className={styles.sceneWrap} aria-hidden="true">
              <div className={styles.scene}>
                <div className={styles.layerPhone}>
                  <Phone />
                </div>
                <div className={styles.layerCard}>
                  <EnvelopeCard v={ZERO} />
                </div>
                <div className={styles.layerSheet}>
                  <TopSheet />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ol ref={listRef} className={styles.beats}>
          {copy.map((b, i) => {
            const v = mode === 'static' ? BEAT_END[i] : BEAT_START[i];
            return (
              <li key={`${mode}-${i}`} data-sd-beat={i} className={styles.beat} style={varStyle(v)}>
                <div className={styles.beatText}>
                  <h3 className={styles.beatTitle}>{b.title}</h3>
                  <p className={styles.beatBody}>{b.body}</p>
                </div>
                <div className={styles.beatVisual} aria-hidden="true">
                  <BeatVisual beat={i} v={v} />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
