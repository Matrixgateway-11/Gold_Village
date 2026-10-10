import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  /** Heading level to render; styling stays the same. */
  as?: 'h1' | 'h2' | 'h3'
  /** Right-aligned slot (link, carousel controls) on wide screens. */
  action?: ReactNode
  id?: string
}

export default function SectionHeading({ eyebrow, title, lead, align = 'left', as: H = 'h2', action, id }: Props) {
  const main = (
    <>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id}>{title}</H>
      {lead && <p className="lead">{lead}</p>}
    </>
  )
  if (action) {
    return (
      <div className="section-head section-head--split">
        <div className="section-head__main">{main}</div>
        <div>{action}</div>
      </div>
    )
  }
  return <div className={'section-head' + (align === 'center' ? ' section-head--center' : '')}>{main}</div>
}
