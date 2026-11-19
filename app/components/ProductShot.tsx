'use client';

/**
 * ProductShot — a pixel-faithful HTML/CSS recreation of OPA's Job view,
 * framed as a macOS window. Decorative hero image: aria-hidden, no pointer
 * events, with a visually-hidden description for screen readers.
 *
 * All names, job numbers and card digits are fictional. Numbers reconcile:
 * envelope received − spent = remaining, and summary lines sum to total spend.
 *
 * Rendered at a fixed design width and scaled to fit with ResizeObserver.
 * Plays a one-time entrance (rise + tilt settle, count-up, row stagger,
 * Open → Reconciled pills) when scrolled into view; reduced motion skips it.
 */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Ellipsis,
  FolderOpen,
  HandCoins,
  Hash,
  Plus,
  Receipt,
  Undo2,
  Wallet,
} from 'lucide-react';
import s from './ProductShot.module.css';

/* ---------- Fictional data ---------- */

const JOB = {
  title: 'Northlight — Spring Spot',
  company: 'Halcyon Pictures',
  number: '24-1187',
  date: 'Oct 14, 2026',
};

type Envelope = {
  name: string;
  kind: 'pc' | 'reimb';
  meta: string;
  received: number;
  spent: number;
};

const ENVELOPES: Envelope[] = [
  { name: 'Theo Marchetti', kind: 'pc', meta: 'Petty cash · Craft Service · 24 receipts', received: 3000, spent: 2418.65 },
  { name: 'Priya Okonjo', kind: 'pc', meta: 'Petty cash · Art Department · 41 receipts', received: 5000, spent: 4286.4 },
  { name: 'Lena Sorvik', kind: 'pc', meta: 'Petty cash · Wardrobe · 28 receipts', received: 2500, spent: 2193.17 },
  { name: 'Wes Hadley', kind: 'pc', meta: 'Petty cash · Production · 36 receipts', received: 3287.5, spent: 1874.38 },
  {
    name: 'Dario Fenn',
    kind: 'reimb',
    meta: 'Reimbursement · Production · Card ····4417 · Paid from petty cash · 3 receipts',
    received: 212.5,
    spent: 212.5,
  },
];

const SUMMARY: { line: number; category: string; total: number }[] = [
  { line: 105, category: 'Deliveries & Taxi', total: 642.18 },
  { line: 112, category: 'Working Meals', total: 1386.4 },
  { line: 138, category: 'Craft Service', total: 2418.65 },
  { line: 144, category: 'Wardrobe Purchase', total: 2193.17 },
  { line: 181, category: 'Prop Purchase', total: 2156.92 },
  { line: 182, category: 'Set Dressing Purchases', total: 2129.48 },
  { line: 204, category: 'Production Supplies', total: 58.3 },
];

const RECEIPTS = 132;
const cents = (n: number) => Math.round(n * 100);
const TOTAL_RECEIVED = ENVELOPES.reduce((a, e) => a + cents(e.received), 0) / 100; // 14,000.00
const TOTAL_SPENT = ENVELOPES.reduce((a, e) => a + cents(e.spent), 0) / 100; // 10,985.10
const TOTAL_REMAINING = (cents(TOTAL_RECEIVED) - cents(TOTAL_SPENT)) / 100; // 3,014.90
const SUMMARY_TOTAL = SUMMARY.reduce((a, l) => a + cents(l.total), 0) / 100; // 10,985.10

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
const fmt = (n: number) => usd.format(n);

/* ---------- Layout + timing ---------- */

const DESIGN_W = 1280; // 40px gutter + 1200px window + 40px gutter (room for the shadow)
const PHONE_BREAK = 640; // container px below which we crop + fade
const PHONE_CROP = 760; // design px shown when cropped

const COUNT_DELAY = 350;
const COUNT_DUR = 1200;
const ROW_DELAY = 450;
const ROW_STEP = 70;
const PILL_DELAY = 1250;
const PILL_STEP = 120;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Phase = 'idle' | 'play' | 'done';

