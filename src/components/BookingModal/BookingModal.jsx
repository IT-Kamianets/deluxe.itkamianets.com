import { useState, useEffect } from 'react'
import styles from './BookingModal.module.css'

export default function BookingModal({ isOpen, onClose, roomName }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setPhone('')
      setStatus('idle')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const message = roomName
      ? `Бутік-готель DeLuxe\nЗапит на бронювання: ${roomName}\nІм'я: ${name}\nТелефон: ${phone}`
      : `Бутік-готель DeLuxe\nЗапит на бронювання\nІм'я: ${name}\nТелефон: ${phone}`
    try {
      const res = await fetch('https://it.webart.work/api/telegram/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: 'deluxe', message }),
      })
      const data = await res.json()
      setStatus(data === true ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.successText}>Дякуємо! Ми зв'яжемось з вами найближчим часом.</p>
            <button className={styles.submitBtn} onClick={onClose}>Закрити</button>
          </div>
        ) : (
          <>
            <h2 className={styles.heading}>Забронювати</h2>
            {roomName && <p className={styles.roomLabel}>{roomName}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Ім'я</label>
                <input
                  className={styles.input}
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Ваше ім'я"
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Телефон</label>
                <input
                  className={styles.input}
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  placeholder="+380..."
                  autoComplete="tel"
                />
              </div>
              {status === 'error' && (
                <p className={styles.errorText}>Помилка надсилання. Спробуйте ще раз.</p>
              )}
              <button
                className={styles.submitBtn}
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Надсилання...' : 'Надіслати запит'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
