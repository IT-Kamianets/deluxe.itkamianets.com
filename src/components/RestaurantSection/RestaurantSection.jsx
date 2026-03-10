import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './RestaurantSection.module.css'

const items = [
    {
        slug: 'breakfast',
        photoRight: true,
        label: 'Ресторан та сніданки',
        body: 'Щоранку для гостей сервірують смачний континентальний сніданок або страви за меню. Також доступна послуга обслуговування номерів для вашого максимального комфорту.',
        photo: '/images/restaurant/restaurant.webp'
    },
    {
        slug: 'banquets',
        photoRight: false,
        label: 'Банкетна зала',
        body: 'Наша елегантна зала вміщує до 80 осіб. Це ідеальне місце для проведення весіль, корпоративів та інших урочистих подій з індивідуальним підходом до кожного замовлення.',
        photo: '/images/restaurant/banquet-hall.webp'
    }
]



export default function RestaurantSection() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Eyebrow — fade up
            gsap.fromTo(
                '[data-anim="rest-eyebrow"]',
                { opacity: 0, y: 14 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '[data-anim="rest-eyebrow"]', start: 'top 82%' },
                }
            )

            // Heading — clip reveal
            gsap.fromTo(
                '[data-anim="rest-heading"]',
                { clipPath: 'inset(100% 0% 0% 0%)', y: 10 },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    y: 0,
                    duration: 1.05,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '[data-anim="rest-eyebrow"]', start: 'top 82%' },
                    delay: 0.14,
                }
            )

            // Row compositions
            sectionRef.current.querySelectorAll('[data-anim-restaurant]').forEach((row) => {
                const text = row.querySelector('[data-anim="text"]')
                const photo = row.querySelector('[data-anim="photo"]')
                const isPhotoRight = text.closest('[data-photo-right="true"]')

                gsap.fromTo(
                    text,
                    { opacity: 0, x: isPhotoRight ? -38 : 38, scale: 0.97 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.0,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: row, start: 'top 76%' }
                    }
                )

                gsap.fromTo(
                    photo,
                    { opacity: 0, x: isPhotoRight ? 38 : -38, scale: 0.97 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.0,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: row, start: 'top 76%' }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className={styles.section} ref={sectionRef} id="restaurant">

            {/* ── Section header ── */}
            <div className={styles.headerCard}>
                <span className={styles.eyebrow} data-anim="rest-eyebrow">Гастрономія</span>
                <h2 className={styles.heading} data-anim="rest-heading">
                    Смак елегантності<br />у кожній страві
                </h2>
            </div>

            {/* ── Compositions ── */}
            <div className={styles.compositions}>
                {items.map((item) => (
                    <div
                        key={item.slug}
                        className={`${styles.composition} ${item.photoRight ? styles.rowPhotoRight : styles.rowPhotoLeft}`}
                        data-anim-restaurant
                        data-photo-right={item.photoRight ? 'true' : 'false'}
                    >
                        {/* Text block */}
                        <div className={styles.textBlock} data-anim="text">
                            <div className={styles.textInner}>
                                <h3 className={styles.rowLabel}>{item.label}</h3>
                                <p className={styles.rowBody}>{item.body}</p>
                                {item.slug === 'banquets' && (
                                    <>
                                        <div className={styles.banquetFeatures}>
                                            <span>До 80 осіб</span>
                                            <span>Власна кухня</span>
                                            <span>Повний сервіс</span>
                                            <span>Весілля · Корпоративи</span>
                                        </div>
                                        <div className={styles.ctaWrapper}>
                                            <a href="tel:+380931709524" className={styles.ctaLink}>
                                                Замовити банкет →
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Photo card */}
                        <div
                            className={styles.photoCard}
                            data-anim="photo"
                            role="img"
                            aria-label={item.label}
                        >
                            <div
                                className={styles.photoInner}
                                style={{ backgroundImage: `url('${item.photo}')` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}
