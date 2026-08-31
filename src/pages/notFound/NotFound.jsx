import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import { games } from '../../data/games';
import { useLocalized } from '../../hooks/useLocalized';
import styles from './NotFound.module.css';

export default function NotFound() {
    const { t } = useTranslation();
    const { gameTitle } = useLocalized();
    const suggestions = games.filter((g) => g.featured).slice(0, 4);
    const list = suggestions.length ? suggestions : games.slice(0, 4);

    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <p className={styles.code}>404</p>
                <h1>{t('not_found_title')}</h1>
                <p>{t('not_found_text')}</p>

                <h2>{t('try_these')}</h2>
                <ul className={styles.suggestions}>
                    {list.map((g) => (
                        <li key={g.slug}>
                            <Link to={`/play/${g.slug}`}>{gameTitle(g)}</Link>
                        </li>
                    ))}
                </ul>

                <Link to="/" className={styles.home}>
                    {t('back_home')}
                </Link>
            </main>
        </>
    );
}
