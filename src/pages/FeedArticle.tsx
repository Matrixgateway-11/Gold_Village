import { useNavigate, useParams, Link } from 'react-router-dom'
import { feeds } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import { FeedCard, topicSlug } from './Feeds'
import NotFound from './NotFound'

export default function FeedArticle() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const f = feeds.find((x) => x.slug === slug)
  usePage({ title: f ? `${f.title} | {name}` : 'Not found | {name}', description: f?.lede, bodyClass: 'single' })
  if (!f) return <NotFound />

  // Keep reading: other articles, newest first, skipping this one.
  const related = feeds.filter((x) => x.slug !== f.slug).slice(0, 3)

  // Article bodies contain plain <a href="/…"> links; route internal ones through the SPA.
  const onBodyClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a')
    const href = a?.getAttribute('href')
    if (!a || !href || !href.startsWith('/') || a.target === '_blank' || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    navigate(href)
  }

  return (
    <main className="feed-article">
      <header className="feed-article__head">
        <nav className="feed-article__crumbs" aria-label="Breadcrumb">
          <Link to="/feeds/">Feeds</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/feeds/topic/${topicSlug(f.topic)}/`}>{f.topic}</Link>
        </nav>
        <h1 className="feed-article__title">{f.title}</h1>
        <p className="feed-article__lede">{f.lede}</p>
        <p className="feed-article__meta">
          <span>By the {site.name} team</span>
          <span aria-hidden="true">◆</span>
          <time dateTime={f.date}>{f.dateText}</time>
          <span aria-hidden="true">◆</span>
          <span>{f.read}</span>
        </p>
      </header>
      <figure className="feed-article__hero">
        <img src={f.hero} className="attachment-indocasa-hero size-indocasa-hero wp-post-image" alt={f.title} loading="eager" decoding="async" />
      </figure>
      <div className="feed-article__body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: f.body }} />
      <section className="feed-related" aria-labelledby="feed-related-title">
        <h2 id="feed-related-title" className="feed-related__title">
          Keep reading
        </h2>
        <div className="feeds-grid">
          {related.map((r) => (
            <FeedCard f={r} compact key={r.slug} />
          ))}
        </div>
      </section>
    </main>
  )
}
