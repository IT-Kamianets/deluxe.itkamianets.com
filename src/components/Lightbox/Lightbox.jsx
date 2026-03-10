import { useEffect, useCallback, useRef } from 'react'
import styles from './Lightbox.module.css'

/**
 * Lightbox — fullscreen photo viewer
 *
 * Props:
 *   photos   – Array<{ src: string, alt: string }>
 *   index    – currently visible photo index (null = closed)
 *   onClose  – () => void
 *   onChange – (newIndex: number) => void
 */
export default function Lightbox({ photos, index, onClose, onChange }) {
  const thumbsRef = useRef(null)
  const isOpen = index !== null && index !== undefined

  const prev = useCallback(() => {
    if (index > 0) onChange(index - 1)
  }, [index, onChange])

  const next = useCallback(() => {
    if (index < photos.length - 1) onChange(index + 1)
  }, [index, photos.length, onChange])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, prev, next])

  // Scroll active thumb into view
  useEffect(() => {
    if (!isOpen || !thumbsRef.current) return
    const activeThumb = thumbsRef.current.children[index]
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [index, isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    const sensitivity = 50
    if (diff > sensitivity) next()
    if (diff < -sensitivity) prev()
    touchStartX.current = null
    touchEndX.current = null
  }

  if (!isOpen) return null

  const photo = photos[index]

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Перегляд фото"
    >
      {/* Close button */}
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Закрити"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Main image */}
      <div
        className={styles.main}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className={styles.mainImg}
          draggable={false}
        />

        {/* Prev / Next */}
        {index > 0 && (
          <button className={`${styles.nav} ${styles.navPrev}`} onClick={prev} aria-label="Попереднє фото">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {index < photos.length - 1 && (
          <button className={`${styles.nav} ${styles.navNext}`} onClick={next} aria-label="Наступне фото">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Counter */}
        <div className={styles.counter}>{index + 1} / {photos.length}</div>
      </div>

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div
          className={styles.thumbs}
          ref={thumbsRef}
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((p, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => onChange(i)}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === index}
            >
              <img src={p.src} alt={p.alt} className={styles.thumbImg} draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
