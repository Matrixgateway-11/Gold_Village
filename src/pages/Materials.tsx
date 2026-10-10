import { usePage } from '../lib/usePage'

const U = '/img/uploads/2026/07/'
// The reference page renders each point's title and text as two alternating cards.
const POINTS = [
  '1. Indonesian Teak',
  'Carefully selected solid teak known for its durability, rich grain character, and ability to age beautifully over time.',
  '2. Hand-Finished Surfaces',
  'Every surface is sanded and finished by hand to preserve the natural warmth, texture, and individuality of the wood.',
  '3. Natural Material Palette',
  'Soft linens, woven textures, and organic finishes are thoughtfully paired to create calm, tactile living environments.',
  '4. Built for Longevity',
  'Designed to withstand both indoor and outdoor living while maintaining comfort, structural integrity, and timeless appeal.',
  '5. Responsible Sourcing',
  'We work with responsibly sourced materials and long-lasting craftsmanship practices that value both quality and sustainability.',
]

export default function Materials() {
  usePage({
    title: 'Materials – Solid Indonesian Teak, Kiln-Dried & Hand-Finished | {name}',
    description: 'Solid Indonesian teak, kiln-dried in house and hand-finished in Jepara. How we choose and prepare our materials.',
  })
  return (
    <main className="materials-page">
      <section className="materials-hero">
        <div className="materials-hero__media">
          <img width="2048" height="1143" src={U + 'materials-materials_hero_image-16.webp'} className="materials-hero__img" alt="" loading="eager" decoding="async" />
        </div>
        <div className="materials-hero__scrim" aria-hidden="true"></div>
        <div className="materials-hero__text">
          <h1 className="materials-hero__title">Materials Chosen to Age Beautifully</h1>
          <p className="materials-hero__sub">
            Meticulous choice of raw materials is key to creation of first-class furniture that lasts in time.We explore the territory widely to discover
            the finest sources of teak wood, we establish solid relationships with our suppliers and we work closely with government forestry department
            to ensure regular trees replantation.All our wood is then thoroughly kiln dried in house by keeping a stable control of temperature and
            moisture in the chambers, this process enhances properties and performance of the timber.
          </p>
        </div>
      </section>
      <section className="materials-points">
        <div className="materials-points__grid">
          {POINTS.map((t) => (
            <article className="materials-point" key={t}>
              <h2 className="materials-point__title">{t}</h2>
              <p className="materials-point__body"></p>
            </article>
          ))}
        </div>
      </section>
      <section className="materials-gallery" aria-label="Materials gallery">
        <div className="materials-gallery__item materials-gallery__item--wide">
          <img width="612" height="408" src={U + 'materials-materials_gallery_image_1.webp'} className="materials-gallery__img" alt="" decoding="async" />
        </div>
        <div className="materials-gallery__item">
          <img width="1366" height="768" src={U + 'materials-materials_gallery_image_2.webp'} className="materials-gallery__img" alt="" decoding="async" />
        </div>
        <div className="materials-gallery__item">
          <img width="571" height="537" src={U + 'materials-materials_gallery_image_3.webp'} className="materials-gallery__img" alt="" decoding="async" />
        </div>
      </section>
    </main>
  )
}
