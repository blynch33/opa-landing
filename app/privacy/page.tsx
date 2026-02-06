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
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  lastUpdated: {
    fontSize: '0.9rem',
    color: 'var(--sage)',
    marginBottom: '32px',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginBottom: '20px',
  },
  section: {
    marginTop: '40px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    fontWeight: 500,
    marginBottom: '16px',
  },
  list: {
    marginBottom: '20px',
    paddingLeft: '24px',
  },
  listItem: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginBottom: '8px',
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
  contactEmail: {
    color: 'var(--forest)',
    textDecoration: 'none',
  },
};

export default function Privacy() {
  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <Link href="/" style={styles.logo}><span style={{ color: 'var(--terracotta)' }}>o</span>pa</Link>
          <Link href="/#cta" className="btn btn-primary">Get Early Access</Link>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>Legal</div>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.lastUpdated}>Last updated: February 2025</p>
          
          <p style={styles.paragraph}>
            Your privacy matters to us. This policy explains what information we collect, 
            how we use it, and your rights regarding your data. We've tried to keep it 
            readable—no one likes legal jargon.
          </p>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Information We Collect</h2>
            <p style={styles.paragraph}>
              <strong>Account Information:</strong> When you sign up, we collect your name, 
              email address, and any other information you provide.
            </p>
            <p style={styles.paragraph}>
              <strong>Usage Data:</strong> We collect information about how you use OPA, 
              including features you access and actions you take. This helps us improve the product.
            </p>
            <p style={styles.paragraph}>
              <strong>Financial Data:</strong> If you use OPA to track expenses, we store the 
              receipt images and expense information you enter. This data belongs to you.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How We Use Your Information</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>To provide and maintain the OPA service</li>
              <li style={styles.listItem}>To communicate with you about your account or the service</li>
              <li style={styles.listItem}>To improve and develop new features</li>
              <li style={styles.listItem}>To protect against fraud and abuse</li>
            </ul>
            <p style={styles.paragraph}>
              We do not sell your personal information. Ever.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Data Security</h2>
            <p style={styles.paragraph}>
              We use industry-standard encryption to protect your data in transit and at rest. 
              Your financial information and receipts are encrypted using AES-256 encryption. 
              We regularly review our security practices and update them as needed.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Data Retention</h2>
            <p style={styles.paragraph}>
              We retain your data for as long as your account is active or as needed to provide 
              you services. If you delete your account, we will delete your personal data within 
              30 days, except where we're required to retain it for legal purposes.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Rights</h2>
            <p style={styles.paragraph}>You have the right to:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Access the personal data we hold about you</li>
              <li style={styles.listItem}>Request correction of inaccurate data</li>
              <li style={styles.listItem}>Request deletion of your data</li>
              <li style={styles.listItem}>Export your data in a portable format</li>
              <li style={styles.listItem}>Opt out of marketing communications</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Cookies</h2>
            <p style={styles.paragraph}>
              We use essential cookies to keep you logged in and remember your preferences. 
              We may use analytics cookies to understand how people use OPA. You can disable 
              cookies in your browser settings, but some features may not work properly.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Third-Party Services</h2>
            <p style={styles.paragraph}>
              We use trusted third-party services for hosting, analytics, and payment processing. 
              These providers have their own privacy policies and are contractually obligated to 
              protect your data.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Changes to This Policy</h2>
            <p style={styles.paragraph}>
              We may update this policy from time to time. If we make significant changes, 
              we'll notify you by email or through the app. Your continued use of OPA after 
              changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact Us</h2>
            <p style={styles.paragraph}>
              Questions about this policy? Email us at{' '}
              <a href="mailto:hello@useopa.com" style={styles.contactEmail}>hello@useopa.com</a>.
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
