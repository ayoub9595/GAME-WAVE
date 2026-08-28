import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ slug, title, className = '' }) {
    const { t } = useTranslation();
    const { isFavorite, toggle } = useFavorites();
    const active = isFavorite(slug);

    return (
        <button
            type="button"
            className={`${styles.fav} ${active ? styles.active : ''} ${className}`}
            aria-pressed={active}
            title={
                active
                    ? t('remove_favorite', { defaultValue: 'Retirer des favoris' })
                    : t('add_favorite', { defaultValue: 'Ajouter aux favoris' })
            }
            aria-label={
                active
                    ? t('remove_favorite_of', { title, defaultValue: `Retirer ${title} des favoris` })
                    : t('add_favorite_of', { title, defaultValue: `Ajouter ${title} aux favoris` })
            }
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(slug);
            }}
        >
            <span aria-hidden="true">{active ? '★' : '☆'}</span>
        </button>
    );
}

FavoriteButton.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};
