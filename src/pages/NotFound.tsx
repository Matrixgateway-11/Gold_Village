import Button from '../components/ui/Button'
import { usePage } from '../lib/usePage'
import '../styles/pages/not-found.css'

export default function NotFound() {
  usePage({ title: 'Page not found | {name}' })
  return (
    <main id="main" className="not-found">
      <div className="container container--narrow not-found__inner">
        <div className="not-found__code" aria-hidden="true"></div>
        <h1>This page has moved on</h1>
        <p className="lead">The page you are looking for has moved or no longer exists. Let’s get you back to something beautiful.</p>
        <div className="btn-row">
          <Button to="/" arrow>
            Back to home
          </Button>
          <Button to="/product-category/all/" variant="outline">
            Browse the collection
          </Button>
        </div>
      </div>
    </main>
  )
}
