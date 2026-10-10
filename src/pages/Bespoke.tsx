import { PiEnvelopeSimple, PiMapPin, PiPhone, PiWhatsappLogo } from 'react-icons/pi'
import BespokeForm, { Area, Field, Honeypot, LeadSelects } from '../components/BespokeForm'
import Reveal from '../components/ui/Reveal'
import { dash } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site, telHref } from '../site'
import '../styles/pages/contact.css'

const STEPS = [
  ['01', 'Share your brief', 'Tell us your dimensions, style references, and timeline.'],
  ['02', 'Design & quote', 'We prepare material recommendations and pricing, followed by technical drawings.'],
  ['03', 'Craft in Indonesia', 'Master artisans handcraft your piece using premium teak and advanced joinery techniques.'],
  ['04', 'Delivery & install', 'We coordinate international delivery and white-glove setup where required.'],
]

export default function Bespoke() {
  usePage({
    title: 'Contact Us & Bespoke Furniture Orders | {name}',
    description:
      'Commission custom teak furniture tailored to your space, finish, and dimensions. Our design team works directly with you from concept to completion.',
  })
  return (
    <main id="main">
      <section className="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="contact__intro">
            <p className="eyebrow">Contact us · Bespoke orders</p>
            <h1 id="contact-title">
              Let’s create something <span className="accent-italic">made for you</span>
            </h1>
            <p className="lead">
              Commission custom furniture tailored to your space, finish, and dimensions. Our design team works directly with you from concept to
              completion.
            </p>

            <ul className="contact-cards" role="list">
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <PiWhatsappLogo aria-hidden="true" />
                  <span>
                    <small>WhatsApp</small>
                    Chat with us
                  </span>
                </a>
              </li>
              <li>
                <a href={telHref(site.phone)}>
                  <PiPhone aria-hidden="true" />
                  <span>
                    <small>Call</small>
                    {site.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>
                  <PiEnvelopeSimple aria-hidden="true" />
                  <span>
                    <small>Email</small>
                    {site.email}
                  </span>
                </a>
              </li>
              <li>
                <div>
                  <PiMapPin aria-hidden="true" />
                  <span>
                    <small>Workshop</small>
                    {dash(site.address)}
                  </span>
                </div>
              </li>
            </ul>

            <h2 className="contact__steps-title">How bespoke orders work</h2>
            <ol className="steps" role="list">
              {STEPS.map(([n, t, b], i) => (
                <Reveal as="li" key={n} delay={i * 0.06}>
                  <span className="steps__n" aria-hidden="true">
                    {n}
                  </span>
                  <div>
                    <h3>{t}</h3>
                    <p>{b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="contact__form">
            <BespokeForm
              title="Start Your Project"
              lede="Our design team responds within one business day."
              subject="Bespoke inquiry"
              submitLabel="Send Inquiry"
              thanksTitle="Inquiry Received"
              thanksText="We'll review your project and respond within one business day."
            >
              <div className="form-row form-row--2">
                <Field id="bespoke-name" label="Name" name="name" autoComplete="name" required />
                <Field id="bespoke-email" label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <Field id="bespoke-phone" label="Phone / WhatsApp (optional)" name="phone" type="tel" autoComplete="tel" />
              <LeadSelects idPrefix="bespoke" />
              <Area id="bespoke-project" label="Tell us about your project" name="project" required />
              <Honeypot id="bespoke-website" />
            </BespokeForm>
          </div>
        </div>
      </section>
    </main>
  )
}
