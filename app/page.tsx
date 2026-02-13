import { Camera, FolderOpen, FileSpreadsheet, ArrowRight } from 'lucide-react';

const APP_URL = 'https://app.useopa.com';

export default function Home() {
  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <header className="border-b border-sage/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight text-forest font-display">
            opa
          </a>
          <a
            href={APP_URL}
            className="text-sage hover:text-forest transition-colors text-sm font-medium"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-forest leading-tight">
            Stop sorting receipts at midnight.
          </h1>
          <p className="mt-6 text-lg text-sage leading-relaxed max-w-lg">
            OPA is expense tracking built for production. Scan receipts, organize
            by envelope, export your top sheet. The wrap process that used to take
            hours now takes minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-sm text-sage">
              30 days free. No credit card.
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-4">
              <Camera className="w-5 h-5 text-forest" />
            </div>
            <h3 className="font-display text-lg font-medium text-ink mb-2">
              Scan it
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              Snap a photo or upload a PDF. OPA reads the merchant, date, amount,
              and line items automatically.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-4">
              <FolderOpen className="w-5 h-5 text-forest" />
            </div>
            <h3 className="font-display text-lg font-medium text-ink mb-2">
              Organize it
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              Receipts go into envelopes — just like real production. Track petty
              cash, POs, and per diems the way you already think about them.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-5 h-5 text-forest" />
            </div>
            <h3 className="font-display text-lg font-medium text-ink mb-2">
              Export it
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              One click. Production-ready top sheet. Done. Hand it to accounting
              and go home.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-xl border border-border bg-white p-8 md:p-10 shadow-card max-w-lg mx-auto">
          <div className="text-center space-y-1 mb-6">
            <p className="text-lg font-medium text-ink">OPA</p>
            <p className="text-3xl font-semibold text-forest font-display">
              $49<span className="text-base font-normal text-sage">/month</span>
            </p>
            <p className="text-sm text-sage">or $468/year — save 20%</p>
          </div>
          <ul className="text-sm text-ink space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-forest mt-0.5">&#10003;</span>
              Smart receipt scanning
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest mt-0.5">&#10003;</span>
              Envelope-based expense tracking
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest mt-0.5">&#10003;</span>
              One-click top sheet export
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest mt-0.5">&#10003;</span>
              Unlimited jobs and envelopes
            </li>
          </ul>
          <a
            href={APP_URL}
            className="block w-full text-center bg-forest hover:bg-forest/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Free Trial
          </a>
          <p className="text-xs text-sage mt-3 text-center">
            30 days free. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-forest mb-8 text-center">
          Built for people who actually wrap shoots
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="rounded-lg bg-white border border-border p-5">
            <p className="text-sm font-medium text-ink mb-1">Line Producers</p>
            <p className="text-sm text-sage">
              Track every envelope across every job. See where the money went
              before accounting asks.
            </p>
          </div>
          <div className="rounded-lg bg-white border border-border p-5">
            <p className="text-sm font-medium text-ink mb-1">Coordinators</p>
            <p className="text-sm text-sage">
              Stop building top sheets in Excel. Upload receipts as they come in,
              export when you're done.
            </p>
          </div>
          <div className="rounded-lg bg-white border border-border p-5">
            <p className="text-sm font-medium text-ink mb-1">Production Accountants</p>
            <p className="text-sm text-sage">
              Get clean, organized receipt data with budget line classifications.
              Less chasing, more reconciling.
            </p>
          </div>
          <div className="rounded-lg bg-white border border-border p-5">
            <p className="text-sm font-medium text-ink mb-1">Production Managers</p>
            <p className="text-sm text-sage">
              Real-time visibility into spend across departments. No more
              waiting until wrap to know where you stand.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-20">
        <div className="text-center">
          <p className="text-lg text-ink font-medium mb-4">
            Your Friday nights deserve better.
          </p>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sage/10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-sage">
          <span>&copy; {new Date().getFullYear()} OPA</span>
          <div className="flex gap-4">
            <a href="/terms" className="hover:text-ink transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
            <a href="mailto:hello@useopa.com" className="hover:text-ink transition-colors">hello@useopa.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
