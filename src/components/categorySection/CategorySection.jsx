import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import GameCard from '../gameCard/GameCard';
import styles from './CategorySection.module.css';

const GAMES_PER_PAGE = 16;

export default function CategorySection({ category }) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(category.games.length / GAMES_PER_PAGE));
    // Bornage pendant le rendu : si la liste rétrécit (recherche depuis la page 2),
    // on ne peut plus se retrouver sur une page vide. Aucun effet, aucun re-render
    // en cascade — c'était la cause de la page blanche.
    const page = Math.min(currentPage, totalPages);
    const startIndex = (page - 1) * GAMES_PER_PAGE;
    const displayedGames = category.games.slice(startIndex, startIndex + GAMES_PER_PAGE);

    const goToNextPage = () => {
        if (page < totalPages) {
            setCurrentPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPrevPage = () => {
        if (page > 1) {
            setCurrentPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.category}>
            <div className={styles.grid}>
                {displayedGames.map(game => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        type="button"
                        onClick={goToPrevPage}
                        disabled={page === 1}
                        className={styles['pagination-btn']}
                    >
                        {t('previous')}
                    </button>
                    <span className={styles['page-info']}>
                        {t('page_of', { current: page, total: totalPages })}
                    </span>
                    <button
                        type="button"
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                        className={styles['pagination-btn']}
                    >
                        {t('next')}
                    </button>
                </div>
            )}
        </section>
    )
}

CategorySection.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        games: PropTypes.array.isRequired,
    }).isRequired,
};
