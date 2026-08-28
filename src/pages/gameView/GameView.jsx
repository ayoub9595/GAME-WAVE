import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGameBySlug, getGameById, getRelatedGames, getCategory } from '../../data/games.js';
import Header from '../../components/header/Header.jsx';
import GameCard from '../../components/gameCard/GameCard.jsx';
import FavoriteButton from '../../components/favoriteButton/FavoriteButton.jsx';
import AdSlot from '../../components/ads/AdSlot.jsx';
import { useLocalized } from '../../hooks/useLocalized';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './GameView.module.css';

export default function GameView() {
    const { slug } = useParams();
    const [isFullMode, setIsFullMode] = useState(false);
    const { t } = useTranslation();
    const { gameTitle, gameLong, gameControls, gameTags, categoryName } = useLocalized();

    // Accepte aussi les anciennes URL numériques (/play/12) sans casser les slugs
    const game = getGameBySlug(slug) || getGameById(slug);

    const title = game ? gameTitle(game) : '';

    useDocumentTitle(title ? t('play_on_game_wave', { game: title }) : '');

    if (!game) {
        return (
            <>
                <Header />
                <main className={styles.error}>
                    <h1>{t('game_not_found')}</h1>
                    <p>{t('game_not_found_text')}</p>
                    <Link to="/" className={styles['error-link']}>
                        {t('back_home')}
                    </Link>
                </main>
            </>
        );
    }

    const related = getRelatedGames(game);
    const category = getCategory(game.category);
    const description = gameLong(game);
    const controls = gameControls(game);
    const tags = gameTags(game);

    return (
        <div className={`${styles['game-page-layout']} ${isFullMode ? styles['full-mode-active'] : ''}`}>
            {!isFullMode && <Header />}

            <main className={styles['game-main-content']}>
                <div className={styles['game-iframe-container']}>
                    <button
                        type="button"
                        className={styles['fullscreen-btn']}
                        onClick={() => setIsFullMode(!isFullMode)}
                        title={isFullMode ? t('exit_fullscreen') : t('enter_fullscreen')}
                        aria-label={isFullMode ? t('exit_fullscreen') : t('enter_fullscreen')}
                    >
                        {isFullMode ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                <span>{t('exit')}</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8V5a2 2 0 0 1 2-2h3m10 0h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m10 0h3a2 2 0 0 0 2-2v-3" /></svg>
                                <span>{t('fullscreen')}</span>
                            </>
                        )}
                    </button>
                    <iframe
                        src={game.gamePath}
                        title={title}
                        loading="lazy"
                        allowFullScreen
                        scrolling="no"
                    />
                </div>

                {/* Contenu éditorial sous le jeu : c'est lui qui rend la page
                    indexable et qui donne une place propre à la publicité. */}
                {!isFullMode && (
                    <article className={styles.details}>
                        <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                            <Link to="/">{t('nav_home')}</Link>
                            <span aria-hidden="true">›</span>
                            {category && (
                                <Link to={`/category/${category.slug}`}>{categoryName(category)}</Link>
                            )}
                            <span aria-hidden="true">›</span>
                            <span>{title}</span>
                        </nav>

                        <div className={styles['title-row']}>
                            <h1 className={styles.title}>{title}</h1>
                            <FavoriteButton slug={game.slug} title={title} />
                        </div>

                        {tags.length > 0 && (
                            <ul className={styles.tags}>
                                {tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        )}

                        <p className={styles.description}>{description}</p>

                        {controls && (
                            <>
                                <h2>{t('how_to_play')}</h2>
                                <p>{controls}</p>
                            </>
                        )}

                        {(game.credit || game.license) && (
                            <>
                                <h2>{t('credits')}</h2>
                                <p className={styles.credits}>
                                    {game.credit && (
                                        <>
                                            {t('created_by')}{' '}
                                            {game.creditUrl ? (
                                                <a href={game.creditUrl} target="_blank" rel="noopener noreferrer">
                                                    {game.credit}
                                                </a>
                                            ) : (
                                                game.credit
                                            )}
                                            {'. '}
                                        </>
                                    )}
                                    {game.license && (
                                        <>
                                            {t('license')} : {game.license}.
                                        </>
                                    )}
                                </p>
                            </>
                        )}

                        <AdSlot id="game-below-fold" format="banner" />

                        {related.length > 0 && (
                            <>
                                <h2>{t('similar_games')}</h2>
                                <div className={styles.related}>
                                    {related.map((g) => (
                                        <GameCard key={g.slug} game={g} />
                                    ))}
                                </div>
                            </>
                        )}
                    </article>
                )}
            </main>
        </div>
    );
}
