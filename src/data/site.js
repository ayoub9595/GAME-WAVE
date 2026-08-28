/**
 * Informations d'identité du site, utilisées par les pages légales et le footer.
 *
 * Les pages « Confidentialité », « Conditions d'utilisation » et « Contact »
 * affichent ces valeurs telles quelles. Elles doivent donc rester exactes :
 * une page légale contenant un e-mail inexistant est aussi problématique
 * qu'une absence de page légale, et c'est un motif de refus chez les régies
 * publicitaires.
 *
 * Pense à mettre `legalUpdatedAt` à jour à chaque modification réelle des
 * pages légales.
 */

export const site = {
  name: 'Game Wave',

  // Nom de l'éditeur du site (personne physique ou société).
  // Note : si une régie publicitaire, un programme d'affiliation ou une
  // obligation d'identification demande un éditeur nommément identifiable,
  // c'est ce champ qu'il faudra remplacer par un nom de personne ou une
  // raison sociale.
  publisher: 'Game Wave',

  // Adresse e-mail réelle, qui doit fonctionner : elle sert de point de contact
  // légal et de canal pour les demandes RGPD.
  contactEmail: 'badiamohamedaymane@gmail.com',

  // Pays de résidence de l'éditeur (détermine l'autorité de contrôle compétente).
  country: 'Maroc',

  // Autorité de protection des données compétente, à adapter au pays ci-dessus.
  // Maroc : CNDP. France : CNIL. Belgique : APD. Suisse : PFPDT.
  dataAuthority: 'CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel)',

  // Domaine de production, sans slash final.
  url: 'https://game-wave-3aa9.vercel.app',

  // Date de dernière mise à jour des pages légales.
  legalUpdatedAt: '27 août 2026',
};

/** Mis à jour à chaque activation d'un nouvel outil : sert la page Confidentialité. */
export const dataProcessing = {
  // Passe à true quand un outil d'analytics est réellement installé.
  analytics: false,
  analyticsProvider: '',

  // Passe à true quand AdSlot est activé (VITE_ADS_ENABLED=true).
  ads: false,
  adsProvider: '',
};
