import { useCallback, useSyncExternalStore } from 'react';

/**
 * Favoris stockés dans localStorage, sans backend.
 *
 * Un petit store partagé au niveau du module (et non un useState par composant)
 * pour que tous les boutons cœur, le compteur du menu et la page /favoris
 * restent synchronisés dans le même onglet, et suivent aussi les changements
 * venus d'un autre onglet via l'événement `storage`.
 */

const KEY = 'gamewave:favorites';

const canStore = () => typeof window !== 'undefined' && 'localStorage' in window;

const read = () => {
  if (!canStore()) return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
};

let snapshot = read();
const listeners = new Set();

const emit = () => listeners.forEach((fn) => fn());

const write = (next) => {
  snapshot = next;
  if (canStore()) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* quota plein ou navigation privée : on garde la valeur en mémoire */
    }
  }
  emit();
};

const subscribe = (fn) => {
  listeners.add(fn);
  const onStorage = (e) => {
    if (e.key === KEY) {
      snapshot = read();
      emit();
    }
  };
  if (typeof window !== 'undefined') window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(fn);
    if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage);
  };
};

const getSnapshot = () => snapshot;
// Rendu serveur / prerender : aucun favori, donc aucun décalage à l'hydratation
const getServerSnapshot = () => [];

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug) => {
    const current = getSnapshot();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }, []);

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites]);

  return { favorites, toggle, isFavorite };
}
