import { useCallback, useState, type ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi'
import 'swiper/css'

type Props = {
  items: ReactNode[]
  /** Accessible name for the region, e.g. "Featured pieces". */
  label: string
  className?: string
}

// Touch-friendly row of cards with a progress bar and arrow buttons.
// 1.2 cards on phones (so the next one peeks in), up to 4 on large screens.
export default function Carousel({ items, label, className }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [state, setState] = useState({ progress: 0, begin: true, end: false, visible: 1 })

  const sync = useCallback((s: SwiperType) => {
    setState({
      progress: Math.min(1, Math.max(0, s.progress || 0)),
      begin: s.isBeginning,
      end: s.isEnd,
      visible: s.slidesPerViewDynamic(),
    })
  }, [])

  const thumb = Math.min(100, Math.max(12, (state.visible / Math.max(items.length, 1)) * 100))

  return (
    <div className={'carousel ' + (className || '')} role="region" aria-roledescription="carousel" aria-label={label}>
      <Swiper
        modules={[A11y, Keyboard]}
        a11y={{ slideLabelMessage: 'Item {{index}} of {{slidesLength}}' }}
        keyboard={{ enabled: true }}
        grabCursor
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          560: { slidesPerView: 2.1, spaceBetween: 18 },
          900: { slidesPerView: 3.05, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 28 },
        }}
        watchOverflow
        onSwiper={(s) => {
          setSwiper(s)
          sync(s)
        }}
        onSlideChange={sync}
        onProgress={sync}
        onResize={sync}
        onBreakpoint={sync}
      >
        {items.map((it, i) => (
          <SwiperSlide key={i}>{it}</SwiperSlide>
        ))}
      </Swiper>

      <div className="carousel__foot" hidden={state.begin && state.end}>
        <div className="carousel__progress" aria-hidden="true">
          <span style={{ width: `${thumb}%`, marginLeft: `${state.progress * (100 - thumb)}%` }} />
        </div>
        <div className="carousel__controls">
          <button type="button" className="carousel__btn" aria-label="Previous" disabled={state.begin} onClick={() => swiper?.slidePrev()}>
            <PiArrowLeft aria-hidden="true" />
          </button>
          <button type="button" className="carousel__btn" aria-label="Next" disabled={state.end} onClick={() => swiper?.slideNext()}>
            <PiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
