/**
 * Interrupteur unique de la publicité sur tout le site.
 *
 * Désactivé par défaut. Pour activer : VITE_ADS_ENABLED=true dans .env.local
 * en local, ou dans les variables d'environnement du projet Vercel en production.
 *
 * Tant que ce drapeau est faux, aucun emplacement publicitaire n'est rendu et
 * les colonnes latérales ne sont même pas insérées dans le DOM — le contenu
 * occupe alors toute la largeur disponible.
 */
export const ADS_ENABLED = import.meta.env.VITE_ADS_ENABLED === 'true';
