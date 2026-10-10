import { Link, useLocation } from 'react-router-dom'
import { PiArrowRight, PiArrowUp, PiEnvelopeSimple, PiMapPin, PiPhone, PiWhatsappLogo } from 'react-icons/pi'
import { allUrl, collections, dash } from '../lib/data'
import { site, telHref } from '../site'
import { FooterLogo } from './Logo'

const COMPANY = [
  { href: '/trade/', label: 'Trade & Wholesale' },
  { href: '/about/', label: 'About' },
  { href: '/materials/', label: 'Materials' },
  { href: '/bespoke/', label: 'Contact Us' },
  { href: '/media/', label: 'Media' },
  { href: '/feeds/', label: 'Feeds' },
]

export default function Footer() {
  const { pathname } = useLocation()
  // The home page ends with its own invitation and the contact page is the form, so skip the band there.
  const showCta = pathname !== '/' && pathname !== '/bespoke/'
  return (
    <footer className="site-footer on-dark">
      {showCta && (
        <section className="footer-cta" aria-labelledby="footer-cta-title">
          <div className="container footer-cta__inner">
            <div>
              <p className="eyebrow">Let’s work together</p>
              <h2 id="footer-cta-title" style={{ marginTop: '1rem' }}>
                Have a project in <span className="accent-italic">mind?</span>
              </h2>
              <p>Tell us about your space, your style and your timeline. Our team in Jepara replies within one business day.</p>
            </div>
            <div className="btn-row">
              <Link className="btn btn--gold btn--lg" to="/bespoke/">
                Request a quote
                <PiArrowRight className="btn__icon btn__icon--arrow" aria-hidden="true" />
              </Link>
              <a className="btn btn--outline-light btn--lg" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <PiWhatsappLogo className="btn__icon" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="container footer-grid">
        <div className="footer-col footer-col--brand">
          <Link className="footer-brand-link" to="/">
            <FooterLogo className="footer-brand-logo" />
          </Link>
          <p className="footer-blurb">Handcrafted teak furniture from Jepara, Indonesia, for refined indoor, outdoor and bathroom spaces.</p>
          <ul className="footer-social" role="list">
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
                <PiWhatsappLogo aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={telHref(site.phone)} aria-label={`Call ${site.phone}`}>
                <PiPhone aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} aria-label="Send us an email">
                <PiEnvelopeSimple aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <nav className="footer-col" aria-label="Collections">
          <h2 className="footer-heading">Collections</h2>
          <ul className="footer-links" role="list">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to={allUrl(c.slug)}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link to={allUrl()}>View all furniture</Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Company">
          <h2 className="footer-heading">Company</h2>
          <ul className="footer-links" role="list">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link to={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-contact" role="list">
            <li>
              <PiEnvelopeSimple aria-hidden="true" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <PiPhone aria-hidden="true" />
              <a href={telHref(site.phone)}>{site.phone}</a>
            </li>
            <li>
              <PiMapPin aria-hidden="true" />
              <address style={{ fontStyle: 'normal' }}>{dash(site.address)}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved. &middot; {site.city}
        </p>
        <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
          <PiArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
