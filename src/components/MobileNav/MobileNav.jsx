import styles from './MobileNav.module.css'

export default function MobileNav() {
    return (
        <nav className={styles.mobileNav} aria-label="Мобільне меню">
            <a href="#hero" className={styles.navItem}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z"/>
                    <path d="M9 21V12h6v9"/>
                </svg>
                <span>Головна</span>
            </a>
            <a href="#rooms" className={styles.navItem}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h20"/>
                    <path d="M2 12V19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7"/>
                    <path d="M4 12V8a2 2 0 0 1 2-2h5v6"/>
                    <path d="M13 6h5a2 2 0 0 1 2 2v4"/>
                </svg>
                <span>Номери</span>
            </a>
            <a href="#restaurant" className={styles.navItem}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V2"/>
                    <path d="M6 2v20"/>
                    <path d="M21 15V2a5 5 0 0 0-5 5v6h3.5"/>
                    <path d="M19.5 13V22"/>
                </svg>
                <span>Ресторан</span>
            </a>
            <a
                href="tel:+380931709524"
                className={styles.navItem}
                aria-label="Зателефонувати"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1L6.6 10.8z"/>
                </svg>
                <span>Зателефонувати</span>
            </a>
            <a
                href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navItem} ${styles.cta}`}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span>Бронювати</span>
            </a>
        </nav>
    )
}
