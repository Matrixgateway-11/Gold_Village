import { Link } from 'react-router-dom'
import { PiArrowRight, PiBuildings, PiHouseLine, PiPencilRuler, PiSealCheck, PiStorefront, PiWhatsappLogo } from 'react-icons/pi'
import BespokeForm, { Area, Field, Honeypot, LeadSelects } from '../components/BespokeForm'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { categories } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import '../styles/pages/contact.css'
import '../styles/pages/trade.css'

const U = '/img/uploads/2026/07/'

const SUPPLY = [
  {
    icon: PiBuildings,
    title: 'Hotels & resorts',
    text: 'Guest rooms, restaurants, lobbies and pool decks, specified to your FF&E schedule and delivered to site. Indoor, outdoor and bathroom furniture from one supplier.',
  },
  {
    icon: PiStorefront,
    title: 'Retailers & distributors',
    text: 'Wholesale from more than 300 catalogue designs, with mixed containers and repeat orders kept consistent from batch to batch.',
  },
  {
    icon: PiPencilRuler,
    title: 'OEM & private label',
    text: 'Your designs, built in solid teak. We develop from drawings or a brief, prototype for approval, then produce to your specification.',
  },
  {
    icon: PiHouseLine,
    title: 'Developers & home projects',
    text: 'Complete villas and residences furnished in one design language, from bedroom to pool, with delivery and installation coordinated.',
  },
]

const STEPS = [
  ['Brief & quotation', 'Pieces, quantities, finishes, destination and timeline. We reply within one business day.'],
  ['Samples & prototypes', 'Approve proportions, comfort and finish before full production.'],
  ['Order confirmation', 'Specification, schedule and payment terms agreed in writing.'],
  ['Production in Jepara', 'In-house kiln drying, solid joinery and hand finishing.'],
  ['Quality control', 'Structure, finish, dimensions and moisture checked. Third-party inspection welcome.'],
  ['Packing & documents', 'Export packing, SVLK timber legality documents, invoice, packing list and bill of lading.'],
  ['Shipping & delivery', 'Sea freight worldwide, with delivery and white-glove setup coordinated where required.'],
]

const CONTAINERS = [
  ['20ft', '~28–33 m³', 'First orders, single-category ranges, smaller projects'],
  ['40ft', '~58–67 m³', 'Retail replenishment, mixed indoor and outdoor loads'],
  ['40ft High Cube', '~68–76 m³', 'Upholstered sofas, beds, wardrobes and cabanas'],
  ['LCL', 'Shared container', 'Samples and single-piece orders'],
]

const FAQ = [
  [
    'What is your minimum order quantity?',
    'Minimums depend on the products, materials and customisation involved. Send us your list and we will confirm the most efficient way to order, including mixing products in one container.',
  ],
  [
    'What are your production lead times?',
    'Lead times depend on quantities and customisation. We confirm a production schedule with every quotation, and agree prototypes before full production starts.',
  ],
  [
    'Do you offer OEM and private-label production?',
    'Yes. We can develop furniture from your drawings or brief, prototype it for approval, and produce it to your specification.',
  ],
  [
    'Can I mix different products in one container?',
    'Yes. Mixed containers are common for hotel and retail orders. We plan the loading so the container is used efficiently.',
  ],
  [
    'Is your timber legally sourced?',
    'Wood products exported from Indonesia must be covered by SVLK, the national timber legality system, which the EU accepts as FLEGT licensing. We also work with the government forestry department so trees are regularly replanted.',
  ],
  [
    'Can we see the furniture before ordering?',
    'Yes. Samples and prototypes can be arranged before full production, and you are welcome to visit our workshop in Jepara to review production.',
  ],
]

