import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'OPA — Built for People Who Actually Run Production',
  description: 'Digital production office assistant that tracks petty cash, reimbursements, and receipts in real time. Stop rebuilding expense reports at 2am.',
  keywords: 'production management, petty cash tracking, receipt management, production coordinator tools, film production software',
  authors: [{ name: 'OPA' }],
  openGraph: {
    title: 'OPA — Built for People Who Actually Run Production',
    description: 'Stop chasing receipts. Digital assistant for production managers, coordinators, and PAs.',
    url: 'https://useopa.com',
    siteName: 'OPA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OPA - Production Office Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPA — Built for People Who Actually Run Production',
    description: 'Stop chasing receipts. Digital assistant for production managers, coordinators, and PAs.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
