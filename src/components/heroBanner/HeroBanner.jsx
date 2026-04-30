import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HeroBanner.module.css';
import { categories } from '../../data/games';

export default function HeroBanner() {
    const { t } = useTranslation();
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const allGames = categories[0].games;
        const shuffled = [...allGames].sort(() => 0.5 - Math.random());
        setSlides(shuffled.slice(0, 7));
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [slides.length]);

    if (slides.length === 0) return null;

    const handlePlayGame = () => {
        window.open(`/play/${slides[currentIndex].id}`);
    };

    return (
        <section className={styles['hero-section']}>
            <div className={styles['hero-content']}>
                <span className={styles['hero-badge']}>{t('hero_badge')}</span>
                <h1>{t(`game_title_${slides[currentIndex].id}`, { defaultValue: slides[currentIndex].title })}</h1>
                <p>{t(`game_desc_${slides[currentIndex].id}`, { defaultValue: slides[currentIndex].description })}</p>
                <button className={styles['hero-btn']} onClick={handlePlayGame}>{t('play_now')}</button>

                <div className={styles['carousel-indicators']}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>

            <div className={styles['hero-image-overlay']}></div>

            <img
                className={styles['hero-img']}
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                key={slides[currentIndex].id}
            />
        </section>
    );
}