import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import FavoriteButton from '../favoriteButton/FavoriteButton'
import { useLocalized } from '../../hooks/useLocalized'
import styles from './GameCard.module.css'

export default function GameCard({ game }) {
    const { t } = useTranslation()
    const { gameTitle } = useLocalized()
    const [isLoaded, setIsLoaded] = useState(false)
    const title = gameTitle(game)

    return (
        <div className={styles['card-outer']}>
            <Link to={`/play/${game.slug}`} className={styles['game-link']}>
                <div className={styles['game-card']}>
                    <div
                        className={`${styles['image-wrapper']} ${isLoaded ? '' : styles['loading-shimmer']}`}
                        data-play-text={t('play_hover')}
                    >
                        <img
                            src={game.image}
                            alt={title}
                            width="440"
                            height="248"
                            loading="lazy"
                            decoding="async"
                            className={`${styles['img-original']} ${isLoaded ? styles.visible : ''}`}
                            onLoad={() => setIsLoaded(true)}
                        />
                        {isLoaded && game.isNew && (
                            <span className={styles.badge}>{t('new_badge')}</span>
                        )}
                    </div>
                    {isLoaded ? (
                        <h3 className={styles['game-title']}>{title}</h3>
                    ) : (
                        <div className={styles['skeleton-text']}></div>
                    )}
                </div>
            </Link>
            {/* Hors du <Link> : un bouton dans un lien est invalide en HTML */}
            <FavoriteButton slug={game.slug} title={title} className={styles['fav-on-card']} />
        </div>
    )
}

GameCard.propTypes = {
    game: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isNew: PropTypes.bool,
    }).isRequired,
}
