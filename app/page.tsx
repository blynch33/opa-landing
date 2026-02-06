'use client';

import { useState, useEffect } from 'react';

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
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '120px',
    paddingBottom: 'var(--space-5xl)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '720px',
    position: 'relative' as const,
    zIndex: 2,
  },
  heroEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(19, 70, 17, 0.08)',
    borderRadius: '100px',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--forest)',
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: '24px',
    color: 'var(--ink)',
  },
  heroTitleAccent: {
    fontStyle: 'italic',
    color: 'var(--forest)',
  },
  heroDescription: {
    fontSize: '1.25rem',
    color: 'var(--sage)',
    marginBottom: '40px',
    lineHeight: 1.7,
  },
  heroCTA: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '16px',
    marginBottom: '48px',
  },
  heroProof: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '0.9rem',
    color: 'var(--sage)',
  },
  heroVisual: {
    position: 'absolute' as const,
    right: '-10%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '55%',
    maxWidth: '700px',
    zIndex: 1,
    opacity: 0.9,
  },

  // Section Base
  section: {
    padding: 'var(--space-5xl) 0',
  },
  sectionDark: {
    background: 'var(--ink)',
    color: 'var(--porcelain)',
  },
  sectionForest: {
    background: 'linear-gradient(135deg, var(--forest) 0%, #1a5c15 100%)',
    color: 'var(--porcelain)',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: 'var(--space-4xl)',
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
  sectionSubtitle: {
    fontSize: '1.15rem',
    color: 'var(--sage)',
    maxWidth: '600px',
    margin: '0 auto',
  },

  // Problem Section
  problemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  problemCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    padding: '40px',
    boxShadow: 'var(--shadow-md)',
  },
  problemIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, var(--terracotta-light) 0%, var(--blush) 100%)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
    marginBottom: '20px',
  },
  problemTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    fontWeight: 500,
    marginBottom: '12px',
  },
  problemDesc: {
    color: 'var(--sage)',
    lineHeight: 1.7,
  },

  // Features Section
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, var(--honey) 0%, var(--terracotta) 100%)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  featureTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '12px',
    color: 'var(--porcelain)',
  },
  featureDesc: {
    color: 'var(--sage-light)',
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },

  // How It Works
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '48px',
    position: 'relative' as const,
  },
  stepCard: {
    textAlign: 'center' as const,
    position: 'relative' as const,
  },
  stepNumber: {
    width: '64px',
    height: '64px',
    background: 'var(--forest)',
    color: 'var(--white)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 500,
    margin: '0 auto 24px',
  },
  stepTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    fontWeight: 500,
    marginBottom: '12px',
  },
  stepDesc: {
    color: 'var(--sage)',
    lineHeight: 1.7,
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
    padding: 'var(--space-5xl) 0',
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
    background: 'var(--porcelain)',
    color: 'var(--ink)',
    padding: 'var(--space-4xl) 0 var(--space-xl)',
    borderTop: '1px solid rgba(13, 27, 42, 0.1)',
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
    <text x="160" y="50" textAnchor="middle" fontFamily="Fraunces" fontSize="32" fontWeight="500" fill="#134611">opa</text>
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

// ===== WAITLIST FORM =====
const WaitlistForm = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => {
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
          You're on the list. We'll be in touch.
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
        {status === 'submitting' ? 'Joining...' : 'Join The Waitlist'}
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
    question: "Is this just for petty cash, or does it handle more?",
    answer: "We're starting with petty cash because that's where the chaos usually begins. But OPA is designed to grow into a full production office toolkit—envelopes, POs, budget tracking, and more. Get in early and help shape what comes next."
  },
  {
    question: "What if I'm not tech-savvy?",
    answer: "Perfect. We built OPA for people who'd rather be on set than debugging software. If you can take a photo of a receipt, you can use OPA. No training required, no 47-step setup process."
  },
  {
    question: "How is this different from Excel?",
    answer: "Excel is a blank canvas that requires you to build everything from scratch—and maintain it forever. OPA already knows how production works: envelopes, line items, petty cash reconciliation. You focus on the work, not the spreadsheet."
  },
  {
    question: "When will I get access?",
    answer: "We're opening access in waves to make sure every user gets a solid experience. Join the waitlist and we'll reach out when your spot opens up. Early signups get priority."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use bank-level encryption and your data is never shared with third parties. We know production budgets are sensitive—they're safe with us."
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
            <a href="/" style={styles.logo}>opa</a>

            {/* Desktop Nav */}
            <div style={styles.navLinks} className="nav-links">
              <a href="#features" style={styles.navLink}>Features</a>
              <a href="#how-it-works" style={styles.navLink}>How It Works</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              <a href="#cta" className="btn btn-primary">Join The Waitlist</a>
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
              <a href="#how-it-works" style={styles.navLink} onClick={handleNavClick}>How It Works</a>
              <a href="#faq" style={styles.navLink} onClick={handleNavClick}>FAQ</a>
              <a href="#cta" className="btn btn-primary" onClick={handleNavClick}>Join The Waitlist</a>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <div style={styles.heroEyebrow}>
              <span>🎬</span>
              <span>Now accepting early signups</span>
            </div>
            <h1 style={styles.heroTitle}>
              The production office{' '}
              <span style={styles.heroTitleAccent}>everyone</span> deserves.
            </h1>
            <p style={styles.heroDescription}>
              Wrap day shouldn't mean spreadsheet nightmares. OPA handles your petty cash,
              receipts, and budget tracking—so you can focus on making great things.
            </p>
            <div style={styles.heroCTA}>
              <a href="#cta" className="btn btn-primary btn-large">
                Join The Waitlist
              </a>
              <a href="#how-it-works" className="btn btn-secondary btn-large">
                See How It Works
              </a>
            </div>
            <div style={styles.heroProof}>
              <span>Built by production people, for production people</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div style={styles.heroVisual} className="hero-visual">
          <div style={{
            transform: 'rotate(-8deg)',
            filter: 'drop-shadow(0 20px 40px rgba(13, 27, 42, 0.15))',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <Receipt />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section style={styles.section} id="problem">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Sound familiar?</div>
            <h2 style={styles.sectionTitle}>We've been in your shoes.</h2>
            <p style={styles.sectionSubtitle}>
              These aren't hypothetical problems. We've lived them. Now we're fixing them.
            </p>
          </div>

          <div style={styles.problemGrid}>
            <div style={styles.problemCard}>
              <div style={styles.problemIcon}>📦</div>
              <h3 style={styles.problemTitle}>The Camera Roll of Doom</h3>
              <p style={styles.problemDesc}>
                327 receipt photos. No labels. Due in accounting by Friday.
                You know exactly which circle of Excel hell awaits.
              </p>
            </div>

            <div style={styles.problemCard}>
              <div style={styles.problemIcon}>😰</div>
              <h3 style={styles.problemTitle}>Wrap Day Panic</h3>
              <p style={styles.problemDesc}>
                Everyone's exhausted. Everyone's impatient. And somehow you're still
                reconciling petty cash at 11pm while craft services gets packed up around you.
              </p>
            </div>

            <div style={styles.problemCard}>
              <div style={styles.problemIcon}>📊</div>
              <h3 style={styles.problemTitle}>Spreadsheet Archaeology</h3>
              <p style={styles.problemDesc}>
                "Where did that $200 go?" Opening seven versions of the same Excel file,
                praying one of them has the answer. Spoiler: none of them do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ ...styles.section, ...styles.sectionDark }} id="features">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionEyebrow, color: 'var(--honey)' }}>What OPA Does</div>
            <h2 style={{ ...styles.sectionTitle, color: 'var(--porcelain)' }}>
              Built for how production actually works.
            </h2>
            <p style={{ ...styles.sectionSubtitle, color: 'var(--sage-light)' }}>
              Receipts first, line items second. No paradigm shifts required.
            </p>
          </div>

          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📸</div>
              <h3 style={styles.featureTitle}>Snap & Sort</h3>
              <p style={styles.featureDesc}>
                Photo a receipt. OPA pulls the details. Assign it to an envelope. Done.
                No more camera roll archaeology.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📁</div>
              <h3 style={styles.featureTitle}>Smart Envelopes</h3>
              <p style={styles.featureDesc}>
                Organize by department, by day, by whatever makes sense for your show.
                See totals at a glance. Always know where you stand.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💰</div>
              <h3 style={styles.featureTitle}>Budget Visibility</h3>
              <p style={styles.featureDesc}>
                Real-time spending by line item. No more end-of-week surprises.
                Know exactly where every dollar went.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>✨</div>
              <h3 style={styles.featureTitle}>Quiet Controls</h3>
              <p style={styles.featureDesc}>
                Date adjustments that actually make sense for production accounting.
                Back-date when you need to. OPA understands.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📤</div>
              <h3 style={styles.featureTitle}>Export Ready</h3>
              <p style={styles.featureDesc}>
                When accounting asks for "the spreadsheet," you'll have it.
                Clean, formatted, ready to send.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🔒</div>
              <h3 style={styles.featureTitle}>Production-Grade Security</h3>
              <p style={styles.featureDesc}>
                Your budget data stays yours. Bank-level encryption.
                No sharing, no selling, no nonsense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={styles.section} id="how-it-works">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>How It Works</div>
            <h2 style={styles.sectionTitle}>Three steps to sanity.</h2>
            <p style={styles.sectionSubtitle}>
              No training sessions. No onboarding calls.
              If you can take a photo, you're already an expert.
            </p>
          </div>

          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Snap the receipt</h3>
              <p style={styles.stepDesc}>
                Take a photo. OPA reads the details—vendor, amount, date.
                You just confirm and move on.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Assign to an envelope</h3>
              <p style={styles.stepDesc}>
                Camera Dept, Craft Services, Props—whatever makes sense.
                Track spending by department or day.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Reconcile in seconds</h3>
              <p style={styles.stepDesc}>
                When wrap comes, your totals are ready. Export to Excel.
                Send to accounting. Go home on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNAL ===== */}
      <section style={{ ...styles.section, background: 'var(--blush-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '24px',
            }}>
              🎬
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 400,
              marginBottom: '20px',
              lineHeight: 1.3,
            }}>
              Built by someone who's been in your shoes at 11pm the night before wrap is due.
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--sage)',
              lineHeight: 1.7,
              maxWidth: '550px',
              margin: '0 auto',
            }}>
              OPA exists because we got tired of the same Excel nightmare on every show.
              We're building the tool we wish we'd had.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={styles.section} id="faq">
        <div className="container">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Questions</div>
            <h2 style={styles.sectionTitle}>We've got answers.</h2>
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
      <section style={{ ...styles.sectionForest, ...styles.ctaSection }} id="cta">
        <div className="container">
          <h2 style={styles.ctaTitle}>Ready to leave Excel hell?</h2>
          <p style={styles.ctaSubtitle}>
            We're opening access in waves. Drop your email and we'll save your spot.
          </p>
          <WaitlistForm variant="dark" />
          <p style={{ marginTop: '24px', fontSize: '0.9rem', opacity: 0.6 }}>
            No spam. No selling your email. Just a heads up when it's your turn.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div className="container">
          <div style={styles.footerInner}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>opa</div>
              <p style={styles.footerTagline}>
                The production office everyone deserves. Built by production people, for production people.
              </p>
            </div>

            <div style={styles.footerLinks}>
              <div style={styles.footerColumn}>
                <div style={styles.footerColumnTitle}>Product</div>
                <a href="#features" style={styles.footerLink}>Features</a>
                <a href="#how-it-works" style={styles.footerLink}>How It Works</a>
                <a href="#faq" style={styles.footerLink}>FAQ</a>
              </div>
              <div style={styles.footerColumn}>
                <div style={styles.footerColumnTitle}>Company</div>
                <a href="/about" style={styles.footerLink}>About</a>
                <a href="/privacy" style={styles.footerLink}>Privacy</a>
                <a href="/terms" style={styles.footerLink}>Terms</a>
              </div>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={styles.footerCopyright}>
              © {new Date().getFullYear()} OPA. Made with ☕ in production offices everywhere.
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="mailto:hello@useopa.com" style={styles.footerLink}>hello@useopa.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
