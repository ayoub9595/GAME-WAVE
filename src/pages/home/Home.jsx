import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import CategorySection from '../../components/categorySection/CategorySection';
import HeroBanner from '../../components/heroBanner/HeroBanner';
import CategoryNav from '../../components/categoryNav/CategoryNav';
import AdSlot from '../../components/ads/AdSlot';
import { searchGames } from '../../data/games';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './Home.module.css';

export default function Home() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') || '';

    useDocumentTitle(`GAME WAVE – ${t('logo_subtitle')}`);

    // La recherche porte maintenant sur le titre, la description et les tags.
    const results = searchGames(query);
    const filteredCategories = results.length
        ? [{ id: 1, title: t('category_1_title', { defaultValue: 'JEUX' }), games: results }]
        : [];

    return (
        <>
            <Header />
            <main>
                {!query && <HeroBanner />}
                <CategoryNav />
                <AdSlot id="home-below-hero" format="banner" />
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                        <CategorySection key={cat.id} category={cat} />
                    ))
                ) : (
                    <div className={styles['no-games-found']}>
                        <h2>{t('no_games_found', { query })}</h2>
                        <p>{t('try_another_term')}</p>
                    </div>
                )}
            </main>
        </>
    )
}
