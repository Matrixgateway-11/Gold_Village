import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Honeypot, LeadSelects } from '../components/LeadFields'
import { categoryBySlug, categoryUrl, dash, productBySlug } from '../lib/data'
import { submitLead } from '../lib/leads'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import NotFound from './NotFound'

const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s(-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())

export default function Product() {
  const { slug = '' } = useParams()
  const p = productBySlug.get(slug)
  const cat = p ? categoryBySlug.get(p.cat) : undefined
  usePage({
    title: p ? `${titleCase(p.name)}${cat ? ' – ' + dash(cat.name).replace(/\s*–\s*/, ' ') : ''} | {name}` : 'Not found | {name}',
    description: p
      ? `The ${titleCase(p.name)} from ${site.name}: ${cat ? cat.label.toLowerCase() : 'teak furniture'} handcrafted in Jepara, Indonesia.${p.dim && p.dim !== '—' ? ' Dimensions ' + p.dim + '.' : ''}${p.sku ? ' Code ' + p.sku + '.' : ''}`
      : undefined,
    bodyClass: 'single-product woocommerce woocommerce-page',
  })
  const [mode, setMode] = useState<'cta' | 'form' | 'thanks'>('cta')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!p) return <NotFound />

  const [main, ...thumbs] = p.images
  const alt = `${p.name} – ${site.name}`
  const id = p.id

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await submitLead(e.currentTarget, `Product inquiry — ${p.name}${p.sku ? ' (' + p.sku + ')' : ''}`)
      setMode('thanks')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main id="product-main" className="product-page">
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/product-category/all/">Categories</Link>
        <span className="product-breadcrumb-sep" aria-hidden="true">
          /
        </span>
        {cat && (
          <Link className="product-breadcrumb-current" to={categoryUrl(cat.slug)}>
            {dash(cat.name)}
          </Link>
        )}
      </nav>
      <div className="product-layout grid-2">
        <div className="product-gallery">
          {main && (
            <button type="button" className="product-gallery__trigger product-gallery__trigger--main" data-indocasa-lightbox={main.lg} aria-label="View image full screen">
              <img width="1200" height="1200" src={main.lg} className="product-main-image" alt={alt} decoding="async" />
            </button>
          )}
          {thumbs.length > 0 && (
            <div className="thumb-grid">
              {thumbs.map((t) => (
                <button type="button" className="product-gallery__trigger product-gallery__trigger--thumb" data-indocasa-lightbox={t.lg} aria-label="View image full screen" key={t.lg}>
                  <img width="150" height="150" src={t.sm} className="attachment-thumbnail size-thumbnail" alt={alt} decoding="async" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-details product-details-panel">
          <h1 className="product-detail-title">{p.name}</h1>
          {p.sku && <p className="product-detail-code">Code: {p.sku}</p>}
          <div className="spec-list spec-list--diamond">
            {p.dim && (
              <div className="spec-row">
                <span className="spec-diamond" aria-hidden="true">
                  ◆
                </span>
                <span className="spec-text">Dimensions: {p.dim}</span>
              </div>
            )}
            <div className="spec-row">
              <span className="spec-diamond" aria-hidden="true">
                ◆
              </span>
              <span className="spec-text">Worldwide shipping available</span>
            </div>
          </div>
          <div className="product-inquiry">
            <div className="product-cta-stack" hidden={mode !== 'cta'}>
              <button type="button" className="product-cta product-cta--primary product-inquire" onClick={() => setMode('form')}>
                Inquire About This Piece
              </button>
              <Link className="product-cta product-cta--secondary" to="/bespoke/">
                Request Bespoke Version
              </Link>
            </div>
            <form className="product-inquiry-form" hidden={mode !== 'form'} onSubmit={submit}>
              <p className="bespoke-form__error" hidden={!error}>
                {error}
              </p>
              <input type="hidden" name="product" value={`${p.name}${p.sku ? ' (' + p.sku + ')' : ''}`} />
              <div className="bespoke-field">
                <label htmlFor={`product-inquiry-name-${id}`}>Name</label>
                <input id={`product-inquiry-name-${id}`} name="name" type="text" required />
              </div>
              <div className="bespoke-field">
                <label htmlFor={`product-inquiry-email-${id}`}>Email</label>
                <input id={`product-inquiry-email-${id}`} name="email" type="email" required />
              </div>
              <div className="bespoke-field">
                <label htmlFor={`product-inquiry-phone-${id}`}>Phone</label>
                <input id={`product-inquiry-phone-${id}`} name="phone" type="tel" autoComplete="tel" />
              </div>
              <LeadSelects idPrefix={`product-inquiry-${id}`} type="single" />
              <div className="bespoke-field bespoke-field--area">
                <label htmlFor={`product-inquiry-message-${id}`}>Message (optional)</label>
                <textarea id={`product-inquiry-message-${id}`} name="message" rows={4}></textarea>
              </div>
              <Honeypot id={`product-inquiry-website-${id}`} />
              <button className="product-cta product-cta--primary" type="submit" disabled={busy}>
                Send Inquiry
              </button>
            </form>
            <div className="product-inquiry-thanks" hidden={mode !== 'thanks'}>
              <p className="product-inquiry-thanks-title">Thank you for your inquiry.</p>
              <p className="product-inquiry-thanks-sub">Our team will be in touch within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
