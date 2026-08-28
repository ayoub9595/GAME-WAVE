import PropTypes from 'prop-types';
import { ADS_ENABLED } from './adsConfig';
import styles from './AdSlot.module.css';

/**
 * Emplacement publicitaire unique du site.
 *
 * Une seule abstraction : changer de régie = modifier ce fichier, rien d'autre.
 * L'activation passe par ADS_ENABLED (voir adsConfig.js).
 *
 * Règles de placement à respecter, sous peine de sanction Google :
 *   - jamais de publicité à l'intérieur des iframes de jeu ;
 *   - jamais au-dessus du contenu principal, ni en pop-up ;
 *   - jamais en sticky par-dessus les contrôles d'un jeu.
 * Emplacements prévus : sous le hero, haut de page catégorie, sous l'iframe du jeu.
 *
 * Rappel : en Europe, un CMP de consentement certifié TCF v2.2 doit être en
 * place AVANT d'activer quoi que ce soit ici.
 */
export default function AdSlot({ id, format = 'banner' }) {
    if (!ADS_ENABLED) return null;

    // Le code de la régie viendra ici, une seule fois, pour tout le site.
    return <div className={`${styles.slot} ${styles[format]}`} data-ad-id={id} aria-hidden="true" />;
}

AdSlot.propTypes = {
    id: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['banner', 'card', 'sidebar', 'interstitial']),
};
