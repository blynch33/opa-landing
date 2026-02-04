'use client';

import Link from 'next/link';

const styles = {
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '16px 0',
    background: 'rgba(250, 249, 245, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 20px rgba(13, 27, 42, 0.08)',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 500,
    color: 'var(--forest)',
    letterSpacing: '-0.03em',
    textDecoration: 'none',
  },
  main: {
    paddingTop: '120px',
    paddingBottom: '80px',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 24px',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'var(--terracotta)',
    marginBottom: '12px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 400,
    marginBottom: '32px',
    lineHeight: 1.2,
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginBottom: '24px',
  },
  highlight: {
    color: 'var(--forest)',
    fontWeight: 500,
  },
  section: {
    marginTop: '48px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '16px',
  },
  footer: {
    background: 'var(--porcelain)',
    borderTop: '1px solid rgba(13, 27, 42, 0.1)',
    padding: '32px 0',
    textAlign: 'center' as const,
  },
  footerText: {
    color: 'var(--sage)',
    fontSize: '0.9rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--forest)',
    fontSize: '0.95rem',
    marginTop: '48px',
    textDecoration: 'none',
  },
};

export default function About() {
  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <Link href="/" style={styles.logo}>opa</Link>
          <Link href="/#cta" className="btn btn-primary">Get Early Access</Link>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>About</div>
          <h1 style={styles.title}>We've been where you are.</h1>
          
          <p style={styles.paragraph}>
            OPA was born out of frustration. The kind you feel at 11pm the night before wrap, 
            staring at a spreadsheet that doesn't add up, with a camera roll full of receipts 
            you can't remember taking.
          </p>
          
          <p style={styles.paragraph}>
            We've worked in production. We've lived the chaos of petty cash tracking, the 
            "where did that $200 go?" panic, the endless reformatting of Excel sheets that 
            accounting will inevitably ask you to redo anyway.
          </p>
          
          <p style={styles.paragraph}>
            <span style={styles.highlight}>So we decided to build the tool we wished we'd had.</span>
          </p>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What OPA Is</h2>
            <p style={styles.paragraph}>
              OPA (Office Production Assistant) is a simple, focused tool for tracking petty cash 
              and receipts on film and TV productions. It thinks the way production managers 
              think—receipts first, line items second. No complicated setup, no learning curve, 
              no paradigm shifts.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What We Believe</h2>
            <p style={styles.paragraph}>
              Production accounting shouldn't require a PhD in Excel. The tools you use should 
              match your mental model, not force you into theirs. And you should be able to 
              leave wrap with the crew—not three hours after them.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Early Access</h2>
            <p style={styles.paragraph}>
              We're building OPA in public, with real production professionals shaping what 
              comes next. If you want to be part of that—and get free access while we're in 
              beta—we'd love to have you.
            </p>
          </div>

          <Link href="/" style={styles.backLink}>
            ← Back to home
          </Link>
        </div>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© {new Date().getFullYear()} OPA. Made with ☕ in production offices everywhere.</p>
      </footer>
    </>
  );
}
