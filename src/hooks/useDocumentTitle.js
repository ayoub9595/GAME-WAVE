import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Met le titre de l'onglet à jour, et le remet à sa valeur par défaut en
 * quittant la page.
 *
 * Centralisé ici pour deux raisons : les neuf pages répétaient le même
 * useEffect, et le titre doit suivre la langue active — ce qui est plus facile
 * à garantir en un seul endroit.
 */
const setTitle = (value) => {
  if (typeof document !== 'undefined') {
    document.title = value;
  }
};

export function useDocumentTitle(title) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!title) return undefined;
    setTitle(title);
    return () => setTitle(`GAME WAVE – ${t('logo_subtitle')}`);
  }, [title, t]);
}
