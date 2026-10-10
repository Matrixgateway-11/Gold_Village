import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FilterDropdown from '../components/FilterDropdown'
import {
  allGroups,
  allUrl,
  categoriesOfCollection,
  categoryBySlug,
  categoryUrl,
  collectionBySlug,
  collections,
  dash,
  filterCategories,
  productBySlug,
  productUrl,
  type Group,
  type Product,
} from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import NotFound from './NotFound'

const ALL_HERO = '/img/uploads/2026/07/cat-hero-all-3kh2dwcp.webp'
const PER_PAGE = 30

function ProductCard({ p, eager }: { p: Product; eager?: boolean }) {
  return (
    <article className="product-card product-card--minimal">
      <Link to={productUrl(p.slug)} className="product-link">
        <img width="700" height="700" src={p.card} className="product-card__img" alt={`${p.name} – ${site.name}`} decoding="async" loading={eager ? undefined : 'lazy'} />
        <h3 className="product-card__title-minimal">{p.name}</h3>
      </Link>
    </article>
  )
}

const toProducts = (slugs: string[]) => slugs.map((s) => productBySlug.get(s)!).filter(Boolean)

export default function ProductArchive() {
  const { cat: catSlug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const colSlug = params.get('collection') || ''
  const search = (params.get('indocasa_search') || '').trim()
  const col = collectionBySlug.get(colSlug)
  const cat = catSlug ? categoryBySlug.get(catSlug) : undefined

  const scopeGroups: Group[] = col ? col.groups : allGroups
  const groups = cat ? scopeGroups.filter((g) => g.cat === cat.slug) : scopeGroups
  // A category outside the chosen collection still lists its products, like the reference site.
  const catGroups = cat && !groups.length ? allGroups.filter((g) => g.cat === cat.slug) : groups
  const grouped = !cat && !search

  let flat: Product[] = []
  if (!grouped) {
    flat = toProducts(catGroups.flatMap((g) => g.products))
    if (search) {
      const q = search.toLowerCase()
      flat = flat.filter((p) => p.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  const [shown, setShown] = useState(PER_PAGE)
  const sentinel = useRef<HTMLDivElement>(null)
  useEffect(() => setShown(PER_PAGE), [catSlug, colSlug, search])
  useEffect(() => {
    const el = sentinel.current
    if (!el || shown >= flat.length) return
    const io = new IntersectionObserver((en) => en.some((x) => x.isIntersecting) && setShown((s) => s + PER_PAGE), { rootMargin: '360px 0px', threshold: 0.01 })
    io.observe(el)
    return () => io.disconnect()
  }, [shown, flat.length])

  const heroImg = cat ? cat.hero : col ? col.hero : ALL_HERO
  const heroTitle = cat ? cat.label : col ? col.name : 'View All'
  const title = cat
    ? `${cat.name.replace(/\s*–\s*/, ' ')} | {name}`
    : col
      ? `${col.name} – Handcrafted Teak Furniture | {name}`
      : 'All Furniture | {name}'

  usePage({ title, bodyClass: 'archive tax-product_cat woocommerce woocommerce-page indocasa-hero-fullbleed indocasa-hero-overlay' })

  const [q, setQ] = useState(search)
  useEffect(() => setQ(search), [search])

  if (catSlug && !cat) return <NotFound />

  const catOptions = col ? categoriesOfCollection(col) : filterCategories
  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (colSlug) sp.set('collection', colSlug)
    if (q.trim()) sp.set('indocasa_search', q.trim())
    const base = cat ? `/product-category/all/${cat.slug}/` : '/product-category/all/'
    navigate(base + (sp.toString() ? '?' + sp : ''), { state: { keepScroll: true } })
  }

  return (
    <main className="archive-main product-tax-archive">
      <div id="indocasa-product-tax-live" className="product-tax-live" aria-live="polite">
        <section className="product-tax-hero product-tax-hero--has-media">
          <div className="product-tax-hero__media">
            <img src={heroImg} className="product-tax-hero__img" alt={cat ? dash(cat.name) : col ? col.name : 'All'} decoding="async" />
          </div>
          <div className="product-tax-hero__overlay">
            <h1 className="product-tax-title">{heroTitle}</h1>
          </div>
        </section>

        <div className="product-tax-filters" role="region" aria-label="Refine products">
          <div className="product-tax-filters__inner">
            <FilterDropdown
              id="indocasa-filter-scope"
              label="Collections"
              value={col ? col.name : 'All collections'}
              options={[
                { label: 'All collections', url: allUrl(), selected: !col },
                ...collections.map((c) => ({ label: c.name, url: allUrl(c.slug), selected: c.slug === colSlug })),
              ]}
            />
            <FilterDropdown
              id="indocasa-filter-category"
              label="Categories"
              value={cat ? dash(cat.name) : 'View All'}
              options={[
                { label: 'View All', url: allUrl(col?.slug), selected: !cat },
                ...catOptions.map((c) => ({ label: dash(c.name), url: categoryUrl(c.slug, col?.slug), selected: c.slug === cat?.slug })),
              ]}
            />
            <form className="product-tax-filters__field product-tax-filters__search-form" role="search" onSubmit={onSearch}>
              <label className="product-tax-filters__label" htmlFor="indocasa_search">
                Search by name
              </label>
              <div className="product-tax-filters__search-row">
                <input
                  type="search"
                  id="indocasa_search"
                  name="indocasa_search"
                  className="product-tax-filters__input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Product name…"
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </div>
            </form>
          </div>
        </div>

        {grouped ? (
          groups.map((g) => {
            const c = categoryBySlug.get(g.cat)
            return (
              <GroupBlock key={g.cat} title={c ? c.label : g.cat} href={categoryUrl(g.cat, col?.slug)} items={toProducts(g.products)} />
            )
          })
        ) : (
          <>
            <section className="section-pad product-tax-grid product-grid grid-3">
              {flat.length ? (
                flat.slice(0, shown).map((p, i) => <ProductCard key={p.slug} p={p} eager={i < 3} />)
              ) : (
                <p className="product-tax-empty">No products in this category yet.</p>
              )}
            </section>
            {shown < flat.length && <div className="product-tax-scroll-sentinel" aria-hidden="true" ref={sentinel}></div>}
          </>
        )}
      </div>
    </main>
  )
}

function GroupBlock({ title, href, items }: { title: string; href: string; items: Product[] }) {
  return (
    <>
      <h2 className="product-tax-group-title">
        <Link className="product-tax-group-title-link" to={href} state={{ keepScroll: true }}>
          {' '}
          — {title} —{' '}
        </Link>
      </h2>
      <div className="section-pad product-tax-grid product-grid grid-3">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  )
}
