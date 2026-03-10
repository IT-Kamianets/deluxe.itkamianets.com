import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './RoomsSection.module.css'
import Lightbox from '../Lightbox/Lightbox'

gsap.registerPlugin(ScrollTrigger)

const rooms = [
  {
    slug: 'deluxe-double',
    name: 'Делюкс двомісний',
    area: '20 м²',
    guests: 2,
    beds: '1 двоспальне ліжко',
    price: '1 800',
    features: ['Кондиціонер', 'Wi-Fi', 'Сейф', 'Міні-бар', 'Душова кабіна', 'Фен'],
    photos: [
      { src: '/images/rooms/room.webp', alt: 'Делюкс двомісний — вигляд номера' },
    ],
  },
  {
    slug: 'deluxe-improved',
    name: 'Делюкс покращений',
    area: '25 м²',
    guests: 2,
    beds: '1 двоспальне ліжко',
    price: '1 990',
    features: ['Балкон', 'Кондиціонер', 'Wi-Fi', 'Сейф', 'Халат та капці'],
    photos: [
      // { src: '/images/rooms/deluxe-improved.webp', alt: 'Делюкс покращений' },
    ],
  },
  {
    slug: 'deluxe-triple',
    name: 'Делюкс тримісний',
    area: '30 м²',
    guests: 3,
    beds: '1 двоспальне + 1 односпальне',
    price: '2 150',
    features: ['Балкон', 'Вид на місто', 'Диван-ліжко', 'Кондиціонер', 'Wi-Fi'],
    photos: [
      // { src: '/images/rooms/deluxe-triple.webp', alt: 'Делюкс тримісний' },
    ],
  },
  {
    slug: 'family-suite',
    name: 'Сімейний люкс',
    area: '40 м²',
    guests: 4,
    beds: '2 двоспальних ліжка',
    price: '3 500',
    features: ['2 спальні', 'Балкон', 'Кондиціонер', 'Холодильник', 'Вітальня'],
    photos: [
      // { src: '/images/rooms/family-suite.webp', alt: 'Сімейний люкс' },
    ],
  },
  {
    slug: 'suite-2bed',
    name: 'Люкс з двома спальнями',
    area: '45 м²',
    guests: 4,
    beds: '2 двоспальних ліжка',
    price: '4 150',
    features: ['2 спальні', 'Балкон', 'Міні-бар', 'Сейф', 'Вітальня', 'Халат'],
    photos: [
      // { src: '/images/rooms/suite-2bed.webp', alt: 'Люкс з двома спальнями' },
    ],
  },
]

export default function RoomsSection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState({ roomIndex: null, photoIndex: null })

  const openLightbox = (roomIndex, photoIndex = 0) => {
    setLightbox({ roomIndex, photoIndex })
  }
  const closeLightbox = () => setLightbox({ roomIndex: null, photoIndex: null })
  const changePhoto = (photoIndex) => setLightbox((prev) => ({ ...prev, photoIndex }))

  const activeLightboxPhotos =
    lightbox.roomIndex !== null ? rooms[lightbox.roomIndex].photos : []

  useEffect(() => {
    const ctx = gsap.context(() => {
      // eyebrow — fade up
      gsap.fromTo(
        '[data-anim="room-eyebrow"]',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
      )

      // heading — clip reveal from bottom
      gsap.fromTo(
        '[data-anim="room-heading"]',
        { clipPath: 'inset(100% 0% 0% 0%)', y: 12 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
          delay: 0.12,
        }
      )

      gsap.fromTo(
        '[data-anim="room-card"]',
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleScroll = (e) => {
    const element = e.target
    const index = Math.round(element.scrollLeft / (element.clientWidth - 20))
    if (index !== activeIndex && index >= 0 && index < rooms.length) {
      setActiveIndex(index)
    }
  }

  return (
    <>
      <section className={styles.section} ref={sectionRef} id="rooms">
        <div className={styles.inner}>

          {/* ── Header ── */}
          <div className={styles.header}>
            <span className={styles.eyebrow} data-anim="room-eyebrow">Номери</span>
            <h2 className={styles.heading} data-anim="room-heading">Оберіть свій номер</h2>
          </div>

          {/* ── Cards grid / Slider ── */}
          <div className={styles.sliderContainer}>
            <div className={styles.grid} ref={gridRef} onScroll={handleScroll}>
              {rooms.map((room, roomIndex) => (
                <article
                  key={room.slug}
                  className={`${styles.card} ${styles[room.slug.replace(/-/g, '_')]}`}
                  data-anim="room-card"
                >
                  {/* Photo */}
                  <div
                    className={`${styles.photo} ${room.photos.length > 0 ? styles.photoClickable : ''}`}
                    onClick={() => room.photos.length > 0 && openLightbox(roomIndex, 0)}
                    role={room.photos.length > 0 ? 'button' : undefined}
                    tabIndex={room.photos.length > 0 ? 0 : undefined}
                    aria-label={room.photos.length > 0 ? `Переглянути фото: ${room.name}` : undefined}
                    onKeyDown={(e) => {
                      if (room.photos.length > 0 && (e.key === 'Enter' || e.key === ' ')) {
                        openLightbox(roomIndex, 0)
                      }
                    }}
                  >
                    {room.photos.length > 0
                      ? <img src={room.photos[0].src} alt={room.photos[0].alt} className={styles.photoImg} loading="lazy" />
                      : <div className={styles.photoInner} />
                    }
                    <div className={styles.photoOverlay} />
                    {room.photos.length > 1 && (
                      <div className={styles.photoCount}>
                        <PhotoIcon />
                        {room.photos.length}
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className={styles.body}>
                    <div className={styles.meta}>
                      <span className={styles.area}>{room.area}</span>
                      <span className={styles.guests}>
                        <GuestIcon />
                        {room.guests}
                      </span>
                    </div>

                    <h3 className={styles.name}>{room.name}</h3>

                    {room.beds && (
                      <p className={styles.beds}>{room.beds}</p>
                    )}

                    <ul className={styles.features}>
                      {room.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>

                    <div className={styles.footer}>
                      <div className={styles.price}>
                        <span className={styles.priceFrom}>від</span>
                        <span className={styles.priceNum}>{room.price}</span>
                        <span className={styles.priceCur}>₴ / ніч</span>
                      </div>
                      <a
                        href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cta}
                      >
                        Забронювати
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Slider Dots (Mobile only) */}
            <div className={styles.dots}>
              {rooms.map((_, idx) => (
                <span key={idx} className={idx === activeIndex ? styles.dotActive : styles.dot} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photos={activeLightboxPhotos}
        index={lightbox.photoIndex}
        onClose={closeLightbox}
        onChange={changePhoto}
      />
    </>
  )
}

function GuestIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function PhotoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
