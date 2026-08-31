import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/home/Home.jsx';
import GameView from './pages/gameView/GameView.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import FavoritesPage from './pages/favorites/FavoritesPage.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import About from './pages/legal/About.jsx';
import Privacy from './pages/legal/Privacy.jsx';
import Terms from './pages/legal/Terms.jsx';
import Contact from './pages/legal/Contact.jsx';
import ToolsPage from './pages/tools/ToolsPage.jsx';
import Footer from './components/layout/Footer.jsx';
import AdSlot from './components/ads/AdSlot.jsx';
import { ADS_ENABLED } from './components/ads/adsConfig.js';
import { getGameById } from './data/games.js';
import './App.css';

// Redirige les anciennes URL /game/12 vers /play/<slug>
function LegacyGameRedirect() {
    const { id } = useParams();
    const game = getGameById(id);
    return <Navigate to={game ? `/play/${game.slug}` : '/404'} replace />;
}

export default function App() {
    const { t } = useTranslation();

    return (
        <Router>
            <div className="main-layout">
                {/* Colonnes latérales : présentes uniquement si la publicité est
                    activée. Sinon elles affichaient un cadre « PUB » vide, et
                    disparaissaient de toute façon sous 1150 px. */}
                {ADS_ENABLED && (
                    <aside className="promo-sidebar left" aria-label={t('left_ad')}>
                        <AdSlot id="sidebar-left" format="sidebar" />
                    </aside>
                )}

                <div className="content-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play/:slug" element={<GameView />} />
                        <Route path="/category/:slug" element={<CategoryPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/tools" element={<ToolsPage />} />
                        <Route path="/game/:id" element={<LegacyGameRedirect />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>

                {ADS_ENABLED && (
                    <aside className="promo-sidebar right" aria-label={t('right_ad')}>
                        <AdSlot id="sidebar-right" format="sidebar" />
                    </aside>
                )}
            </div>
        </Router>
    );
}
