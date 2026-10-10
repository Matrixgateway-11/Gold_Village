import Button from '../components/ui/Button'
import CountUp from '../components/ui/CountUp'
import Reveal from '../components/ui/Reveal'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import '../styles/pages/about.css'

const U = '/img/uploads/2026/07/'

// [headline, label, number to count up (if numeric), text after the number]
const STATS: [string, string, number | null, string][] = [
  ['100+', 'Luxury Hospitality Projects', 100, '+'],
  ['15+', 'Countries Across Asia & Middle East', 15, '+'],
  ['20+ Years', 'Of Craftsmanship & Furniture Making', 20, '+ Years'],
  ['Solid Teak', 'Responsibly Sourced & Kiln-Dried', null, ''],
]

const STRIP = [
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
    <main id="main">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <p className="eyebrow">Our story</p>
            <h1 id="about-title">
              Where European Design Meets <span className="accent-italic">Indonesian Craftsmanship</span>
            </h1>
            <p className="lead">
              {site.name} was founded with a vision to reinterpret contemporary European design through the exceptional craftsmanship traditions of
              Jepara, Indonesia – one of the world’s most respected centers for teak woodworking.
            </p>
            <p>
              For over four decades, our work has combined refined design sensibilities, responsibly sourced Indonesian teak, and the expertise of
              skilled artisans whose techniques have been passed through generations. Every piece is shaped through a meticulous process of material
              selection, prototyping, hand-finishing, and quality control to ensure enduring beauty, comfort, and performance.
            </p>
            <p>
              From private residences to luxury resorts, hospitality spaces, and global wholesale partners, {site.name} creates furniture designed to
              bring warmth, architectural simplicity, and timeless character into contemporary living environments worldwide.
            </p>
            <p>
              At the heart of everything we create is a belief that furniture should feel both functional and evocative – crafted not only to last for
              generations, but to shape the atmosphere of the spaces people live in every day.
            </p>
            <blockquote className="about-quote">“Rooted in Craft. Refined by Design.”</blockquote>
            <div className="btn-row">
              <Button to="/product-category/all/" arrow>
                Explore the collection
              </Button>
              <Button to="/bespoke/" variant="outline">
                Work with us
              </Button>
            </div>
          </div>
          <Reveal className="about-hero__image">
            <img
              src={U + 'about-about_hero_image-8-810x1080.webp'}
              width="810"
              height="1080"
              alt="Two men seated on an olive teak sofa and armchair beside a round teak coffee table"
              decoding="async"
            />
          </Reveal>
        </div>
      </section>

      <section className="section--tight section--dark on-dark" aria-label="Golden Village in numbers">
        <div className="container">
          <dl className="about-stats">
            {STATS.map(([headline, label, n, suffix]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{n === null ? headline : <CountUp to={n} suffix={suffix} />}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-label="Craft image strip">
        <div className="container about-strip">
          {STRIP.map(([f, w, h], i) => (
            <Reveal className="about-strip__item" key={f} delay={i * 0.08}>
              <img src={U + f} width={w} height={h} alt="" loading="lazy" decoding="async" />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
