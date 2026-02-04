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

export default function Terms() {
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
          <div style={styles.eyebrow}>Legal</div>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.lastUpdated}>Last updated: February 2025</p>
          
          <p style={styles.paragraph}>
            These terms govern your use of OPA. By using our service, you agree to these terms. 
            Please read them carefully.
          </p>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Using OPA</h2>
            <p style={styles.paragraph}>
              OPA is a tool for tracking production expenses and petty cash. You may use it for 
              legitimate business purposes in connection with film, television, or other media 
              production work.
            </p>
            <p style={styles.paragraph}>
              You must be at least 18 years old to use OPA. By creating an account, you confirm 
              that you meet this requirement.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Account</h2>
            <p style={styles.paragraph}>
              You're responsible for maintaining the security of your account and password. 
              OPA cannot and will not be liable for any loss or damage from your failure to 
              maintain account security.
            </p>
            <p style={styles.paragraph}>
              You're responsible for all activity that occurs under your account. If you suspect 
              unauthorized access, please contact us immediately.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Content</h2>
            <p style={styles.paragraph}>
              You retain ownership of any content you upload to OPA, including receipt images 
              and expense data. By uploading content, you grant us a license to store, process, 
              and display that content as needed to provide the service.
            </p>
            <p style={styles.paragraph}>
              You're responsible for ensuring you have the right to upload any content. Don't 
              upload anything illegal, harmful, or that violates others' rights.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Acceptable Use</h2>
            <p style={styles.paragraph}>You agree not to:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Use OPA for any illegal purpose</li>
              <li style={styles.listItem}>Attempt to gain unauthorized access to our systems</li>
              <li style={styles.listItem}>Interfere with or disrupt the service</li>
              <li style={styles.listItem}>Upload malicious code or content</li>
              <li style={styles.listItem}>Impersonate others or misrepresent your affiliation</li>
              <li style={styles.listItem}>Use the service to harass, abuse, or harm others</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Service Availability</h2>
            <p style={styles.paragraph}>
              We strive to keep OPA available and reliable, but we can't guarantee 100% uptime. 
              The service may be temporarily unavailable for maintenance, updates, or due to 
              circumstances beyond our control.
            </p>
            <p style={styles.paragraph}>
              We may modify or discontinue features at any time. We'll try to give you reasonable 
              notice of significant changes.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Pricing and Payment</h2>
            <p style={styles.paragraph}>
              During our early access period, OPA is free to use. If we introduce paid plans in 
              the future, we'll notify you in advance and give you the option to continue or 
              cancel before any charges apply.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Disclaimer</h2>
            <p style={styles.paragraph}>
              OPA is provided "as is" without warranties of any kind. We don't guarantee that the 
              service will meet your specific requirements or be error-free. You use OPA at your 
              own risk.
            </p>
            <p style={styles.paragraph}>
              OPA is not a substitute for professional accounting advice. Always consult with 
              qualified accountants for official financial reporting and compliance matters.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Limitation of Liability</h2>
            <p style={styles.paragraph}>
              To the maximum extent permitted by law, OPA shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of 
              the service.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Termination</h2>
            <p style={styles.paragraph}>
              You can stop using OPA at any time by closing your account. We may suspend or 
              terminate your access if you violate these terms or engage in behavior that could 
              harm the service or other users.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Changes to Terms</h2>
            <p style={styles.paragraph}>
              We may update these terms from time to time. If we make significant changes, we'll 
              notify you by email or through the app. Continued use of OPA after changes 
              constitutes acceptance of the updated terms.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Governing Law</h2>
            <p style={styles.paragraph}>
              These terms are governed by the laws of the State of California, United States. 
              Any disputes will be resolved in the courts of California.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact</h2>
            <p style={styles.paragraph}>
              Questions about these terms? Email us at{' '}
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
