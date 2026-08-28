import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories, games } from '../../data/games';
import { site } from '../../data/site';
import { useLocalized } from '../../hooks/useLocalized';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useTranslation();
    const { categoryName } = useLocalized();

    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div>
                    <h3>{site.name}</h3>
                    <p>
                        {games.length} {t('games')} — {t('free')}, {t('no_download')}.
                    </p>
                </div>

                <div>
                    <h3>{t('categories_label')}</h3>
                    <ul>
                        {categories.map((c) => (
                            <li key={c.slug}>
                                <Link to={`/category/${c.slug}`}>{categoryName(c)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>{t('site')}</h3>
                    <ul>
                        <li><Link to="/about">{t('nav_about')}</Link></li>
                        <li><Link to="/tools">{t('nav_tools', { defaultValue: 'Outils recommandés' })}</Link></li>
                        <li><Link to="/favorites">{t('nav_favorites')}</Link></li>
                        <li><Link to="/contact">{t('nav_contact', { defaultValue: 'Contact' })}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3>{t('legal')}</h3>
                    <ul>
                        <li><Link to="/privacy">{t('nav_privacy', { defaultValue: 'Confidentialité' })}</Link></li>
                        <li><Link to="/terms">{t('nav_terms', { defaultValue: "Conditions d'utilisation" })}</Link></li>
                    </ul>
                </div>
            </div>

            <p className={styles.bottom}>
                © {new Date().getFullYear()} {site.name}.{' '}
                {t('footer_credits', {
                    defaultValue:
                        "Certains jeux sont l'œuvre de leurs auteurs respectifs, crédités sur leur page.",
                })}
            </p>
        </footer>
    );
}
