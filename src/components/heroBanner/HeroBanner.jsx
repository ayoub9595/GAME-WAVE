import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './HeroBanner.module.css';
import { games } from '../../data/games';
import { useLocalized } from '../../hooks/useLocalized';

const ROTATION_MS = 6500; // 3 s était trop court pour lire titre + description

// Liste stable : plus de Math.random(). Le contenu est identique à chaque
// chargement, donc indexable, et le H1 de la page ne bouge plus.
const featured = games.filter((g) => g.featured).slice(0, 5);
const fallback = games.slice(0, 5);

export default function HeroBanner() {
    const { t } = useTranslation();
    const { gameTitle, gameShort } = useLocalized();
    const list = featured.length ? featured : fallback;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || list.length < 2) return;
        const timer = setInterval(() => setIndex((i) => (i + 1) % list.length), ROTATION_MS);
        return () => clearInterval(timer);
    }, [paused, list.length]);

    if (!list.length) return null;
    const current = list[index];

    return (
        <section className={styles['hero-section']} aria-label={t('hero_badge')}>
            <div className={styles['hero-content']}>
                {/* H1 fixe : c'est le sujet de la page, il ne doit pas tourner */}
                <h1 className={styles['hero-h1']}>{t('home_h1')}</h1>

                <span className={styles['hero-badge']}>{t('hero_badge')}</span>
                <h2 className={styles['hero-game-title']}>{gameTitle(current)}</h2>
                <p>{gameShort(current)}</p>

                {/* Un vrai lien : crawlable, et l'utilisateur choisit d'ouvrir un onglet ou non */}
                <Link className={styles['hero-btn']} to={`/play/${current.slug}`}>
                    {t('play_now')}
                </Link>

                <div className={styles['carousel-indicators']} role="tablist">
                    {list.map((g, i) => (
                        <button
                            key={g.slug}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={gameTitle(g)}
                            className={`${styles.dot} ${i === index ? styles.active : ''}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                    {/* WCAG 2.2.2 : tout contenu animé doit pouvoir être arrêté */}
                    <button
                        type="button"
                        className={styles['pause-btn']}
                        onClick={() => setPaused((p) => !p)}
                        aria-label={paused ? t('resume') : t('pause')}
                    >
                        {paused ? '▶' : '❚❚'}
                    </button>
                </div>
            </div>

            <div className={styles['hero-image-overlay']} />
            <img
                className={styles['hero-img']}
                src={current.image}
                alt={gameTitle(current)}
                width="440"
                height="248"
                fetchPriority="high"
                key={current.slug}
            />
        </section>
    );
}
