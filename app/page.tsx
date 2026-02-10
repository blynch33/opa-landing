'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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

// ===== STYLES =====
const styles = {
  // Navigation
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
    background: 'rgba(250, 249, 245, 0.95)',
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

  // Hero Section
  hero: {
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '104px',
    paddingBottom: '48px',
  },
  heroContent: {
    maxWidth: '720px',
    textAlign: 'center' as const,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    lineHeight: 1.08,
    marginBottom: '16px',
    color: 'var(--ink)',
  },
  heroTitleAccent: {
    color: 'var(--forest)',
  },
  heroDescription: {
    fontSize: '1.125rem',
    color: 'var(--sage)',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  heroCTA: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '16px',
    marginBottom: '0',
    justifyContent: 'center',
  },
  // Section Base
  section: {
    padding: 'var(--space-4xl) 0',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: 'var(--space-2xl)',
  },
  sectionEyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'var(--terracotta)',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400,
    marginBottom: '16px',
  },

  // Moments Section
  momentsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    maxWidth: '720px',
    margin: '0 auto',
  },
  momentCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    padding: '40px 40px 40px 44px',
    boxShadow: 'var(--shadow-md)',
    borderLeft: '4px solid var(--forest-light)',
  },
  momentTimestamp: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--terracotta)',
    letterSpacing: '0.02em',
    marginBottom: '8px',
  },
  momentTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    fontWeight: 500,
    marginBottom: '12px',
    color: 'var(--ink)',
  },
  momentDesc: {
    color: 'var(--sage)',
    lineHeight: 1.7,
  },

  // Features Section
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
    color: 'var(--honey)',
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

  // FAQ
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

  // CTA Section
  ctaSection: {
    textAlign: 'center' as const,
    padding: 'var(--space-4xl) 0',
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 400,
    marginBottom: '24px',
    color: 'var(--porcelain)',
  },
  ctaSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.85,
    marginBottom: '40px',
    maxWidth: '500px',
    margin: '0 auto 40px',
  },

  // Footer
  footer: {
    background: 'var(--blush-light)',
    color: 'var(--ink)',
    padding: '20px 0',
    borderTop: '1px solid rgba(13, 27, 42, 0.06)',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    gap: '48px',
    marginBottom: 'var(--space-3xl)',
  },
  footerBrand: {
    maxWidth: '320px',
  },
  footerLogo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 500,
    marginBottom: '16px',
    color: 'var(--forest)',
  },
  footerTagline: {
    color: 'var(--sage)',
    lineHeight: 1.7,
  },
  footerLinks: {
    display: 'flex',
    gap: '64px',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  footerColumnTitle: {
    fontWeight: 600,
    marginBottom: '8px',
  },
  footerLink: {
    color: 'var(--sage)',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  footerBottom: {
    borderTop: '1px solid rgba(13, 27, 42, 0.1)',
    paddingTop: 'var(--space-xl)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  footerCopyright: {
    color: 'var(--sage)',
    fontSize: '0.9rem',
  },
};

// ===== COMPONENTS =====

const Receipt = () => (
  <svg viewBox="0 0 320 400" fill="none" style={{ width: '100%', height: 'auto' }}>
    {/* Receipt Background */}
    <path d="M20 0 L20 380 Q30 390 40 380 Q50 370 60 380 Q70 390 80 380 Q90 370 100 380 Q110 390 120 380 Q130 370 140 380 Q150 390 160 380 Q170 370 180 380 Q190 390 200 380 Q210 370 220 380 Q230 390 240 380 Q250 370 260 380 Q270 390 280 380 Q290 370 300 380 L300 0 Z" fill="#FFFFFF" />
    <path d="M20 0 L20 380 Q30 390 40 380 Q50 370 60 380 Q70 390 80 380 Q90 370 100 380 Q110 390 120 380 Q130 370 140 380 Q150 390 160 380 Q170 370 180 380 Q190 390 200 380 Q210 370 220 380 Q230 390 240 380 Q250 370 260 380 Q270 390 280 380 Q290 370 300 380 L300 0 Z" stroke="#E8E8E8" strokeWidth="1" fill="none" />

    {/* Header */}
    <text y="50" fontFamily="DM Serif Text" fontSize="32" fontWeight="400"><tspan x="131" fill="#C4725F">o</tspan><tspan fill="#134611">pa</tspan></text>
    <text x="160" y="75" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#839788" letterSpacing="2">PETTY CASH TRACKING</text>

    {/* Divider */}
    <line x1="50" y1="100" x2="270" y2="100" stroke="#E8E8E8" strokeWidth="1" strokeDasharray="5,5" />

    {/* Line Items */}
    <text x="50" y="135" fontFamily="Inter" fontSize="14" fill="#0D1B2A">Coffee Run (Crew)</text>
    <text x="270" y="135" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill="#0D1B2A">$47.50</text>

    <text x="50" y="165" fontFamily="Inter" fontSize="14" fill="#0D1B2A">Gaff Tape (3x Rolls)</text>
    <text x="270" y="165" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill="#0D1B2A">$89.97</text>

    <text x="50" y="195" fontFamily="Inter" fontSize="14" fill="#0D1B2A">Craft Services Supplies</text>
    <text x="270" y="195" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill="#0D1B2A">$156.00</text>

    <text x="50" y="225" fontFamily="Inter" fontSize="14" fill="#0D1B2A">Parking - Location Scout</text>
    <text x="270" y="225" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill="#0D1B2A">$24.00</text>

    {/* Divider */}
    <line x1="50" y1="255" x2="270" y2="255" stroke="#E8E8E8" strokeWidth="1" strokeDasharray="5,5" />

    {/* Total */}
    <text x="50" y="290" fontFamily="Inter" fontSize="16" fontWeight="600" fill="#0D1B2A">TOTAL</text>
    <text x="270" y="290" textAnchor="end" fontFamily="JetBrains Mono" fontSize="20" fontWeight="600" fill="#134611">$317.47</text>

    {/* Status Tag */}
    <rect x="90" y="310" width="140" height="32" rx="16" fill="rgba(45, 106, 79, 0.1)" />
    <text x="160" y="331" textAnchor="middle" fontFamily="Inter" fontSize="13" fontWeight="500" fill="#2D6A4F">✓ Reconciled</text>

    {/* Footer */}
    <text x="160" y="365" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#839788">Nice work today.</text>
  </svg>
);

// ===== SIGNUP FORM =====
const SignupForm = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '20px 32px',
        background: variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(19,70,17,0.06)',
        borderRadius: 'var(--radius-md)',
        display: 'inline-block',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          color: variant === 'dark' ? 'var(--porcelain)' : 'var(--forest)',
          margin: 0,
        }}>
          You're in. Check your email to get started.
        </p>
      </div>
    );
  }

  const isDark = variant === 'dark';

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '12px',
      maxWidth: '480px',
      margin: '0 auto',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
        placeholder="Your email"
        required
        style={{
          flex: '1 1 260px',
          padding: '16px 20px',
          fontSize: '1rem',
          borderRadius: 'var(--radius-md)',
          border: isDark ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(13,27,42,0.15)',
          background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--white)',
          color: isDark ? 'var(--porcelain)' : 'var(--ink)',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={isDark ? 'btn btn-warm btn-large' : 'btn btn-primary btn-large'}
        style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? 'Submitting...' : 'Start Free Trial'}
      </button>
      {status === 'error' && (
        <p style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: isDark ? 'var(--terracotta-light)' : 'var(--terracotta)',
          marginTop: '8px',
        }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
};

