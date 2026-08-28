import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import { site, dataProcessing } from '../../data/site';
import styles from './StaticPage.module.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

/**
 * Politique de confidentialité.
 *
 * Ce texte décrit ce que le site fait RÉELLEMENT aujourd'hui : aucun compte,
 * aucun analytics, aucune publicité, aucune donnée envoyée à un serveur en
 * dehors de l'hébergeur. Les sections « analytics » et « publicité »
 * s'affichent automatiquement dès que les drapeaux correspondants passent à
 * true dans src/data/site.js — à faire EN MÊME TEMPS que l'activation de
 * l'outil concerné, pas après.
 */
export default function Privacy() {
    const { t } = useTranslation();

    useDocumentTitle("Politique de confidentialité | Game Wave");

    return (
        <>
            <Header />
            <main className={styles.page}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>Confidentialité</span>
                </nav>

                <h1>Politique de confidentialité</h1>
                <p className={styles.updated}>Dernière mise à jour : {site.legalUpdatedAt}</p>

                <p className={styles.lead}>
                    Game Wave fonctionne sans compte utilisateur. Le site ne demande ni nom,
                    ni e-mail, ni mot de passe pour jouer, et ne construit pas de profil
                    publicitaire.
                </p>

                <h2>1. Qui est responsable du traitement</h2>
                <p>
                    {site.publisher}, éditeur de {site.name} ({site.country}). Pour toute
                    question relative à tes données : {site.contactEmail}.
                </p>

                <h2>2. Quelles données sont traitées</h2>

                <h3>a. Données stockées dans ton navigateur</h3>
                <p>
                    Le site utilise le stockage local (<code>localStorage</code>) de ton
                    navigateur pour retenir tes préférences. Ces informations ne quittent
                    jamais ton appareil et ne sont accessibles ni à nous, ni à un tiers :
                </p>
                <ul>
                    <li>
                        <strong>theme</strong> — le thème clair ou sombre que tu as choisi.
                    </li>
                    <li>
                        <strong>language</strong> — la langue d&apos;affichage sélectionnée.
                    </li>
                    <li>
                        <strong>gamewave:favorites</strong> — la liste des jeux que tu as
                        ajoutés à tes favoris.
                    </li>
                </ul>
                <p>
                    Tu peux les supprimer à tout moment en vidant les données de site dans les
                    réglages de ton navigateur. Aucune de ces valeurs n&apos;est un cookie de
                    suivi, et aucune ne permet de t&apos;identifier.
                </p>

                <h3>b. Données techniques liées à l&apos;hébergement</h3>
                <p>
                    Le site est hébergé par Vercel Inc. Comme tout serveur web, l&apos;hébergeur
                    traite les informations techniques nécessaires à la livraison des pages :
                    adresse IP, type de navigateur, page demandée, date et heure. Ce traitement
                    repose sur l&apos;intérêt légitime à faire fonctionner et sécuriser le
                    service. Ces journaux sont conservés par l&apos;hébergeur selon sa propre
                    politique et ne sont pas utilisés par nous à des fins d&apos;analyse ou de
                    ciblage.
                </p>

                <h3>c. Requêtes vers des services tiers</h3>
                <p>
                    Le site charge quelques ressources d&apos;affichage depuis des serveurs
                    tiers. Une telle requête transmet ton adresse IP au service concerné, ce
                    qui est inhérent au fonctionnement du web. Aucune de ces requêtes ne sert
                    à te suivre, et aucune n&apos;est nécessaire pour jouer :
                </p>
                <ul>
                    <li>
                        <strong>Google Fonts</strong> (fonts.googleapis.com, fonts.gstatic.com)
                        — les polices de caractères du site.
                    </li>
                    <li>
                        <strong>cdnjs</strong> (cdnjs.cloudflare.com) — la police d&apos;icônes
                        utilisée par quelques jeux.
                    </li>
                    <li>
                        Quelques jeux chargent encore une image ou un son depuis le dépôt
                        public de leur auteur d&apos;origine.
                    </li>
                </ul>
                <p>
                    Si tu préfères éviter ces requêtes, un bloqueur de requêtes tierces suffit :
                    le site et les jeux restent entièrement jouables, avec les polices par
                    défaut de ton système. Les bibliothèques dont les jeux ont réellement besoin
                    pour fonctionner sont servies depuis ce site, et non depuis un CDN, pour
                    qu&apos;un blocage ne casse jamais une partie.
                </p>

                {dataProcessing.analytics ? (
                    <>
                        <h3>d. Mesure d&apos;audience</h3>
                        <p>
                            Le site utilise {dataProcessing.analyticsProvider} pour mesurer la
                            fréquentation de façon agrégée : pages vues, provenance, type
                            d&apos;appareil. Aucune donnée n&apos;est utilisée pour du ciblage
                            publicitaire.
                        </p>
                    </>
                ) : (
                    <>
                        <h3>d. Mesure d&apos;audience</h3>
                        <p>
                            Aucun outil de mesure d&apos;audience n&apos;est installé à ce jour.
                            Cette section sera mise à jour, et cette page datée à nouveau, le jour
                            où cela changera.
                        </p>
                    </>
                )}

                {dataProcessing.ads && (
                    <>
                        <h3>e. Publicité</h3>
                        <p>
                            Des emplacements publicitaires sont opérés par{' '}
                            {dataProcessing.adsProvider}. Le dépôt de cookies publicitaires est
                            soumis à ton consentement préalable, recueilli via la bannière prévue
                            à cet effet, et révocable à tout moment.
                        </p>
                    </>
                )}

                <h2>3. Ce que le site ne fait pas</h2>
                <ul>
                    <li>Aucune création de compte, aucun mot de passe.</li>
                    <li>Aucune revente ni partage de données à des fins commerciales.</li>
                    <li>Aucun cookie de suivi déposé sans consentement.</li>
                    <li>Aucune collecte de données auprès des mineurs de manière ciblée.</li>
                </ul>

                <h2>4. Les jeux</h2>
                <p>
                    Les jeux sont hébergés sur ce même domaine et s&apos;exécutent dans un cadre
                    isolé de la page. Certains enregistrent ton meilleur score dans le stockage
                    local de ton navigateur : là encore, cette donnée reste sur ton appareil.
                </p>

                <h2>5. Durée de conservation</h2>
                <p>
                    Les préférences stockées dans ton navigateur y restent jusqu&apos;à ce que tu
                    les supprimes. Les journaux techniques de l&apos;hébergeur suivent la durée de
                    conservation définie par celui-ci.
                </p>

                <h2>6. Tes droits</h2>
                <p>
                    Conformément au RGPD et aux lois locales applicables, tu disposes d&apos;un
                    droit d&apos;accès, de rectification, d&apos;effacement, de limitation,
                    d&apos;opposition et de portabilité concernant tes données personnelles.
                    En pratique, le site ne détenant aucun compte ni base de données
                    d&apos;utilisateurs, l&apos;essentiel de ces droits s&apos;exerce directement
                    depuis ton navigateur. Pour toute demande : {site.contactEmail}.
                </p>
                <p>
                    Tu peux également introduire une réclamation auprès de l&apos;autorité de
                    contrôle compétente : {site.dataAuthority}.
                </p>

                <h2>7. Modifications</h2>
                <p>
                    Cette politique est mise à jour à chaque changement réel de traitement.
                    La date en haut de page indique la dernière révision.
                </p>
            </main>
        </>
    );
}
