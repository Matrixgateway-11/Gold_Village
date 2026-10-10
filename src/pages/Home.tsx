import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PiArrowRight, PiGlobeHemisphereWest, PiHammer, PiShippingContainer, PiSun, PiTree, PiWhatsappLogo } from 'react-icons/pi'
import Button from '../components/ui/Button'
import CountUp from '../components/ui/CountUp'
import { RingMotif, RotatingStamp } from '../components/ui/Motifs'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ShowcaseCard from '../components/ui/ShowcaseCard'
import { allUrl, categories, categoriesOfCollection, collectionBySlug, collectionCount, collections, productBySlug, products } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import '../styles/pages/home.css'

const U = '/img/uploads/2026/07/'
const IMG = {
  hero: U + 'home-hero_background_image-1920x1080.webp',
  spotlight: U + 'home-spotlight_image.webp',
  dining: U + 'home-dining_image.webp',
  craftRight: U + 'home-craft_image_right-scaled.webp',
  rings: U + 'materials-materials_gallery_image_1.webp',
  logs: U + 'materials-materials_gallery_image_2.webp',
  hands: U + 'materials-materials_gallery_image_3.webp',
  workshop: U + 'about-about_strip_image_3-1-700x700.webp',
  world: U + 'about-about_strip_image_2-8-523x700.webp',
  living: U + 'about-about_strip_image_4-806x1080.webp',
}

const PROOF = [
  { icon: PiTree, label: 'Solid Indonesian teak' },
  { icon: PiHammer, label: 'Handcrafted in Jepara' },
  { icon: PiGlobeHemisphereWest, label: 'Shipped worldwide' },
]

const COLLECTION_COPY: Record<string, string> = {
  'outdoor-collection': 'Weather-ready teak for terraces, pool decks and tropical gardens.',
  'indoor-collection': 'Beds, sofas, dining and storage for calm, collected rooms.',
  'bathroom-collection': 'Vanities, columns and mirrors with a quiet, spa-like warmth.',
}

// Four pieces per collection for the "Signature pieces" tabs.
const PICKS: Record<string, string[]> = {
  'outdoor-collection': ['azur-sofa', 'ibiza-dining-table', 'fiore-sun-bed', 'evara-cabana'],
  'indoor-collection': ['dolcevita-double-bed', 'komodo-dining-table', 'aria-2-seaters-sofa', 'maharaja-wardrobe'],
  'bathroom-collection': ['aosta-mirror', 'aosta-column', 'alpina-mirror', 'cleo-column'],
}

const JOURNEY = [
  {
    icon: PiTree,
    img: IMG.logs,
    title: 'Responsibly sourced teak',
    text: 'We work closely with the government forestry department so trees are regularly replanted.',
  },
  {
    icon: PiSun,
    img: IMG.rings,
    title: 'Kiln-dried in house',
    text: 'Stable temperature and moisture control in the chambers enhances the timber’s properties and performance.',
  },
  {
    icon: PiHammer,
    img: IMG.workshop,
    title: 'Hand-finished in Jepara',
    text: 'Skilled artisans shape, join and sand every surface by hand, keeping the warmth and individuality of the wood.',
  },
  {
    icon: PiShippingContainer,
    img: IMG.world,
    title: 'Shipped worldwide',
    text: 'Export-packed with SVLK timber legality documents and delivered to your door or your site.',
  },
]

export default function Home() {
  usePage({
    title: `${site.legalName} | Handcrafted Indonesian Teak Furniture`,
    description: 'Handcrafted teak furniture from Jepara, Indonesia for refined indoor, outdoor and bathroom spaces.',
    overlay: true,
  })
  return (
    <main id="main">
      <Hero />
      <Collections />
      <Statement />
      <Journey />
      <Spotlight />
      <Signature />
      <Dining />
      <Invitation />
    </main>
  )
}

