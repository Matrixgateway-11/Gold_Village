import { Link, useParams } from 'react-router-dom'
import { PiArrowRight } from 'react-icons/pi'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { feeds, type Feed } from '../lib/data'
import { usePage } from '../lib/usePage'
import '../styles/pages/feeds.css'
import NotFound from './NotFound'

export const TOPICS: Record<string, string> = { collections: 'Collections', guides: 'Guides', qa: 'Q&A' }
export const topicSlug = (label: string) => Object.keys(TOPICS).find((k) => TOPICS[k] === label) || ''

export function FeedCard({ f, compact }: { f: Feed; compact?: boolean }) {
  const H = compact ? 'h3' : 'h2'
  return (
    <article className="feed-card">
      <Link className="feed-card__link" to={`/feeds/${f.slug}/`}>
        <div className="feed-card__img">
          <img src={f.card} alt="" loading="lazy" decoding="async" />
        </div>
        {!compact && (
          <p className="feed-card__meta">
            <span className="chip">{f.topic}</span>
            <span>{f.read}</span>
          </p>
        )}
        <H className="feed-card__title">{f.title}</H>
        {!compact && <p className="feed-card__excerpt">{f.excerpt || f.lede}</p>}
        <span className="feed-card__more">
          Read article <PiArrowRight aria-hidden="true" />
        </span>
      </Link>
    </article>
  )
}

export default function Feeds() {
  const { topic = '' } = useParams()
  usePage({
    title: 'Feeds – Guides & Insights on Indonesian Teak Furniture | {name}',
    description: 'Guides and insights on Indonesian teak furniture: how it is made, how export orders work and the stories behind our collections.',
  })
  if (topic && !TOPICS[topic]) return <NotFound />
  const list = topic ? feeds.filter((f) => f.topic === TOPICS[topic]) : feeds

  return (
    <main id="main">
      <PageHero
        eyebrow="Feeds"
        title="Guides & Insights on Indonesian Teak Furniture"
        lead="Notes from our workshop in Jepara: how teak furniture is made, how export orders work, answers to the questions buyers ask us most, and the stories behind our collections."
        id="feeds-title"
      />
      <div className="container feeds">
        <nav className="feeds__topics" aria-label="Topics">
          <Link to="/feeds/" aria-current={!topic ? 'page' : undefined}>
            All
          </Link>
          {Object.entries(TOPICS).map(([slug, label]) => (
            <Link to={`/feeds/topic/${slug}/`} aria-current={topic === slug ? 'page' : undefined} key={slug}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="feeds__grid">
          {list.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 3) * 0.06}>
              <FeedCard f={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
