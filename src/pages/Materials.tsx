import { PiHammer, PiLeaf, PiRecycle, PiSealCheck, PiTree } from 'react-icons/pi'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { usePage } from '../lib/usePage'
import '../styles/pages/materials.css'

const U = '/img/uploads/2026/07/'

const POINTS = [
  {
    icon: PiTree,
    title: 'Indonesian Teak',
    text: 'Carefully selected solid teak known for its durability, rich grain character, and ability to age beautifully over time.',
  },
  {
    icon: PiHammer,
    title: 'Hand-Finished Surfaces',
    text: 'Every surface is sanded and finished by hand to preserve the natural warmth, texture, and individuality of the wood.',
  },
  {
    icon: PiLeaf,
    title: 'Natural Material Palette',
    text: 'Soft linens, woven textures, and organic finishes are thoughtfully paired to create calm, tactile living environments.',
  },
  {
    icon: PiSealCheck,
    title: 'Built for Longevity',
    text: 'Designed to withstand both indoor and outdoor living while maintaining comfort, structural integrity, and timeless appeal.',
  },
  {
    icon: PiRecycle,
    title: 'Responsible Sourcing',
    text: 'We work with responsibly sourced materials and long-lasting craftsmanship practices that value both quality and sustainability.',
  },
]

export default function Materials() {
  usePage({
    title: 'Materials – Solid Indonesian Teak, Kiln-Dried & Hand-Finished | {name}',
    description: 'Solid Indonesian teak, kiln-dried in house and hand-finished in Jepara. How we choose and prepare our materials.',
    overlay: true,
  })
  return (
    <main id="main">
      <PageHero
        size="lg"
        image={U + 'materials-materials_hero_image-16.webp'}
        eyebrow="Our materials"
        title="Materials Chosen to Age Beautifully"
        lead="Meticulous choice of raw materials is key to creation of first-class furniture that lasts in time. We explore the territory widely to discover the finest sources of teak wood, we establish solid relationships with our suppliers and we work closely with government forestry department to ensure regular trees replantation. All our wood is then thoroughly kiln dried in house by keeping a stable control of temperature and moisture in the chambers, this process enhances properties and performance of the timber."
      />

      <section className="section" aria-labelledby="points-title">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="points-title"
              align="center"
              eyebrow="From forest to finish"
              title={
                <>
                  Five principles behind <span className="accent-italic">every piece</span>
                </>
              }
            />
          </Reveal>
          <ol className="principles" role="list">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 0.08}>
                <article className="principle">
                  <span className="principle__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="icon-badge" aria-hidden="true">
                    <p.icon />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section--tight section--alt materials-gallery" aria-label="Materials gallery">
        <div className="container materials-gallery__grid">
          <Reveal className="materials-gallery__item materials-gallery__item--wide">
            <img src={U + 'materials-materials_gallery_image_1.webp'} width="612" height="408" alt="" loading="lazy" decoding="async" />
          </Reveal>
          <Reveal className="materials-gallery__item" delay={0.1}>
            <img src={U + 'materials-materials_gallery_image_2.webp'} width="1366" height="768" alt="" loading="lazy" decoding="async" />
          </Reveal>
          <Reveal className="materials-gallery__item" delay={0.2}>
            <img src={U + 'materials-materials_gallery_image_3.webp'} width="571" height="537" alt="" loading="lazy" decoding="async" />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="materials-cta-title">
        <Reveal className="container container--narrow materials-cta">
          <h2 id="materials-cta-title">See the teak for yourself</h2>
          <p className="lead">Browse the collection, or tell us about your project and we will send material and finish samples.</p>
          <div className="btn-row">
            <Button to="/product-category/all/" arrow>
              Browse the collection
            </Button>
            <Button to="/bespoke/" variant="outline">
              Request samples
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
