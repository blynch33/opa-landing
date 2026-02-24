/**
 * MobilePreviewSection — "Works where you work" landing page section
 * Shows iOS wireframe mockups of key mobile flows.
 * Swap wireframes for real screenshots when the app ships.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Reveal wrapper (matches landing page pattern) ───────────────
const RevealOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ── Phone Frame Shell ──────────────────────────────────────────
function PhoneFrame({ children, label, note }: { children: React.ReactNode; label: string; note: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: 'rgba(131, 151, 136, 0.5)',
      }}>
        {label}
      </span>

      {/* Device */}
      <div style={{
        width: '260px',
        minHeight: '540px',
        background: '#000',
        borderRadius: '32px',
        padding: '7px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: '100%',
          minHeight: '526px',
          borderRadius: '25px',
          overflow: 'hidden',
          position: 'relative',
          background: 'var(--porcelain)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: '7px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '82px',
            height: '22px',
            background: '#000',
            borderRadius: '18px',
            zIndex: 50,
          }} />
          {children}
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        color: 'var(--sage)',
        textAlign: 'center',
        maxWidth: '240px',
        lineHeight: 1.6,
      }}>
        {note}
      </p>
    </div>
  );
}

// ── Status Bar ─────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const color = light ? '#fff' : 'var(--ink)';
  return (
    <div style={{
      height: '40px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 20px 4px',
      fontSize: '10px',
      fontWeight: 600,
      color,
      position: 'relative',
      zIndex: 40,
      flexShrink: 0,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
        <svg width="13" height="9" viewBox="0 0 14 10" fill="currentColor">
          <rect x="0" y="3" width="2.5" height="7" rx="0.5" />
          <rect x="3.5" y="2" width="2.5" height="8" rx="0.5" />
          <rect x="7" y="1" width="2.5" height="9" rx="0.5" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ── Home Indicator ─────────────────────────────────────────────
function HomeIndicator({ light = false }: { light?: boolean }) {
  return (
    <div style={{ height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 'auto' }}>
      <div style={{ width: '90px', height: '4px', borderRadius: '9999px', background: light ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }} />
    </div>
  );
}

// ── Scan FAB ───────────────────────────────────────────────────
function ScanFAB() {
  return (
    <div style={{ position: 'absolute', bottom: '66px', right: '14px', zIndex: 40 }}>
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'var(--terracotta)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(196,114,95,0.4)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <circle cx="12" cy="14" r="3.5" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
        </svg>
      </div>
    </div>
  );
}

// ── Tab Bar ────────────────────────────────────────────────────
function TabBar() {
  const tabs = [
    { label: 'Jobs', active: true, icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="14" height="14" rx="2" /><line x1="2" y1="7" x2="16" y2="7" /><line x1="7" y1="7" x2="7" y2="16" /></svg> },
    { label: 'Reports', active: false, icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="14" height="12" rx="1.5" /><line x1="5" y1="7" x2="13" y2="7" /><line x1="5" y1="10" x2="10" y2="10" /></svg> },
    { label: 'Settings', active: false, icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="9" r="6.5" /><circle cx="9" cy="9" r="2" /></svg> },
  ];
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '7px 0',
      background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      flexShrink: 0,
    }}>
      {tabs.map((tab) => (
        <div key={tab.label} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          fontSize: '8px',
          color: tab.active ? 'var(--forest)' : 'var(--sage)',
        }}>
          <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tab.icon}</div>
          {tab.label}
        </div>
      ))}
    </div>
  );
}

// ── Env Item (list row) ────────────────────────────────────────
function EnvItem({ name, meta, amount }: { name: string; meta: string; amount: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '9px',
      padding: '10px 12px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid rgba(0,0,0,0.03)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    }}>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>{name}</div>
        <div style={{ fontSize: '9px', color: 'var(--sage)', marginTop: '1px' }}>{meta}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: 'var(--ink)' }}>{amount}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 1 — Batch Scan
