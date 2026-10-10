import { useMemo } from 'react'
import { allCountries, popularCountries } from '../data/countries'
import { guessCountry } from '../lib/leads'

export const PROJECT_TYPES: [string, string][] = [
  ['hotel', 'Hotel / Restaurant'],
  ['resort', 'Resort'],
  ['retail', 'Retail store'],
  ['online', 'Online / e-commerce business'],
  ['wholesale', 'Wholesale / OEM'],
  ['home', 'Entire home project'],
  ['single', 'Single piece request'],
]

// The "Project type" + "Your country" pair shared by every inquiry form.
export function LeadSelects({ idPrefix, type = '' }: { idPrefix: string; type?: string }) {
  const country = useMemo(() => {
    const g = guessCountry()
    return allCountries.some(([c]) => c === g) ? g : ''
  }, [])
  return (
    <>
      <div className="bespoke-field">
        <label htmlFor={`${idPrefix}-type`}>Project type</label>
        <select id={`${idPrefix}-type`} name="project_type" required defaultValue={type}>
          <option value="">Select…</option>
          {PROJECT_TYPES.map(([v, l]) => (
            <option value={v} key={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="bespoke-field">
        <label htmlFor={`${idPrefix}-country`}>Your country</label>
        <select id={`${idPrefix}-country`} name="country" required defaultValue={country}>
          <option value="">Select…</option>
          <optgroup label="Popular">
            {popularCountries.map(([v, l]) => (
              <option value={v} key={'p' + v}>
                {l}
              </option>
            ))}
          </optgroup>
          <optgroup label="All countries">
            {allCountries.map(([v, l]) => (
              <option value={v} key={v}>
                {l}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </>
  )
}

export function Honeypot({ id }: { id: string }) {
  return (
    <div className="bespoke-field bespoke-field--hp" aria-hidden="true">
      <label htmlFor={id}>Website</label>
      <input id={id} name="bespoke_hp" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
