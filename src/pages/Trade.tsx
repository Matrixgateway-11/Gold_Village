import { Link } from 'react-router-dom'
import BespokeForm, { Area, Field, Honeypot, LeadSelects } from '../components/BespokeForm'
import { categories } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'

const U = '/img/uploads/2026/07/'
const STEPS = [
  ['Brief & quotation', 'Pieces, quantities, finishes, destination and timeline. We reply within one business day.'],
  ['Samples & prototypes', 'Approve proportions, comfort and finish before full production.'],
  ['Order confirmation', 'Specification, schedule and payment terms agreed in writing.'],
  ['Production in Jepara', 'In-house kiln drying, solid joinery and hand finishing.'],
  ['Quality control', 'Structure, finish, dimensions and moisture checked. Third-party inspection welcome.'],
  ['Packing & documents', 'Export packing, SVLK timber legality documents, invoice, packing list and bill of lading.'],
  ['Shipping & delivery', 'Sea freight worldwide, with delivery and white-glove setup coordinated where required.'],
]
const FAQ = [
  ['What is your minimum order quantity?', 'Minimums depend on the products, materials and customisation involved. Send us your list and we will confirm the most efficient way to order, including mixing products in one container.'],
  ['What are your production lead times?', 'Lead times depend on quantities and customisation. We confirm a production schedule with every quotation, and agree prototypes before full production starts.'],
  ['Do you offer OEM and private-label production?', 'Yes. We can develop furniture from your drawings or brief, prototype it for approval, and produce it to your specification.'],
  ['Can I mix different products in one container?', 'Yes. Mixed containers are common for hotel and retail orders. We plan the loading so the container is used efficiently.'],
  ['Is your timber legally sourced?', 'Wood products exported from Indonesia must be covered by SVLK, the national timber legality system, which the EU accepts as FLEGT licensing. We also work with the government forestry department so trees are regularly replanted.'],
  ['Can we see the furniture before ordering?', 'Yes. Samples and prototypes can be arranged before full production, and you are welcome to visit our workshop in Jepara to review production.'],
]