// ===== FAQ DATA =====
const faqs = [
  {
    question: "Is this just for petty cash?",
    answer: "Today, yes. OPA is focused on doing petty cash exceptionally well — receipts, envelopes, budget lines, and top sheets. Purchase orders, vendor management, and more are on the roadmap."
  },
  {
    question: "What if I'm not tech-savvy?",
    answer: "Perfect. OPA was built for people who'd rather be on set than debugging software. If you can take a photo of a receipt, you can use OPA. No training required, no 47-step setup process."
  },
  {
    question: "How is this different from Excel?",
    answer: "Excel is a blank canvas that requires you to build everything from scratch — and maintain it forever. OPA already knows how production works: envelopes, line items, petty cash reconciliation. You focus on the work, not the spreadsheet."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use bank-level encryption and your data is never shared with third parties. Production budgets are sensitive — they're safe with us."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No contracts. Cancel from your account settings and your subscription ends at the end of the billing period."
  },
];

// ===== MAIN PAGE =====
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div className="container">
          <div style={styles.navInner}>
            <a href="/" style={styles.logo}><span style={{ color: 'var(--terracotta)' }}>o</span>pa</a>

            {/* Desktop Nav */}
            <div style={styles.navLinks} className="nav-links">
              <a href="#features" style={styles.navLink}>Features</a>
              <a href="#how-it-works-quick" style={styles.navLink}>How It Works</a>
              <a href="#pricing" style={styles.navLink}>Pricing</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              <a href="#cta" className="btn btn-primary">Start Free Trial</a>
            </div>

            {/* Mobile Menu Button */}
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
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
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
              <a href="#features" style={styles.navLink} onClick={handleNavClick}>Features</a>
              <a href="#how-it-works-quick" style={styles.navLink} onClick={handleNavClick}>How It Works</a>
              <a href="#pricing" style={styles.navLink} onClick={handleNavClick}>Pricing</a>
              <a href="#faq" style={styles.navLink} onClick={handleNavClick}>FAQ</a>
              <a href="#cta" className="btn btn-primary" onClick={handleNavClick}>Start Free Trial</a>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Petty cash.{' '}
              <span style={styles.heroTitleAccent}>Handled.</span>
            </h1>
            <p style={styles.heroDescription}>
              AI-powered receipt management and top sheets for film and TV production.
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--sage)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}>
              Built for coordinators, line producers, and anyone who's ever reconciled a shoebox of receipts at wrap.
            </p>
            <SignupForm variant="light" />
            <p style={{
              marginTop: '16px',
              fontSize: '0.85rem',
              color: 'var(--sage)',
              opacity: 0.7,
            }}>
              14-day free trial. No credit card required.
            </p>
          </div>
        </div>

      </section>

      {/* ===== A DAY WITH OPA ===== */}
      <section style={{ ...styles.section, paddingTop: '48px', paddingBottom: '64px' }} id="your-day">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>A day with OPA.</h2>
          </div>

          <div style={styles.momentsGrid}>
            <RevealOnScroll delay={0}>
              <div style={styles.momentCard}>
                <div style={styles.momentTimestamp}>6:47 AM</div>
                <h3 style={styles.momentTitle}>On set before the sun</h3>
                <p style={styles.momentDesc}>
                  You grab coffee, scan the receipt. OPA reads it, categorizes it, done.
                  One less thing rattling around in your head.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div style={{ ...styles.momentCard, borderLeftColor: 'var(--forest)' }}>
                <div style={styles.momentTimestamp}>2:13 PM</div>
                <h3 style={styles.momentTitle}>Mid-shoot check-in</h3>
                <p style={styles.momentDesc}>
                  Art dept's been uploading all morning. They're $847 from their limit.
                  You Zelle more cash before they even ask. Crisis averted.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div style={{ ...styles.momentCard, borderLeftColor: 'var(--ink)' }}>
                <div style={styles.momentTimestamp}>11:34 PM</div>
                <h3 style={styles.momentTitle}>Wrap chaos</h3>
                <p style={styles.momentDesc}>
                  Producer texts you 7 receipts in various states of legibility. You bulk upload
                  to OPA, they're logged. You'll deal with it tomorrow when you're human again.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--blush-light)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
        borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="how-it-works-quick">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>How it works.</h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '720px',
            margin: '0 auto',
          }}>
            {[
              { num: '01', title: 'Scan', desc: 'Take a photo of any receipt. OPA reads the vendor, amount, date, and budget line — automatically.' },
              { num: '02', title: 'Organize', desc: 'Assign receipts to envelopes — Crafty, Styling, Production, whatever your show needs. Totals update in real time.' },
              { num: '03', title: 'Export', desc: 'One click. Clean top sheet in Excel or PDF. Line item breakdowns, totals, ready for accounting.' },
            ].map((step, i) => (
              <RevealOnScroll key={step.num} delay={i * 150}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 36px',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    color: 'var(--terracotta)',
                    flexShrink: 0,
                    paddingTop: '4px',
                  }}>{step.num}</div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: 'var(--ink)',
                    }}>{step.title}</h3>
                    <p style={{
                      color: 'var(--sage)',
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}>{step.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ ...styles.section, ...styles.featureForest }} id="features">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, color: 'var(--porcelain)' }}>
              What OPA does.
            </h2>
          </div>

          <div style={styles.featureGrid} className="feature-grid">
            {[
              { label: 'Receipt Scanning', title: 'Snap it. It\'s read.', desc: 'Take a photo. OPA extracts the vendor, amount, date, and suggests the right budget line. Done before you\'ve put the receipt down.' },
              { label: 'Envelopes', title: 'Organized the way you already work.', desc: 'Group receipts by envelope. Crafty, Styling, Production — whatever your show needs. Totals update in real time.' },
              { label: 'Top Sheet Export', title: 'The report accounting actually wants.', desc: 'One click. Clean Excel or PDF. Line item breakdowns, reconciliation totals, signature blocks. Ready to send, not cobbled together.' },
              { label: 'AICP Budget Lines', title: 'Your line numbers. Already loaded.', desc: 'AICP budget lines come standard — Pages A through P. Every receipt maps to the right line number. Custom lines when you need them.' },
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

      {/* ===== PRICING ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--porcelain)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="pricing">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Simple pricing.</h2>
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
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 400,
                color: 'var(--ink)',
                marginBottom: '4px',
              }}>
                $49<span style={{
                  fontSize: '1.1rem',
                  color: 'var(--sage)',
                  fontFamily: 'var(--font-body)',
                }}>/month</span>
              </div>
              <p style={{
                color: 'var(--sage)',
                marginBottom: '32px',
                fontSize: '1.05rem',
              }}>
                Everything you need. Nothing you don't.
              </p>

              <div style={{
                textAlign: 'left' as const,
                marginBottom: '36px',
              }}>
                {[
                  'Unlimited jobs and receipts',
                  'AI-powered receipt scanning',
                  'AICP budget lines + custom lines',
                  'Envelope management',
                  'Top sheet export (Excel + PDF)',
                  'Team collaboration',
                  'Works offline on set',
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
                    <span style={{ color: 'var(--forest)', fontWeight: 600, fontSize: '1rem' }}>&#10003;</span>
                    {feature}
                  </div>
                ))}
              </div>

              <a href="#cta" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                Start 14-Day Free Trial
              </a>
              <p style={{
                marginTop: '12px',
                fontSize: '0.85rem',
                color: 'var(--sage)',
              }}>
                No credit card required.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={styles.section} id="faq">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Questions</div>
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
                    transition: 'transform 0.2s ease'
                  }}>
                    ↓
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
      <section style={{ ...styles.featureForest, ...styles.ctaSection }} id="cta">
        <div className="container">
          <h2 style={styles.ctaTitle}>Your top sheet is waiting.</h2>
          <p style={styles.ctaSubtitle}>
            14-day free trial. No credit card required.
          </p>
          <SignupForm variant="dark" />
        </div>
      </section>

      {/* ===== ORIGIN ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--porcelain)',
        borderTop: '1px solid rgba(13, 27, 42, 0.08)',
        overflow: 'hidden',
        position: 'relative' as const,
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '64px',
          }} className="origin-inner">
            <div style={{ maxWidth: '560px', position: 'relative' as const, zIndex: 2 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: 'var(--terracotta)',
                marginBottom: '16px',
              }}>
                Los Angeles, CA
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 400,
                marginBottom: '16px',
                lineHeight: 1.3,
                color: 'var(--ink)',
              }}>
                Made on set. Built between jobs.
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--sage)',
                lineHeight: 1.7,
              }}>
                Built by a production professional who got tired of the same broken spreadsheet on every show.
              </p>
            </div>

            {/* Receipt Visual */}
            <div style={{
              flexShrink: 0,
              width: '280px',
              opacity: 0.9,
              transform: 'rotate(-4deg)',
              filter: 'drop-shadow(0 16px 40px rgba(13, 27, 42, 0.1))',
            }} className="origin-receipt">
              <Receipt />
            </div>
          </div>
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
              — Petty cash. Handled.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--sage)' }}>
            <span>© {new Date().getFullYear()} OPA</span>
            <a href="mailto:hello@useopa.com" style={styles.footerLink}>hello@useopa.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
