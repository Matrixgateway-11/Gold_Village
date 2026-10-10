import { useId, useMemo, type ReactNode } from 'react'

// Golden Village's brand motif: the growth rings of a teak trunk. Drawn as slightly
// irregular concentric loops so it reads as wood, not as a bullseye.
function ringPath(r: number, seed: number) {
  const pts: string[] = []
  const N = 120
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const wobble = 1 + 0.05 * Math.sin(a * 2 + seed) + 0.032 * Math.sin(a * 3 + seed * 1.7) + 0.018 * Math.sin(a * 5 + seed * 2.3)
    const x = 200 + Math.cos(a) * r * wobble
    const y = 200 + Math.sin(a) * r * wobble * 0.93
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join('') + 'Z'
}

export function RingMotif({ className }: { className?: string }) {
  const paths = useMemo(() => Array.from({ length: 17 }, (_, k) => ringPath(190 * Math.pow((k + 1) / 17, 0.88), 0.4 + k * 0.13)), [])
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

// Circular text badge that turns slowly (stopped for people who prefer reduced motion).
export function RotatingStamp({ text, children, className }: { text: string; children?: ReactNode; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={'stamp ' + (className || '')} aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <g className="stamp__ring">
          <text>
            <textPath href={`#${id}`} textLength="462" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      <span className="stamp__icon">{children}</span>
    </div>
  )
}
