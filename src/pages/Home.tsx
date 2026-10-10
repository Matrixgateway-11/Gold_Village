import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { productBySlug, productUrl } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'

const U = '/img/uploads/2026/07/'
const MARQUEE = [
  'AUTHENTIC INDONESIAN TEAK',
  'Handcrafted in Indonesia',
  'Sustainably Sourced',
  'Timeless Tropical Design',
  'Trusted Worldwide Since 2013',
  'Tropical Living',
]
const FEATURED = ['aosta-mirror', 'ibiza-dining-table', 'intera-standing-mirror']

export default function Home() {
  usePage({
    title: `${site.legalName} | Handcrafted Indonesian Teak Furniture`,
    description: 'Handcrafted teak furniture from Jepara, Indonesia for refined indoor, outdoor and bathroom spaces.',
    bodyClass: 'home indocasa-hero-fullbleed indocasa-home indocasa-hero-overlay',
  })

  return (
    <>
      <section className="hero hero--fullbleed">
        <img className="hero-bg" src={U + 'home-hero_background_image-1920x1080.webp'} alt="Where Tropical Living Meets Timeless Design" />
        <div className="hero-overlay hero-overlay--left"></div>
        <div className="hero-content hero-content--fullbleed">
          <p className="hero-kicker hero-kicker--light">Tropical Luxury • Timeless Teak Craftsmanship</p>
          <h1 className="hero-title hero-title--light">Where Tropical Living Meets Timeless Design</h1>
          <p className="hero-sub hero-sub--light">
            Discover handcrafted teak furniture designed for refined indoor, outdoor, and bathroom spaces, blending tropical warmth, timeless aesthetics,
            and enduring craftsmanship.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-hero-gold" to="/product-category/all/">
              Explore Collection
            </Link>
            <Link className="btn btn-hero-outline-light" to="/bespoke/">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="home-marquee">
        <div className="home-marquee-inner">
          {[0, 1, 2].map((r) => (
            <Fragment key={r}>
              {MARQUEE.map((m, i) => (
                <span key={i} className={'home-marquee-item' + (i % 2 ? ' home-marquee-item--gold' : '')}>
                  • {m}
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <section className="home-editorial">
        <div className="home-editorial-grid">
          <div>
            <p className="home-editorial-kicker">The {site.name} Philosophy</p>
            <p className="home-editorial-intro">
              Rooted in the warmth of Indonesian living, {site.name} creates furniture that brings together sculptural form, natural teak, and quiet
              luxury. Each piece is designed to soften spaces with texture, light, and timeless presence – creating homes that feel collected, serene,
              and deeply lived in.
            </p>
          </div>
          <h2 className="home-editorial-heading">A Study in Warmth, Texture, and Time</h2>
        </div>
      </section>

      <section className="home-spotlight grid-2">
        <div className="home-spotlight-visual">
          <img src={U + 'home-spotlight_image.webp'} alt="Designed for Warm, Elevated Living" />
          <span className="home-spotlight-badge">AUTHENTIC INDONESIAN TEAK</span>
        </div>
        <div className="home-spotlight-copy">
          <p className="home-section-kicker">Timeless Teak Craftsmanship</p>
          <h2 className="home-spotlight-title">Designed for Warm, Elevated Living</h2>
          <p className="home-spotlight-text">
            {site.name} creates handcrafted teak furniture inspired by tropical architecture, natural textures, and timeless design. From refined indoor
            spaces to serene outdoor living and spa-inspired bathrooms, every piece is made to bring warmth, longevity, and understated luxury into
            modern homes.
          </p>
          <p className="home-spotlight-meta">Sustainably sourced teak • Handcrafted in Bali • Trusted worldwide since 2008</p>
          <div className="home-spotlight-actions">
            <Link className="btn btn-primary" to="/product-category/all/">
              Explore Collections
            </Link>
            <Link className="btn btn-outline-dark" to="/about/">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="home-catalog">
        <div className="home-catalog-head">
          <h2 className="home-catalog-title">From the Catalog</h2>
        </div>
        <Link className="home-catalog-all" to="/product-category/all/">
          View All <span className="home-catalog-arrow">→</span>
        </Link>
        <div className="home-catalog-grid grid-3">
          {FEATURED.map((slug) => {
            const p = productBySlug.get(slug)
            if (!p) return null
            return (
              <Link className="home-catalog-card" to={productUrl(p.slug)} key={slug}>
                <div className="home-catalog-card-img">
                  <img width="700" height="700" src={p.card} alt={p.name} decoding="async" />
                </div>
                {p.sku && <p className="home-catalog-code">Code: {p.sku}</p>}
                <p className="home-catalog-name">{p.name}</p>
                {p.dim && <p className="home-catalog-dim">{p.dim}</p>}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="home-dining-fullbleed">
        <img src={U + 'home-dining_image.webp'} alt="Crafted for Slow Evenings and Long Conversations" />
        <div className="home-dining-gradient"></div>
        <div className="home-dining-content">
          <p className="home-section-kicker home-section-kicker--light">Made for Gathering</p>
          <h2 className="home-dining-heading">Crafted for Slow Evenings and Long Conversations</h2>
          <Link className="btn btn-dining-ghost" to="/product-category/all/dining-tables/?collection=indoor-collection">
            Dining tables
          </Link>
        </div>
      </section>

      <section className="home-craft grid-2">
        <div className="home-craft-copy">
          <p className="home-section-kicker home-section-kicker--light">Collectible Design</p>
          <h2 className="home-craft-heading">Furniture Designed as Functional Sculpture</h2>
          <p className="home-craft-body">
            Blending sculptural silhouettes, rich natural materials, and refined craftsmanship, {site.name} creates pieces that bring character, depth,
            and artistic presence into contemporary spaces.
          </p>
          <Link className="btn btn-craft-outline" to={site.signatureUrl}>
            Explore Signature Pieces
          </Link>
        </div>
        <div className="home-craft-images">
          <img src={U + 'home-craft_image_left-scaled.webp'} alt="" />
          <img src={U + 'home-craft_image_right-scaled.webp'} alt="" />
        </div>
      </section>

      <section className="home-bespoke">
        <p className="home-section-kicker home-bespoke-kicker">/ Bespoke Orders</p>
        <h2 className="home-bespoke-title">Designed Around the Way You Live</h2>
        <p className="home-bespoke-text">
          From private residences to luxury hospitality spaces, {site.name} collaborates with homeowners, architects, and designers to create furniture
          and environments tailored to each space, lifestyle, and vision.
        </p>
        <Link className="btn btn-bespoke" to="/bespoke/">
          Start Your Project
        </Link>
      </section>
    </>
  )
}
