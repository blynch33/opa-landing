import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://useopa.com'),
  title: 'OPA — Petty Cash. Handled.',
  description: 'Petty cash tracking, receipt management, and budget visibility for film & TV production crews. Scan receipts, assign to envelopes, reconcile, export.',
  keywords: ['production accounting', 'petty cash', 'film production', 'TV production', 'receipt tracking', 'production management', 'entertainment accounting'],
  authors: [{ name: 'OPA' }],
  openGraph: {
    title: 'OPA — Petty Cash. Handled.',
    description: 'Petty cash tracking, receipt management, and budget visibility for film & TV production crews.',
    url: 'https://useopa.com',
    siteName: 'OPA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPA — Petty Cash. Handled.',
    description: 'Petty cash tracking, receipt management, and budget visibility for film & TV production crews.',
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
