import { Link } from 'react-router-dom'
import { PiCaretRight } from 'react-icons/pi'

export type Crumb = { label: string; to?: string }

export default function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav className={'breadcrumbs ' + (className || '')} aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.label + i}>
              {c.to && !last ? <Link to={c.to}>{c.label}</Link> : <span aria-current={last ? 'page' : undefined}>{c.label}</span>}
              {!last && <PiCaretRight className="sep" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
