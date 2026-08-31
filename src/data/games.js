/**
 * Couche d'accès au catalogue.
 *
 * Toute l'application passe par ces fonctions : plus aucun `categories[0].games`
 * codé en dur. Ajouter une catégorie ou un jeu ne casse plus rien.
 */
import { games, categories } from './games.data.js';

export { games, categories };

export const getGameBySlug = (slug) => games.find((g) => g.slug === slug);

export const getGameById = (id) => games.find((g) => g.id === Number(id));

export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export const getGamesByCategory = (slug) => games.filter((g) => g.category === slug);

export const getRelatedGames = (game, limit = 6) =>
  games.filter((g) => g.category === game.category && g.slug !== game.slug).slice(0, limit);

/** Utilisé par la page Favoris : conserve l'ordre d'ajout de l'utilisateur. */
export const getGamesBySlugs = (slugs = []) =>
  slugs.map((slug) => getGameBySlug(slug)).filter(Boolean);

export const searchGames = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return games;
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.formerTitle?.toLowerCase().includes(q) ||
      g.shortDescription?.toLowerCase().includes(q) ||
      g.tags?.some((t) => t.toLowerCase().includes(q))
  );
};
