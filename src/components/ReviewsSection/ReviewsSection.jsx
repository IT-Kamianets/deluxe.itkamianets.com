import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './ReviewsSection.module.css'

const reviews = [
    {
        id: 1,
        name: 'Ільяш',
        date: 'Березень 2024',
        text: 'Все було смачно й затишно, дуже чисто, тепло, номери охайні. Персонал привітний, завжди готовий допомогти.',
        rating: '10'
    },
    {
        id: 2,
        name: 'Катерина',
        date: 'Лютий 2024',
        text: 'Гарне, затишне місце. Чисто, тепло, привітна адміністратор. Відмінне розташування для прогулянок містом.',
        rating: '9.0'
    },
    {
        id: 3,
        name: 'Федисів',
        date: 'Січень 2024',
        text: 'Чудовий готель з неймовірним персоналом, сніданок був дуже смачний, просторі кімнати, все продумано до дрібниць ❤️',
        rating: '10'
    },
    {
        id: 4,
        name: 'Lidia',
        date: 'Грудень 2023',
        text: 'Вишукане оформлення номеру, милі деталі в інтерʼєрі, ідеальна чистота, якісна постільна білизна - все на вищому рівні.',
        rating: '10'
    }
]

export default function ReviewsSection() {
    const sectionRef = useRef(null)
    const cardsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header elements
            gsap.fromTo(
                '[data-anim="reviews-header"]',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: '[data-anim="reviews-header"]', start: 'top 82%' },
                }
            )

            // Cards — subtle y + scale reveal, staggered
            gsap.fromTo(
                cardsRef.current.children,
                { opacity: 0, y: 36, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 82%',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className={styles.section} ref={sectionRef} id="reviews">
            <div className={styles.inner}>

                <div className={styles.header}>
                    <div className={styles.headerInfo} data-anim="reviews-header">
                        <span className={styles.eyebrow}>Відгуки</span>
                        <h2 className={styles.heading}>Що кажуть гості</h2>
                    </div>
                    <div className={styles.bookingBadge} data-anim="reviews-header">
                        <span className={styles.badgeLabel}>Рейтинг на Booking.com</span>
                        <span className={styles.badgeScore}>8.9 / 10</span>
                    </div>
                </div>

                <div className={styles.grid} ref={cardsRef}>
                    {reviews.map((review) => (
                        <div key={review.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.userInfo}>
                                    <span className={styles.name}>{review.name}</span>
                                    <span className={styles.date}>{review.date}</span>
                                </div>
                                <div className={styles.rating}>{review.rating}</div>
                            </div>
                            <p className={styles.text}>«{review.text}»</p>
                            <div className={styles.source}>Booking.com</div>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <a
                        href="https://www.booking.com/hotel/ua/boutique-deluxe.uk.html#tab-reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.allReviews}
                    >
                        Читати всі 125 відгуків →
                    </a>
                </div>

            </div>
        </section>
    )
}
