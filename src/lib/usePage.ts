import { useEffect } from 'react'
import { site } from '../site'

type PageMeta = {
  title: string
  description?: string
  // Extra body classes, e.g. "indocasa-hero-overlay" for pages whose header sits on a hero image.
  bodyClass?: string
}

const BASE = 'theme-indocasa'

export function usePage({ title, description, bodyClass = '' }: PageMeta) {
  useEffect(() => {
    document.title = title.replace(/\{name\}/g, site.legalName)
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
    document.body.className = [BASE, bodyClass].join(' ').trim()
    return () => {
      document.body.className = BASE
    }
  }, [title, description, bodyClass])
}
