import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './AboutSection.module.css'

const rows = [
  {
    slug: 'rooms',
    photoRight: true,
    num: '8',
    unit: 'номерів',
    label: 'Комфортні номери',
    body: 'Від 20 до 45 м² — кожен з авторським інтер\u2019єром, якісною постіллю та всім необхідним для відпочинку.',
  },
  {
    slug: 'restaurant',
    photoRight: false,
    num: null,
    unit: null,
    label: 'Ресторан',
    body: 'Авторська кухня та смачні сніданки щодня. Затишна атмосфера для ділових зустрічей і романтичних вечерь.',
  },
  {
    slug: 'banquet',
    photoRight: true,
    num: '80',
    unit: 'осіб',
    label: 'Банкетна зала',
    body: 'Весілля, корпоративи, святкові заходи. Повний сервіс, власна кухня, індивідуальний підхід до кожного замовлення.',
  },
  {
    slug: 'parking',
    photoRight: false,
    num: null,
    unit: null,
    label: 'Безкоштовна парковка',
    body: 'Власна охоронювана парковка для гостей готелю. Зручний заїзд і виїзд цілодобово.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow — fade up
      gsap.fromTo(
        '[data-anim="about-eyebrow"]',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-anim="about-eyebrow"]', start: 'top 82%' },
        }
      )

      // Heading — clip reveal from bottom
      gsap.fromTo(
        '[data-anim="about-heading"]',
        { clipPath: 'inset(100% 0% 0% 0%)', y: 10 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-anim="about-eyebrow"]', start: 'top 82%' },
          delay: 0.14,
        }
      )

      // Row cards
      sectionRef.current.querySelectorAll('[data-anim-row]').forEach((row) => {
        const text = row.querySelector('[data-anim="text"]')
        const photo = row.querySelector('[data-anim="photo"]')
        const isPhotoRight = text.closest('[data-photo-right="true"]')

        gsap.fromTo(
          text,
          { opacity: 0, x: isPhotoRight ? -36 : 36, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 76%' },
          }
        )

        gsap.fromTo(
          photo,
          { opacity: 0, x: isPhotoRight ? 36 : -36, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 76%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef} id="about">

      {/* ── Section header card ── */}
      <div className={styles.headerCard}>
        <span className={styles.eyebrow} data-anim="about-eyebrow">Про нас</span>
        <h2 className={styles.heading} data-anim="about-heading">
          Маленький готель<br />з великою душею
        </h2>
      </div>

      {/* ── Individual row cards ── */}
      <div className={styles.cards}>
        {rows.map((row) => (
          <div
            key={row.slug}
            className={`${styles.card} ${row.photoRight ? styles.rowPhotoRight : styles.rowPhotoLeft}`}
            data-anim-row
            data-photo-right={row.photoRight ? 'true' : 'false'}
          >
            {/* Text block */}
            <div className={styles.textBlock} data-anim="text">
              <div className={styles.textInner}>
                {row.num && (
                  <div className={styles.stat}>
                    <span className={styles.statNum}>{row.num}</span>
                    <span className={styles.statUnit}>{row.unit}</span>
                  </div>
                )}
                <h3 className={styles.rowLabel}>{row.label}</h3>
                <p className={styles.rowBody}>{row.body}</p>
              </div>
            </div>

            {/* Photo block */}
            <div
              className={`${styles.photoBlock} ${styles[row.slug]}`}
              data-anim="photo"
              role="img"
              aria-label={row.label}
            >
              <div className={styles.photoInner} />
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
