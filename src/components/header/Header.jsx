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
    
    const query = searchParams.get('search') || '';

    const handleSearch = (e) => {
        const value = e.target.value;
        if (location.pathname !== '/') {
            navigate(`/?search=${encodeURIComponent(value)}`);
        } else {
            if (value) {
                setSearchParams({ search: value });
            } else {
                setSearchParams({});
            }
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>

            <div className={styles['header-search']}>
                <div className={styles['search-container']}>
                    <span className={styles['search-icon']}>🔍</span>
                    <input
                        className={styles.search}
                        placeholder={t('search_placeholder')}
                        value={query}
                        onChange={handleSearch}
                        autoFocus={location.search.includes('search=')}
                    />
                </div>
            </div>

            <div className={styles['header-actions']}>
                <LanguageSwitcher />
                <ThemeToggle />
                <MobileMenu />
            </div>
        </header>
    );
}