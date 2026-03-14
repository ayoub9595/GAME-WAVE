import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GameView from './components/GameView.jsx';
import './App.css';

export default function App() {
    return (
        <Router>
            <div className="main-layout">
                <aside className="promo-sidebar left">
                    <div className="promo-unit">PUB GAUCHE</div>
                </aside>


                <div className="content-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play/:id" element={<GameView />} />
                    </Routes>
                </div>


                <aside className="promo-sidebar right">
                    <div className="promo-unit">PUB DROITE</div>
                </aside>
            </div>
        </Router>
    );
}