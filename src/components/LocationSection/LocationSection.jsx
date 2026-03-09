import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './LocationSection.module.css'

export default function LocationSection() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-anim="location-card"]',
                { opacity: 0, y: 44, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 76%',
                    },
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className={styles.section} ref={sectionRef} id="location">
            <div className={styles.inner}>
                <div className={styles.card} data-anim="location-card">
                    <div className={styles.info}>
                        <span className={styles.eyebrow}>Розташування</span>
                        <h2 className={styles.heading}>Центр історичного<br />Кам’янця</h2>

                        <div className={styles.details}>
                            <div className={styles.detailItem}>
                                <span className={styles.label}>Адреса</span>
                                <p className={styles.value}>Нігинське шосе, 24А, Кам'янець-Подільський</p>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>Поруч</span>
                                <p className={styles.value}>
                                    Старий замок — 10 хв на авто<br />
                                    Ратуша та центр — 25 хв пішки
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/RV52xmYgBszB2tTE9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.mapButton}
                        >
                            Відкрити на картах →
                        </a>
                    </div>

                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.33818314316!2d26.56969657645521!3d48.69901677131095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733c7e883c4638b%3A0x5b200f02848618d0!2z0J7RgtC10LvRjCAtINGA0LXRgdGC0L7RgNCw0L0gIiBERUxVWEUi!5e0!3m2!1sru!2sua!4v1773052931055!5m2!1sru!2sua"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Розташування готелю Deluxe"
                            className={styles.map}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}
