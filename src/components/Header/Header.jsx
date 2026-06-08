import { useState, useEffect } from 'react'
import styles from './Header.module.css'
import BookingModal from '../BookingModal/BookingModal'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Закривати меню при кліку на посилання
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          <span className={styles.logoLabel}>Бутік-готель</span>
          <span className={styles.logoName}>DeLuxe.</span>
        </a>

        <nav className={styles.nav} aria-label="Основна навігація">
          <a href="#rooms">Номери</a>
          <a href="#restaurant">Ресторан</a>
          <a href="#gallery">Галерея</a>
          <a href="#location">Розташування</a>
        </nav>

        <div className={styles.ctaGroup}>
          <a
            href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Забронювати онлайн
          </a>
          <button
            className={styles.ctaBtn}
            onClick={() => setModalOpen(true)}
          >
            Забронювати
          </button>
        </div>
      </div>
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  )
}
