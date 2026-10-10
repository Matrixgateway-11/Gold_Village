import { useState, type FormEvent, type ReactNode } from 'react'
import { PiCheckCircle, PiWarningCircle } from 'react-icons/pi'
import { submitLead } from '../lib/leads'
import { site } from '../site'
import { Honeypot, LeadSelects } from './LeadFields'
import Button from './ui/Button'

// Inquiry card used on the Contact and Trade pages.
export default function BespokeForm({
  title,
  lede,
  subject,
  submitLabel,
  thanksTitle,
  thanksText,
  children,
}: {
  title: string
  lede: string
  subject: string
  submitLabel: string
  thanksTitle: string
  thanksText: string
  children: ReactNode
}) {
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const name = String(new FormData(e.currentTarget).get('name') || '')
      await submitLead(e.currentTarget, `${subject} — ${name}`)
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again, or message us on WhatsApp.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="form-card">
      <form className="form" onSubmit={submit} hidden={done}>
        <div className="form-card__head">
          <h2>{title}</h2>
          <p>{lede}</p>
        </div>
        {error && (
          <p className="form-error" role="alert">
            <PiWarningCircle aria-hidden="true" />
            {error}
          </p>
        )}
        {children}
        <Button type="submit" size="lg" block arrow disabled={busy}>
          {busy ? 'Sending…' : submitLabel}
        </Button>
      </form>
      <div className="form-success" hidden={!done} role="status">
        <PiCheckCircle aria-hidden="true" />
        <h3>{thanksTitle}</h3>
        {/* Without a form endpoint the inquiry is handed to the visitor's email app, so say so. */}
        <p>{site.formEndpoint ? thanksText : 'Your email app has opened with your inquiry ready — press send to complete it. ' + thanksText}</p>
      </div>
    </div>
  )
}

export function Field({
  id,
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  id: string
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} />
    </div>
  )
}

export function Area({ id, label, name, rows = 5, required }: { id: string; label: string; name: string; rows?: number; required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={rows} required={required}></textarea>
    </div>
  )
}

export { Honeypot, LeadSelects }