export default function Trade() {
  usePage({
    title: 'Trade & Wholesale Teak Furniture from Indonesia | {name}',
    description: 'Indonesian teak furniture for hotels, retailers and developers. Wholesale, OEM and full project supply, packed for export and shipped worldwide.',
  })
  return (
    <main className="trade-page">
      <section className="trade-hero">
        <img width="1672" height="941" src={U + 'home-dining_image.webp'} className="trade-hero__bg" alt="" loading="eager" decoding="async" />
        <div className="trade-hero__shade" aria-hidden="true"></div>
        <div className="trade-hero__inner">
          <p className="trade-kicker">/ Trade &amp; Wholesale</p>
          <h1 className="trade-hero__title">Indonesian Teak Furniture for Hotels, Retailers and Developers</h1>
          <p className="trade-hero__sub">Made in our Jepara workshop. Wholesale, OEM and full project supply, packed for export and shipped worldwide.</p>
          <div className="trade-hero__ctas">
            <a className="trade-btn trade-btn--light" href="#trade-inquiry">
              Request trade pricing
            </a>
            <a className="trade-btn trade-btn--ghost" href={`https://wa.me/${site.whatsapp}`} data-wa-toggle data-wa-type="wholesale" target="_blank" rel="noopener">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="trade-stats" aria-label={`${site.name} at a glance`}>
        <div><strong>300+</strong><span>Catalogue designs</span></div>
        <div><strong>100+</strong><span>Luxury hospitality projects</span></div>
        <div><strong>10</strong><span>Countries with {site.name} projects</span></div>
        <div><strong>{categories.length}</strong><span>Product categories</span></div>
      </section>

      <section className="trade-section">
        <header className="trade-section__head">
          <p className="trade-kicker">Who we supply</p>
          <h2 className="trade-h2">One workshop, four ways to work with us</h2>
        </header>
        <div className="trade-cards">
          <article className="trade-card">
            <h3>Hotels &amp; resorts</h3>
            <p>Guest rooms, restaurants, lobbies and pool decks, specified to your FF&amp;E schedule and delivered to site. Indoor, outdoor and bathroom furniture from one supplier.</p>
          </article>
          <article className="trade-card">
            <h3>Retailers &amp; distributors</h3>
            <p>Wholesale from more than 300 catalogue designs, with mixed containers and repeat orders kept consistent from batch to batch.</p>
          </article>
          <article className="trade-card">
            <h3>OEM &amp; private label</h3>
            <p>Your designs, built in solid teak. We develop from drawings or a brief, prototype for approval, then produce to your specification.</p>
          </article>
          <article className="trade-card">
            <h3>Developers &amp; home projects</h3>
            <p>Complete villas and residences furnished in one design language, from bedroom to pool, with delivery and installation coordinated.</p>
          </article>
        </div>
      </section>

      <section className="trade-section trade-section--tint">
        <header className="trade-section__head">
          <p className="trade-kicker">Terms at a glance</p>
          <h2 className="trade-h2">Minimums, lead times and shipping</h2>
        </header>
        <p className="trade-lead">
          Minimums, lead times and payment terms depend on the products, quantities and customisation involved. Send us your list and we will confirm all of
          them in a written quotation within one business day.
        </p>
      </section>

      <section className="trade-section">
        <header className="trade-section__head">
          <p className="trade-kicker">Export process</p>
          <h2 className="trade-h2">From brief to delivered container</h2>
        </header>
        <ol className="trade-steps">
          {STEPS.map(([t, d]) => (
            <li key={t}>
              <strong>{t}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <p className="trade-note">
          <Link to="/feeds/furniture-exporter-indonesia/">Read the full export guide &rarr;</Link>
        </p>
      </section>

      <section className="trade-section trade-section--tint">
        <header className="trade-section__head">
          <p className="trade-kicker">Containers</p>
          <h2 className="trade-h2">Container options</h2>
        </header>
        <div className="trade-table-wrap">
          <table className="trade-table">
            <thead>
              <tr>
                <th>Container</th>
                <th>Approx. usable volume</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>20ft</td><td>~28–33 m³</td><td>First orders, single-category ranges, smaller projects</td></tr>
              <tr><td>40ft</td><td>~58–67 m³</td><td>Retail replenishment, mixed indoor and outdoor loads</td></tr>
              <tr><td>40ft High Cube</td><td>~68–76 m³</td><td>Upholstered sofas, beds, wardrobes and cabanas</td></tr>
              <tr><td>LCL</td><td>Shared container</td><td>Samples and single-piece orders</td></tr>
            </tbody>
          </table>
        </div>
        <p className="trade-note">
          Mixed containers are welcome. We plan the loading so the space is used efficiently. How many pieces fit depends on the designs and packing; we
          calculate it with your quotation.
        </p>
      </section>

      <section className="trade-section">
        <header className="trade-section__head">
          <p className="trade-kicker">Compliance</p>
          <h2 className="trade-h2">Certifications &amp; timber legality</h2>
        </header>
        <div className="trade-compliance">
          <p>
            Wood products exported from Indonesia must be covered by SVLK, the national timber legality and sustainability system, which the European Union
            accepts as FLEGT licensing. We kiln-dry all our timber in house and work with the government forestry department so trees are regularly replanted.
          </p>
          <p>
            <Link to="/materials/">Our materials and sourcing &rarr;</Link>
          </p>
        </div>
      </section>

      <section className="trade-section trade-section--tint">
        <header className="trade-section__head">
          <p className="trade-kicker">Questions</p>
          <h2 className="trade-h2">Trade FAQ</h2>
        </header>
        <div className="trade-faq">
          {FAQ.map(([q, a]) => (
            <div className="trade-faq__item" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bespoke-page__grid trade-inquiry" id="trade-inquiry">
        <div className="bespoke-page__left">
          <p className="bespoke-page__kicker">/ Trade inquiry</p>
          <h2 className="bespoke-page__title">Request trade pricing</h2>
          <p className="bespoke-page__sub">
            Tell us about your business or project: the pieces you are interested in, approximate quantities, destination and timeline. A member of our trade
            team replies within one business day.
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
          <Field id="trade-name" label="Name" name="name" autoComplete="name" required />
          <Field id="trade-company" label="Company" name="company" autoComplete="organization" />
          <Field id="trade-email" label="Email" name="email" type="email" autoComplete="email" required />
          <Field id="trade-phone" label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" />
          <LeadSelects idPrefix="trade" type="wholesale" />
          <Field id="trade-timeline" label="Timeline (e.g. opening date)" name="timeline" />
          <Area id="trade-project" label="Pieces, quantities and destination" name="project" required />
          <Honeypot id="trade-website" />
        </BespokeForm>
      </section>
    </main>
  )
}
