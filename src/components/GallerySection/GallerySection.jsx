import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GallerySection.module.css'
import Lightbox from '../Lightbox/Lightbox'
import { hotelPhotos, restaurantPhotos } from '../../data/galleryData'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  { id: 'hotel', label: 'Готель', photos: hotelPhotos },
  { id: 'restaurant', label: 'Ресторан', photos: restaurantPhotos },
]

export default function GallerySection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeTab, setActiveTab] = useState('hotel')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const tabRefs = useRef({})

  const currentPhotos = TABS.find((t) => t.id === activeTab).photos
  // Only real photos can be opened in lightbox
  const realPhotos = currentPhotos.filter((p) => p.src)

  const openLightbox = (photo) => {
    const idx = realPhotos.indexOf(photo)
    if (idx >= 0) setLightboxIndex(idx)
  }

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return
    setActiveIdx(0)
    // Animate grid out then in
    if (gridRef.current) {
      gridRef.current.scrollTo({ left: 0 })
      gsap.to(gridRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(tabId)
          gsap.fromTo(
            gridRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          )
        },
      })
    } else {
      setActiveTab(tabId)
    }
  }

  const handleScroll = () => {
    if (!gridRef.current || window.innerWidth > 640) return
    const scrollLeft = gridRef.current.scrollLeft
    const width = gridRef.current.offsetWidth
    const newIdx = Math.round(scrollLeft / (width * 0.90)) // 0.9 matches 90vw in CSS
    if (newIdx !== activeIdx) setActiveIdx(newIdx)
  }

  // Update underline indicator position
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab]
    if (activeEl) {
      setIndicatorStyle({
        width: activeEl.offsetWidth,
        left: activeEl.offsetLeft
      })
    }
  }, [activeTab])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-anim="gallery-header"]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      )

      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className={styles.section} ref={sectionRef} id="gallery">
        <div className={styles.inner}>

          {/* ── Header ── */}
          <div className={styles.header}>
            <div data-anim="gallery-header">
              <span className={styles.eyebrow}>Галерея</span>
              <h2 className={styles.heading}>Погляньте на готель</h2>
            </div>

            {/* Tabs */}
            <div className={styles.tabs} data-active={activeTab} data-anim="gallery-header" role="tablist">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span className={styles.tabNum}>0{idx + 1}</span>
                  <span className={styles.tabLabel}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Photo Grid ── */}
          <div
            className={styles.grid}
            ref={gridRef}
            role="tabpanel"
            aria-label={TABS.find((t) => t.id === activeTab).label}
            data-active-tab={activeTab}
            onScroll={handleScroll}
          >
            {currentPhotos.map((photo, i) => (
              <div
                key={i}
                className={`${styles.cell} ${photo.src ? styles.cellReal : styles.cellPlaceholder}`}
                onClick={() => photo.src && openLightbox(photo)}
                role={photo.src ? 'button' : undefined}
                tabIndex={photo.src ? 0 : undefined}
                aria-label={photo.src ? `Відкрити фото: ${photo.alt}` : undefined}
                onKeyDown={(e) => {
                  if (photo.src && (e.key === 'Enter' || e.key === ' ')) openLightbox(photo)
                }}
              >
                {photo.src
                  ? <img src={photo.src} alt={photo.alt} className={styles.cellImg} loading="lazy" />
                  : (
                    <div className={styles.placeholderInner}>
                      <span className={styles.placeholderText}>{photo.alt}</span>
                    </div>
                  )
                }
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className={styles.dots}>
            {currentPhotos.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${activeIdx === i ? styles.dotActive : ''}`}
              />
            ))}
          </div>

        </div>
      </section>

      <Lightbox
        photos={realPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  )
}
