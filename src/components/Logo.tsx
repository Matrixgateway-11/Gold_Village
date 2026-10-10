// Golden Village wordmarks, drawn as inline SVG so they pick up the site fonts
// and the theme's logo filters (white on the hero, gold in the footer).

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 80" width="195" height="30" role="img" aria-label="Golden Village">
      <text
        x="0"
        y="60"
        fill="#000"
        fontFamily="Manrope, 'Century Gothic', sans-serif"
        fontSize="72"
        fontWeight="400"
        letterSpacing="1"
      >
        golden village
      </text>
    </svg>
  )
}

export function FooterLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 196" width="266" height="100" role="img" aria-label="Golden Village Furniture">
      <g fill="#000">
        <circle cx="260" cy="34" r="26" fill="none" stroke="#000" strokeWidth="4" />
        <text x="260" y="45" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="30" fontWeight="500">
          GV
        </text>
        <text x="260" y="128" textAnchor="middle" fontFamily="Manrope, 'Century Gothic', sans-serif" fontSize="64" fontWeight="400" letterSpacing="1">
          golden village
        </text>
        <text x="260" y="176" textAnchor="middle" fontFamily="Manrope, 'Century Gothic', sans-serif" fontSize="22" fontWeight="400" letterSpacing="14">
          FURNITURE
        </text>
      </g>
    </svg>
  )
}
