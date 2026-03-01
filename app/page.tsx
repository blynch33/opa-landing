'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MobilePreviewSection from './components/MobilePreviewSection';

// ===== CONSTANTS =====
const APP_URL = 'https://app.useopa.com/login';
const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_FOUNDING_LINK || 'https://buy.stripe.com/00w28t0vL9O5fL48lt28802';
const FOUNDING_CAP = 100;

// ===== SCROLL REVEAL =====
const RevealOnScroll = ({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
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

  const translateFrom = direction === 'up' ? 'translateY(40px)' : direction === 'left' ? 'translateX(-40px)' : 'translateX(40px)';

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : translateFrom,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ===== ANIMATED COUNTER =====
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setHasStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || target === 0) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [hasStarted, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ===== ICONS =====
const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
  </svg>
);

const SpreadsheetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M8 13h2" />
    <path d="M14 13h2" />
    <path d="M8 17h2" />
    <path d="M14 17h2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round">
    <polyline points="3,8 6.5,11.5 13,5" />
  </svg>
);

// ===== FAQ DATA =====
const faqs = [
  {
    question: "Is this just for petty cash?",
    answer: "Today, yes — and OPA does it exceptionally well. Receipts, envelopes, budget lines, top sheets. Purchase orders and cost reports are coming soon."
  },
  {
    question: "Does it work on Windows?",
    answer: "Yes. OPA is entirely browser-based. It works on Mac, Windows, Chromebook, iPad, iPhone, Android — anything with a browser. No downloads, no desktop-only limitations."
  },
  {
    question: "What if I'm not tech-savvy?",
    answer: "Perfect. OPA was built for people who'd rather be on set than debugging software. If you can take a photo of a receipt, you can use OPA."
  },
  {
    question: "How is this different from Excel?",
    answer: "Excel is a blank canvas that requires you to build everything from scratch — and maintain it forever. OPA already knows how production works: envelopes, line items, petty cash reconciliation. You focus on the work, not the spreadsheet."
  },
  {
    question: "What's the founding member rate?",
    answer: "$29/month, locked in for as long as you're subscribed. We're offering this rate to the first 100 members who help shape the product. The standard price will be $49/month. Founding members keep $29 forever."
  },
  {
    question: "Are there per-transaction or per-receipt fees?",
    answer: "No. $29/month flat. Upload as many receipts as you want. Create as many jobs and envelopes as you need. No hidden fees. No surprises."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Bank-level encryption. Your data is never shared with third parties. Production budgets are sensitive — they're safe with us."
  },
  {
    question: "Can my whole team use it?",
    answer: "Yes. Invite your coordinator, PAs, and line producer to a shared job. Each role sees what they need. PAs can upload receipts without a paid account using a share link."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No contracts. Cancel from your account settings and your subscription ends at the end of the billing period."
  },
];

// ===== STYLES =====
const styles = {
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '16px 0',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    background: 'rgba(246, 244, 238, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 20px rgba(13, 27, 42, 0.08)',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 500,
    color: 'var(--forest)',
    letterSpacing: '-0.03em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '0.95rem',
    color: 'var(--ink)',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  section: {
    padding: 'var(--space-4xl) 0',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: 'var(--space-2xl)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400,
    marginBottom: '16px',
  },
  featureForest: {
    background: 'linear-gradient(135deg, var(--forest-dark) 0%, #0d3a0b 100%)',
    color: 'var(--porcelain)',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 'var(--radius-xl)',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  featureLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--lichen)',
    marginBottom: '12px',
  },
  featureTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 500,
    marginBottom: '12px',
    color: 'var(--porcelain)',
  },
  featureDesc: {
    color: 'var(--sage-light)',
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },
  faqGrid: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqItem: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  faqQuestion: {
    width: '100%',
    padding: '24px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 500,
    textAlign: 'left' as const,
    color: 'var(--ink)',
  },
  faqAnswer: {
    padding: '0 32px 24px',
    color: 'var(--sage)',
    lineHeight: 1.7,
  },
  footer: {
    background: 'var(--moss-light)',
    color: 'var(--ink)',
    padding: '20px 0',
    borderTop: '1px solid rgba(13, 27, 42, 0.06)',
  },
  footerLink: {
    color: 'var(--sage)',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
};

