import { useState, useEffect } from 'react'
import styles from './MobileMenu.module.css'

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }

        return () => {
            document.body.classList.remove('menu-open')
        }
    }, [isOpen])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const menuItems = [
        { name: 'Accueil', icon: '🏠', href: '#home' },
        { name: 'Nouveaux Jeux', icon: '✨', href: '#nouveaux' },
        { name: 'Populaires', icon: '🔥', href: '#populaires' },
        { name: 'Sports', icon: '⚽', href: '#sports' },
        { name: 'Action', icon: '💥', href: '#action' },
        { name: 'Puzzle', icon: '🧩', href: '#puzzle' },
        { name: 'Course', icon: '🏎️', href: '#course' },
        { name: 'Favoris', icon: '⭐', href: '#favoris' },
    ]

    return (
        <>
            {/* Bouton Hamburger */}
            <button
                className={`${styles['hamburger-btn']} ${isOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label="Menu"
            >
                <span className={styles['hamburger-line']}></span>
                <span className={styles['hamburger-line']}></span>
                <span className={styles['hamburger-line']}></span>
            </button>

            {/* Overlay */}
            <div
                className={`${styles['menu-overlay']} ${isOpen ? styles.active : ''}`}
                onClick={toggleMenu}
            ></div>

            {/* Menu Latéral */}
            <nav className={`${styles['mobile-menu']} ${isOpen ? styles.active : ''}`}>
                <div className={styles['mobile-menu-header']}>
                    <div className={styles['menu-logo']}>
                        <span className={styles['menu-logo-text']}>GAMEWAVE</span>
                        <span className={styles['menu-logo-slogan']}>RIDE THE NEXT LEVEL</span>
                    </div>
                    <button
                        className={styles['menu-close-btn']}
                        onClick={toggleMenu}
                        aria-label="Fermer le menu"
                    >
                        ✕
                    </button>
                </div>

                <ul className={styles['menu-items']}>
                    {menuItems.map((item, index) => (
                        <li
                            key={item.name}
                            className={styles['menu-item']}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <a
                                href={item.href}
                                onClick={toggleMenu}
                                className={styles['menu-link']}
                            >
                                <span className={styles['menu-icon']}>{item.icon}</span>
                                <span className={styles['menu-text']}>{item.name}</span>
                                <span className={styles['menu-arrow']}>›</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={styles['menu-footer']}>
                    <div className={styles['menu-footer-item']}>
                        <span>🎮</span>
                        <span>+1000 Jeux</span>
                    </div>
                    <div className={styles['menu-footer-item']}>
                        <span>🆓</span>
                        <span>100% Gratuit</span>
                    </div>
                </div>
            </nav>
        </>
    )
}