export default function ProductShot() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; height: number; cropped: boolean } | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0); // count-up 0..1
  const [reconciled, setReconciled] = useState(0); // pills flipped so far

  // Fit the fixed-width design to the container.
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      const w = outer.clientWidth;
      const scale = Math.min(1, w / DESIGN_W);
      const cropped = w < PHONE_BREAK;
      const designH = cropped ? Math.min(PHONE_CROP, inner.offsetHeight) : inner.offsetHeight;
      setBox({ scale, height: designH * scale, cropped });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  // Play once when scrolled into view (or jump to the end for reduced motion).
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const finish = () => {
      setProgress(1);
      setReconciled(ENVELOPES.length);
      setPhase('done');
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      finish();
      return;
    }
    const timers: number[] = [];
    let raf = 0;
    const play = () => {
      setPhase('play');
      const start = performance.now() + COUNT_DELAY;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / COUNT_DUR));
        setProgress(easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      ENVELOPES.forEach((_, i) => {
        timers.push(window.setTimeout(() => setReconciled(i + 1), PILL_DELAY + i * PILL_STEP));
      });
      timers.push(window.setTimeout(() => setPhase('done'), PILL_DELAY + ENVELOPES.length * PILL_STEP + 400));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  const count = (n: number) => Math.round(n * progress * 100) / 100;
  const open = ENVELOPES.length - reconciled;

  const outerStyle: CSSProperties = box ? { height: box.height } : { aspectRatio: '1280 / 1180' };
  const innerStyle: CSSProperties = { transform: `scale(${box?.scale ?? 1})`, visibility: box ? 'visible' : 'hidden' };

  return (
    <figure className={s.figure}>
      <span className={s.srOnly}>
        Screenshot of the OPA Job view: a job header with summary totals, a table of petty cash envelopes all marked
        reconciled, and a job summary of spend by budget line.
      </span>
      <div
        ref={outerRef}
        className={`${s.outer} ${box?.cropped ? s.cropped : ''}`}
        style={outerStyle}
        aria-hidden="true"
      >
        <div ref={innerRef} className={s.inner} style={innerStyle} data-phase={phase}>
          <div className={s.window}>
            <div className={s.titlebar}>
              <span className={s.dot} data-c="r" />
              <span className={s.dot} data-c="y" />
              <span className={s.dot} data-c="g" />
            </div>

            <div className={s.page}>
              {/* Top bar */}
              <div className={s.topbar}>
                <span className={s.back}>
                  <ChevronLeft size={20} strokeWidth={2.4} />
                  Jobs
                </span>
                <div className={s.actions}>
                  <span className={`${s.btn} ${s.btnGrey}`}>
                    <Hash size={15} strokeWidth={2.2} />
                    Line Numbers
                  </span>
                  <span className={`${s.btn} ${s.btnPrimary}`}>
                    <Plus size={16} strokeWidth={2.6} />
                    New Envelope
                  </span>
                  <span className={`${s.btn} ${s.btnGrey} ${s.btnRound}`}>
                    <Ellipsis size={18} strokeWidth={2.2} />
                  </span>
                </div>
              </div>

              {/* Header */}
              <span className={`${s.pill} ${s.pillPending}`}>
                <span className={s.pillDot} />
                Wrap
              </span>
              <h3 className={s.title}>{JOB.title}</h3>
              <p className={s.subline}>
                {JOB.company} · #{JOB.number} · {JOB.date}
              </p>

              {/* Stat tiles */}
              <div className={s.tiles}>
                <Tile icon={<Receipt size={16} />} label="Total Spend" value={fmt(count(TOTAL_SPENT))} sub={`${Math.round(RECEIPTS * progress)} receipts`} />
                <Tile icon={<Wallet size={16} />} label="Petty Cash Received" value={fmt(count(TOTAL_RECEIVED))} sub="Float handed out" />
                <Tile icon={<Undo2 size={16} />} label="PC to Return" value={fmt(count(TOTAL_REMAINING))} sub="Unspent float" />
                <Tile icon={<HandCoins size={16} />} label="To Reimburse" value={fmt(0)} sub="Nothing owed" />
                <Tile
                  icon={<FolderOpen size={16} />}
                  label="Open Envelopes"
                  value={String(open)}
                  sub={`of ${ENVELOPES.length} · ${open === 0 ? 'none need review' : `${open} need review`}`}
                />
              </div>

              {/* Envelopes */}
              <div className={s.sectionHead}>
                <h4 className={s.sectionTitle}>Envelopes</h4>
                <div className={s.segmented}>
                  <span className={s.segment}>
                    Needs review <span className={s.segCount}>{open}</span>
                  </span>
                  <span className={`${s.segment} ${s.segmentOn}`}>
                    All <span className={s.segCount}>{ENVELOPES.length}</span>
                  </span>
                  <span className={s.segment}>
                    Reconciled <span className={s.segCount}>{reconciled}</span>
                  </span>
                </div>
              </div>

              <div className={s.card}>
                <div className={`${s.envRow} ${s.headRow}`}>
                  <span>Envelope</span>
                  <span className={s.num}>Received</span>
                  <span className={s.num}>Spent</span>
                  <span className={s.num}>Remaining</span>
                  <span>Status</span>
                  <span />
                </div>
                {ENVELOPES.map((e, i) => {
                  const remaining = (cents(e.received) - cents(e.spent)) / 100;
                  const done = i < reconciled;
                  return (
                    <div
                      key={e.name}
                      className={`${s.envRow} ${s.bodyRow} ${i === 1 ? s.hover : ''}`}
                      style={{ '--d': `${ROW_DELAY + i * ROW_STEP}ms` } as CSSProperties}
                    >
                      <div className={s.envName}>
                        <span className={`${s.envIcon} ${e.kind === 'pc' ? s.envIconPc : s.envIconReimb}`}>
                          {e.kind === 'pc' ? <Wallet size={17} /> : <CreditCard size={17} />}
                        </span>
                        <div className={s.envText}>
                          <div className={s.envTitle}>{e.name}</div>
                          <div className={s.envMeta}>{e.meta}</div>
                        </div>
                      </div>
                      <span className={s.num}>{fmt(e.received)}</span>
                      <span className={`${s.num} ${s.semibold}`}>{fmt(e.spent)}</span>
                      <span className={`${s.num} ${s.stack}`}>
                        <span>{fmt(remaining)}</span>
                        <span className={s.muted}>returned</span>
                      </span>
                      <span className={s.statusCell}>
                        <span className={`${s.pill} ${s.pillPending} ${s.swap} ${done ? s.off : ''}`}>
                          <span className={s.pillDot} />
                          Open
                        </span>
                        <span className={`${s.pill} ${s.pillOk} ${s.swap} ${done ? '' : s.off}`}>
                          <Check size={13} strokeWidth={3} />
                          Reconciled
                        </span>
                      </span>
                      <span className={s.rowTrail}>
                        <ChevronRight size={16} />
                        <Ellipsis size={16} />
                      </span>
                    </div>
                  );
                })}
                <div className={`${s.envRow} ${s.footRow}`}>
                  <span>
                    Total · {ENVELOPES.length} envelopes
                  </span>
                  <span className={`${s.num} ${s.bold}`}>{fmt(TOTAL_RECEIVED)}</span>
                  <span className={`${s.num} ${s.bold}`}>{fmt(TOTAL_SPENT)}</span>
                  <span className={`${s.num} ${s.bold}`}>{fmt(TOTAL_REMAINING)}</span>
                  <span />
                  <span />
                </div>
              </div>

              {/* Job Summary */}
              <div className={s.sectionHead}>
                <h4 className={`${s.sectionTitle} ${s.collapsible}`}>
                  <ChevronDown size={18} strokeWidth={2.4} />
                  Job Summary
                </h4>
                <div className={s.summaryMeta}>
                  <span className={s.muted}>{RECEIPTS} receipts</span>
                  <span className={`${s.num} ${s.bold}`}>{fmt(SUMMARY_TOTAL)}</span>
                </div>
              </div>

              <div className={s.card}>
                <div className={`${s.sumRow} ${s.headRow}`}>
                  <span>Line</span>
                  <span>Category</span>
                  <span className={s.num}>Total</span>
                </div>
                {SUMMARY.map((l) => (
                  <div key={l.line} className={`${s.sumRow} ${s.bodyRow} ${s.sumBody}`}>
                    <span className={`${s.muted} ${s.tab}`}>{l.line}</span>
                    <span>{l.category}</span>
                    <span className={s.num}>
                      <span className={s.dotted}>{fmt(l.total)}</span>
                    </span>
                  </div>
                ))}
                <div className={`${s.sumRow} ${s.footRow}`}>
                  <span>Total</span>
                  <span />
                  <span className={`${s.num} ${s.bold}`}>
                    <span className={s.dotted}>{fmt(SUMMARY_TOTAL)}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function Tile({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className={s.tile}>
      <div className={s.tileLabel}>
        {icon}
        {label}
      </div>
      <div className={s.tileValue}>{value}</div>
      <div className={s.tileSub}>{sub}</div>
    </div>
  );
}
