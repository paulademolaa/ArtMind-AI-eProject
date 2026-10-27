// ------------------------------------------------------------
// FavoritesContext
// Keeps the list of saved (favourite) artwork ids so that ANY page
// can read or change it — the heart on a card, the Favorites page,
// the Dashboard, etc.
//
// It also saves the list in the browser (localStorage) so favourites
// are still there after a page refresh.
// ------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

// Read saved favourites from the browser (or start with a few examples).
function loadFavorites() {
  try {
    const saved = localStorage.getItem('artmind-favorites');
    if (saved) return JSON.parse(saved);
  } catch (error) {
    // localStorage can be blocked (e.g. private mode) — just ignore it.
  }
  return ['water-lily-pond', 'two-sisters-on-the-terrace', 'the-herring-net'];
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  // Every time the list changes, save it again.
  useEffect(() => {
    try {
      localStorage.setItem('artmind-favorites', JSON.stringify(favorites));
    } catch (error) {
      // ignore
    }
  }, [favorites]);

  // Add the id if it is not saved yet, remove it if it is.
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function isFavorite(id) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Shortcut so components can write: const { isFavorite } = useFavorites();
export function useFavorites() {
  return useContext(FavoritesContext);
}