// ════════════════════════════════════════════════════════════════
function BatchScanScreen() {
  return (
    <PhoneFrame label="Batch Scan" note="Snap every receipt in the stack. Close the app. OCR runs in the background.">
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--ink)' }}>
        <StatusBar light />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Done</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 9px', borderRadius: '10px' }}>3 scanned</span>
        </div>

        {/* Viewfinder */}
        <div style={{ flex: 1, margin: '0 20px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Corner marks */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: '20px', height: '20px', borderTop: '2.5px solid #fff', borderLeft: '2.5px solid #fff', borderTopLeftRadius: '3px' }} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: '20px', height: '20px', borderTop: '2.5px solid #fff', borderRight: '2.5px solid #fff', borderTopRightRadius: '3px' }} />
          <div style={{ position: 'absolute', bottom: -1, left: -1, width: '20px', height: '20px', borderBottom: '2.5px solid #fff', borderLeft: '2.5px solid #fff', borderBottomLeftRadius: '3px' }} />
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: '20px', height: '20px', borderBottom: '2.5px solid #fff', borderRight: '2.5px solid #fff', borderBottomRightRadius: '3px' }} />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: 1.6 }}>Position receipt<br />within frame</span>
        </div>

        {/* Thumbnails */}
        <div style={{ display: 'flex', gap: '5px', padding: '8px 20px', flexShrink: 0 }}>
          {[false, false, true].map((latest, i) => (
            <div key={i} style={{
              width: '36px',
              height: '46px',
              borderRadius: '3px',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: latest ? '1.5px solid var(--terracotta)' : '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                <div style={{ height: '1.5px', width: '16px', background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />
                <div style={{ height: '1.5px', width: '22px', background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />
                <div style={{ height: '1.5px', width: '14px', background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Shutter controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', padding: '12px 0', flexShrink: 0 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="1.5" /><polyline points="2,11 5.5,7 8,9.5 10.5,7 14,11" /></svg>
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '39px', height: '39px', borderRadius: '50%', background: '#fff' }} />
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round"><path d="M8 3v10M5 5.5L8 3l3 2.5" /><line x1="3" y1="13" x2="13" y2="13" /></svg>
          </div>
        </div>

        {/* Done button */}
        <div style={{ padding: '0 20px 3px', flexShrink: 0 }}>
          <div style={{
            width: '100%',
            background: 'var(--terracotta)',
            color: '#fff',
            borderRadius: '9px',
            padding: '10px 0',
            fontSize: '11px',
            fontWeight: 600,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}>
            Done — Classify Later
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round"><polyline points="4,2 8,6 4,10" /></svg>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingBottom: '2px', fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', flexShrink: 0 }}>OCR RUNS IN BACKGROUND</div>
        <HomeIndicator light />
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 2 — Background Processing
// ════════════════════════════════════════════════════════════════
function BackgroundProcessingScreen() {
  return (
    <PhoneFrame label="Background OCR" note="Come back later. Everything's extracted. Just drag receipts into envelopes.">
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        <StatusBar />

        {/* Toast */}
        <div style={{ position: 'absolute', top: '48px', left: '12px', right: '12px', zIndex: 50 }}>
          <div style={{ background: 'var(--ink)', borderRadius: '9px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><polyline points="2,5.5 4,7.5 8,3" /></svg>
            </div>
            <span style={{ fontSize: '9.5px', fontWeight: 500, color: '#fff' }}>3 receipts processed. 2 need envelopes.</span>
          </div>
        </div>

        <div style={{ padding: '12px 20px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: 'var(--ink)' }}>Your Jobs</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'var(--sage)', letterSpacing: '0.08em', marginTop: '2px' }}>3 ACTIVE · 2 WRAPPED</div>
        </div>

        <div style={{ padding: '0 12px', flex: 1 }}>
          {/* Processing banner */}
          <div style={{
            background: '#fff',
            borderRadius: '9px',
            padding: '9px 12px',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            border: '1px solid rgba(0,0,0,0.03)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(131,151,136,0.3)', borderTopColor: 'var(--forest)', flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '10px', color: 'var(--ink)' }}>2 receipts need envelopes</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', color: 'var(--sage)', marginTop: '1px' }}>HOME DEPOT $347.82 · STARBUCKS $12.50</div>
            </div>
            <svg width="5" height="9" viewBox="0 0 6 10" fill="none" stroke="#839788" strokeWidth="1.3" strokeLinecap="round" style={{ marginLeft: 'auto', flexShrink: 0 }}><polyline points="1,1 5,5 1,9" /></svg>
          </div>
          <EnvItem name="Nike Spring '26" meta="Commercial · 4 envelopes" amount="$12,847" />
          <EnvItem name='Adidas "Run With It"' meta="Music video · 6 envelopes" amount="$8,340" />
        </div>

        <ScanFAB />
        <TabBar />
        <HomeIndicator />
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 3 — Guest Upload
// ════════════════════════════════════════════════════════════════
function GuestUploadScreen() {
  return (
    <PhoneFrame label="Guest Upload" note="Crew gets a link. Opens in their browser. No app, no account. Just upload.">
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <StatusBar />

        {/* Hero */}
        <div style={{ background: 'var(--forest)', padding: '16px 20px', textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff', marginBottom: '10px' }}><span style={{ color: 'var(--terracotta)' }}>o</span>pa</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#fff', fontWeight: 400, marginBottom: '2px' }}>Nike Spring &apos;26</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>Camera Dept · Petty Cash</div>
        </div>

        <div style={{ padding: '16px', flex: 1, background: 'var(--porcelain)' }}>
          <p style={{ fontSize: '11px', color: 'var(--sage)', textAlign: 'center', lineHeight: 1.6, marginBottom: '16px' }}>
            Upload your receipts for this envelope.<br />No account needed — just snap and submit.
          </p>

          {/* Upload zone */}
          <div style={{
            border: '2px dashed rgba(131,151,136,0.3)',
            borderRadius: '12px',
            padding: '28px 20px',
            textAlign: 'center',
            background: '#fff',
            marginBottom: '16px',
          }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#839788" strokeWidth="1.8" strokeLinecap="round" style={{ display: 'block', margin: '0 auto 8px' }}>
              <rect x="4" y="8" width="24" height="18" rx="3" />
              <circle cx="16" cy="18" r="5" />
              <path d="M11 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>Tap to take photo</div>
            <div style={{ fontSize: '9px', color: 'var(--sage)' }}>or choose from camera roll</div>
          </div>

          <p style={{ fontSize: '9px', color: 'var(--sage)', textAlign: 'center' }}>Your uploads are only visible to the production manager.</p>
        </div>

        <div style={{ padding: '0 16px 4px', background: 'var(--porcelain)', flexShrink: 0 }}>
          <div style={{ textAlign: 'center', padding: '8px 0', fontSize: '8.5px', color: 'var(--sage)' }}>
            Powered by <span style={{ color: 'var(--forest)', fontWeight: 600 }}>OPA</span> — production expense tracking
          </div>
        </div>
        <HomeIndicator />
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 4 — Coordinator View
// ════════════════════════════════════════════════════════════════
function CoordinatorViewScreen() {
  return (
    <PhoneFrame label="Coordinator View" note="Same layout, scoped access. Locked features shown, not hidden.">
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        <StatusBar light />

        {/* Toast */}
        <div style={{ position: 'absolute', top: '48px', left: '12px', right: '12px', zIndex: 50 }}>
          <div style={{ background: 'var(--ink)', borderRadius: '9px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="5" r="3.5" /><line x1="5" y1="3.5" x2="5" y2="5.5" /><circle cx="5" cy="7" r="0.4" fill="white" /></svg>
            </div>
            <span style={{ fontSize: '9.5px', fontWeight: 500, color: '#fff' }}>Viewing as Coordinator</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: 'var(--forest)', padding: '8px 20px 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <svg width="9" height="14" viewBox="0 0 10 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,2 2,8 8,14" /></svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '2px 6px', borderRadius: '3px' }}>COORDINATOR</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff', fontWeight: 400 }}>Nike Spring &apos;26</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', marginTop: '2px' }}>Shared by Brendan</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>Total spend</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>$12,847.50</div>
        </div>

        <div style={{ padding: '12px', flex: 1, background: 'var(--porcelain)' }}>
          {/* Envelope items with badges */}
          <div style={{
            background: '#fff',
            borderRadius: '9px',
            padding: '10px 12px',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>Camera Dept</div>
              <div style={{ fontSize: '9px', color: 'var(--sage)', marginTop: '1px' }}>8 receipts · Petty cash</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: 'var(--ink)' }}>$2,340</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', padding: '1px 4px', borderRadius: '2px', background: 'rgba(19,70,17,0.1)', color: 'var(--forest)' }}>Reconciled</span>
            </div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: '9px',
            padding: '10px 12px',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>Art Department</div>
              <div style={{ fontSize: '9px', color: 'var(--sage)', marginTop: '1px' }}>14 receipts · Petty cash</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: 'var(--ink)' }}>$4,890</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', padding: '1px 4px', borderRadius: '2px', background: 'rgba(188,108,37,0.15)', color: 'var(--warning)' }}>Pending</span>
            </div>
          </div>

          {/* Locked indicator */}
          <div style={{ marginTop: '12px', padding: '9px 12px', background: 'rgba(131,151,136,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#839788" strokeWidth="1.3" strokeLinecap="round"><rect x="3" y="6" width="8" height="6" rx="1.5" /><path d="M5 6V4.5a2 2 0 0 1 4 0V6" /></svg>
            <span style={{ fontSize: '9px', color: 'var(--sage)' }}>Reconcile and export are PM-only</span>
          </div>
        </div>

        <ScanFAB />
        <HomeIndicator />
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// EXPORTED SECTION
// ════════════════════════════════════════════════════════════════
export default function MobilePreviewSection() {
  return (
    <section style={{
      background: 'var(--ink)',
      padding: '64px 0 80px',
      overflow: 'hidden',
    }}>
      <div className="container">
        {/* Header */}
        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'var(--terracotta)',
              marginBottom: '12px',
            }}>
              Coming to iOS
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 500,
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}>
              Works where you work.
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--sage)',
              maxWidth: '440px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Scan receipts on set. Close the app. Come back later and everything&apos;s sorted.
              Your crew doesn&apos;t even need an account.
            </p>
          </div>
        </RevealOnScroll>

        {/* Phone grid */}
        <div className="mobile-preview-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          justifyItems: 'center',
        }}>
          <RevealOnScroll delay={0}><BatchScanScreen /></RevealOnScroll>
          <RevealOnScroll delay={150}><BackgroundProcessingScreen /></RevealOnScroll>
          <RevealOnScroll delay={300}><GuestUploadScreen /></RevealOnScroll>
          <RevealOnScroll delay={450}><CoordinatorViewScreen /></RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-preview-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 16px !important;
          }
        }
        @media (max-width: 640px) {
          .mobile-preview-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
