import { useTranslation } from 'react-i18next';

/**
 * Accès traduit au contenu du catalogue.
 *
 * Règle de fonctionnement, valable partout dans l'application :
 *   - le FRANÇAIS est la source canonique et vit dans src/data/games.data.js.
 *     C'est ce que lit aussi scripts/prerender.mjs pour le HTML indexable.
 *   - les autres langues vivent dans src/locales/games.<lang>.json (contenu des
 *     jeux) et dans src/locales/<lang>.json (noms de catégories, tags).
 *   - si une traduction manque, on retombe automatiquement sur le français
 *     grâce à `defaultValue`. Rien ne casse, rien n'affiche de clé brute.
 *
 * Ajouter un jeu : on le décrit en français dans games.data.js, et on ajoute
 * sa traduction dans les trois fichiers games.<lang>.json quand on peut.
 */
export function useLocalized() {
  const { t } = useTranslation();

  const categoryName = (category) =>
    category ? t(`categories.${category.slug}.name`, { defaultValue: category.name }) : '';

  const categoryDescription = (category) =>
    category
      ? t(`categories.${category.slug}.description`, { defaultValue: category.description })
      : '';

  const gameTitle = (game) => (game ? t(`games.${game.slug}.title`, { defaultValue: game.title }) : '');

  const gameShort = (game) =>
    game ? t(`games.${game.slug}.short`, { defaultValue: game.shortDescription || '' }) : '';

  const gameLong = (game) =>
    game
      ? t(`games.${game.slug}.long`, {
          defaultValue: game.longDescription || game.shortDescription || '',
        })
      : '';

  const gameControls = (game) =>
    game ? t(`games.${game.slug}.controls`, { defaultValue: game.controls || '' }) : '';

  // Les tags sont stockés en français dans les données : ils servent aussi de
  // clé de traduction. `tags.réflexes` -> "reflexes" / "reflejos" / "Reflexe".
  const gameTags = (game) => (game?.tags || []).map((tag) => t(`tags.${tag}`, { defaultValue: tag }));

  return {
    categoryName,
    categoryDescription,
    gameTitle,
    gameShort,
    gameLong,
    gameControls,
    gameTags,
  };
}
