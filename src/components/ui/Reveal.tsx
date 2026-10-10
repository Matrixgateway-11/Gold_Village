import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const TAGS = { div: motion.div, section: motion.section, article: motion.article, li: motion.li, p: motion.p, header: motion.header } as const

type Props = {
  children: ReactNode
  as?: keyof typeof TAGS
  className?: string
  /** Seconds to wait before animating — use small steps to stagger siblings. */
  delay?: number
  /** Distance in px the element travels up while fading in. */
  y?: number
}

// Fade-and-rise when scrolled into view. Plays once; skipped for people who prefer reduced motion.
export default function Reveal({ children, as = 'div', className, delay = 0, y = 28 }: Props) {
  const reduce = useReducedMotion()
  const Tag = TAGS[as]
  if (reduce) return <Tag className={className}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
