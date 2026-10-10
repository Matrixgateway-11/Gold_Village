import { site } from '../site'

// Sends an inquiry. With VITE_FORM_ENDPOINT set it POSTs the fields there
// (Formspree, Getform, your own API…); otherwise it opens the visitor's email
// app with the inquiry pre-filled, addressed to the company email.
export async function submitLead(form: HTMLFormElement, subject: string): Promise<void> {
  const data = new FormData(form)
  if (String(data.get('bespoke_hp') || '')) return // honeypot filled: silently drop spam
  data.delete('bespoke_hp')
  data.set('page', window.location.href)

  // Show the readable option labels (e.g. "Hotel / Restaurant") rather than values.
  form.querySelectorAll('select').forEach((sel) => {
    if (sel.name && sel.selectedIndex > 0) data.set(sel.name, sel.options[sel.selectedIndex].text)
  })

  if (site.formEndpoint) {
    data.set('_subject', subject)
    const res = await fetch(site.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error('Request failed')
    return
  }

  const lines: string[] = []
  data.forEach((v, k) => {
    if (typeof v === 'string' && v.trim()) lines.push(`${k.replace(/_/g, ' ')}: ${v}`)
  })
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

// Pre-select the visitor's country from the browser locale (e.g. en-GB → GB).
export function guessCountry(): string {
  try {
    const loc = (navigator.languages && navigator.languages[0]) || navigator.language || ''
    return ((new Intl.Locale(loc) as Intl.Locale & { maximize(): Intl.Locale }).maximize().region || '').toUpperCase()
  } catch {
    return ''
  }
}
