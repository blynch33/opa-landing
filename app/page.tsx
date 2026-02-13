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
    paddingTop: '120px',
    paddingBottom: '64px',
  },
  heroContent: {
    maxWidth: '720px',
  },
  heroTitle: {
    fontSize: 'clamp(2.25rem, 8vw, 4rem)',
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    lineHeight: 1.08,
    marginBottom: '24px',
    color: 'var(--ink)',
  },
  heroTitleAccent: {
    color: 'var(--forest)',
  },
  heroDescription: {
    fontSize: '1.2rem',
    color: 'var(--sage)',
    marginBottom: '32px',
    lineHeight: 1.7,
    maxWidth: '540px',
  },
  heroCTA: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '16px',
  },

  // Section Base
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

  // How It Works
  howItWorksGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '32px',
    maxWidth: '960px',
    margin: '0 auto',
  },
  howItWorksCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    padding: '40px 32px',
    boxShadow: 'var(--shadow-md)',
  },
  howItWorksIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(19, 70, 17, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  howItWorksTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '12px',
    color: 'var(--ink)',
  },
  howItWorksDesc: {
    color: 'var(--sage)',
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },

  // Who It's For
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    maxWidth: '720px',
    margin: '0 auto',
  },
  roleCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 24px',
    border: '1px solid rgba(13, 27, 42, 0.08)',
    boxShadow: 'var(--shadow-sm)',
  },
  roleTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: '6px',
  },
  roleDesc: {
    color: 'var(--sage)',
    lineHeight: 1.7,
    fontSize: '0.9rem',
  },

  // Features Section (dark)
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
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 400,
    marginBottom: '24px',
    color: 'var(--ink)',
  },

  // Footer
  footer: {
    background: 'var(--blush-light)',
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

// ===== APP URL =====
const APP_URL = 'https://app.useopa.com';

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
              <a href="#how-it-works" style={styles.navLink}>How It Works</a>
              <a href="#features" style={styles.navLink}>Features</a>
              <a href="#pricing" style={styles.navLink}>Pricing</a>
              <a href="#faq" style={styles.navLink}>FAQ</a>
              <a href={APP_URL} className="btn btn-primary">Start Free Trial</a>
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
              <a href="#how-it-works" style={styles.navLink} onClick={handleNavClick}>How It Works</a>
              <a href="#features" style={styles.navLink} onClick={handleNavClick}>Features</a>
              <a href="#pricing" style={styles.navLink} onClick={handleNavClick}>Pricing</a>
              <a href="#faq" style={styles.navLink} onClick={handleNavClick}>FAQ</a>
              <a href={APP_URL} className="btn btn-primary" onClick={handleNavClick}>Start Free Trial</a>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Stop sorting receipts{' '}
              <span style={styles.heroTitleAccent}>at midnight.</span>
            </h1>
            <p style={styles.heroDescription}>
              OPA is expense tracking built for production. Scan receipts, organize
              by envelope, export your top sheet. The wrap process that used to take
              hours now takes minutes.
            </p>
            <div style={styles.heroCTA}>
              <a href={APP_URL} className="btn btn-primary btn-large">
                Start Free Trial
              </a>
              <span style={{
                fontSize: '0.9rem',
                color: 'var(--sage)',
              }}>
                30 days free. No credit card.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--blush-light)',
        borderTop: '1px solid rgba(13, 27, 42, 0.06)',
        borderBottom: '1px solid rgba(13, 27, 42, 0.06)',
      }} id="how-it-works">
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>How it works.</h2>
          </div>

          <div style={styles.howItWorksGrid} className="how-it-works-grid">
            {[
              {
                icon: <CameraIcon />,
                title: 'Scan it',
                desc: 'Snap a photo or upload a PDF. OPA reads the merchant, date, amount, and line items automatically.',
              },
              {
                icon: <FolderIcon />,
                title: 'Organize it',
                desc: 'Receipts go into envelopes — just like real production. Track petty cash, POs, and per diems the way you already think about them.',
              },
              {
                icon: <SpreadsheetIcon />,
                title: 'Export it',
                desc: 'One click. Production-ready top sheet. Done. Hand it to accounting and go home.',
              },
            ].map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 150}>
                <div style={styles.howItWorksCard}>
                  <div style={styles.howItWorksIcon}>
                    {step.icon}
                  </div>
                  <h3 style={styles.howItWorksTitle}>{step.title}</h3>
                  <p style={styles.howItWorksDesc}>{step.desc}</p>
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
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'var(--ink)',
                marginBottom: '8px',
              }}>
                OPA
              </div>
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
                fontSize: '0.95rem',
              }}>
                or $468/year — save 20%
              </p>

              <div style={{
                textAlign: 'left' as const,
                marginBottom: '36px',
              }}>
                {[
                  'Smart receipt scanning',
                  'Envelope-based expense tracking',
                  'One-click top sheet export',
                  'Unlimited jobs and envelopes',
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
            <h2 style={styles.sectionTitle}>Built for people who actually wrap shoots.</h2>
          </div>

          <div style={styles.rolesGrid} className="roles-grid">
            {[
              {
                title: 'Line Producers',
                desc: 'Track every envelope across every job. See where the money went before accounting asks.',
              },
              {
                title: 'Coordinators',
                desc: 'Stop building top sheets in Excel. Upload receipts as they come in, export when you\'re done.',
              },
              {
                title: 'Production Accountants',
                desc: 'Get clean, organized receipt data with budget line classifications. Less chasing, more reconciling.',
              },
              {
                title: 'Production Managers',
                desc: 'Real-time visibility into spend across departments. No more waiting until wrap to know where you stand.',
              },
            ].map((role, i) => (
              <RevealOnScroll key={role.title} delay={i * 100}>
                <div style={styles.roleCard}>
                  <p style={styles.roleTitle}>{role.title}</p>
                  <p style={styles.roleDesc}>{role.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{
        ...styles.section,
        background: 'var(--blush-light)',
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
      <section style={styles.ctaSection}>
        <div className="container">
          <h2 style={styles.ctaTitle}>Your Friday nights deserve better.</h2>
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
              — Expense tracking for production.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--sage)' }}>
            <span>© {new Date().getFullYear()} OPA</span>
            <a href="/terms" style={styles.footerLink}>Terms</a>
            <a href="/privacy" style={styles.footerLink}>Privacy</a>
            <a href="mailto:hello@useopa.com" style={styles.footerLink}>hello@useopa.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
