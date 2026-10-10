import { useState } from 'react'
import { usePage } from '../lib/usePage'
import { site } from '../site'

// Press coverage. These three entries link to real third-party articles about
// the reference site's company (Indocasa), so the summaries avoid naming anyone
// as Golden Village staff. Replace them with Golden Village's own coverage.
type Press = {
  url: string
  img: string
  w: number
  h: number
  alt: string
  credit?: string
  outlet: string
  date: string
  dateText: string
  kind: 'Article' | 'Video'
  title: string
  subtitle?: string
  excerpt: string
  video?: string
}
const PRESS: Press[] = [
  {
    url: 'https://living.corriere.it/case/casa-genova-graniglia-teak-java/',
    img: '/img/theme/press/corriere-living-genova.webp',
    w: 1200,
    h: 630,
    alt: 'Living room of an apartment in Genoa with teak and cane chairs, featured in Corriere della Sera Living',
    credit: 'Photo: Anna Positano & Gaia Cambiaggi / Studio Campo',
    outlet: 'Corriere della Sera · Living',
    date: '2026-09-26',
    dateText: 'September 26, 2026',
    kind: 'Article',
    title: 'L’appartamento sul litorale genovese essenziale e con un tocco esotico',
    subtitle: 'An essential seaside apartment in Genoa, with an exotic touch',
    excerpt:
      'Living, the interiors magazine of Corriere della Sera, visits a family home in Genoa renovated by architect Giulia Grillo and furnished with many pieces in teak worked in Java. In Italian.',
  },
  {
    url: 'https://www.bali-interiors.com/indocasa-just-opened-in-ubud-and-its-been-forty-years-in-the-making/',
    img: '/img/theme/press/bali-interiors-ubud.webp',
    w: 800,
    h: 534,
    alt: 'Teak furniture showroom in Ubud, Bali, featured in Bali Interiors',
    outlet: 'Bali Interiors',
    date: '2026-09-02',
    dateText: 'September 2, 2026',
    kind: 'Article',
    title: 'A Jepara Teak Showroom Opens in Ubud, Forty Years in the Making',
    excerpt:
      'A furniture brand rooted in Jepara’s generational woodworking tradition opens its first showroom in Bali, with solid teak, marble and upholstery collections for residential and hospitality projects.',
  },
  {
    url: 'https://www.youtube.com/watch?v=WbK1FfbKXEY',
    img: '/img/theme/press/cnbc-interview.webp',
    w: 1440,
    h: 747,
    alt: 'Furniture exporter interviewed on CNBC Indonesia',
    outlet: 'CNBC Indonesia',
    date: '2025-10-20',
    dateText: 'October 20, 2025',
    kind: 'Video',
    title: 'US Furniture Tariffs and New Opportunities for Indonesian Exporters',
    subtitle: '“Furnitur Kena Tarif AS, Eksportir Indonesia Lihat Peluang Baru”',
    excerpt:
      'CNBC Indonesia looks at the new US tariffs on imported furniture, what they mean for Indonesian manufacturers, and the new opportunities for Indonesian furniture exporters.',
    video: 'WbK1FfbKXEY',
  },
]

function VideoThumb({ p }: { p: Press }) {
  const [play, setPlay] = useState(false)
  if (play)
    return (
      <div className="media-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${p.video}?autoplay=1&rel=0`}
          title={p.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  return (
    <button type="button" className="media-video" aria-label={`Play video: ${p.title}`} onClick={() => setPlay(true)}>
      <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width={p.w} height={p.h} />
      <span className="media-video__play" aria-hidden="true"></span>
    </button>
  )
}

export default function Media() {
  usePage({ title: 'Media & Press | {name}', description: `Press features and interviews on ${site.name} and Jepara teak craftsmanship.` })
  return (
    <main className="media-page">
      <header className="media-page__head">
        <p className="media-page__kicker">/ Media</p>
        <h1 className="media-page__title">{site.name} in the Press</h1>
        <p className="media-page__sub">Features and interviews on {site.name} and our Jepara craftsmanship.</p>
      </header>
      <div className="media-list">
        {PRESS.map((p) => (
          <article className={'media-item' + (p.video ? ' media-item--video' : '')} key={p.url}>
            <div className="media-item__media">
              {p.video ? (
                <VideoThumb p={p} />
              ) : (
                <a href={p.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                  <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width={p.w} height={p.h} />
                </a>
              )}
              {p.credit && <p className="media-item__credit">{p.credit}</p>}
            </div>
            <div className="media-item__copy">
              <p className="media-item__meta">
                <span>{p.outlet}</span>
                <span aria-hidden="true">◆</span>
                <time dateTime={p.date}>{p.dateText}</time>
                <span aria-hidden="true">◆</span>
                <span>{p.kind}</span>
              </p>
              <h2 className="media-item__title">{p.title}</h2>
              {p.subtitle && <p className="media-item__subtitle">{p.subtitle}</p>}
              <p className="media-item__excerpt">{p.excerpt}</p>
              <a className="media-item__link" href={p.url} target="_blank" rel="noopener">
                {p.video ? 'Watch on YouTube' : 'Read the article'} &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="media-page__contact">
        <p>Press and media enquiries</p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </section>
    </main>
  )
}
