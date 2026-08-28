import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import { games, categories } from '../../data/games';
import { site } from '../../data/site';
import styles from './StaticPage.module.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function About() {
    const { t } = useTranslation();

    useDocumentTitle("À propos de Game Wave");

    return (
        <>
            <Header />
            <main className={styles.page}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>À propos</span>
                </nav>

                <h1>À propos de Game Wave</h1>
                <p className={styles.lead}>
                    Game Wave est un site de jeux jouables directement dans le navigateur.
                    Pas de téléchargement, pas d&apos;installation, pas de compte à créer.
                </p>

                <h2>Ce que tu trouves ici</h2>
                <p>
                    Le catalogue compte actuellement {games.length} jeux répartis en{' '}
                    {categories.length} catégories : {categories.map((c) => c.name.toLowerCase()).join(', ')}.
                    Ce sont des jeux HTML5 légers, qui se lancent en quelques secondes et
                    fonctionnent aussi bien sur ordinateur que sur mobile.
                </p>
                <p>
                    Nous préférons annoncer un chiffre exact plutôt que promettre
                    « des milliers de jeux ». Le catalogue grandit lentement, jeu par jeu,
                    et chaque ajout est vérifié.
                </p>

                <h2>Comment ça fonctionne</h2>
                <p>
                    Chaque jeu est hébergé sur le site et affiché dans un cadre isolé. Rien
                    n&apos;est exécuté en dehors de ton navigateur : il n&apos;y a ni sauvegarde
                    en ligne, ni classement, ni profil. Tes favoris et tes préférences
                    d&apos;affichage restent stockés dans ton navigateur, sur ton appareil.
                </p>

                <h2>Provenance des jeux</h2>
                <p>
                    Une partie du catalogue provient de la scène du jeu indépendant, notamment
                    de la compétition js13kGames, où chaque jeu doit tenir en treize kilooctets.
                    Quand l&apos;auteur est identifié, il est crédité sur la page du jeu, avec un
                    lien vers son travail. Les jeux dont la licence n&apos;est pas encore
                    confirmée sont signalés comme tels, et nous retirons immédiatement tout
                    contenu sur demande de son auteur.
                </p>

                <h2>Nous contacter</h2>
                <p>
                    Une question, une erreur à signaler, un jeu à retirer ou à ajouter :{' '}
                    <Link to="/contact">écris-nous</Link>.
                </p>

                <h2>Éditeur du site</h2>
                <p>
                    {site.name} — édité par {site.publisher}, {site.country}.
                </p>
            </main>
        </>
    );
}
