import { useEffect, useRef, useState } from 'react'
import { site } from '../site'
import { Honeypot, LeadSelects } from './LeadFields'

// Floating WhatsApp button with a short pre-chat form. Any element with
// data-wa-toggle (optionally data-wa-type="wholesale") also opens the panel.
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [formKey, setFormKey] = useState(0)
  const panel = useRef<HTMLDivElement>(null)
  const fab = useRef<HTMLAnchorElement>(null)
  const openRef = useRef(open)
  openRef.current = open

  const openPanel = (type: string) => {
    setOpen(true)
    requestAnimationFrame(() => {
      const form = panel.current?.querySelector('form')
      const sel = form?.querySelector<HTMLSelectElement>('select[name="project_type"]')
      if (type && sel && !sel.value) sel.value = type
      form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
    })
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.('[data-wa-toggle]')
      if (!t) return
      e.preventDefault()
      if (openRef.current && t === fab.current) setOpen(false)
      else openPanel(t.getAttribute('data-wa-type') || '')
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const typeSel = form.querySelector<HTMLSelectElement>('select[name="project_type"]')!
    const countrySel = form.querySelector<HTMLSelectElement>('select[name="country"]')!
    if (!name || !typeSel.value || !countrySel.value) {
      setError('Please add your name, project type and country.')
      return
    }
    setError('')
    const message = String(data.get('message') || '').trim()
    const lines = [
      `Hi ${site.name}, I'm ${name}.`,
      'Project type: ' + typeSel.options[typeSel.selectedIndex].text,
      'Country: ' + countrySel.options[countrySel.selectedIndex].text,
    ]
    if (message) lines.push('', message)
    lines.push('', '(Sent from ' + window.location.href + ')')
    const url = `https://wa.me/${site.whatsapp}?text=` + encodeURIComponent(lines.join('\n'))
    const win = window.open(url, '_blank', 'noopener')
    if (!win) window.location.href = url
    setOpen(false)
    setFormKey((k) => k + 1)
  }

  const hello = `https://wa.me/${site.whatsapp}?text=` + encodeURIComponent(`Hi ${site.name}, I'd like to know more about your furniture.`)

  return (
    <>
      <a
        ref={fab}
        className="indocasa-wa-fab"
        href={hello}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        aria-controls="indocasa-wa-panel"
        aria-expanded={open}
        data-wa-toggle
      >
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M16.04 3C9.1 3 3.46 8.63 3.46 15.57c0 2.22.58 4.38 1.68 6.29L3.36 28.5l6.8-1.78a12.53 12.53 0 0 0 5.88 1.5h.01c6.93 0 12.58-5.64 12.58-12.58C28.63 8.63 22.98 3 16.04 3zm0 22.98h-.01a10.4 10.4 0 0 1-5.31-1.46l-.38-.22-4.03 1.06 1.07-3.93-.25-.4a10.38 10.38 0 0 1-1.6-5.46c0-5.75 4.68-10.43 10.44-10.43 2.78 0 5.4 1.09 7.37 3.06a10.36 10.36 0 0 1 3.05 7.38c0 5.75-4.68 10.4-10.35 10.4zm5.72-7.8c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62s1.13 3.04 1.28 3.25c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37z"
          />
        </svg>
      </a>
      <div
        ref={panel}
        className="indocasa-wa-panel"
        id="indocasa-wa-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="indocasa-wa-title"
        hidden={!open}
      >
        <div className="indocasa-wa-panel__head">
          <p className="indocasa-wa-panel__title" id="indocasa-wa-title">
            Chat with {site.name}
          </p>
          <button type="button" className="indocasa-wa-panel__close" aria-label="Close" onClick={() => setOpen(false)}>
            &times;
          </button>
        </div>
        <p className="indocasa-wa-panel__lede">A few details so the right person replies. WhatsApp opens with your message ready to send.</p>
        <form className="indocasa-wa-form" noValidate onSubmit={submit} key={formKey}>
          <p className="bespoke-form__error" hidden={!error}>
            {error}
          </p>
          <div className="bespoke-field">
            <label htmlFor="wa-name">Name</label>
            <input id="wa-name" name="name" type="text" autoComplete="name" required />
          </div>
          <LeadSelects idPrefix="wa" />
          <div className="bespoke-field">
            <label htmlFor="wa-email">Email (optional)</label>
            <input id="wa-email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="bespoke-field bespoke-field--area">
            <label htmlFor="wa-message">Message (optional)</label>
            <textarea id="wa-message" name="message" rows={3}></textarea>
          </div>
          <Honeypot id="wa-website" />
          <button className="indocasa-wa-form__submit" type="submit">
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </>
  )
}
