import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PiCheckCircle, PiGlobeHemisphereWest, PiHammer, PiPencilRuler, PiRuler, PiWarningCircle, PiWhatsappLogo } from 'react-icons/pi'
import { Honeypot, LeadSelects } from '../components/LeadFields'
import ProductGallery from '../components/ProductGallery'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Button from '../components/ui/Button'
import Carousel from '../components/ui/Carousel'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { allUrl, categoryBySlug, categoryUrl, dash, hasDim, parseDim, relatedProducts, productBySlug, titleCase } from '../lib/data'
import { submitLead } from '../lib/leads'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import '../styles/pages/product.css'
import NotFound from './NotFound'

export default function Product() {
  const { slug = '' } = useParams()
  const p = productBySlug.get(slug)
  const cat = p ? categoryBySlug.get(p.cat) : undefined
  const name = p ? titleCase(p.name) : ''
  usePage({
    title: p ? `${name}${cat ? ' – ' + dash(cat.name).replace(/\s*–\s*/, ' ') : ''} | {name}` : 'Not found | {name}',
    description: p
      ? `The ${name} from ${site.name}: ${cat ? cat.label.toLowerCase() : 'teak furniture'} handcrafted in Jepara, Indonesia.${hasDim(p.dim) ? ' Dimensions ' + p.dim + '.' : ''}${p.sku ? ' Code ' + p.sku + '.' : ''}`
      : undefined,
  })
  const [mode, setMode] = useState<'cta' | 'form' | 'thanks'>('cta')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const nameInput = useRef<HTMLInputElement>(null)

  // Back to the call-to-action when navigating from one product to another.
  useEffect(() => {
    setMode('cta')
    setError('')
  }, [slug])
  useEffect(() => {
    if (mode === 'form') nameInput.current?.focus()
  }, [mode])

  if (!p) return <NotFound />

  const alt = `${name} – ${site.name}`
  const id = p.id
  const dims = hasDim(p.dim) ? parseDim(p.dim) : null
  const related = relatedProducts(p)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await submitLead(e.currentTarget, `Product inquiry — ${name}${p.sku ? ' (' + p.sku + ')' : ''}`)
      setMode('thanks')
    } catch {
      setError('Something went wrong. Please try again, or message us on WhatsApp.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main id="main">
      <div className="container product">
        <Breadcrumbs
          className="product__crumbs"
          items={[
            { label: 'Home', to: '/' },
            { label: 'Collections', to: allUrl() },
            ...(cat ? [{ label: dash(cat.label), to: categoryUrl(cat.slug) }] : []),
            { label: name },
          ]}
        />
        <div className="product__layout">
          <ProductGallery images={p.images} alt={alt} />

          <div className="product__details">
            {cat && (
              <p className="eyebrow">
                <Link to={categoryUrl(cat.slug)}>{dash(cat.name)}</Link>
              </p>
            )}
            <h1>{name}</h1>
            {p.sku && <p className="product__code">Code: {p.sku}</p>}

            <ul className="spec-list" role="list">
              {hasDim(p.dim) && (
                <li>
                  <PiRuler aria-hidden="true" />
                  <span>
                    <strong>Dimensions</strong>
                    {dims ? dims.map(([k, v]) => `${k} ${v}`).join(' × ') : p.dim}
                  </span>
                </li>
              )}
              <li>
                <PiHammer aria-hidden="true" />
                <span>
                  <strong>Made in Jepara</strong>
                  Handcrafted by skilled artisans in Indonesia
                </span>
              </li>
              <li>
                <PiGlobeHemisphereWest aria-hidden="true" />
                <span>
                  <strong>Worldwide shipping</strong>
                  Export-packed and delivered to your door or site
                </span>
              </li>
              <li>
                <PiPencilRuler aria-hidden="true" />
                <span>
                  <strong>Bespoke on request</strong>
                  Custom sizes, finishes and fabrics
                </span>
              </li>
            </ul>

            <div className="product__inquiry">
              <div className="product__cta" hidden={mode !== 'cta'}>
                <Button size="lg" block arrow onClick={() => setMode('form')}>
                  Inquire About This Piece
                </Button>
                <div className="product__cta-row">
                  <Button to="/bespoke/" variant="outline" block>
                    Request Bespoke Version
                  </Button>
                  <Button
                    href={`https://wa.me/${site.whatsapp}`}
                    variant="outline"
                    block
                    icon={<PiWhatsappLogo aria-hidden="true" />}
                    data-wa-toggle
                    data-wa-type="single"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              <form className="form product__form" hidden={mode !== 'form'} onSubmit={submit}>
                <h2 className="product__form-title">Inquire about the {name}</h2>
                {error && (
                  <p className="form-error" role="alert">
                    <PiWarningCircle aria-hidden="true" />
                    {error}
                  </p>
                )}
                <input type="hidden" name="product" value={`${name}${p.sku ? ' (' + p.sku + ')' : ''}`} />
                <div className="form-row form-row--2">
                  <div className="field">
                    <label htmlFor={`pi-name-${id}`}>Name</label>
                    <input id={`pi-name-${id}`} name="name" type="text" autoComplete="name" required ref={nameInput} />
                  </div>
                  <div className="field">
                    <label htmlFor={`pi-email-${id}`}>Email</label>
                    <input id={`pi-email-${id}`} name="email" type="email" autoComplete="email" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor={`pi-phone-${id}`}>Phone / WhatsApp (optional)</label>
                  <input id={`pi-phone-${id}`} name="phone" type="tel" autoComplete="tel" />
                </div>
                <LeadSelects idPrefix={`pi-${id}`} type="single" />
                <div className="field">
                  <label htmlFor={`pi-message-${id}`}>Message (optional)</label>
                  <textarea id={`pi-message-${id}`} name="message" rows={4}></textarea>
                </div>
                <Honeypot id={`pi-website-${id}`} />
                <div className="product__form-actions">
                  <Button type="submit" size="lg" arrow disabled={busy}>
                    {busy ? 'Sending…' : 'Send Inquiry'}
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setMode('cta')}>
                    Cancel
                  </Button>
                </div>
              </form>

              <div className="form-success" hidden={mode !== 'thanks'} role="status">
                <PiCheckCircle aria-hidden="true" />
                <h3>Thank you for your inquiry.</h3>
                <p>
                  {site.formEndpoint ? '' : 'Your email app has opened with your inquiry ready — press send to complete it. '}
                  Our team will be in touch within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--alt" aria-labelledby="related-title">
          <div className="container">
            <SectionHeading
              id="related-title"
              eyebrow="Keep exploring"
              title={cat ? `More from ${cat.label}` : 'You may also like'}
              action={
                cat ? (
                  <Button to={categoryUrl(cat.slug)} variant="outline" arrow>
                    View all
                  </Button>
                ) : undefined
              }
            />
            <Carousel
              label="Related pieces"
              items={related.map((r) => (
                <ProductCard key={r.slug} p={r} showDim />
              ))}
            />
          </div>
        </section>
      )}
    </main>
  )
}
