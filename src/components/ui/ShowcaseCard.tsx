import { Link } from 'react-router-dom'
import { PiArrowUpRight } from 'react-icons/pi'
import { hasDim, productUrl, titleCase, type Product } from '../../lib/data'
import { site } from '../../site'

// Large product tile for the home page. The studio shot swaps to the lifestyle photo on hover
// (touch screens just show the studio shot; the whole tile is the link).
export default function ShowcaseCard({ p, eager }: { p: Product; eager?: boolean }) {
  const name = titleCase(p.name)
  const room = p.images.length > 1 ? p.images[p.images.length - 1].lg : null
  return (
    <article className="showcase">
      <Link className="showcase__link" to={productUrl(p.slug)}>
        <div className="showcase__media">
          <img
            className="showcase__img"
            src={p.card}
            width="700"
            height="700"
            alt={`${name} – ${site.name}`}
            decoding="async"
            loading={eager ? undefined : 'lazy'}
          />
          {room && <img className="showcase__room" src={room} width="1200" height="1200" alt="" decoding="async" loading="lazy" />}
          <span className="showcase__go" aria-hidden="true">
            <PiArrowUpRight />
          </span>
        </div>
        <div className="showcase__body">
          <p className="showcase__code">{p.sku}</p>
          <h3 className="showcase__title">{name}</h3>
          {hasDim(p.dim) && <p className="showcase__dim">{p.dim}</p>}
        </div>
      </Link>
    </article>
  )
}
