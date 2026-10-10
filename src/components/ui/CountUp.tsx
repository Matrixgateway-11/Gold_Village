import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Number that counts up the first time it scrolls into view.
export default function CountUp({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
