import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PiArrowRight, PiCaretDown, PiEnvelopeSimple, PiList, PiPhone, PiWhatsappLogo, PiX } from 'react-icons/pi'
import { allUrl, categoriesOfCollection, categoryUrl, collectionCount, collections, products } from '../lib/data'
import { DESKTOP_NAV, useMediaQuery } from '../lib/useMediaQuery'
import { site, telHref } from '../site'
import { Wordmark } from './Logo'

// Primary navigation. "Collections" sits second and opens the mega menu.
const LINKS_AFTER = [
  { to: '/materials/', label: 'Materials' },
  { to: '/bespoke/', label: 'Contact Us' },
  { to: '/about/', label: 'About' },
]

const navClass = ({ isActive }: { isActive: boolean }) => 'site-nav__link' + (isActive ? ' is-active' : '')

export default function Header() {
  const location = useLocation()
  const isDesktop = useMediaQuery(DESKTOP_NAV)
  const canHover = useMediaQuery('(hover: hover)')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [drawerCollections, setDrawerCollections] = useState(false)
  const [drawerCol, setDrawerCol] = useState<string | null>(null)
  const closeTimer = useRef(0)
  const drawerRef = useRef<HTMLDivElement>(null)

  const inCollections = location.pathname.startsWith('/product') || location.pathname.startsWith('/collection')

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24)
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    return () => window.removeEventListener('scroll', sync)
  }, [])

  // Any navigation closes both menus.
  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname, location.search])

  // Growing past the breakpoint (rotate / resize) drops the drawer.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false)
    else setMegaOpen(false)
  }, [isDesktop])

  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen)
    // `inert` keeps the closed drawer's links out of the tab order and away from screen readers.
    drawerRef.current?.toggleAttribute('inert', !menuOpen)
    return () => document.body.classList.remove('is-locked')
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      setMegaOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }, [])
  const closeMega = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160)
  }, [])

  const onMegaButton = (e: React.MouseEvent) => {
    // A real mouse click on a hover device just keeps the menu open; keyboard/touch toggle it.
    if (canHover && e.detail > 0) openMega()
    else setMegaOpen((o) => !o)
  }

  return (
    <header className="site-header" id="site-header" data-scrolled={scrolled} data-open={menuOpen} data-mega={megaOpen}>
      <div className="site-header__bar container">
        <Link className="site-header__brand" to="/">
          <Wordmark className="brand-logo" />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list" role="list">
            <li>
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
            </li>
            <li
              className="site-nav__mega-item"
              onMouseEnter={canHover ? openMega : undefined}
              onMouseLeave={canHover ? closeMega : undefined}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMegaOpen(false)
              }}
            >
              <button
                type="button"
                className={'site-nav__link site-nav__link--button' + (inCollections ? ' is-active' : '')}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={onMegaButton}
              >
                Collections
                <PiCaretDown className="site-nav__caret" aria-hidden="true" />
              </button>
              <MegaMenu open={megaOpen && isDesktop} />
            </li>
            {LINKS_AFTER.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={navClass}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <PiX aria-hidden="true" /> : <PiList aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      <div className="drawer" id="mobile-drawer" data-open={menuOpen} aria-hidden={!menuOpen} ref={drawerRef}>
        <div className="drawer__scroll">
          <nav aria-label="Mobile">
            <ul className="drawer__list" role="list">
              <li>
                <NavLink to="/" end className={({ isActive }) => 'drawer__link' + (isActive ? ' is-active' : '')}>
                  Home
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className={'drawer__link drawer__link--button' + (inCollections ? ' is-active' : '')}
                  aria-expanded={drawerCollections}
                  onClick={() => setDrawerCollections((o) => !o)}
                >
                  Collections
                  <PiCaretDown className="drawer__caret" aria-hidden="true" />
                </button>
                <div className="drawer__sub" hidden={!drawerCollections}>
                  {collections.map((col) => {
                    const open = drawerCol === col.slug
                    return (
                      <div className="drawer__group" key={col.slug}>
                        <button
                          type="button"
                          className="drawer__group-toggle"
                          aria-expanded={open}
                          onClick={() => setDrawerCol(open ? null : col.slug)}
                        >
                          <span>
                            {col.name}
                            <small>{collectionCount(col)} pieces</small>
                          </span>
                          <PiCaretDown className="drawer__caret" aria-hidden="true" />
                        </button>
                        <ul className="drawer__sublist" role="list" hidden={!open}>
                          <li>
                            <Link to={allUrl(col.slug)}>
                              View all {col.name.replace(' Collection', '').toLowerCase()}
                              <PiArrowRight aria-hidden="true" />
                            </Link>
                          </li>
                          {categoriesOfCollection(col).map((c) => (
                            <li key={c.slug}>
                              <Link to={categoryUrl(c.slug, col.slug)}>{c.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                  <Link className="drawer__all" to={allUrl()}>
                    Browse all {products.length} pieces
                    <PiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
              {LINKS_AFTER.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className={({ isActive }) => 'drawer__link' + (isActive ? ' is-active' : '')}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer__foot">
            <Link className="btn btn--gold btn--block" to="/bespoke/">
              Start your project
              <PiArrowRight className="btn__icon btn__icon--arrow" aria-hidden="true" />
            </Link>
            <ul className="drawer__contact" role="list">
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                  <PiWhatsappLogo aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={telHref(site.phone)} aria-label={`Call ${site.phone}`}>
                  <PiPhone aria-hidden="true" />
                  <span>Call</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} aria-label="Send an email">
                  <PiEnvelopeSimple aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-backdrop" data-open={menuOpen} onClick={() => setMenuOpen(false)} aria-hidden="true"></div>
    </header>
  )
}

function MegaMenu({ open }: { open: boolean }) {
  return (
    <div className="mega" id="mega-menu" data-open={open} role="region" aria-label="Furniture collections">
      <div className="mega__inner container">
        <div className="mega__cols">
          {collections.map((col) => {
            const cats = categoriesOfCollection(col)
            const wide = cats.length > 8
            return (
              <div className={'mega__col' + (wide ? ' mega__col--wide' : '')} key={col.slug}>
                <Link className="mega__tile" to={allUrl(col.slug)}>
                  <img src={col.hero} alt="" loading="lazy" decoding="async" width="600" height="338" />
                  <span className="mega__tile-label">
                    <span className="mega__tile-name">{col.name}</span>
                    <small>{collectionCount(col)} pieces</small>
                  </span>
                  <PiArrowRight className="mega__tile-arrow" aria-hidden="true" />
                </Link>
                <ul className="mega__list" role="list">
                  {cats.map((c) => (
                    <li key={c.slug}>
                      <Link to={categoryUrl(c.slug, col.slug)}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="mega__foot">
          <p>
            {products.length} handcrafted pieces across {collections.length} collections, made to order in Jepara.
          </p>
          <Link className="link-arrow" to={allUrl()}>
            View all furniture
            <PiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
