import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import CategorySection from '../../components/categorySection/CategorySection';
import HeroBanner from '../../components/heroBanner/HeroBanner';
import { categories } from '../../data/games';
import './Home.css';

export default function Home() {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') || '';

    useEffect(() => {
        document.title = `GAME WAVE – ${t('logo_subtitle')}`;
    }, [i18n.language, t]);

    const filteredCategories = categories.map(cat => ({
        ...cat,
        games: cat.games.filter(game =>
            game.title.toLowerCase().includes(query.toLowerCase())
        )
    })).filter(cat => cat.games.length > 0);

    return (
        <>
            <Header />
            <main>
                <HeroBanner />
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                        <CategorySection key={cat.id} category={cat} />
                    ))
                ) : (
                    <div className="no-games-found">
                        <h2>{t('no_games_found', { query })}</h2>
                        <p>{t('try_another_term')}</p>
                    </div>
                )}
            </main>
        </>
    )
}