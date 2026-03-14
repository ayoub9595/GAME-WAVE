import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import HeroBanner from '../components/HeroBanner';
import { categories } from '../data/games';

export default function Home() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') || '';

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
                    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-color, #fff)' }}>
                        <h2>Aucun jeu trouvé pour "{query}"</h2>
                        <p style={{ marginTop: '1rem', opacity: 0.7 }}>Essayez un autre terme de recherche.</p>
                    </div>
                )}
            </main>
        </>
    )
}