import Link from 'next/link';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

export default function Terms() {
  return (
    <>
      <SiteNav />

      <main className="prose">
        <div className="container container-narrow">
          <div className="eyebrow">Legal</div>
          <h1>Terms of Service</h1>
          <p className="updated">Last updated: February 2025</p>
          
          <p>
            These terms govern your use of OPA. By using our service, you agree to these terms. 
            Please read them carefully.
          </p>

          <div>
            <h2>Using OPA</h2>
            <p>
              OPA is a tool for tracking production expenses and petty cash. You may use it for 
              legitimate business purposes in connection with film, television, or other media 
              production work.
            </p>
            <p>
              You must be at least 18 years old to use OPA. By creating an account, you confirm 
              that you meet this requirement.
            </p>
          </div>

          <div>
            <h2>Your Account</h2>
            <p>
              You're responsible for maintaining the security of your account and password. 
              OPA cannot and will not be liable for any loss or damage from your failure to 
              maintain account security.
            </p>
            <p>
              You're responsible for all activity that occurs under your account. If you suspect 
              unauthorized access, please contact us immediately.
            </p>
          </div>

          <div>
            <h2>Your Content</h2>
            <p>
              You retain ownership of any content you upload to OPA, including receipt images 
              and expense data. By uploading content, you grant us a license to store, process, 
              and display that content as needed to provide the service.
            </p>
            <p>
              You're responsible for ensuring you have the right to upload any content. Don't 
              upload anything illegal, harmful, or that violates others' rights.
            </p>
          </div>

          <div>
            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use OPA for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Use the service to harass, abuse, or harm others</li>
            </ul>
          </div>

          <div>
            <h2>Service Availability</h2>
            <p>
              We strive to keep OPA available and reliable, but we can't guarantee 100% uptime. 
              The service may be temporarily unavailable for maintenance, updates, or due to 
              circumstances beyond our control.
            </p>
            <p>
              We may modify or discontinue features at any time. We'll try to give you reasonable 
              notice of significant changes.
            </p>
          </div>

          <div>
            <h2>Pricing and Payment</h2>
            <p>
              OPA costs $1.99 per month, billed monthly. You can cancel anytime from your account
              settings; your access continues until the end of the current billing period. If we
              change the price, we'll notify you in advance and give you the option to continue or
              cancel before any new charges apply.
            </p>
          </div>

          <div>
            <h2>Disclaimer</h2>
            <p>
              OPA is provided "as is" without warranties of any kind. We don't guarantee that the 
              service will meet your specific requirements or be error-free. You use OPA at your 
              own risk.
            </p>
            <p>
              OPA is not a substitute for professional accounting advice. Always consult with 
              qualified accountants for official financial reporting and compliance matters.
            </p>
          </div>

          <div>
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, OPA shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of 
              the service.
            </p>
          </div>

          <div>
            <h2>Termination</h2>
            <p>
              You can stop using OPA at any time by closing your account. We may suspend or 
              terminate your access if you violate these terms or engage in behavior that could 
              harm the service or other users.
            </p>
          </div>

          <div>
            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. If we make significant changes, we'll 
              notify you by email or through the app. Continued use of OPA after changes 
              constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of California, United States. 
              Any disputes will be resolved in the courts of California.
            </p>
          </div>

          <div>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Email us at{' '}
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
