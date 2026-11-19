import Link from 'next/link';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

export default function About() {
  return (
    <>
      <SiteNav />

      <main className="prose">
        <div className="container container-narrow">
          <div className="eyebrow">About</div>
          <h1>Built by someone who's been where you are.</h1>

          <p>
            OPA was born out of frustration. The kind you feel at 11pm the night before wrap,
            staring at a spreadsheet that doesn't add up, with a camera roll full of receipts
            you can't remember taking.
          </p>

          <p>
            I've worked in production. I've lived the chaos of petty cash tracking, the
            "where did that $200 go?" panic, the endless reformatting of top sheets that
            accounting will inevitably ask you to redo anyway.
          </p>

          <p>
            <span className="highlight">So I built the tool I wished I'd had.</span>
          </p>

          <div>
            <h2>What OPA Is</h2>
            <p>
              OPA is a focused tool for tracking petty cash and receipts on film and TV
              productions. It thinks the way production people think — receipts first, line
              items second. No complicated setup. No learning curve.
            </p>
          </div>

          <div>
            <h2>What I Believe</h2>
            <p>
              Production accounting shouldn't require a PhD in Excel. The tools you use should
              match your workflow, not fight it. And you should be able to leave wrap with the
              crew — not three hours after them.
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
