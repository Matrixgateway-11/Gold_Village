// Golden Village wordmarks, drawn as inline SVG so they use the site fonts and
// take their colour from the surrounding text (`currentColor`): ink on the
// light header, linen over the hero image and in the dark footer.

const SANS = "var(--font-body, 'Manrope Variable', sans-serif)"
const SERIF = "var(--font-display, 'Fraunces Variable', Georgia, serif)"

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 80" width="195" height="30" role="img" aria-label="Golden Village">
      <text x="0" y="60" fill="currentColor" style={{ fontFamily: SANS }} fontSize="72" fontWeight="450" letterSpacing="1">
        golden village
      </text>
    </svg>
  )
}

export function FooterLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 196" width="266" height="100" role="img" aria-label="Golden Village Furniture">
      <g fill="currentColor">
        <circle cx="260" cy="34" r="26" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="260" y="45" textAnchor="middle" style={{ fontFamily: SERIF }} fontSize="30" fontWeight="500">
          GV
        </text>
        <text x="260" y="128" textAnchor="middle" style={{ fontFamily: SANS }} fontSize="64" fontWeight="450" letterSpacing="1">
          golden village
        </text>
        <text x="260" y="176" textAnchor="middle" style={{ fontFamily: SANS }} fontSize="22" fontWeight="500" letterSpacing="14">
          FURNITURE
        </text>
      </g>
    </svg>
  )
}
