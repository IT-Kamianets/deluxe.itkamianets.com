import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '8',   label: 'номерів' },
  { num: '80',  label: 'осіб у залі' },
  { num: '4.4', label: 'Google' },
  { num: '8.9', label: 'Booking.com' },
]

const photos = [
  { src: '/images/rooms/deluxe-improved/1.webp', alt: 'Номер готелю — Делюкс' },
  { src: '/images/restaurant/1.webp',            alt: 'Ресторан Deluxe' },
  { src: '/images/restaurant/4.webp',            alt: 'Банкетна зала — декор' },
  { src: '/images/hotel/4.webp',                 alt: 'Ресепшн та гостинність' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-anim="about-title"]',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '[data-anim="about-body"]',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '[data-anim="about-stats"]',
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.22,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '[data-anim="about-photo"]',
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '[data-anim="about-photos"]', start: 'top 88%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef} id="about">
      <div className={styles.inner}>

        {/* ── Top: title left, description + stats right ── */}
        <div className={styles.top}>
          <h2 className={styles.heading} data-anim="about-title">
            Маленький готель<br />з великою душею
          </h2>

          <div className={styles.right}>
            <p className={styles.body} data-anim="about-body">
              Бутік-готель DeLuxe — затишне місце в самому серці
              Кам'янця-Подільського. Авторські номери з індивідуальним
              інтер'єром, власний ресторан із домашньою кухнею та банкетна
              зала для особливих подій. Тут кожен гість — не просто
              постоялець.
            </p>

            <div className={styles.stats} data-anim="about-stats">
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom: photo strip ── */}
        <div className={styles.photos} data-anim="about-photos">
          {photos.map((p) => (
            <div key={p.src} className={styles.photo} data-anim="about-photo">
              <img src={p.src} alt={p.alt} className={styles.photoImg} loading="lazy" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
