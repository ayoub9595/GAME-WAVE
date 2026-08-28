import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import { site } from '../../data/site';
import styles from './StaticPage.module.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function Contact() {
    const { t } = useTranslation();

    useDocumentTitle("Contact | Game Wave");

    return (
        <>
            <Header />
            <main className={styles.page}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>Contact</span>
                </nav>

                <h1>Nous contacter</h1>
                <p className={styles.lead}>
                    Un jeu qui ne se lance pas, une erreur d&apos;attribution, une demande de
                    retrait, une suggestion : un seul point de contact.
                </p>

                <div className={styles['contact-box']}>
                    <h2>Par e-mail</h2>
                    <p>
                        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                    </p>
                    <p>
                        Nous répondons généralement sous quelques jours. Aucun formulaire sur
                        cette page : c&apos;est volontaire, cela évite de collecter des données
                        dont nous n&apos;avons pas besoin.
                    </p>
                </div>

                <h2>Auteurs de jeux</h2>
                <p>
                    Si tu es l&apos;auteur d&apos;un jeu hébergé ici, indique-nous simplement ce
                    que tu souhaites : une attribution corrigée, un lien vers ton site ou ton
                    profil, ou le retrait complet du jeu. Le retrait est effectué sans
                    condition.
                </p>

                <h2>Signaler un problème technique</h2>
                <p>
                    Précise le nom du jeu, ton navigateur et ton appareil : c&apos;est ce qui
                    permet de reproduire le problème le plus vite.
                </p>

                <h2>Informations légales</h2>
                <p>
                    Éditeur : {site.publisher} ({site.country}). Voir aussi la{' '}
                    <Link to="/privacy">politique de confidentialité</Link> et les{' '}
                    <Link to="/terms">conditions d&apos;utilisation</Link>.
                </p>
            </main>
        </>
    );
}
