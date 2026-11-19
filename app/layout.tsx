import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { copy } from './copy';

export const metadata: Metadata = {
  metadataBase: new URL('https://useopa.com'),
  title: copy.seo.title,
  description: copy.seo.description,
  keywords: ['petty cash tracking', 'receipt scanning', 'top sheet export', 'Hot Budget import', 'production coordinator tools', 'commercial production software'],
  authors: [{ name: 'OPA' }],
  openGraph: {
    title: copy.seo.title,
    description: copy.seo.ogDescription,
    url: 'https://useopa.com',
    siteName: 'OPA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.seo.title,
    description: copy.seo.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
