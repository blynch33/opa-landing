# OPA landing copy (minimal rebuild)

## READ FIRST: things for Brendan to decide

1. **Pricing (decided by Brendan 2026-11-19):** $1.99/month, single plan, no free trial, no founding tier. Remove the founding-spots counter and any trial language.
2. **The founding CTA doesn't go to Stripe.** `STRIPE_LINK` is defined in page.tsx but nothing uses it. Every CTA goes to `APP_URL`. I left it that way.
3. **There's no About link.** `app/about` exists but the current footer doesn't link to it. I added an About link to the footer below (`/about`). Drop it if that page isn't ready.
4. **Claims I dropped from the current page** because I couldn't verify them: "Bank-level encryption", "15-20 hrs/week lost", "AICP-formatted", and "Purchase orders and cost reports coming soon".

## CTA destinations (unchanged)

| Element | href |
|---|---|
| Primary CTA (nav, hero, pricing, final) | `APP_URL` = `https://app.useopa.com/login` |
| Nav "Log in" | `APP_URL` |
| Secondary hero link / nav "How it works" | `#how-it-works` |
| Nav "Pricing" | `#pricing` |
| Nav "FAQ" | `#faq` |
| Logo | `/` |
| Footer: Free Chit Generator | `https://chit.useopa.com` |
| Footer: Terms | `/terms` |
| Footer: Privacy | `/privacy` |
| Footer: email | `mailto:hello@useopa.com` |
| Footer: About (new, see note 3) | `/about` |

---

## seo

- **seo.title:** OPA — Petty Cash and Receipt Tracking for Commercial Production
- **seo.description:** Scan receipts, balance petty cash envelopes, check crew logs, and export top sheets and Hot Budget imports. Works in any browser. $1.99/month.
- **seo.og_description:** Petty cash for commercial production. Scan it, balance it, export it.

(The description doesn't mention price, so it stays correct whichever pricing you pick.)

## nav

- **nav.links:** How it works · Pricing · FAQ · Log in
- **nav.cta:** Get started

## hero

- **hero.headline:** Petty cash, done before wrap.
- **hero.sub:** Scan receipts, balance envelopes, export the top sheet. Built by a production manager who got tired of doing it at midnight.
- **hero.cta_primary:** Get started → `APP_URL`
- **hero.cta_microcopy:** $1.99 a month. Cancel anytime.
- **hero.cta_secondary:** See how it works → `#how-it-works`

## showcase

- **showcase.line:** Every job. Every envelope. Every receipt, down to the penny.

(Under the main product screenshot. If you keep the phone mockup from MobilePreviewSection, use this caption for it: **Scan it on set. Finish it at your desk.**)

## features

- **features.1.title:** Scan it on your phone.
- **features.1.body:** Snap the receipt. OPA reads the vendor, amount and date, then suggests the line.

- **features.2.title:** Envelopes that add up.
- **features.2.body:** Advances, floats, transfers and returns. You always know what's on hand.

- **features.3.title:** Check their math.
- **features.3.body:** Upload the crew member's own log. OPA shows what's missing, what's extra, and what's off by $4.12.

- **features.4.title:** Hand off what accounting wants.
- **features.4.body:** A top sheet, a Hot Budget import, and a backup PDF of every receipt.

## how_it_works (id="how-it-works")

- **how.headline:** Four steps. Then go home.
- **how.1:** Make the job.
- **how.2:** Scan the receipts.
- **how.3:** Check the envelope.
- **how.4:** Export and send.

## who

- **who.headline:** For whoever's holding the envelope.
- **who.roles:**
  - Production coordinators
  - Line producers and PMs
  - Office PAs
  - Key PAs running a float
- **who.footnote:** Crew upload from a link. No account needed.

## pricing (id="pricing")

- **pricing.headline:** One plan. $1.99 a month.
- **pricing.price:** $1.99/month
- **pricing.includes:**
  - Receipt scanning
  - Unlimited jobs and envelopes
  - Top sheet and Hot Budget export
  - Works on any device
- **pricing.cta:** Get started → `APP_URL`
- **pricing.microcopy:** Cancel anytime.
- **pricing.footnote:** One flat rate. No per-receipt fees. Fits in your kit fee.

## faq (id="faq")

- **faq.headline:** Questions.

1. **faq.1.q:** Is it just petty cash?
   **faq.1.a:** Yes. Receipts, envelopes, floats, top sheets. It does one job and does it well.

2. **faq.2.q:** Does it work on Windows? My phone?
   **faq.2.a:** Yes. It runs in any browser: Mac, Windows, iPhone, Android. Nothing to install.

3. **faq.3.q:** Does my crew need an account?
   **faq.3.a:** No. Send them a link and they upload straight into their envelope.

4. **faq.4.q:** Does it work with Hot Budget?
   **faq.4.a:** Yes. Export a job or a single envelope as a workbook Hot Budget's Import button can read.

5. **faq.5.q:** What does it cost?
   **faq.5.a:** $1.99 a month. One plan, everything included. Cancel anytime.

## final_cta

- **final.headline:** Your Friday night is yours.
- **final.sub:** $1.99 a month. The receipts are handled.
- **final.cta:** Get started → `APP_URL`

## footer

- **footer.tagline:** Petty cash for commercial production.
- **footer.links:** Free Chit Generator · About · Terms · Privacy · hello@useopa.com
- **footer.copyright:** © {year} OPA

---

### Cut from the current page

- Live stats bar (receipts scanned / spots left). The spots counter now lives in the pricing section.
- The "tools you have weren't built for this" pain/solve cards. One line in the hero sub does that job now.
- The two screenshot cards ("All your jobs", "Envelopes that track themselves"). The showcase line replaces them.
- The "One tool. One job." block and the Team Access feature. The FAQ covers crew access.
- FAQ trimmed from 9 to 5. I dropped the ones about tech-savviness, Excel, security, per-receipt fees (the pricing footnote covers that) and team.
