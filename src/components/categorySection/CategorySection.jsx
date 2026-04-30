/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GameCard from '../gameCard/GameCard';
import styles from './CategorySection.module.css';

const GAMES_PER_PAGE = 16;

export default function CategorySection({ category }) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(category.games.length / GAMES_PER_PAGE);
    const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
    const displayedGames = category.games.slice(startIndex, startIndex + GAMES_PER_PAGE);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.category}>
            <div className={styles.grid}>
                {displayedGames.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={styles['pagination-btn']}
                    >
                        {t('previous')}
                    </button>
                    <span className={styles['page-info']}>{t('page_of', { current: currentPage, total: totalPages })}</span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={styles['pagination-btn']}
                    >
                        {t('next')}
                    </button>
                </div>
            )}
        </section>
    )
}
