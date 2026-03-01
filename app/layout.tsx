import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://useopa.com'),
  title: 'OPA — Petty Cash Tracking & Top Sheet Export for Production',
  description: 'Browser-based expense tracking for commercial production. Receipt scanning, petty cash envelopes, AICP-formatted top sheet export. Works on Mac, Windows, and phone. $29/month flat — no per-transaction fees.',
  keywords: ['production expense tracking', 'petty cash tracking', 'top sheet export', 'AICP budget', 'receipt scanning', 'production coordinator tools', 'commercial production software'],
  authors: [{ name: 'OPA' }],
  openGraph: {
    title: 'OPA — Petty Cash Tracking & Top Sheet Export for Production',
    description: 'Browser-based expense tracking for commercial production. Receipt scanning, petty cash envelopes, AICP-formatted top sheet export. $29/month flat.',
    url: 'https://useopa.com',
    siteName: 'OPA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPA — Petty Cash Tracking & Top Sheet Export for Production',
    description: 'Browser-based expense tracking for commercial production. Receipt scanning, petty cash envelopes, AICP-formatted top sheet export. $29/month flat.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://plausible.io/js/pa-wXFqQfZ1M4hBXsvtnTXqL.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
