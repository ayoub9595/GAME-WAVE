import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { categories, games, getGamesByCategory } from '../../data/games'
import { useLocalized } from '../../hooks/useLocalized'
import styles from './MobileMenu.module.css'

const ICONS = { arcade: '🕹️', puzzle: '🧩', plateau: '♟️', action: '💥' }

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()
    const { categoryName } = useLocalized()

    useEffect(() => {
        document.body.classList.toggle('menu-open', isOpen)
        return () => document.body.classList.remove('menu-open')
    }, [isOpen])

    // Fermeture au clavier : Échap
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen])

    const close = () => setIsOpen(false)

    return (
        <>
            <button
                type="button"
                className={`${styles['hamburger-btn']} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t('menu')}
                aria-expanded={isOpen}
            >
                <span className={styles['hamburger-line']}></span>
                <span className={styles['hamburger-line']}></span>
                <span className={styles['hamburger-line']}></span>
            </button>

            <div
                className={`${styles['menu-overlay']} ${isOpen ? styles.active : ''}`}
                onClick={close}
            ></div>

            <nav className={`${styles['mobile-menu']} ${isOpen ? styles.active : ''}`}>
                <div className={styles['mobile-menu-header']}>
                    <div className={styles['menu-logo']}>
                        <span className={styles['menu-logo-text']}>GAMEWAVE</span>
                        <span className={styles['menu-logo-slogan']}>{t('logo_subtitle')}</span>
                    </div>
                    <button
                        type="button"
                        className={styles['menu-close-btn']}
                        onClick={close}
                        aria-label={t('close')}
                    >
                        ✕
                    </button>
                </div>

                <ul className={styles['menu-items']}>
                    <li className={styles['menu-item']}>
                        <Link to="/" onClick={close} className={styles['menu-link']}>
                            <span className={styles['menu-icon']}>🏠</span>
                            <span className={styles['menu-text']}>{t('nav_home')}</span>
                            <span className={styles['menu-arrow']}>›</span>
                        </Link>
                    </li>

                    {categories.map((c, i) => (
                        <li
                            key={c.slug}
                            className={styles['menu-item']}
                            style={{ animationDelay: `${(i + 1) * 0.05}s` }}
                        >
                            <Link to={`/category/${c.slug}`} onClick={close} className={styles['menu-link']}>
                                <span className={styles['menu-icon']}>{ICONS[c.slug] || '🎮'}</span>
                                <span className={styles['menu-text']}>
                                    {categoryName(c)} ({getGamesByCategory(c.slug).length})
                                </span>
                                <span className={styles['menu-arrow']}>›</span>
                            </Link>
                        </li>
                    ))}

                    <li className={styles['menu-item']} style={{ animationDelay: `${(categories.length + 1) * 0.05}s` }}>
                        <Link to="/favorites" onClick={close} className={styles['menu-link']}>
                            <span className={styles['menu-icon']}>⭐</span>
                            <span className={styles['menu-text']}>{t('nav_favorites')}</span>
                            <span className={styles['menu-arrow']}>›</span>
                        </Link>
                    </li>

                    <li className={styles['menu-item']} style={{ animationDelay: `${(categories.length + 2) * 0.05}s` }}>
                        <Link to="/about" onClick={close} className={styles['menu-link']}>
                            <span className={styles['menu-icon']}>ℹ️</span>
                            <span className={styles['menu-text']}>{t('nav_about')}</span>
                            <span className={styles['menu-arrow']}>›</span>
                        </Link>
                    </li>
                </ul>

                <div className={styles['menu-footer']}>
                    <div className={styles['menu-footer-item']}>
                        <span>🎮</span>
                        <span>{games.length} {t('games')}</span>
                    </div>
                    <div className={styles['menu-footer-item']}>
                        <span>🆓</span>
                        <span>100% {t('free')}</span>
                    </div>
                </div>
            </nav>
        </>
    )
}
