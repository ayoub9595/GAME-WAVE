import { useRef, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../themeToggle/ThemeToggle';
import Logo from '../logo/Logo';
import MobileMenu from '../mobileMenu/MobileMenu.jsx';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

export default function Header() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    // Sur mobile la recherche était purement et simplement masquée
    // (display:none sous 768 px) : aucun moyen de chercher un jeu. Elle
    // s'ouvre maintenant depuis la loupe, sur une deuxième ligne, sans manger
    // de hauteur au repos.
    const [searchOpen, setSearchOpen] = useState(false);

    const query = searchParams.get('search') || '';

    const handleSearch = (e) => {
        const value = e.target.value;
        if (location.pathname !== '/') {
            navigate(`/?search=${encodeURIComponent(value)}`);
        } else if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const toggleSearch = () => {
        const next = !searchOpen;
        setSearchOpen(next);
        if (next) requestAnimationFrame(() => inputRef.current?.focus());
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>

            <div className={`${styles['header-search']} ${searchOpen || query ? styles.open : ''}`}>
                <div className={styles['search-container']}>
                    <span className={styles['search-icon']} aria-hidden="true">🔍</span>
                    <input
                        ref={inputRef}
                        className={styles.search}
                        type="search"
                        placeholder={t('search_placeholder')}
                        value={query}
                        onChange={handleSearch}
                        aria-label={t('search_placeholder')}
                    />
                </div>
            </div>

            <div className={styles['header-actions']}>
                <button
                    type="button"
                    className={styles['search-toggle']}
                    onClick={toggleSearch}
                    aria-label={t('search_placeholder')}
                    aria-expanded={searchOpen}
                >
                    <span aria-hidden="true">🔍</span>
                </button>
                <LanguageSwitcher />
                <ThemeToggle />
                <MobileMenu />
            </div>
        </header>
    );
}
