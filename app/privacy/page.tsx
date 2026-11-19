import Link from 'next/link';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

export default function Privacy() {
  return (
    <>
      <SiteNav />

      <main className="prose">
        <div className="container container-narrow">
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: February 2025</p>
          
          <p>
            Your privacy matters to us. This policy explains what information we collect, 
            how we use it, and your rights regarding your data. We've tried to keep it 
            readable—no one likes legal jargon.
          </p>

          <div>
            <h2>Information We Collect</h2>
            <p>
              <strong>Account Information:</strong> When you sign up, we collect your name, 
              email address, and any other information you provide.
            </p>
            <p>
              <strong>Usage Data:</strong> We collect information about how you use OPA, 
              including features you access and actions you take. This helps us improve the product.
            </p>
            <p>
              <strong>Financial Data:</strong> If you use OPA to track expenses, we store the 
              receipt images and expense information you enter. This data belongs to you.
            </p>
          </div>

          <div>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain the OPA service</li>
              <li>To communicate with you about your account or the service</li>
              <li>To improve and develop new features</li>
              <li>To protect against fraud and abuse</li>
            </ul>
            <p>
              We do not sell your personal information. Ever.
            </p>
          </div>

          <div>
            <h2>Data Security</h2>
            <p>
              We use industry-standard encryption to protect your data in transit and at rest. 
              Your financial information and receipts are encrypted using AES-256 encryption. 
              We regularly review our security practices and update them as needed.
            </p>
          </div>

          <div>
            <h2>Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide 
              you services. If you delete your account, we will delete your personal data within 
              30 days, except where we're required to retain it for legal purposes.
            </p>
          </div>

          <div>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2>Cookies</h2>
            <p>
              We use essential cookies to keep you logged in and remember your preferences. 
              We may use analytics cookies to understand how people use OPA. You can disable 
              cookies in your browser settings, but some features may not work properly.
            </p>
          </div>

          <div>
            <h2>Third-Party Services</h2>
            <p>
              We use trusted third-party services for hosting, analytics, and payment processing. 
              These providers have their own privacy policies and are contractually obligated to 
              protect your data.
            </p>
          </div>

          <div>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. If we make significant changes, 
              we'll notify you by email or through the app. Your continued use of OPA after 
              changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2>Contact Us</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a href="mailto:hello@useopa.com">hello@useopa.com</a>.
            </p>
          </div>

          <Link href="/" className="back">
            ← Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
