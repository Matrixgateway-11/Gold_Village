import type { ReactNode } from 'react'
import * as RA from '@radix-ui/react-accordion'
import { PiPlus } from 'react-icons/pi'

export type AccordionItem = { q: string; a: ReactNode }

// Accessible FAQ list (Radix handles keyboard, aria-expanded and focus).
export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  return (
    <RA.Root className="accordion" type="single" collapsible defaultValue={defaultOpen === null ? undefined : `item-${defaultOpen}`}>
      {items.map((it, i) => (
        <RA.Item className="accordion__item" value={`item-${i}`} key={it.q}>
          <RA.Header className="accordion__header">
            <RA.Trigger className="accordion__trigger">
              {it.q}
              <span className="accordion__icon">
                <PiPlus aria-hidden="true" />
              </span>
            </RA.Trigger>
          </RA.Header>
          <RA.Content className="accordion__content">
            <div>{it.a}</div>
          </RA.Content>
        </RA.Item>
      ))}
    </RA.Root>
  )
}
