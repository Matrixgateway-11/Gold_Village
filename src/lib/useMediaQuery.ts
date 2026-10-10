import { useEffect, useState } from 'react'

// Reactive window.matchMedia. Re-renders when the query flips (rotate a tablet, resize a window).
export function useMediaQuery(query: string): boolean {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Same breakpoint as `--header-h` and the header CSS: below this the drawer replaces the inline nav.
export const DESKTOP_NAV = '(min-width: 1024px)'
