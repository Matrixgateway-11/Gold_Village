import type { ReactNode } from 'react'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'

type Props = {
  title: ReactNode
  eyebrow?: string
  lead?: ReactNode
  /** Full-bleed background photo. Without it the hero is a plain heading block. */
  image?: string
  /** Decorative by default; pass text when the photo carries meaning. */
  imageAlt?: string
  crumbs?: Crumb[]
  /** `lg` is for landing-style pages (Materials, Trade); `md` for catalogue headers. */
  size?: 'md' | 'lg'
  /** Buttons or links under the lead. */
  children?: ReactNode
  id?: string
}

// Page header used by every inner page: a photo hero (under the transparent header) or a plain intro.
export default function PageHero({ title, eyebrow, lead, image, imageAlt = '', crumbs, size = 'md', children, id = 'page-title' }: Props) {
  const hasImage = !!image
  return (
    <section className={`page-hero page-hero--${size}` + (hasImage ? ' page-hero--image on-dark' : ' page-hero--plain')} aria-labelledby={id}>
      {hasImage && (
        <>
          <img className="page-hero__bg" src={image} alt={imageAlt} decoding="async" {...{ fetchpriority: 'high' }} />
          <div className="page-hero__scrim" aria-hidden="true"></div>
        </>
      )}
      <div className="container page-hero__inner">
        {crumbs && <Breadcrumbs items={crumbs} className="page-hero__crumbs" />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 id={id}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children && <div className="btn-row page-hero__actions">{children}</div>}
      </div>
    </section>
  )
}
