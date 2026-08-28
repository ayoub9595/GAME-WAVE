import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import esTranslation from './locales/es.json';
import deTranslation from './locales/de.json';

// Contenu du catalogue (titres, descriptions, contrôles) par langue.
// Le FRANÇAIS n'a pas de fichier : il vit dans src/data/games.data.js, qui est
// la source canonique — c'est ce que lit aussi le prérendu. Les autres langues
// sont des surcouches, et toute clé manquante retombe automatiquement sur le
// français via le `defaultValue` passé dans src/hooks/useLocalized.js.
import gamesEn from './locales/games.en.json';
import gamesEs from './locales/games.es.json';
import gamesDe from './locales/games.de.json';

const withGames = (ui, games) => ({
  translation: games ? { ...ui.translation, games } : ui.translation,
});

// Lecture de localStorage protégée : au niveau module, elle casserait un rendu
// serveur ou un prerender. Le français est la langue par défaut du site.
const stored =
  typeof window !== 'undefined' && 'localStorage' in window
    ? localStorage.getItem('language')
    : null;

const SUPPORTED = ['fr', 'en', 'es', 'de'];
const defaultLanguage = SUPPORTED.includes(stored) ? stored : 'fr';

i18n.use(initReactI18next).init({
  resources: {
    en: withGames(enTranslation, gamesEn),
    fr: withGames(frTranslation, null),
    es: withGames(esTranslation, gamesEs),
    de: withGames(deTranslation, gamesDe),
  },
  lng: defaultLanguage,
  fallbackLng: 'fr',
  supportedLngs: SUPPORTED,
  interpolation: {
    escapeValue: false, // react échappe déjà les valeurs
  },
});

// Synchronise <html lang> avec la langue active (accessibilité + signal SEO).
const applyLang = (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lng);
  }
};

applyLang(i18n.language);
i18n.on('languageChanged', applyLang);

export default i18n;
