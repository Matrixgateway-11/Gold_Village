import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PiArrowRight, PiMagnifyingGlass, PiX } from 'react-icons/pi'
import FilterDropdown from '../components/FilterDropdown'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import ProductCard from '../components/ui/ProductCard'
import {
  allGroups,
  allUrl,
  categoriesOfCollection,
  categoryBySlug,
  categoryUrl,
  collectionBySlug,
  collectionCount,
  collections,
  dash,
  filterCategories,
  productBySlug,
  products,
  type Group,
  type Product,
} from '../lib/data'
import { usePage } from '../lib/usePage'
import '../styles/pages/archive.css'
import NotFound from './NotFound'

const ALL_HERO = '/img/uploads/2026/07/cat-hero-all-3kh2dwcp.webp'
const PER_PAGE = 30

const toProducts = (slugs: string[]) => slugs.map((s) => productBySlug.get(s)!).filter(Boolean)
const pieces = (n: number) => `${n} ${n === 1 ? 'piece' : 'pieces'}`

export default function ProductArchive() {
  const { cat: catSlug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const colSlug = params.get('collection') || ''
  // `q` is the search parameter; `indocasa_search` is the old name, still read so existing links keep working.
  const search = (params.get('q') || params.get('indocasa_search') || '').trim()
  const col = collectionBySlug.get(colSlug)
  const cat = catSlug ? categoryBySlug.get(catSlug) : undefined

  const scopeGroups: Group[] = col ? col.groups : allGroups
  const groups = cat ? scopeGroups.filter((g) => g.cat === cat.slug) : scopeGroups
  // A category outside the chosen collection still lists its products.
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
  const total = grouped ? groups.reduce((n, g) => n + g.products.length, 0) : flat.length

  const [shown, setShown] = useState(PER_PAGE)
  const sentinel = useRef<HTMLDivElement>(null)
  useEffect(() => setShown(PER_PAGE), [catSlug, colSlug, search])
  useEffect(() => {
    const el = sentinel.current
    if (!el || shown >= flat.length) return
    const io = new IntersectionObserver((en) => en.some((x) => x.isIntersecting) && setShown((s) => s + PER_PAGE), {
      rootMargin: '480px 0px',
      threshold: 0.01,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [shown, flat.length])

  const heroImg = cat ? cat.hero : col ? col.hero : ALL_HERO
  const heroTitle = cat ? cat.label : col ? col.name : 'All Furniture'
  const title = cat
    ? `${cat.name.replace(/\s*–\s*/, ' ')} | {name}`
    : col
      ? `${col.name} – Handcrafted Teak Furniture | {name}`
      : 'All Furniture | {name}'

  usePage({ title, description: 'Browse handcrafted Indonesian teak furniture for indoor, outdoor and bathroom spaces.', overlay: true })

  const [q, setQ] = useState(search)
  useEffect(() => setQ(search), [search])

  if (catSlug && !cat) return <NotFound />

  const catOptions = col ? categoriesOfCollection(col) : filterCategories
  const baseUrl = cat ? `/product-category/all/${cat.slug}/` : '/product-category/all/'
  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (colSlug) sp.set('collection', colSlug)
    if (q.trim()) sp.set('q', q.trim())
    navigate(baseUrl + (sp.toString() ? '?' + sp : ''), { state: { keepScroll: true } })
  }
  const clearSearch = () => {
    setQ('')
    navigate(baseUrl + (colSlug ? `?collection=${colSlug}` : ''), { state: { keepScroll: true } })
  }

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Collections', to: cat || col ? allUrl() : undefined },
    ...(col ? [{ label: col.name, to: cat ? allUrl(col.slug) : undefined }] : []),
    ...(cat ? [{ label: cat.label }] : []),
  ]
  const lead = search
    ? `${pieces(total)} matching “${search}”`
    : cat
      ? `${pieces(total)} in ${dash(cat.name)}`
      : col
        ? `${pieces(collectionCount(col))} handcrafted in Jepara`
        : `${products.length} handcrafted pieces across ${collections.length} collections`

  return (
    <main id="main">
      <PageHero image={heroImg} imageAlt="" title={heroTitle} lead={lead} crumbs={crumbs} id="archive-title" />

      <div className="filters" role="region" aria-label="Refine products">
        <div className="container filters__inner">
          <FilterDropdown
            id="filter-scope"
            label="Collection"
            value={col ? col.name : 'All collections'}
            options={[
              { label: 'All collections', url: allUrl(), selected: !col },
              ...collections.map((c) => ({ label: c.name, url: allUrl(c.slug), selected: c.slug === colSlug })),
            ]}
          />
          <FilterDropdown
            id="filter-category"
            label="Category"
            value={cat ? dash(cat.name) : 'All categories'}
            options={[
              { label: 'All categories', url: allUrl(col?.slug), selected: !cat },
              ...catOptions.map((c) => ({ label: dash(c.name), url: categoryUrl(c.slug, col?.slug), selected: c.slug === cat?.slug })),
            ]}
          />
          <form className="filters__search" role="search" onSubmit={onSearch}>
            <label className="dropdown__label" htmlFor="product-search">
              Search by name
            </label>
            <div className="filters__search-box">
              <PiMagnifyingGlass className="filters__search-icon" aria-hidden="true" />
              <input
                type="search"
                id="product-search"
                name="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. sofa, bed, mirror"
                autoComplete="off"
                enterKeyHint="search"
              />
              {search && (
                <button type="button" className="filters__clear" aria-label="Clear search" onClick={clearSearch}>
                  <PiX aria-hidden="true" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="container catalog" aria-live="polite">
        {grouped ? (
          groups.map((g) => {
            const c = categoryBySlug.get(g.cat)
            return (
              <GroupBlock
                key={g.cat}
                title={c ? c.label : g.cat}
                href={categoryUrl(g.cat, col?.slug)}
                items={toProducts(g.products)}
                first={g === groups[0]}
              />
            )
          })
        ) : flat.length ? (
          <>
            <div className="product-grid">
              {flat.slice(0, shown).map((p, i) => (
                <ProductCard key={p.slug} p={p} eager={i < 4} as="h2" />
              ))}
            </div>
            {shown < flat.length && <div className="catalog__sentinel" aria-hidden="true" ref={sentinel}></div>}
          </>
        ) : (
          <div className="catalog__empty">
            <h2>No pieces found</h2>
            <p>
              {search
                ? `We couldn’t find anything matching “${search}”. Try a shorter word, or browse everything.`
                : 'There are no products in this category yet.'}
            </p>
            <div className="btn-row">
              <Button to={allUrl(col?.slug)} variant="dark" arrow>
                Browse {col ? col.name.toLowerCase() : 'all furniture'}
              </Button>
              <Button to="/bespoke/" variant="outline">
                Ask for a bespoke piece
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function GroupBlock({ title, href, items, first }: { title: string; href: string; items: Product[]; first: boolean }) {
  return (
    <section className="catalog-group">
      <header className="catalog-group__head">
        <h2>{title}</h2>
        <span className="catalog-group__count">{pieces(items.length)}</span>
        <Link className="link-arrow" to={href} state={{ keepScroll: true }}>
          View all
          <PiArrowRight aria-hidden="true" />
        </Link>
      </header>
      <div className="product-grid">
        {items.map((p, i) => (
          <ProductCard key={p.slug} p={p} eager={first && i < 4} />
        ))}
      </div>
    </section>
  )
}
