import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PiArrowRight } from 'react-icons/pi'

type Variant = 'primary' | 'gold' | 'dark' | 'light' | 'outline' | 'outline-light' | 'whatsapp'

type Common = {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  /** Trailing arrow that nudges right on hover. */
  arrow?: boolean
  /** Leading icon element. */
  icon?: ReactNode
  className?: string
  children: ReactNode
}

type AsLink = Common & { to: string; href?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>
type AsAnchor = Common & { href: string; to?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>
type AsButton = Common & { to?: undefined; href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export type ButtonProps = AsLink | AsAnchor | AsButton

// One button for the whole site: renders a router <Link>, a plain <a> (external, tel:, mailto:) or a <button>.
export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', block, arrow, icon, className, children, ...rest } = props
  const cls = ['btn', variant !== 'primary' && `btn--${variant}`, size !== 'md' && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
      {arrow && <PiArrowRight className="btn__icon btn__icon--arrow" aria-hidden="true" />}
    </>
  )

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...a } = rest as Omit<AsLink, keyof Common>
    return (
      <Link className={cls} to={to} {...a}>
        {content}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...a } = rest as Omit<AsAnchor, keyof Common>
    const external = /^https?:/.test(href)
    return (
      <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...a}>
        {content}
      </a>
    )
  }
  const { type = 'button', ...b } = rest as Omit<AsButton, keyof Common>
  return (
    <button className={cls} type={type} {...b}>
      {content}
    </button>
  )
}
