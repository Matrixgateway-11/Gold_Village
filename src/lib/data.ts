import raw from '../data/catalog.json'
import { site } from '../site'

export type Category = { slug: string; name: string; label: string; hero: string }
export type Group = { cat: string; products: string[] }
export type Collection = { slug: string; name: string; hero: string; groups: Group[] }
export type ProductImage = { lg: string; sm: string }
export type Product = {
  id: number
  slug: string
  name: string
  sku: string
  dim: string
  cat: string
  card: string
  images: ProductImage[]
}
export type Feed = {
  slug: string
  title: string
  lede: string
  excerpt: string
  date: string
  dateText: string
  topic: string
  read: string
  card: string
  hero: string
  body: string
}

const data = raw as unknown as {
  categories: Category[]
  collections: Collection[]
  allGroups: Group[]
  products: Product[]
  feeds: Feed[]
}

// Fill company placeholders left in imported article copy.
const fill = (html: string) => html.replace(/\{\{email\}\}/g, site.email).replace(/\{\{website\}\}/g, site.website)

export const categories = data.categories
// Display order for menus, footer and filters: Outdoor, Indoor, Bathroom.
const COLLECTION_ORDER = ['outdoor-collection', 'indoor-collection', 'bathroom-collection']
export const collections = [...data.collections].sort((a, b) => COLLECTION_ORDER.indexOf(a.slug) - COLLECTION_ORDER.indexOf(b.slug))
export const allGroups = data.allGroups
export const products = data.products
export const feeds = data.feeds.map((f) => ({ ...f, body: fill(f.body) }))

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))
export const productBySlug = new Map(products.map((p) => [p.slug, p]))
export const collectionBySlug = new Map(collections.map((c) => [c.slug, c]))

// The reference site leaves the vanity cabinets out of the category filter.
export const filterCategories = [...categories]
  .filter((c) => c.slug !== 'vanity-cabinet')
  .sort((a, b) => a.name.localeCompare(b.name))

export const collectionOfCategory = (slug: string) => collections.find((c) => c.groups.some((g) => g.cat === slug))

export const categoriesOfCollection = (col: Collection) =>
  col.groups.map((g) => categoryBySlug.get(g.cat)!).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name))

export const productUrl = (slug: string) => `/product/${slug}/`
export const categoryUrl = (slug: string, collection?: string) =>
  `/product-category/all/${slug}/` + (collection ? `?collection=${collection}` : '')
export const allUrl = (collection?: string) => '/product-category/all/' + (collection ? `?collection=${collection}` : '')

// " - " renders as an en dash across the reference site.
export const dash = (s: string) => s.replace(/\s-\s/g, ' – ')
