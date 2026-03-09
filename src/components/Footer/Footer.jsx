import styles from './Footer.module.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer} id="contacts">
            <div className={styles.inner}>
                <div className={styles.card}>

                    <div className={styles.grid}>
                        {/* Column 1: Brand */}
                        <div className={styles.colBrand}>
                            <span className={styles.logo}>DeLuxe.</span>
                            <p className={styles.tagline}>
                                Ваш затишний куточок у серці історичного Кам'янця-Подільського.
                                Ми створюємо простір для вашого ідеального відпочинку.
                            </p>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className={styles.colLinks}>
                            <h3 className={styles.colTitle}>Навігація</h3>
                            <ul className={styles.linkList}>
                                <li><a href="#hero">Головна</a></li>
                                <li><a href="#about">Про нас</a></li>
                                <li><a href="#rooms">Номери</a></li>
                                <li><a href="#restaurant">Ресторан</a></li>
                                <li><a href="#location">Локація</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div className={styles.colContact}>
                            <h3 className={styles.colTitle}>Контакти</h3>
                            <div className={styles.contactItems}>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>Адреса</span>
                                    <p className={styles.contactValue}>Нігинське шосе, 24А,<br />Кам'янець-Подільський</p>
                                </div>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>Телефон</span>
                                    <a href="tel:+380931709524" className={styles.contactValue}>+380 93 170 95 24</a>
                                    <a href="tel:+380673064071" className={styles.contactValue}>+380 67 306 40 71</a>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Socials & Booking */}
                        <div className={styles.colSocial}>
                            <h3 className={styles.colTitle}>Слідуйте за нами</h3>
                            <div className={styles.socialWrapper}>
                                <div className={styles.socialIcons}>
                                    <a
                                        href="https://www.instagram.com/deluxekp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIconLink}
                                        aria-label="Instagram"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/deluxe.km.ua/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIconLink}
                                        aria-label="Facebook"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <a href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html" target="_blank" rel="noopener noreferrer" className={styles.bookingLink}>Забронювати на Booking</a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottomBar}>
                        <p className={styles.copyright}>
                            © {currentYear} Boutique Hotel Deluxe. Всі права захищені.
                        </p>
                        <div className={styles.bottomLinks}>
                            <span className={styles.developer}>Designed by Horetskyi Maksym</span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
