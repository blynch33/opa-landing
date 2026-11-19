import Link from 'next/link';
import { copy, links } from '../copy';

/** Sticky translucent nav shared by every page. Section anchors only on the home page. */
export function SiteNav({ home = false }: { home?: boolean }) {
  const anchor = (href: string) => (home ? href : `/${href}`);
  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Main">
        <Link href="/" className="wordmark" aria-label="OPA home">opa</Link>
        <div className="nav-links">
          {copy.nav.links.map((l) => (
            <a key={l.href} href={anchor(l.href)} className="nav-link hide-sm">{l.label}</a>
          ))}
          <a href={links.app} className="nav-link">{copy.nav.login}</a>
          <a href={links.app} className="btn btn-primary btn-sm">{copy.nav.cta}</a>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} OPA. {copy.footer.tagline}
        </p>
        <div className="footer-links">
          {copy.footer.links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
