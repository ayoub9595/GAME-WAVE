import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import MobileMenu from './MobileMenu.jsx';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

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
        <header className="header">
            <div className="logo">
                <Logo />
            </div>

            <div className="header-search">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        className="search"
                        placeholder={t('search_placeholder')}
                        value={query}
                        onChange={handleSearch}
                        autoFocus={location.search.includes('search=')}
                    />
                </div>
            </div>

            <div className="header-actions">
                <LanguageSwitcher />
                <ThemeToggle />
                <MobileMenu />
            </div>
        </header>
    );
}