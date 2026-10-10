import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Lightbox from './components/Lightbox'
import WhatsAppWidget from './components/WhatsAppWidget'
import About from './pages/About'
import Bespoke from './pages/Bespoke'
import FeedArticle from './pages/FeedArticle'
import Feeds from './pages/Feeds'
import Home from './pages/Home'
import Materials from './pages/Materials'
import Media from './pages/Media'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import ProductArchive from './pages/ProductArchive'
import Trade from './pages/Trade'

// Scroll to the top on navigation, except filter changes that ask to keep position.
function ScrollManager() {
  const { pathname, search, hash, state } = useLocation()
  useEffect(() => {
    if ((state as { keepScroll?: boolean } | null)?.keepScroll) return
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
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
      <div className="site-shell">
        <Header />
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
        <Footer />
      </div>
      <WhatsAppWidget />
      <Lightbox />
    </BrowserRouter>
  )
}