/* ── Hero: a village gate (arched photo) over growth rings ───────────────── */
function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 70])
  const ringsRotate = useTransform(scrollY, [0, 1400], [0, reduce ? 0 : 30])

  // Copy rises line by line. The headline only slides (never starts invisible) so it can paint at once.
  const rise = (i: number, fade = true) =>
    reduce
      ? {}
      : {
          initial: fade ? { opacity: 0, y: 28 } : { y: 28 },
          animate: fade ? { opacity: 1, y: 0 } : { y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <motion.div className="hero__rings" style={{ rotate: ringsRotate }} aria-hidden="true">
        <RingMotif />
      </motion.div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p className="eyebrow" {...rise(0)}>
            Tropical Luxury • Timeless Teak Craftsmanship
          </motion.p>
          <motion.h1 id="hero-title" {...rise(1, false)}>
            Where Tropical Living Meets <span className="accent-italic">Timeless Design</span>
          </motion.h1>
          <motion.p className="hero__lead" {...rise(2)}>
            Discover handcrafted teak furniture designed for refined indoor, outdoor, and bathroom spaces, blending tropical warmth, timeless
            aesthetics, and enduring craftsmanship.
          </motion.p>
          <motion.div className="btn-row" {...rise(3)}>
            <Button to="/product-category/all/" variant="gold" size="lg" arrow>
              Explore Collection
            </Button>
            <Button to="/bespoke/" variant="outline-light" size="lg">
              Contact Us
            </Button>
          </motion.div>
          <motion.ul className="hero__proof" role="list" {...rise(4)}>
            {PROOF.map((p) => (
              <li key={p.label}>
                <p.icon aria-hidden="true" />
                {p.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="hero__art">
          <div className="hero__arch">
            <motion.img
              src={IMG.hero}
              alt="A teak sofa and lounge chairs on a lawn, surrounded by tropical plants"
              width="1920"
              height="1080"
              // React 18 only knows the lowercase attribute.
              {...{ fetchpriority: 'high' }}
              decoding="async"
              style={{ y: imgY }}
            />
          </div>
          <div className="hero__circle">
            <img src={IMG.rings} alt="" width="612" height="408" loading="lazy" decoding="async" />
          </div>
          <RotatingStamp className="hero__stamp" text="HANDCRAFTED IN JEPARA • INDONESIAN TEAK • ">
            <PiTree />
          </RotatingStamp>
          <motion.div
            className="hero__card"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <strong>
              <CountUp to={products.length} />
            </strong>
            <span>handcrafted designs in {collections.length} collections</span>
          </motion.div>
        </div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 48 C 200 92 420 6 720 38 C 1020 70 1230 14 1440 52 L1440 90 L0 90 Z" />
      </svg>
    </section>
  )
}

/* ── Collections: three panels that open on hover or focus ───────────────── */
function Collections() {
  const [active, setActive] = useState(1)
  return (
    <section className="section collections" id="collections" aria-labelledby="collections-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="collections-title"
            eyebrow="Shop by collection"
            title={
              <>
                Furniture for every <span className="accent-italic">corner</span> of your world
              </>
            }
            lead="From pool-deck lounges to spa-inspired bathrooms: three collections, one language of warm, honest teak."
            action={
              <Button to={allUrl()} variant="outline" arrow>
                View all furniture
              </Button>
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="panels" onMouseLeave={() => setActive(1)}>
            {collections.map((c, i) => (
              <Link
                key={c.slug}
                className="panel"
                to={allUrl(c.slug)}
                data-active={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <img src={c.hero} alt="" width="1672" height="941" loading="lazy" decoding="async" />
                <span className="panel__label" aria-hidden="true">
                  {c.name.replace(' Collection', '')}
                </span>
                <span className="panel__body">
                  <span className="panel__count">
                    {collectionCount(c)} pieces · {categoriesOfCollection(c).length} categories
                  </span>
                  <span className="panel__title">{c.name}</span>
                  <span className="panel__text">{COLLECTION_COPY[c.slug]}</span>
                  <span className="panel__go">
                    Explore <PiArrowRight aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Philosophy: one big sentence with photo pills ───────────────────────── */
function Statement() {
  return (
    <section className="section section--alt statement" aria-labelledby="philosophy-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The {site.name} Philosophy</p>
          <h2 id="philosophy-title" className="statement__title">
            A study in{' '}
            <span className="pill" aria-hidden="true">
              <img src={IMG.hands} alt="" loading="lazy" decoding="async" />
            </span>{' '}
            warmth, texture,{' '}
            <span className="pill" aria-hidden="true">
              <img src={IMG.rings} alt="" loading="lazy" decoding="async" />
            </span>{' '}
            <span className="accent-italic">and time</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="statement__cols">
          <p>
            Rooted in the warmth of Indonesian living, {site.name} creates furniture that brings together sculptural form, natural teak, and quiet
            luxury.
          </p>
          <p>
            Each piece is designed to soften spaces with texture, light, and timeless presence – creating homes that feel collected, serene, and
            deeply lived in.
          </p>
          <Link className="link-arrow" to="/about/">
            Our story
            <PiArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Journey: from grove to home ─────────────────────────────────────────── */
function Journey() {
  return (
    <section className="section section--dark journey on-dark" aria-labelledby="journey-title">
      <RingMotif className="journey__rings" />
      <div className="container">
        <Reveal>
          <SectionHeading
            id="journey-title"
            eyebrow="From grove to home"
            title={
              <>
                Every piece begins as a <span className="accent-italic">tree</span>
              </>
            }
            lead="Four careful steps take Indonesian teak from the forest to your space."
          />
        </Reveal>
        <ol className="journey__steps" role="list">
          {JOURNEY.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1}>
              <article className="step">
                <div className="step__img">
                  <img src={s.img} alt="" width="700" height="700" loading="lazy" decoding="async" />
                  <span className="step__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <span className="step__icon" aria-hidden="true">
                  <s.icon />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
        <dl className="stats">
          <div>
            <dt>Handcrafted designs</dt>
            <dd>
              <CountUp to={products.length} />
            </dd>
          </div>
          <div>
            <dt>Product categories</dt>
            <dd>
              <CountUp to={categories.length} />
            </dd>
          </div>
          <div>
            <dt>Collections</dt>
            <dd>
              <CountUp to={collections.length} />
            </dd>
          </div>
          <div>
            <dt>Hospitality projects</dt>
            <dd>
              <CountUp to={100} suffix="+" />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* ── Spotlight: arched photo with an overlapping snapshot ────────────────── */
function Spotlight() {
  return (
    <section className="section spotlight" aria-labelledby="spotlight-title">
      <div className="container spotlight__grid">
        <Reveal className="spotlight__art">
          <div className="spotlight__arch">
            <img
              src={IMG.spotlight}
              alt="Outdoor teak lounge with olive cushions beside a stone-edged pool"
              width="1434"
              height="1920"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="spotlight__snap">
            <img src={IMG.craftRight} alt="" width="1072" height="1920" loading="lazy" decoding="async" />
          </div>
          <RotatingStamp className="spotlight__stamp" text="AUTHENTIC INDONESIAN TEAK • HANDCRAFTED IN INDONESIA • ">
            <PiTree />
          </RotatingStamp>
        </Reveal>
        <Reveal className="spotlight__copy" delay={0.1}>
          <p className="eyebrow">Timeless Teak Craftsmanship</p>
          <h2 id="spotlight-title">
            Designed for Warm, <span className="accent-italic">Elevated Living</span>
          </h2>
          <p className="lead">
            {site.name} creates handcrafted teak furniture inspired by tropical architecture, natural textures, and timeless design. From refined
            indoor spaces to serene outdoor living and spa-inspired bathrooms, every piece is made to bring warmth, longevity, and understated luxury
            into modern homes.
          </p>
          <p className="spotlight__meta">Sustainably sourced teak • Handcrafted in Bali • Trusted worldwide since 2008</p>
          <div className="btn-row">
            <Button to="/product-category/all/" arrow>
              Explore Collections
            </Button>
            <Button to="/about/" variant="outline">
              Our Story
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Signature pieces: tabs per collection ───────────────────────────────── */
function Signature() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(collections[0].slug)
  const tabs = collections.map((c) => ({ slug: c.slug, label: c.name.replace(' Collection', ''), count: collectionCount(c) }))
  const active = collectionBySlug.get(tab)!
  const items = PICKS[tab].map((s) => productBySlug.get(s)).filter((p): p is NonNullable<typeof p> => !!p)

  // Arrow keys move between tabs, as in any native tab list.
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.slug === tab)
    const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : -1
    if (next < 0) return
    e.preventDefault()
    setTab(tabs[next].slug)
    document.getElementById(`tab-${tabs[next].slug}`)?.focus()
  }

  return (
    <section className="section signature" aria-labelledby="signature-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="signature-title"
            eyebrow="Collectible design"
            title={
              <>
                Furniture designed as <span className="accent-italic">functional sculpture</span>
              </>
            }
            lead={`Blending sculptural silhouettes, rich natural materials, and refined craftsmanship, ${site.name} creates pieces that bring character, depth, and artistic presence into contemporary spaces.`}
          />
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Collections" onKeyDown={onKey}>
          {tabs.map((t) => (
            <button
              key={t.slug}
              id={`tab-${t.slug}`}
              type="button"
              role="tab"
              className="tab"
              aria-selected={tab === t.slug}
              aria-controls="signature-panel"
              tabIndex={tab === t.slug ? 0 : -1}
              onClick={() => setTab(t.slug)}
            >
              {t.label}
              <small>{t.count}</small>
            </button>
          ))}
        </div>

        <div id="signature-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="showcase-grid"
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {items.map((p, i) => (
                <ShowcaseCard key={p.slug} p={p} eager={i < 2} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="signature__foot">
          <Button to={allUrl(active.slug)} variant="outline" arrow>
            See all {active.name.toLowerCase()}
          </Button>
          <Button to={site.signatureUrl} variant="dark" arrow>
            Explore Signature Pieces
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ── Dining: full-bleed photo with a slow parallax ───────────────────────── */
function Dining() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-9%', '9%'])
  return (
    <section className="dining on-dark" ref={ref} aria-labelledby="dining-title">
      <motion.img src={IMG.dining} alt="" width="1672" height="941" loading="lazy" decoding="async" style={{ y }} />
      <div className="dining__scrim" aria-hidden="true"></div>
      <div className="container dining__wrap">
        <Reveal className="dining__card">
          <p className="eyebrow">Made for Gathering</p>
          <h2 id="dining-title">Crafted for Slow Evenings and Long Conversations</h2>
          <Button to="/product-category/all/dining-tables/?collection=indoor-collection" variant="gold" arrow>
            Dining tables
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Invitation: bespoke call to action ──────────────────────────────────── */
function Invitation() {
  return (
    <section className="section section--alt invitation" aria-labelledby="bespoke-title">
      <RingMotif className="invitation__rings" />
      <div className="container invitation__grid">
        <Reveal className="invitation__copy">
          <p className="eyebrow">Bespoke Orders</p>
          <h2 id="bespoke-title">
            Designed Around the Way <span className="accent-italic">You Live</span>
          </h2>
          <p className="lead">
            From private residences to luxury hospitality spaces, {site.name} collaborates with homeowners, architects, and designers to create
            furniture and environments tailored to each space, lifestyle, and vision.
          </p>
          <div className="btn-row">
            <Button to="/bespoke/" size="lg" arrow>
              Start Your Project
            </Button>
            <Button href={`https://wa.me/${site.whatsapp}`} variant="outline" size="lg" icon={<PiWhatsappLogo aria-hidden="true" />} data-wa-toggle>
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
        <Reveal className="invitation__art" delay={0.1}>
          <div className="invitation__arch">
            <img
              src={IMG.living}
              alt="A bright teak living room opening onto palms and the sea"
              width="806"
              height="1080"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
