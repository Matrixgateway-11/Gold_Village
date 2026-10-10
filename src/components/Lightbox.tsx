import { useEffect, useRef, useState } from 'react'
import { PiX } from 'react-icons/pi'

// Full-screen image viewer. Any element with data-lightbox="<src>" opens it on
// click (product gallery). Click or pinch the image to zoom; Esc or a click on the
// backdrop closes it.
export default function Lightbox() {
  const [src, setSrc] = useState('')
  const [zoomW, setZoomW] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const pinch = useRef({ d0: 0, w0: 0 })

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.('[data-lightbox]')
      const s = el?.getAttribute('data-lightbox')
      if (!s) return
      e.preventDefault()
      setZoomW(0)
      setSrc(s)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!src) return
    document.body.classList.add('is-locked')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        setSrc('')
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.classList.remove('is-locked')
    }
  }, [src])

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation()
    const im = img.current
    const st = stage.current
    if (!im || !st || !im.naturalWidth) return
    if (zoomW) return setZoomW(0)
    const fit = im.naturalWidth * Math.min(st.clientWidth / im.naturalWidth, st.clientHeight / im.naturalHeight, 1)
    setZoomW(Math.round(Math.min(im.naturalWidth, Math.max(fit * 2, fit * 1.25))))
  }

  const dist = (t: React.TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      hidden={!src}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.lightbox__close')) setSrc('')
      }}
    >
      <button type="button" className="lightbox__close" aria-label="Close enlarged image">
        <PiX aria-hidden="true" />
      </button>
      <div
        className="lightbox__stage"
        ref={stage}
        onTouchStart={(e) => {
          if (e.touches.length === 2) pinch.current = { d0: dist(e.touches), w0: img.current?.getBoundingClientRect().width || 0 }
        }}
        onTouchMove={(e) => {
          const { d0, w0 } = pinch.current
          if (e.touches.length !== 2 || d0 <= 0 || w0 <= 0) return
          const nat = img.current?.naturalWidth || w0
          setZoomW(Math.round(Math.min(nat, Math.max((w0 * dist(e.touches)) / d0, 48))))
        }}
        onTouchEnd={() => (pinch.current = { d0: 0, w0: 0 })}
      >
        {src && (
          <img
            ref={img}
            className={'lightbox__img' + (zoomW ? ' is-zoomed' : '')}
            src={src}
            alt=""
            onClick={toggleZoom}
            style={zoomW ? { width: zoomW, height: 'auto', maxWidth: 'none', maxHeight: 'none' } : undefined}
          />
        )}
      </div>
    </div>
  )
}
