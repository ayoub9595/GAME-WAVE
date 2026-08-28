import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import { site } from '../../data/site';
import styles from './StaticPage.module.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function Terms() {
    const { t } = useTranslation();

    useDocumentTitle("Conditions d'utilisation | Game Wave");

    return (
        <>
            <Header />
            <main className={styles.page}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>Conditions d&apos;utilisation</span>
                </nav>

                <h1>Conditions d&apos;utilisation</h1>
                <p className={styles.updated}>Dernière mise à jour : {site.legalUpdatedAt}</p>

                <h2>1. Objet</h2>
                <p>
                    {site.name} met à disposition gratuitement des jeux jouables dans le
                    navigateur. Utiliser le site vaut acceptation des présentes conditions.
                </p>

                <h2>2. Accès au service</h2>
                <p>
                    L&apos;accès est libre et ne nécessite aucun compte. Le service est fourni
                    « tel quel », sans garantie de disponibilité continue : une page peut être
                    temporairement inaccessible pour maintenance, mise à jour ou raison
                    technique.
                </p>

                <h2>3. Utilisation acceptable</h2>
                <p>Tu t&apos;engages à ne pas :</p>
                <ul>
                    <li>
                        tenter de perturber le fonctionnement du site ou d&apos;en contourner les
                        protections ;
                    </li>
                    <li>
                        extraire massivement le contenu de façon automatisée sans autorisation ;
                    </li>
                    <li>
                        réutiliser les jeux hébergés ici en dehors du cadre autorisé par leurs
                        auteurs respectifs.
                    </li>
                </ul>

                <h2>4. Propriété intellectuelle</h2>
                <p>
                    Les jeux proposés restent la propriété de leurs auteurs. Quand l&apos;auteur
                    est identifié, il est crédité sur la page du jeu concerné, avec la licence
                    applicable lorsqu&apos;elle est connue. La structure du site, ses textes et sa
                    charte graphique appartiennent à l&apos;éditeur.
                </p>

                <h2>5. Signalement et retrait</h2>
                <p>
                    Si tu es l&apos;auteur ou l&apos;ayant droit d&apos;un contenu présent sur le
                    site et que tu souhaites son retrait ou une correction d&apos;attribution,
                    écris à {site.contactEmail} en précisant le jeu concerné et la nature de ta
                    demande. Le contenu est retiré sans discussion préalable le temps de la
                    vérification.
                </p>

                <h2>6. Limitation de responsabilité</h2>
                <p>
                    Le site est fourni à titre de divertissement. L&apos;éditeur ne peut être tenu
                    responsable d&apos;un dommage indirect résultant de l&apos;utilisation du
                    service, ni du contenu des sites tiers vers lesquels des liens pourraient
                    pointer.
                </p>

                <h2>7. Liens sortants et partenariats</h2>
                <p>
                    Certaines pages peuvent contenir des liens vers des sites tiers, y compris
                    des liens rémunérés. Lorsque c&apos;est le cas, la mention est affichée
                    clairement avant le lien, sur la page concernée.
                </p>

                <h2>8. Droit applicable</h2>
                <p>
                    Les présentes conditions sont soumises au droit applicable au lieu
                    d&apos;établissement de l&apos;éditeur ({site.country}).
                </p>

                <h2>9. Contact</h2>
                <p>
                    Toute question sur ces conditions : <Link to="/contact">page contact</Link>.
                </p>
            </main>
        </>
    );
}
