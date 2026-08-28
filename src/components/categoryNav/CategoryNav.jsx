import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories, getGamesByCategory } from '../../data/games';
import { useLocalized } from '../../hooks/useLocalized';
import styles from './CategoryNav.module.css';

const ICONS = { arcade: '🕹️', puzzle: '🧩', plateau: '♟️', action: '💥' };

/**
 * Barre de navigation par catégorie sur l'accueil.
 * Rend les 4 pages de catégorie accessibles depuis la home : c'est le maillage
 * interne qui permet à ces pages d'être découvertes, par les visiteurs comme
 * par les robots d'indexation.
 */
export default function CategoryNav() {
    const { t } = useTranslation();
    const { categoryName } = useLocalized();

    return (
        <nav className={styles.nav} aria-label={t('categories_label')}>
            <ul className={styles.list}>
                {categories.map((c) => (
                    <li key={c.slug}>
                        <Link to={`/category/${c.slug}`} className={styles.chip}>
                            <span aria-hidden="true">{ICONS[c.slug] || '🎮'}</span>
                            <span>{categoryName(c)}</span>
                            <span className={styles.count}>{getGamesByCategory(c.slug).length}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
