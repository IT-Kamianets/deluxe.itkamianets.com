import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './RoomsSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const rooms = [
  {
    slug: 'deluxe-double',
    name: 'Делюкс двомісний',
    area: '20 м²',
    guests: 2,
    price: '1 800',
    features: ['Кондиціонер', 'Wi-Fi', 'Сейф', 'Міні-бар'],
  },
  {
    slug: 'deluxe-improved',
    name: 'Делюкс покращений',
    area: '25 м²',
    guests: 2,
    price: '1 990',
    features: ['Балкон', 'Кондиціонер', 'Wi-Fi', 'Сейф'],
  },
  {
    slug: 'deluxe-triple',
    name: 'Делюкс тримісний',
    area: '30 м²',
    guests: 3,
    price: '2 150',
    features: ['Балкон', 'Вид на місто', 'Диван-ліжко'],
  },
  {
    slug: 'family-suite',
    name: 'Сімейний люкс',
    area: '40 м²',
    guests: 4,
    price: '3 500',
    features: ['2 спальні', 'Балкон', 'Кондиціонер'],
  },
  {
    slug: 'suite-2bed',
    name: 'Люкс з двома спальнями',
    area: '45 м²',
    guests: 4,
    price: '4 150',
    features: ['2 спальні', 'Балкон', 'Міні-бар', 'Сейф'],
  },
]

export default function RoomsSection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
            {rooms.map((room) => (
              <article
                key={room.slug}
                className={`${styles.card} ${styles[room.slug.replace(/-/g, '_')]}`}
                data-anim="room-card"
              >
                {/* Photo placeholder */}
                <div className={styles.photo}>
                  <div className={styles.photoInner} />
                  <div className={styles.photoOverlay} />
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
