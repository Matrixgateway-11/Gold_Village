import { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { PiWhatsappLogo, PiX } from 'react-icons/pi'
import { site } from '../site'
import { Honeypot, LeadSelects } from './LeadFields'
import Button from './ui/Button'

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
    <aside aria-label="WhatsApp chat">
      <a
        ref={fab}
        className="wa-fab"
        href={hello}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        aria-controls="wa-panel"
        aria-expanded={open}
        data-wa-toggle
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
      <div ref={panel} className="wa-panel" id="wa-panel" role="dialog" aria-modal="false" aria-labelledby="wa-title" hidden={!open}>
        <div className="wa-panel__head">
          <PiWhatsappLogo aria-hidden="true" />
          <p className="wa-panel__title" id="wa-title">
            Chat with {site.name}
          </p>
          <button type="button" className="wa-panel__close" aria-label="Close chat panel" onClick={() => setOpen(false)}>
            <PiX aria-hidden="true" />
          </button>
        </div>
        <div className="wa-panel__body">
          <p className="wa-panel__lede">A few details so the right person replies. WhatsApp opens with your message ready to send.</p>
          <form className="form" noValidate onSubmit={submit} key={formKey}>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="field">
              <label htmlFor="wa-name">Name</label>
              <input id="wa-name" name="name" type="text" autoComplete="name" required />
            </div>
            <LeadSelects idPrefix="wa" />
            <div className="field">
              <label htmlFor="wa-message">Message (optional)</label>
              <textarea id="wa-message" name="message" rows={3}></textarea>
            </div>
            <Honeypot id="wa-website" />
            <Button type="submit" variant="whatsapp" block icon={<PiWhatsappLogo aria-hidden="true" />}>
              Continue to WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </aside>
  )
}