// ===== MAIN PAGE =====
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ receiptsScanned: 0, foundingMembers: 0, foundingMemberCap: FOUNDING_CAP });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);
  const foundingSpotsLeft = FOUNDING_CAP - stats.foundingMembers;

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div className="container">
          <div style={styles.navInner}>
            <a href="/" style={styles.logo}><span style={{ color: 'var(--terracotta)' }}>o</span>pa</a>

            <div style={styles.navLinks} className="nav-links">
              <a href="#how-it-works" style={styles.navLink}>How It Works</a>
              <a href="#how-it-works" style={styles.navLink}>Features</a>
              <a href="#pricing" style={styles.navLink}>Pricing</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              <a href={APP_URL} style={styles.navLink}>Log in</a>
              <a href={APP_URL} className="btn btn-primary">Start Free Trial</a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                fontSize: '1.5rem',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '\u2715' : '\u2630'}
            </button>
          </div>

          {mobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--porcelain)',
              padding: '24px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <a href="#how-it-works" style={styles.navLink} onClick={handleNavClick}>How It Works</a>
              <a href="#how-it-works" style={styles.navLink} onClick={handleNavClick}>Features</a>
              <a href="#pricing" style={styles.navLink} onClick={handleNavClick}>Pricing</a>
              <a href="#faq" style={styles.navLink} onClick={handleNavClick}>FAQ</a>
              <a href={APP_URL} style={styles.navLink} onClick={handleNavClick}>Log in</a>
              <a href={APP_URL} className="btn btn-primary" onClick={handleNavClick}>Start Free Trial</a>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '48px',
      }}>
        <div className="container">
          <div className="hero-layout" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}>
            {/* Left — Copy */}
            <div>
              <h1 style={{
                fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                lineHeight: 1.08,
                marginBottom: '24px',
                color: 'var(--ink)',
              }}>
                Stop sorting receipts{' '}
                <span style={{ color: 'var(--forest)' }}>at midnight.</span>
              </h1>
              <p style={{
                fontSize: '1.15rem',
                color: 'var(--sage)',
                marginBottom: '32px',
                lineHeight: 1.7,
                maxWidth: '480px',
              }}>
                Petty cash tracking, envelope organization, and top sheet export &mdash; built for commercial production. Browser-based. Works on Mac, Windows, and phone.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap' as const,
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <a href={APP_URL} className="btn btn-primary btn-large">
                  Start Free Trial
                </a>
                <span style={{ fontSize: '0.9rem', color: 'var(--sage)' }}>
                  30 days free. No credit card.
                </span>
              </div>

              {/* Platform bar */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap' as const,
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                color: 'var(--sage)',
                textTransform: 'uppercase' as const,
              }}>
                <span>Mac</span>
                <span style={{ opacity: 0.3 }}>&middot;</span>
                <span>Windows</span>
                <span style={{ opacity: 0.3 }}>&middot;</span>
                <span>iPhone</span>
                <span style={{ opacity: 0.3 }}>&middot;</span>
                <span>Android</span>
                <span style={{ opacity: 0.3 }}>&middot;</span>
                <span>Any browser</span>
              </div>
            </div>

            {/* Right — App Screenshot */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid rgba(13, 27, 42, 0.08)',
              }}>
                {/* Screenshot placeholder — replace src with actual screenshot */}
                <img
                  src="/screenshots/envelopes-detail.png"
                  alt="OPA — Job detail view showing envelopes, petty cash tracking, and expense totals"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  onError={(e) => {
                    // Fallback gradient if screenshot not yet added
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, var(--forest-dark) 0%, var(--forest) 100%)';
                      parent.style.minHeight = '400px';
                      parent.style.display = 'flex';
                      parent.style.alignItems = 'center';
                      parent.style.justifyContent = 'center';
                      parent.innerHTML = '<span style="color: rgba(255,255,255,0.3); font-family: var(--font-mono); font-size: 0.8rem;">Screenshot coming soon</span>';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE STATS BAR ===== */}
      <section style={{
        background: 'var(--forest)',
        padding: '20px 0',
      }}>
        <div className="container">
          <div className="stats-bar" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap' as const,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>
                <AnimatedCounter target={stats.receiptsScanned} />
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.5)',
              }}>
                receipts scanned
              </span>
            </div>

            <div style={{
              width: '1px',
              height: '24px',
              background: 'rgba(255,255,255,0.15)',
            }} className="stats-divider" />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>
                {foundingSpotsLeft > 0 ? foundingSpotsLeft : 0}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.5)',
              }}>
                founding spots left
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--porcelain)',
        borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
      }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>The tools you have weren&rsquo;t built for this.</h2>
          </div>

          <div className="pain-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px',
            maxWidth: '1080px',
            margin: '0 auto',
          }}>
            {[
              {
                solveLabel: 'Smart scanning',
                solve: 'OPA eliminates re-entry. Scan a receipt \u2014 vendor, amount, date, and budget line extracted automatically.',
                pain: '15-20 hrs/week lost to manual data entry across spreadsheets, email, and accounting systems. One wrong formula. One overwritten cell. Hours of reconciliation at wrap.',
              },
              {
                solveLabel: 'Real-time tracking',
                solve: 'OPA tracks cash given, cash spent, and remaining \u2014 in real time. Top sheet exports in one click. Yeah.',
                pain: 'Three envelopes don\u2019t add up. Broken Excel formulas. Data entry errors. Missing receipts. You told them you would have everything in by today.',
              },
              {
                solveLabel: 'Works everywhere',
                solve: 'OPA is browser-based. Open it on any device. Scan receipts on set. Review envelopes at home.',
                pain: 'The industry-standard budgeting tool doesn\u2019t work on Windows. It doesn\u2019t work on your phone. It doesn\u2019t work in a browser. It\u2019s been like this for twenty years.',
              },
            ].map((card, i) => (
              <RevealOnScroll key={card.solveLabel} delay={i * 150}>
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 28px',
                  boxShadow: 'var(--shadow-md)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--forest)',
                    marginBottom: '8px',
                  }}>
                    {card.solveLabel}
                  </div>
                  <p style={{
                    color: 'var(--ink)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    marginBottom: '20px',
                    flex: 1,
                  }}>
                    {card.solve}
                  </p>
                  <div style={{
                    borderTop: '1px solid rgba(13, 27, 42, 0.06)',
                    paddingTop: '16px',
                  }}>
                    <p style={{
                      color: 'var(--sage)',
                      lineHeight: 1.6,
                      fontSize: '0.8rem',
                      fontStyle: 'italic',
                    }}>
                      Replaces: {card.pain}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APP SCREENSHOT SHOWCASE ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--moss-light)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
        borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
      }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: 'var(--terracotta)',
              marginBottom: '12px',
            }}>
              See it in action
            </p>
            <h2 style={styles.sectionTitle}>Built for how production actually works.</h2>
            <p style={{
              color: 'var(--sage)',
              fontSize: '1rem',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Jobs, envelopes, receipts, top sheets. The way you already think about expenses &mdash; just without the shoebox.
            </p>
          </div>

          <div className="screenshot-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            maxWidth: '1080px',
            margin: '0 auto',
          }}>
            <RevealOnScroll delay={0}>
              <div>
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(13, 27, 42, 0.08)',
                  marginBottom: '16px',
                }}>
                  <img
                    src="/screenshots/jobs-view.png"
                    alt="OPA — Jobs dashboard showing active and wrapped productions"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, var(--moss) 0%, var(--lichen-light) 100%)';
                        parent.style.minHeight = '280px';
                      }
                    }}
                  />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  marginBottom: '6px',
                  color: 'var(--ink)',
                }}>
                  All your jobs. One place.
                </h3>
                <p style={{
                  color: 'var(--sage)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}>
                  Active, prep, wrapped. See every production at a glance. Create a new job in seconds.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div>
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(13, 27, 42, 0.08)',
                  marginBottom: '16px',
                }}>
                  <img
                    src="/screenshots/envelope-view.png"
                    alt="OPA — Envelope detail with petty cash received, spent, and remaining"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, var(--moss) 0%, var(--lichen-light) 100%)';
                        parent.style.minHeight = '280px';
                      }
                    }}
                  />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  marginBottom: '6px',
                  color: 'var(--ink)',
                }}>
                  Envelopes that track themselves.
                </h3>
                <p style={{
                  color: 'var(--sage)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}>
                  Petty cash received, spent, remaining. Reimbursements. Reconciliation status. All updating in real time.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ===== FEATURES (DARK) ===== */}
      <section style={{ ...styles.section, ...styles.featureForest }} id="how-it-works">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, color: 'var(--porcelain)' }}>
              One tool. One job. Done right.
            </h2>
            <p style={{
              color: 'var(--sage-light)',
              fontSize: '1rem',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Not a budgeting platform. Not payroll software. The part in between &mdash; where the actual money gets tracked.
            </p>
          </div>

          <div style={styles.featureGrid} className="feature-grid">
            {[
              {
                label: 'Receipts + Envelopes',
                title: 'Scan it. Organize it. Done.',
                desc: 'Snap a receipt with your phone. OPA reads the vendor, amount, date, and suggests the budget line. Drop it into an envelope \u2014 Petty Cash, Art, Wardrobe, whatever the show needs. Cash given, cash spent, and remaining update in real time.',
              },
              {
                label: 'Top Sheet Export',
                title: 'The report accounting actually wants.',
                desc: 'One click. Clean PDF or Excel. AICP-formatted line item breakdowns, reconciliation totals, signature blocks. The exact document your production accountant expects.',
              },
              {
                label: 'Share With Crew',
                title: 'Send a link. They\u2019re done.',
                desc: 'Share an envelope link with your crew. They bulk upload their receipts from their phone \u2014 no account needed. Everything pushes to your dashboard and gets categorized without you touching it.',
              },
              {
                label: 'Team Access',
                title: 'Your crew, your rules.',
                desc: 'Invite coordinators, PAs, and line producers to a shared job. Everyone sees what they need \u2014 nothing they don\u2019t. Role-based access keeps things clean without the IT department.',
              },
            ].map((feature, i) => (
              <RevealOnScroll key={feature.label} delay={i * 100}>
                <div style={styles.featureCard}>
                  <div style={styles.featureLabel}>{feature.label}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDesc}>{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW ===== */}
      <section style={{
        ...styles.section,
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
      }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Four steps. Then you&rsquo;re done.</h2>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            {[
              {
                step: '01',
                title: 'Create your job',
                desc: 'Name the production. Add your envelopes \u2014 Petty Cash, Art, Wardrobe, whatever the show needs.',
              },
              {
                step: '02',
                title: 'Scan your receipts',
                desc: 'Snap a photo. OPA reads the vendor, amount, and date. Confirm the details, assign a line number, drop it in an envelope.',
              },
              {
                step: '03',
                title: 'Reconcile at wrap',
                desc: 'Match receipts plus remaining cash to the original disbursement. OPA lines it up for you. Wrap in hours, not days.',
              },
              {
                step: '04',
                title: 'Export and go home',
                desc: 'One click. Production-ready top sheet. Hand it to accounting. Your Friday night is yours.',
              },
            ].map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 100}>
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '32px 0',
                  borderBottom: i < 3 ? '1px solid rgba(13, 27, 42, 0.06)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--forest)',
                    letterSpacing: '0.05em',
                    paddingTop: '4px',
                    flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: 'var(--ink)',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: 'var(--sage)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOBILE PREVIEW ===== */}
      <MobilePreviewSection />

      {/* ===== PRICING ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--porcelain)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="pricing">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Founding member pricing.</h2>
            <p style={{
              color: 'var(--sage)',
              fontSize: '1rem',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Simple. Flat. No surprises.
            </p>
          </div>

          <RevealOnScroll>
            <div style={{
              maxWidth: '480px',
              margin: '0 auto',
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px 40px',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center' as const,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Founding member badge */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'var(--forest)',
                background: 'rgba(19, 70, 17, 0.06)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                Founding Member Rate
              </div>

              {/* Price */}
              <div style={{ marginBottom: '4px' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  color: 'var(--sage)',
                  textDecoration: 'line-through',
                  marginRight: '12px',
                }}>
                  $49/month
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 400,
                color: 'var(--ink)',
                marginBottom: '4px',
              }}>
                $29<span style={{
                  fontSize: '1.1rem',
                  color: 'var(--sage)',
                  fontFamily: 'var(--font-body)',
                }}>/month</span>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--forest)',
                marginBottom: '8px',
              }}>
                Locked in for life.
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sage)',
                marginBottom: '28px',
                fontSize: '0.8rem',
                letterSpacing: '0.01em',
              }}>
                or $278/year &mdash; save 20%
              </p>

              {/* Founding spots counter */}
              <div style={{
                background: 'rgba(19, 70, 17, 0.04)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '28px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--forest)',
                  }}>
                    {foundingSpotsLeft}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.06em',
                    color: 'var(--sage)',
                    textTransform: 'uppercase' as const,
                  }}>
                    of {FOUNDING_CAP} spots remaining
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{
                  height: '4px',
                  background: 'rgba(19, 70, 17, 0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(stats.foundingMembers / FOUNDING_CAP) * 100}%`,
                    background: 'var(--forest)',
                    borderRadius: '2px',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>

              {/* Features list */}
              <div style={{
                textAlign: 'left' as const,
                marginBottom: '32px',
              }}>
                {[
                  'Smart receipt scanning',
                  'Envelope-based expense tracking',
                  'One-click top sheet export',
                  'AICP-formatted reports',
                  'Unlimited jobs and envelopes',
                  'Works on every device',
                ].map((feature) => (
                  <div key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
                    color: 'var(--ink)',
                    fontSize: '0.95rem',
                  }}>
                    <CheckIcon />
                    {feature}
                  </div>
                ))}
              </div>

              <a href={APP_URL} className="btn btn-primary btn-large" style={{ width: '100%' }}>
                Start Free Trial
              </a>
              <p style={{
                marginTop: '12px',
                fontSize: '0.85rem',
                color: 'var(--sage)',
              }}>
                30 days free. No credit card required. Cancel anytime.
              </p>

              {/* Flat rate message */}
              <div style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(13, 27, 42, 0.06)',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--sage)',
                  lineHeight: 1.7,
                }}>
                  Flat monthly rate. No per-transaction fees. No per-receipt charges. No hidden costs.
                </p>
                <p style={{
                  marginTop: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--sage)',
                  fontStyle: 'italic',
                }}>
                  Fits right in your kit fee. Pays for itself at wrap.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== WHO IT'S FOR ===== */}
      <section style={{
        ...styles.section,
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="who-its-for">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Built for the people who actually track the money.</h2>
            <p style={{
              color: 'var(--sage)',
              fontSize: '1rem',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              You&rsquo;re freelance. You move between jobs. You need a tool that moves with you.
            </p>
          </div>

          <div className="roles-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            {[
              {
                title: 'Production Coordinators',
                desc: 'Your tool. Your subscription. Scan receipts on set, organize by envelope, export clean top sheets. No spreadsheet gymnastics. No end-of-show panic. Works on any device you\u2019ve got.',
              },
              {
                title: 'Line Producers / Production Managers',
                desc: 'See what\u2019s been spent across every envelope before you have to report it. No more chasing coordinators for numbers. Review top sheets from your phone on the way to the production meeting.',
              },
              {
                title: 'Office PAs',
                desc: 'You\u2019re the one collecting receipts all day. Upload them from your phone \u2014 no account needed. Your coordinator sees them instantly. No more end-of-day receipt handoffs.',
              },
            ].map((role, i) => (
              <RevealOnScroll key={role.title} delay={i * 100}>
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 24px',
                  border: '1px solid rgba(13, 27, 42, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '6px',
                  }}>{role.title}</p>
                  <p style={{
                    color: 'var(--sage)',
                    lineHeight: 1.7,
                    fontSize: '0.9rem',
                  }}>{role.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--moss-light)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
        borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="faq">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Common questions.</h2>
          </div>

          <div style={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <button
                  style={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span style={{
                    transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                    marginLeft: '16px',
                  }}>
                    &darr;
                  </span>
                </button>
                {openFaq === index && (
                  <div style={styles.faqAnswer}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{
        textAlign: 'center' as const,
        padding: 'var(--space-4xl) 0',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            marginBottom: '12px',
            color: 'var(--ink)',
          }}>
            Your Friday nights deserve better.
          </h2>
          <p style={{
            color: 'var(--sage)',
            fontSize: '1.05rem',
            marginBottom: '28px',
            maxWidth: 'none',
          }}>
            $29/month. 30 days free. The receipts are handled.
          </p>
          <a href={APP_URL} className="btn btn-primary btn-large">
            Start Free Trial
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--forest)',
            }}><span style={{ color: 'var(--terracotta)' }}>o</span>pa</span>
            <span style={{ color: 'var(--sage)', fontSize: '0.85rem' }}>
              &mdash; Expense tracking built for commercial production.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--sage)' }}>
            <span>&copy; {new Date().getFullYear()} OPA</span>
            <a href="/terms" style={styles.footerLink}>Terms</a>
            <a href="/privacy" style={styles.footerLink}>Privacy</a>
            <a href="mailto:hello@useopa.com" style={styles.footerLink}>hello@useopa.com</a>
          </div>
        </div>
      </footer>

      {/* ===== RESPONSIVE OVERRIDES ===== */}
      <style>{`
        @media (max-width: 768px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .pain-grid {
            grid-template-columns: 1fr !important;
          }
          .screenshot-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-bar {
            gap: 24px !important;
          }
          .stats-divider {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
