import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OPA — The Production Office Everyone Deserves',
  description: 'Finally, production accounting that doesn\'t make you want to cry. Petty cash tracking, receipt management, and budget visibility for film & TV professionals.',
  keywords: ['production accounting', 'petty cash', 'film production', 'TV production', 'receipt tracking', 'production management', 'entertainment accounting'],
  authors: [{ name: 'OPA' }],
  openGraph: {
    title: 'OPA — The Production Office Everyone Deserves',
    description: 'Finally, production accounting that doesn\'t make you want to cry. Petty cash tracking for film & TV professionals.',
    url: 'https://useopa.com',
    siteName: 'OPA',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OPA - Production Office Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPA — The Production Office Everyone Deserves',
    description: 'Finally, production accounting that doesn\'t make you want to cry.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
