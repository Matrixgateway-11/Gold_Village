import { usePage } from '../lib/usePage'
import { site } from '../site'

const U = '/img/uploads/2026/07/'
const STATS = [
  ['100+', 'Luxury Hospitality Projects'],
  ['15+', 'Countries Across Asia & Middle East'],
  ['20+ Years', 'Of Craftsmanship & Furniture Making'],
  ['Solid Teak', 'Responsibly Sourced & Kiln-Dried'],
]
const STRIP = [
  ['about-about_strip_image_1-8-900x502.webp', 900, 502],
  ['about-about_strip_image_2-8-523x700.webp', 523, 700],
  ['about-about_strip_image_3-1-700x700.webp', 700, 700],
  ['about-about_strip_image_4-523x700.webp', 523, 700],
] as const

export default function About() {
  usePage({
    title: `About ${site.name} – European Design, Jepara Teak Craftsmanship`,
    description: `${site.name} reinterprets contemporary European design through the teak woodworking tradition of Jepara, Indonesia, crafting furniture for homes, resorts and hotels.`,
  })
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__copy">
          <p className="about-hero__kicker">/ Where European Design Meets Indonesian Craftsmanship</p>
          <h1 className="about-hero__title">Where European Design Meets Indonesian Craftsmanship</h1>
          <p className="about-hero__body">
            {site.name} was founded with a vision to reinterpret contemporary European design through the exceptional craftsmanship traditions of
            Jepara, Indonesia – one of the world’s most respected centers for teak woodworking.
          </p>
          <p className="about-hero__body">
            For over four decades, our work has combined refined design sensibilities, responsibly sourced Indonesian teak, and the expertise of skilled
            artisans whose techniques have been passed through generations. Every piece is shaped through a meticulous process of material selection,
            prototyping, hand-finishing, and quality control to ensure enduring beauty, comfort, and performance.
          </p>
          <p className="about-hero__body">
            From private residences to luxury resorts, hospitality spaces, and global wholesale partners, {site.name} creates furniture designed to bring
            warmth, architectural simplicity, and timeless character into contemporary living environments worldwide.
          </p>
          <p className="about-hero__body">
            At the heart of everything we create is a belief that furniture should feel both functional and evocative – crafted not only to last for
            generations, but to shape the atmosphere of the spaces people live in every day.
          </p>
          <div className="about-hero__quote-wrap">
            <p className="about-hero__quote">"Rooted in Craft. Refined by Design."</p>
          </div>
        </div>
        <div className="about-hero__image">
          <img width="810" height="1080" src={U + 'about-about_hero_image-8-810x1080.webp'} className="about-hero__media" alt="" decoding="async" />
        </div>
      </section>
      <section className="about-stats" aria-label="About statistics">
        <div className="about-stats__grid">
          {STATS.map(([v, l]) => (
            <div className="about-stat" key={l}>
              <p className="about-stat__value">{v}</p>
              <p className="about-stat__label">{l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-strip" aria-label="Craft image strip">
        {STRIP.map(([f, w, h]) => (
          <div className="about-strip__item" key={f}>
            <img width={w} height={h} src={U + f} className="about-strip__media" alt="" decoding="async" />
          </div>
        ))}
      </section>
    </main>
  )
}
