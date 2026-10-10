import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Lightbox from './components/Lightbox'
import WhatsAppWidget from './components/WhatsAppWidget'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Home ships with the main bundle; every other page is fetched when first visited.
const About = lazy(() => import('./pages/About'))
const Bespoke = lazy(() => import('./pages/Bespoke'))
const FeedArticle = lazy(() => import('./pages/FeedArticle'))
const Feeds = lazy(() => import('./pages/Feeds'))
const Materials = lazy(() => import('./pages/Materials'))
const Media = lazy(() => import('./pages/Media'))
const Product = lazy(() => import('./pages/Product'))
const ProductArchive = lazy(() => import('./pages/ProductArchive'))
const Trade = lazy(() => import('./pages/Trade'))

// Scroll to the top on navigation, except filter changes that ask to keep position.
// Jumps instantly: a smooth scroll on every page change feels slow and disorienting.
function ScrollManager() {
  const { pathname, search, hash, state } = useLocation()
  useEffect(() => {
    if ((state as { keepScroll?: boolean } | null)?.keepScroll) return
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search, hash, state])
  return null
}

function CollectionRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/product-category/all/?collection=${slug}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-shell">
        <Header />
        {/* The fallback holds the page height so the footer doesn't jump while a page chunk loads. */}
        <Suspense fallback={<div className="route-fallback" aria-hidden="true"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-category/all/" element={<ProductArchive />} />
            <Route path="/product-category/all/:cat/" element={<ProductArchive />} />
            <Route path="/collection/:slug/" element={<CollectionRedirect />} />
            <Route path="/product/:slug/" element={<Product />} />
            <Route path="/materials/" element={<Materials />} />
            <Route path="/bespoke/" element={<Bespoke />} />
            <Route path="/contact/" element={<Navigate to="/bespoke/" replace />} />
            <Route path="/projects/*" element={<Navigate to="/" replace />} />
            <Route path="/about/" element={<About />} />
            <Route path="/showroom/*" element={<Navigate to="/bespoke/" replace />} />
            <Route path="/trade/" element={<Trade />} />
            <Route path="/media/" element={<Media />} />
            <Route path="/feeds/" element={<Feeds />} />
            <Route path="/feeds/topic/:topic/" element={<Feeds />} />
            <Route path="/feeds/:slug/" element={<FeedArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
      <WhatsAppWidget />
      <Lightbox />
    </BrowserRouter>
  )
}
