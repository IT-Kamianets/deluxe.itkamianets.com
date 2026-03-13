import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Card reveal — fade + scale up from slightly smaller
      tl.fromTo(
        '[data-hero="inner"]',
        { opacity: 0, scale: 0.97, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1 }
      )

      // 2. Title — slides up with blur clear
      tl.fromTo(
        '[data-hero="title"]',
        { opacity: 0, y: 22, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 },
        '-=0.65'
      )

      // 3. Panel items — stagger from bottom
      tl.fromTo(
        '[data-hero="panel-item"]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 },
        '-=0.55'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      <div className={styles.inner} data-hero="inner">

        {/* Left: photo panel */}
        <div className={styles.photo}>
          <img 
            src="/images/hero/hero-main.webp" 
            alt="Бутік-готель Deluxe — вишуканий інтер'єр" 
            className={styles.photoImg} 
            fetchpriority="high"
          />
        </div>

        {/* Right: dark info panel */}
        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <p className={styles.tagline} data-hero="panel-item">
              Затишний куточок<br />у серці Кам'янця-Подільського
            </p>
            <div className={styles.ratings} data-hero="panel-item">
              <div className={styles.ratingItem}>
                <span className={styles.ratingScore}>8.9</span>
                <span className={styles.ratingMeta}>Booking.com · 125 відгуків</span>
              </div>
              <div className={styles.ratingDivider} aria-hidden="true" />
              <div className={styles.ratingItem}>
                <span className={styles.ratingScore}>
                  4<span className={styles.ratingDecimal}>.4</span>
                </span>
                <span className={styles.ratingMeta}>Google · ★★★★</span>
              </div>
            </div>
            <div className={styles.ctaGroup} data-hero="panel-item">
              <a
                href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                Забронювати
              </a>
              <span className={styles.ctaHint}>через Booking.com</span>
            </div>

            <div className={styles.socials} data-hero="panel-item">
              <a
                href="https://www.instagram.com/deluxekp/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                </svg>
                @deluxekp
              </a>
              <a
                href="https://www.facebook.com/deluxe.km.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Title group — straddles the photo/panel boundary */}
        <div className={styles.titleGroup} data-hero="title">
          <p className={styles.subtitle} aria-hidden="true">Бутік-готель</p>
          <h1 className={styles.title}>DeLuxe.</h1>
        </div>

      </div>
    </section>
  )
}
