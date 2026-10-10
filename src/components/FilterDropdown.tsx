import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type FilterOption = { label: string; url: string; selected: boolean }

// The custom listbox dropdown used by the catalog filters.
export default function FilterDropdown({ id, label, value, options }: { id: string; label: string; value: string; options: FilterOption[] }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="product-tax-filters__field product-tax-filters__field--dropdown">
      <div className="product-tax-filters__label" id={`${id}-label`}>
        {label}
      </div>
      <div className={'product-tax-filters__custom' + (open ? ' is-open' : '')} ref={wrap}>
        <button
          type="button"
          className="product-tax-filters__custom-trigger"
          id={id}
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="product-tax-filters__custom-value">{value}</span>
          <span className="product-tax-filters__custom-chevron" aria-hidden="true"></span>
        </button>
        <div className="product-tax-filters__custom-panel" id={`${id}-panel`} role="listbox" aria-labelledby={`${id}-label`} aria-hidden={!open}>
          <div className="product-tax-filters__custom-options product-tax-filters__custom-options--flat" role="presentation">
            {options.map((o) => (
              <button
                key={o.url + o.label}
                type="button"
                className={'product-tax-filters__custom-option' + (o.selected ? ' is-selected' : '')}
                role="option"
                aria-selected={o.selected}
                onClick={() => {
                  setOpen(false)
                  navigate(o.url, { state: { keepScroll: true } })
                }}
              >
                <span className="product-tax-filters__custom-check" aria-hidden="true">
                  {o.selected ? '✓' : ''}
                </span>
                <span className="product-tax-filters__custom-option-label">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
