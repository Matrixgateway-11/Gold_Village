import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import { feeds } from '../lib/data'
import { usePage } from '../lib/usePage'
import { site } from '../site'
import '../styles/pages/feeds.css'
import { FeedCard, topicSlug } from './Feeds'
import NotFound from './NotFound'

export default function FeedArticle() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const f = feeds.find((x) => x.slug === slug)
  usePage({ title: f ? `${f.title} | {name}` : 'Not found | {name}', description: f?.lede })
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
    <main id="main">
      <article className="article">
        <header className="container container--narrow article__head">
          <Breadcrumbs
            items={[
              { label: 'Feeds', to: '/feeds/' },
              { label: f.topic, to: `/feeds/topic/${topicSlug(f.topic)}/` },
            ]}
          />
          <h1>{f.title}</h1>
          <p className="article__lede">{f.lede}</p>
          <p className="article__meta">
            <span>By the {site.name} team</span>
            <span aria-hidden="true">·</span>
            <time dateTime={f.date}>{f.dateText}</time>
            <span aria-hidden="true">·</span>
            <span>{f.read}</span>
          </p>
        </header>
        <figure className="container article__hero">
          <img src={f.hero} alt="" loading="eager" decoding="async" />
        </figure>
        <div className="container container--narrow">
          <div className="prose" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: f.body }} />
        </div>
      </article>

      <section className="section section--alt" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="related-title">
            Keep reading
          </h2>
          <div className="feeds__grid">
            {related.map((r) => (
              <FeedCard f={r} compact key={r.slug} />
            ))}
          </div>
          <p style={{ marginTop: '2rem' }}>
            <Link className="link-arrow" to="/feeds/">
              All guides
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
