import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './QuickInfoBar.module.css'

const items = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    value: "Нігинське шосе, 24А\nКам'янець-Подільський",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12 7v5.5l3.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: 'Заїзд 15:00\nВиїзд до 12:00',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M3 11h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    value: 'Безкоштовна\nпарковка',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5c1.8-2.5 4.1-4 7-4s5.2 1.5 7 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M1 8.5C4.2 4.8 7.9 3 12 3s7.8 1.8 11 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M9 16.5c.8-1 1.8-1.5 3-1.5s2.2.5 3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="12" cy="20" r="1.2" fill="currentColor"/>
      </svg>
    ),
    value: 'Безкоштовний\nWi-Fi',
  },
]

export default function QuickInfoBar() {
  const barRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const els = listRef.current?.querySelectorAll('li')
    if (!els) return

    gsap.fromTo(
      els,
      { opacity: 0, y: 22, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 88%',
        },
      }
    )
  }, [])

  return (
    <div className={styles.bar} ref={barRef}>
      <div className={styles.inner}>
        <ul className={styles.list} ref={listRef}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.value}>
                {item.value.split('\n').map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