export default function Trade() {
  usePage({
    title: 'Trade & Wholesale Teak Furniture from Indonesia | {name}',
    description:
      'Indonesian teak furniture for hotels, retailers and developers. Wholesale, OEM and full project supply, packed for export and shipped worldwide.',
    overlay: true,
  })
  return (
    <main id="main">
      <PageHero
        size="lg"
        image={U + 'home-dining_image.webp'}
        eyebrow="Trade & Wholesale"
        title="Indonesian Teak Furniture for Hotels, Retailers and Developers"
        lead="Made in our Jepara workshop. Wholesale, OEM and full project supply, packed for export and shipped worldwide."
      >
        <Button href="#trade-inquiry" variant="gold" size="lg" arrow>
          Request trade pricing
        </Button>
        <Button
          href={`https://wa.me/${site.whatsapp}`}
          variant="outline-light"
          size="lg"
          icon={<PiWhatsappLogo aria-hidden="true" />}
          data-wa-toggle
          data-wa-type="wholesale"
        >
          Chat on WhatsApp
        </Button>
      </PageHero>

      <section className="trade-stats section--dark on-dark" aria-label={`${site.name} at a glance`}>
        <dl className="container trade-stats__grid">
          <div>
            <dt>Catalogue designs</dt>
            <dd>300+</dd>
          </div>
          <div>
            <dt>Luxury hospitality projects</dt>
            <dd>100+</dd>
          </div>
          <div>
            <dt>Countries with {site.name} projects</dt>
            <dd>10</dd>
          </div>
          <div>
            <dt>Product categories</dt>
            <dd>{categories.length}</dd>
          </div>
        </dl>
      </section>

      <section className="section" aria-labelledby="supply-title">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="supply-title"
              eyebrow="Who we supply"
              title={
                <>
                  One workshop, <span className="accent-italic">four ways</span> to work with us
                </>
              }
            />
          </Reveal>
          <ul className="supply" role="list">
            {SUPPLY.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 2) * 0.08}>
                <article className="supply__card">
                  <span className="icon-badge" aria-hidden="true">
                    <s.icon />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="terms-title">
        <div className="container container--narrow text-center">
          <Reveal>
            <SectionHeading
              id="terms-title"
              align="center"
              eyebrow="Terms at a glance"
              title="Minimums, lead times and shipping"
              lead="Minimums, lead times and payment terms depend on the products, quantities and customisation involved. Send us your list and we will confirm all of them in a written quotation within one business day."
            />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container trade-split">
          <Reveal>
            <SectionHeading id="process-title" eyebrow="Export process" title="From brief to delivered container" />
            <p className="lead">Seven clear stages, with a written confirmation at each one, so there are no surprises when the container arrives.</p>
            <p style={{ marginTop: '1.5rem' }}>
              <Link className="link-arrow" to="/feeds/furniture-exporter-indonesia/">
                Read the full export guide
                <PiArrowRight aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
          <ol className="steps" role="list">
            {STEPS.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.04}>
                <span className="steps__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="containers-title">
        <div className="container">
          <Reveal>
            <SectionHeading id="containers-title" eyebrow="Containers" title="Container options" />
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Container</th>
                    <th scope="col">Approx. usable volume</th>
                    <th scope="col">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTAINERS.map(([c, v, b]) => (
                    <tr key={c}>
                      <th scope="row" data-label="Container">
                        {c}
                      </th>
                      <td data-label="Usable volume">{v}</td>
                      <td data-label="Best for">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="trade-note">
              Mixed containers are welcome. We plan the loading so the space is used efficiently. How many pieces fit depends on the designs and
              packing; we calculate it with your quotation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="compliance-title">
        <div className="container container--narrow">
          <Reveal className="compliance">
            <span className="icon-badge" aria-hidden="true">
              <PiSealCheck />
            </span>
            <div>
              <p className="eyebrow">Compliance</p>
              <h2 id="compliance-title">Certifications &amp; timber legality</h2>
              <p>
                Wood products exported from Indonesia must be covered by SVLK, the national timber legality and sustainability system, which the
                European Union accepts as FLEGT licensing. We kiln-dry all our timber in house and work with the government forestry department so
                trees are regularly replanted.
              </p>
              <Link className="link-arrow" to="/materials/">
                Our materials and sourcing
                <PiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="faq-title">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeading id="faq-title" eyebrow="Questions" title="Trade FAQ" />
            <Accordion items={FAQ.map(([q, a]) => ({ q, a }))} />
          </Reveal>
        </div>
      </section>

      <section className="section" id="trade-inquiry" aria-labelledby="inquiry-title">
        <div className="container contact__grid">
          <div className="contact__intro">
            <p className="eyebrow">Trade inquiry</p>
            <h2 id="inquiry-title" style={{ fontSize: 'var(--fs-h1)' }}>
              Request trade <span className="accent-italic">pricing</span>
            </h2>
            <p className="lead">
              Tell us about your business or project: the pieces you are interested in, approximate quantities, destination and timeline. A member of
              our trade team replies within one business day.
            </p>
          </div>
          <BespokeForm
            title="Trade inquiry"
            lede="Our trade team responds within one business day."
            subject="Trade inquiry"
            submitLabel="Send trade inquiry"
            thanksTitle="Inquiry received"
            thanksText="Our trade team will reply within one business day."
          >
            <input type="hidden" name="source" value="trade" />
            <div className="form-row form-row--2">
              <Field id="trade-name" label="Name" name="name" autoComplete="name" required />
              <Field id="trade-company" label="Company" name="company" autoComplete="organization" />
            </div>
            <div className="form-row form-row--2">
              <Field id="trade-email" label="Email" name="email" type="email" autoComplete="email" required />
              <Field id="trade-phone" label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" />
            </div>
            <LeadSelects idPrefix="trade" type="wholesale" />
            <Field id="trade-timeline" label="Timeline (e.g. opening date)" name="timeline" />
            <Area id="trade-project" label="Pieces, quantities and destination" name="project" required />
            <Honeypot id="trade-website" />
          </BespokeForm>
        </div>
      </section>
    </main>
  )
}
