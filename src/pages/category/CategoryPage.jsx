import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import CategorySection from '../../components/categorySection/CategorySection';
import AdSlot from '../../components/ads/AdSlot';
import NotFound from '../notFound/NotFound';
import { getCategory, getGamesByCategory, categories } from '../../data/games';
import { useLocalized } from '../../hooks/useLocalized';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './CategoryPage.module.css';

export default function CategoryPage() {
    const { slug } = useParams();
    const { t } = useTranslation();
    const { categoryName, categoryDescription } = useLocalized();
    const category = getCategory(slug);

    const name = category ? categoryName(category) : '';

    useDocumentTitle(name ? t('category_page_title', { name }) : '');

    if (!category) return <NotFound />;

    const list = getGamesByCategory(slug);

    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>{name}</span>
                </nav>

                <h1 className={styles.title}>{t('category_h1', { name })}</h1>
                <p className={styles.intro}>
                    {categoryDescription(category)} {list.length}{' '}
                    {list.length > 1 ? t('games_playable') : t('game_playable')}
                </p>

                <AdSlot id="category-top" format="banner" />

                <CategorySection category={{ id: 1, title: name, games: list }} />

                <aside className={styles.others}>
                    <h2>{t('other_categories')}</h2>
                    <ul>
                        {categories
                            .filter((c) => c.slug !== slug)
                            .map((c) => (
                                <li key={c.slug}>
                                    <Link to={`/category/${c.slug}`}>{categoryName(c)}</Link>
                                </li>
                            ))}
                    </ul>
                </aside>
            </main>
        </>
    );
}
