import { Link, useParams } from 'react-router-dom'
import { feeds, type Feed } from '../lib/data'
import { usePage } from '../lib/usePage'
import NotFound from './NotFound'

export const TOPICS: Record<string, string> = { collections: 'Collections', guides: 'Guides', qa: 'Q&A' }
export const topicSlug = (label: string) => Object.keys(TOPICS).find((k) => TOPICS[k] === label) || ''

export function FeedCard({ f, compact }: { f: Feed; compact?: boolean }) {
  const H = compact ? 'h3' : 'h2'
  return (
    <article className="feed-card">
      <Link className="feed-card__link" to={`/feeds/${f.slug}/`}>
        <div className="feed-card__img">
          <img src={f.card} className="attachment-indocasa-card size-indocasa-card wp-post-image" alt={f.title} loading="lazy" decoding="async" />
        </div>
        {!compact && (
          <p className="feed-card__meta">
            <span>{f.topic}</span>
            <span aria-hidden="true">◆</span>
            <span>{f.read}</span>
          </p>
        )}
        <H className="feed-card__title">{f.title}</H>
        {!compact && <p className="feed-card__excerpt">{f.excerpt || f.lede}</p>}
        <span className="feed-card__more">Read article &rarr;</span>
      </Link>
    </article>
  )
}

export default function Feeds() {
  const { topic = '' } = useParams()
  usePage({
    title: 'Feeds – Guides & Insights on Indonesian Teak Furniture | {name}',
    description: 'Guides and insights on Indonesian teak furniture: how it is made, how export orders work and the stories behind our collections.',
    bodyClass: 'archive post-type-archive',
  })
  if (topic && !TOPICS[topic]) return <NotFound />
  const list = topic ? feeds.filter((f) => f.topic === TOPICS[topic]) : feeds

  return (
    <main className="feeds-page">
      <header className="feeds-head">
        <p className="feeds-kicker">/ Feeds</p>
        <h1 className="feeds-title">Guides &amp; Insights on Indonesian Teak Furniture</h1>
        <p className="feeds-sub">
          Notes from our workshop in Jepara: how teak furniture is made, how export orders work, answers to the questions buyers ask us most, and the stories
          behind our collections.
        </p>
        <nav className="feeds-topics" aria-label="Topics">
          <Link to="/feeds/" aria-current={!topic ? 'page' : undefined}>
            All
          </Link>
          {Object.entries(TOPICS).map(([slug, label]) => (
            <Link to={`/feeds/topic/${slug}/`} aria-current={topic === slug ? 'page' : undefined} key={slug}>
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="feeds-grid">
        {list.map((f) => (
          <FeedCard f={f} key={f.slug} />
        ))}
      </div>
      <div className="feeds-pagination"></div>
    </main>
  )
}
