import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, FreeMode, Keyboard, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { PiMagnifyingGlassPlus } from 'react-icons/pi'
import type { ProductImage } from '../lib/data'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

// Swipeable main image with a thumbnail strip. Tapping the main image opens the full-screen lightbox
// (any element with data-lightbox is picked up by <Lightbox />).
export default function ProductGallery({ images, alt }: { images: ProductImage[]; alt: string }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null)
  const many = images.length > 1

  return (
    <div className="gallery">
      <Swiper
        className="gallery__main"
        modules={[A11y, Keyboard, Thumbs]}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        keyboard={{ enabled: true }}
        a11y={{ slideLabelMessage: 'Image {{index}} of {{slidesLength}}' }}
        spaceBetween={12}
        grabCursor={many}
        allowTouchMove={many}
      >
        {images.map((im, i) => (
          <SwiperSlide key={im.lg}>
            <button type="button" className="gallery__zoom" data-lightbox={im.lg} aria-label="Zoom image (view full screen)">
              <img
                src={im.lg}
                width="1200"
                height="1200"
                alt={many ? `${alt} – view ${i + 1} of ${images.length}` : alt}
                decoding="async"
                loading={i === 0 ? undefined : 'lazy'}
                {...(i === 0 ? { fetchpriority: 'high' } : {})}
              />
              <span className="gallery__hint" aria-hidden="true">
                <PiMagnifyingGlassPlus /> Zoom
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {many && (
        <Swiper
          className="gallery__thumbs"
          onSwiper={setThumbs}
          modules={[FreeMode, Thumbs, A11y]}
          slidesPerView={4}
          spaceBetween={10}
          freeMode
          watchSlidesProgress
          a11y={{ enabled: false }}
        >
          {images.map((im, i) => (
            <SwiperSlide key={im.sm}>
              <img src={im.sm} width="150" height="150" alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
