import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header/Header';
import AffiliateDisclosure from '../../components/affiliate/AffiliateDisclosure';
import { tools } from '../../data/tools';
import styles from '../legal/StaticPage.module.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function ToolsPage() {
    const { t } = useTranslation();

    useDocumentTitle("Outils gaming recommandés | Game Wave");

    return (
        <>
            <Header />
            <main className={styles.page}>
                <nav className={styles.breadcrumb} aria-label={t('breadcrumb')}>
                    <Link to="/">{t('nav_home')}</Link>
                    <span aria-hidden="true">›</span>
                    <span>Outils recommandés</span>
                </nav>

                <h1>Outils et matériel recommandés</h1>
                <p className={styles.lead}>
                    Une sélection courte de matériel et de logiciels utiles pour jouer confortablement,
                    y compris sur des jeux navigateur.
                </p>

                {tools.length > 0 && <AffiliateDisclosure />}

                {tools.length === 0 ? (
                    <div className={styles.notice}>
                        <h2>Sélection en préparation</h2>
                        <p>
                            Cette page est en cours de rédaction. Nous préférons ne rien recommander
                            plutôt que de publier une liste de produits que nous n&apos;avons pas
                            réellement utilisés.
                        </p>
                        <p>
                            En attendant, tous les jeux du site fonctionnent avec un clavier, une souris
                            ou un simple écran tactile — aucun achat n&apos;est nécessaire pour jouer.
                        </p>
                        <p>
                            <Link to="/">Retour au catalogue de jeux</Link>
                        </p>
                    </div>
                ) : (
                    <ul className={styles['tool-list']}>
                        {tools.map((tool) => (
                            <li key={tool.id} className={styles.tool}>
                                <h2>{tool.name}</h2>
                                <p className={styles['tool-meta']}>
                                    {tool.category} — {tool.price}
                                </p>
                                <p className={styles['tool-verdict']}>{tool.verdict}</p>
                                <p>{tool.review}</p>
                                {tool.pros?.length > 0 && (
                                    <>
                                        <h3>Points forts</h3>
                                        <ul>
                                            {tool.pros.map((p) => (
                                                <li key={p}>{p}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {tool.cons?.length > 0 && (
                                    <>
                                        <h3>Limites</h3>
                                        <ul>
                                            {tool.cons.map((c) => (
                                                <li key={c}>{c}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {tool.url && (
                                    <a
                                        className={styles['tool-link']}
                                        href={tool.url}
                                        target="_blank"
                                        rel="sponsored nofollow noopener"
                                    >
                                        Voir le produit
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
}
