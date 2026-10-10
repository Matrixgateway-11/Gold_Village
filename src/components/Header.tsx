import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { allUrl, categoriesOfCollection, categoryUrl, collections } from '../lib/data'
import { Wordmark } from './Logo'

const NAV = [
  { href: '/materials/', label: 'Materials' },
  { href: '/bespoke/', label: 'Contact Us' },
  { href: '/about/', label: 'About' },
]

const isDesktop = () => window.matchMedia('(min-width: 769px)').matches

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 40)
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    return () => window.removeEventListener('scroll', sync)
  }, [])

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    document.body.classList.toggle('indocasa-mobile-menu-open', menuOpen)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setMegaOpen(false)
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const enter = () => {
    if (!isDesktop()) return
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const leave = () => {
    if (!isDesktop()) return
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 130)
  }
  const toggleMobileMega = (e: React.MouseEvent) => {
    if (isDesktop() && !(e.currentTarget as HTMLElement).classList.contains('mega-menu__toggle')) return
    e.preventDefault()
    e.stopPropagation()
    setMegaOpen((o) => !o)
  }

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '') + (menuOpen ? ' mobile-nav-open' : '')} id="site-header">
      <nav className="main-nav">
        <Link className="brand brand-lockup" to="/">
          <Wordmark className="brand-logo" />
        </Link>
        <button
          className="mobile-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={'menu-shell' + (menuOpen ? ' is-open' : '')}>
          <ul className="primary-menu" role="list">
            <li
              className={'primary-menu__item primary-menu__item--mega menu-item-has-children' + (megaOpen ? ' is-mega-open' : '')}
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              <span className="primary-menu__mega-row" onClick={toggleMobileMega}>
                <span className="primary-menu__mega-link">Collections</span>
                <button
                  type="button"
                  className="mega-menu__toggle"
                  aria-expanded={megaOpen}
                  aria-controls="mega-menu-products"
                  aria-label="Toggle product categories"
                  onClick={toggleMobileMega}
                >
                  <span className="mega-menu__toggle-icon" aria-hidden="true"></span>
                </button>
              </span>
              <div className="mega-menu" id="mega-menu-products" role="region" aria-label="Product categories" aria-hidden={!megaOpen}>
                <div className="mega-menu__panel">
                  <div className="mega-menu__inner">
                    {collections.map((col) => {
                      const cats = categoriesOfCollection(col)
                      const multi = cats.length > 8
                      const lists = multi ? [cats.slice(0, Math.ceil(cats.length / 2)), cats.slice(Math.ceil(cats.length / 2))] : [cats]
                      return (
                        <div className={'mega-menu__column' + (multi ? ' is-multi' : '')} key={col.slug}>
                          <div className="mega-menu__col-head">
                            <Link className="mega-menu__title" to={allUrl(col.slug)}>
                              {col.name}
                            </Link>
                          </div>
                          <div className={'mega-menu__lists' + (multi ? ' is-multi' : '')}>
                            {lists.map((list, i) => (
                              <ul className="mega-menu__list" role="list" key={i}>
                                {list.map((c) => (
                                  <li key={c.slug}>
                                    <Link to={categoryUrl(c.slug, col.slug)}>{c.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </li>
            {NAV.map((n) => (
              <li key={n.href} className={location.pathname.startsWith(n.href) ? 'current-menu-item' : undefined}>
                <Link to={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
