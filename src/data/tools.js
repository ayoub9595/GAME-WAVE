/**
 * Sélection de matériel et d'outils pour jouer, affichée sur /outils.
 *
 * ⚠️ CE TABLEAU EST VOLONTAIREMENT VIDE.
 *
 * Une page d'affiliation ne vaut que par l'avis qui l'accompagne : un texte
 * générique écrit sans avoir testé le produit ne convertit pas, et il expose
 * à un vrai problème de crédibilité (et, pour certains programmes
 * d'affiliation, à une exclusion). Ces avis doivent donc être écrits par toi,
 * sur des produits que tu connais.
 *
 * Deux règles à ne pas contourner :
 *   1. 8 à 12 produits maximum. Une page à 40 références signale l'absence
 *      de sélection.
 *   2. Chaque lien affilié porte rel="sponsored nofollow noopener" et la page
 *      affiche <AffiliateDisclosure /> AVANT le premier lien.
 *
 * Format attendu :
 * {
 *   id: 'casque-xyz',
 *   name: 'Nom exact du produit',
 *   category: 'Casque',            // Casque | Souris | Clavier | Manette | Écran | Logiciel
 *   price: '~60 €',
 *   url: 'https://...?tag=ton-id-affilie',
 *   verdict: 'Une phrase qui tranche : pour qui, et pourquoi.',
 *   review: 'Ton avis argumenté : ce que tu as constaté à l’usage, les limites, ' +
 *           'et le cas où il ne faut PAS l’acheter. 80 à 150 mots.',
 *   pros: ['…', '…'],
 *   cons: ['…'],
 * }
 */

export const tools = [];

export const toolCategories = [...new Set(tools.map((t) => t.category))];
