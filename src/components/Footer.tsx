import { Link } from 'react-router-dom'
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
  return (
    <footer className="site-footer indocasa-footer">
      <div className="footer-grid">
        <div className="footer-col footer-col--brand">
          <Link className="footer-brand-link" to="/">
            <FooterLogo className="footer-brand-logo" />
          </Link>
        </div>
        <div className="footer-col">
          <p className="footer-col-heading">Collections</p>
          {collections.map((c) => (
            <p className="footer-col-link-wrap" key={c.slug}>
              <Link className="footer-col-link" to={allUrl(c.slug)}>
                {c.name}
              </Link>
            </p>
          ))}
        </div>
        <div className="footer-col">
          <p className="footer-col-heading">Company</p>
          {COMPANY.map((l) => (
            <p className="footer-col-link-wrap" key={l.href}>
              <Link className="footer-col-link" to={l.href}>
                {l.label}
              </Link>
            </p>
          ))}
        </div>
        <div className="footer-col footer-col--contact">
          <p className="footer-col-heading">Contact</p>
          <p className="footer-col-link-wrap">
            <a className="footer-col-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="footer-col-link-wrap">
            <a className="footer-col-link" href={telHref(site.phone)}>
              {site.phone}
            </a>
          </p>
          <p className="footer-col-text">{dash(site.address)}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-legal">
          &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <p className="footer-legal">{site.city}</p>
      </div>
    </footer>
  )
}
