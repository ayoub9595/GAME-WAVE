import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import GameView from './pages/gameView/GameView.jsx';
import { useTranslation } from 'react-i18next';
import './App.css';

export default function App() {
    const { t } = useTranslation();
    return (
        <Router>
            <div className="main-layout">
                <aside className="promo-sidebar left">
                    <div className="promo-unit">{t('left_ad')}</div>
                </aside>


                <div className="content-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play/:id" element={<GameView />} />
                    </Routes>
                </div>


                <aside className="promo-sidebar right">
                    <div className="promo-unit">{t('right_ad')}</div>
                </aside>
            </div>
        </Router>
    );
}