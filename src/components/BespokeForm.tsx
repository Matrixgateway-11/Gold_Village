import { useState, type FormEvent, type ReactNode } from 'react'
import { submitLead } from '../lib/leads'
import { Honeypot, LeadSelects } from './LeadFields'

// Right-hand inquiry card used on the Contact/Bespoke and Trade pages.
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
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bespoke-page__right">
      <form className="bespoke-form" onSubmit={submit} hidden={done}>
        <h2 className="bespoke-form__title">{title}</h2>
        <p className="bespoke-form__lede">{lede}</p>
        <p className="bespoke-form__error" hidden={!error}>
          {error}
        </p>
        {children}
        <button className="bespoke-form__submit" type="submit" disabled={busy}>
          {submitLabel}
        </button>
      </form>
      <div className="bespoke-thanks" hidden={!done}>
        <div className="bespoke-thanks__icon" aria-hidden="true">
          ✓
        </div>
        <p className="bespoke-thanks__title">{thanksTitle}</p>
        <p className="bespoke-thanks__text">{thanksText}</p>
      </div>
    </div>
  )
}

export function Field({ id, label, name, type = 'text', required, autoComplete }: { id: string; label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="bespoke-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} />
    </div>
  )
}

export function Area({ id, label, name, rows = 5, required }: { id: string; label: string; name: string; rows?: number; required?: boolean }) {
  return (
    <div className="bespoke-field bespoke-field--area">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={rows} required={required}></textarea>
    </div>
  )
}

export { Honeypot, LeadSelects }
