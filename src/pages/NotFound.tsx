import { Link } from 'react-router-dom'
import { usePage } from '../lib/usePage'

export default function NotFound() {
  usePage({ title: 'Page not found | {name}' })
  return (
    <main className="bespoke-page">
      <section className="bespoke-page__grid">
        <div className="bespoke-page__left">
          <p className="bespoke-page__kicker">/ 404</p>
          <h1 className="bespoke-page__title">Page not found</h1>
          <p className="bespoke-page__sub">The page you are looking for has moved or no longer exists.</p>
          <p className="bespoke-page__sub">
            <Link className="trade-inline-link" to="/product-category/all/">
              Browse the collection &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
