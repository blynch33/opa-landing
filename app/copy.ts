/**
 * All landing-page copy lives here so it can be swapped in one place.
 * Source: docs/landing-copy.md (final copy, 2026-11-19).
 * Pricing: $1.99/month, single plan, no free trial, no founding tier.
 */

export const links = {
  app: 'https://app.useopa.com/login',
  chit: 'https://chit.useopa.com',
  email: 'hello@useopa.com',
};

export const copy = {
  seo: {
    title: 'OPA — Petty Cash and Receipt Tracking for Commercial Production',
    description:
      'Scan receipts, balance petty cash envelopes, check crew logs, and export top sheets and Hot Budget imports. Works in any browser. $1.99/month.',
    ogDescription: 'Petty cash for commercial production. Scan it, balance it, export it.',
  },

  nav: {
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    login: 'Log in',
    cta: 'Get started',
  },

  hero: {
    title: 'Petty cash, done before wrap.',
    lede: 'Scan receipts, balance envelopes, export the top sheet. Built by a production manager who got tired of doing it at midnight.',
    cta: 'Get started',
    microcopy: '$1.99 a month. Cancel anytime.',
    more: 'See how it works',
    moreHref: '#how-it-works',
    screenshotAlt:
      'OPA envelope view: petty cash received, spent and remaining, with every receipt coded to a budget line',
  },

  showcase: {
    line: 'Every job. Every envelope. Every receipt, down to the penny.',
    receiptsLabel: 'receipts scanned so far',
  },

  features: [
    {
      icon: 'scan',
      title: 'Scan it on your phone.',
      body: 'Snap the receipt. OPA reads the vendor, amount and date, then suggests the line.',
    },
    {
      icon: 'envelope',
      title: 'Envelopes that add up.',
      body: 'Advances, floats, transfers and returns. You always know what’s on hand.',
    },
    {
      icon: 'check',
      title: 'Check their math.',
      body: 'Upload the crew member’s own log. OPA shows what’s missing, what’s extra, and what’s off by $4.12.',
    },
    {
      icon: 'export',
      title: 'Hand off what accounting wants.',
      body: 'A top sheet, a Hot Budget import, and a backup PDF of every receipt.',
    },
  ],

  who: {
    title: 'For whoever’s holding the envelope.',
    roles: ['Production coordinators', 'Line producers and PMs', 'Office PAs', 'Key PAs running a float'],
    footnote: 'Crew upload from a link. No account needed.',
  },

  pricing: {
    title: 'One plan. $1.99 a month.',
    price: '$1.99',
    per: '/month',
    includes: [
      'Receipt scanning',
      'Unlimited jobs and envelopes',
      'Top sheet and Hot Budget export',
      'Works on any device',
    ],
    cta: 'Get started',
    microcopy: 'Cancel anytime.',
    footnote: 'One flat rate. No per-receipt fees. Fits in your kit fee.',
  },

  faq: {
    title: 'Questions.',
    items: [
      {
        q: 'Is it just petty cash?',
        a: 'Yes. Receipts, envelopes, floats, top sheets. It does one job and does it well.',
      },
      {
        q: 'Does it work on Windows? My phone?',
        a: 'Yes. It runs in any browser: Mac, Windows, iPhone, Android. Nothing to install.',
      },
      {
        q: 'Does my crew need an account?',
        a: 'No. Send them a link and they upload straight into their envelope.',
      },
      {
        q: 'Does it work with Hot Budget?',
        a: 'Yes. Export a job or a single envelope as a workbook Hot Budget’s Import button can read.',
      },
      {
        q: 'What does it cost?',
        a: '$1.99 a month. One plan, everything included. Cancel anytime.',
      },
    ],
  },

  cta: {
    title: 'Your Friday night is yours.',
    lede: '$1.99 a month. The receipts are handled.',
    button: 'Get started',
  },

  footer: {
    tagline: 'Petty cash for commercial production.',
    links: [
      { label: 'Free Chit Generator', href: 'https://chit.useopa.com' },
      { label: 'About', href: '/about' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'hello@useopa.com', href: 'mailto:hello@useopa.com' },
    ],
  },
} as const;

export type Copy = typeof copy;
