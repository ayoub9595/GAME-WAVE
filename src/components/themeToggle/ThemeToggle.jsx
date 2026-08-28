import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ThemeToggle.module.css';

const read = () => {
    if (typeof window === 'undefined' || !('localStorage' in window)) return 'dark';
    try {
        return localStorage.getItem('theme') || 'dark';
    } catch {
        return 'dark';
    }
};

export default function ThemeToggle() {
    const { t } = useTranslation();
    const [theme, setTheme] = useState(read);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch {
            /* navigation privée ou quota plein : on garde la valeur en mémoire */
        }
    }, [theme]);

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={styles['btn-toggle']}
            // Attribut stable : sert de point d'accroche aux tests, indépendamment
            // de la langue affichée.
            data-theme-toggle=""
            aria-label={theme === 'dark' ? t('switch_to_light') : t('switch_to_dark')}
        >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
    );
}
