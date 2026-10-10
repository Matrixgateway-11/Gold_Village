import { Link } from 'react-router-dom'
import { PiArrowRight } from 'react-icons/pi'
import { hasDim, productUrl, titleCase, type Product } from '../../lib/data'
import { site } from '../../site'

type Props = {
  p: Product
  /** Load immediately (first row above the fold) instead of lazily. */
  eager?: boolean
  /** Show the dimensions line under the name. */
  showDim?: boolean
  /** Heading level for the name: h3 under a section heading (default), h2 when the cards directly follow the page's h1. */
  as?: 'h2' | 'h3'
}

export default function ProductCard({ p, eager, showDim, as: H = 'h3' }: Props) {
  const name = titleCase(p.name)
  return (
    <article className="product-card">
      <Link to={productUrl(p.slug)} className="product-card__link">
        <div className="product-card__media">
          <img src={p.card} width="700" height="700" alt={`${name} – ${site.name}`} decoding="async" loading={eager ? undefined : 'lazy'} />
          <span className="product-card__cta" aria-hidden="true">
            View details <PiArrowRight />
          </span>
        </div>
        <div className="product-card__body">
          {p.sku && <p className="product-card__code">{p.sku}</p>}
          <H className="product-card__title">{name}</H>
          {showDim && hasDim(p.dim) && <p className="product-card__dim">{p.dim}</p>}
        </div>
      </Link>
    </article>
  )
}
