import BespokeForm, { Area, Field, Honeypot, LeadSelects } from '../components/BespokeForm'
import { usePage } from '../lib/usePage'

const STEPS = [
  ['01', 'Share your brief', 'Tell us your dimensions, style references, and timeline.'],
  ['02', 'Design & quote', 'We prepare material recommendations and pricing, followed by technical drawings.'],
  ['03', 'Craft in Indonesia', 'Master artisans handcraft your piece using premium teak and advanced joinery techniques.'],
  ['04', 'Delivery & install', 'We coordinate international delivery and white-glove setup where required.'],
]

export default function Bespoke() {
  usePage({
    title: 'Contact Us & Bespoke Furniture Orders | {name}',
    description: 'Commission custom teak furniture tailored to your space, finish, and dimensions. Our design team works directly with you from concept to completion.',
  })
  return (
    <main className="bespoke-page">
      <section className="bespoke-page__grid">
        <div className="bespoke-page__left">
          <p className="bespoke-page__kicker">/ Bespoke</p>
          <h1 className="bespoke-page__title">
            Bespoke
            <br />
            Orders
          </h1>
          <p className="bespoke-page__sub">
            Commission custom furniture tailored to your space, finish, and dimensions. Our design team works directly with you from concept to completion.
          </p>
          <ol className="bespoke-steps">
            {STEPS.map(([n, t, b]) => (
              <li className="bespoke-step" key={n}>
                <span className="bespoke-step__n">{n}</span>
                <div>
                  <p className="bespoke-step__t">{t}</p>
                  <p className="bespoke-step__b">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <BespokeForm
          title="Start Your Project"
          lede="Our design team responds within one business day."
          subject="Bespoke inquiry"
          submitLabel="Send Inquiry"
          thanksTitle="Inquiry Received"
          thanksText="We'll review your project and respond within one business day."
        >
          <Field id="bespoke-name" label="Name" name="name" required />
          <Field id="bespoke-email" label="Email" name="email" type="email" required />
          <Field id="bespoke-phone" label="Phone" name="phone" type="tel" autoComplete="tel" />
          <LeadSelects idPrefix="bespoke" />
          <Area id="bespoke-project" label="Tell us about your project" name="project" required />
          <Honeypot id="bespoke-website" />
        </BespokeForm>
      </section>
    </main>
  )
}
