import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PiCaretDown, PiCheck } from 'react-icons/pi'

export type FilterOption = { label: string; url: string; selected: boolean }

// Custom listbox dropdown used by the catalogue filters. Selecting an option navigates to its URL,
// so every filter state is a shareable link.
export default function FilterDropdown({ id, label, value, options }: { id: string; label: string; value: string; options: FilterOption[] }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrap.current?.querySelector<HTMLButtonElement>('.dropdown__trigger')?.focus()
      }
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Arrow keys move between options while the list is open.
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = [...(wrap.current?.querySelectorAll<HTMLButtonElement>('.dropdown__option') ?? [])]
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    const next = e.key === 'ArrowDown' ? items[Math.min(i + 1, items.length - 1)] : items[Math.max(i - 1, 0)]
    next?.focus()
  }

  return (
    <div className="dropdown">
      <div className="dropdown__label" id={`${id}-label`}>
        {label}
      </div>
      <div className={'dropdown__box' + (open ? ' is-open' : '')} ref={wrap}>
        <button
          type="button"
          className="dropdown__trigger"
          id={id}
          aria-labelledby={`${id}-label ${id}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault()
              setOpen(true)
            }
          }}
        >
          <span className="dropdown__value">{value}</span>
          <PiCaretDown className="dropdown__chevron" aria-hidden="true" />
        </button>
        <div className="dropdown__panel" id={`${id}-panel`} role="listbox" aria-labelledby={`${id}-label`} hidden={!open} onKeyDown={onListKey}>
          {options.map((o) => (
            <button
              key={o.url + o.label}
              type="button"
              className={'dropdown__option' + (o.selected ? ' is-selected' : '')}
              role="option"
              aria-selected={o.selected}
              onClick={() => {
                setOpen(false)
                navigate(o.url, { state: { keepScroll: true } })
              }}
            >
              <span className="dropdown__check" aria-hidden="true">
                {o.selected && <PiCheck />}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
