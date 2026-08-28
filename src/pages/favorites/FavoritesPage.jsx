import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import CategorySection from '../../components/categorySection/CategorySection';
import { useFavorites } from '../../hooks/useFavorites';
import { getGamesBySlugs } from '../../data/games';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
    const { t } = useTranslation();
    const { favorites } = useFavorites();
    const list = getGamesBySlugs(favorites);

    useDocumentTitle(`${t('nav_favorites')} | Game Wave`);

    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <h1>{t('nav_favorites', { defaultValue: 'Mes favoris' })}</h1>

                {list.length === 0 ? (
                    <div className={styles.empty}>
                        <p>
                            {t('favorites_empty', {
                                defaultValue:
                                    "Tu n'as pas encore de favoris. Clique sur l'étoile d'un jeu pour l'ajouter ici.",
                            })}
                        </p>
                        <Link to="/" className={styles.cta}>
                            {t('browse_games', { defaultValue: 'Parcourir les jeux' })}
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className={styles.count}>
                            {list.length}{' '}
                            {list.length > 1
                                ? t('games', { defaultValue: 'jeux' })
                                : t('game', { defaultValue: 'jeu' })}
                        </p>
                        <CategorySection
                            category={{ id: 1, title: t('nav_favorites', { defaultValue: 'Favoris' }), games: list }}
                        />
                    </>
                )}

                <p className={styles.note}>
                    {t('favorites_note', {
                        defaultValue:
                            'Tes favoris sont enregistrés uniquement dans ce navigateur, sur cet appareil. Aucun compte, aucune donnée envoyée à un serveur.',
                    })}
                </p>
            </main>
        </>
    );
}
