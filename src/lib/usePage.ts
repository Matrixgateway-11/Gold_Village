import { useLayoutEffect } from 'react'
import { site } from '../site'

type PageMeta = {
  title: string
  description?: string
  // True when the page opens with a full-bleed hero image that sits under the transparent header.
  overlay?: boolean
}

// Sets the document title/description and tells the header whether to start transparent.
export function usePage({ title, description, overlay = false }: PageMeta) {
  // Layout effect so the header picks its transparent/solid state before the first paint (no flash).
  useLayoutEffect(() => {
    document.title = title.replace(/\{name\}/g, site.legalName)
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
    document.body.dataset.hero = overlay ? 'overlay' : 'none'
    return () => {
      delete document.body.dataset.hero
    }
  }, [title, description, overlay])
}
