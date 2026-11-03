import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

function keyFor(user) {
  return 'artmind-favorites:' + (user ? user.email : 'guest');
}

function loadFavorites(user) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(user))) || [];
  } catch (error) {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(() => loadFavorites(user));

  const email = user ? user.email : 'guest';
  useEffect(() => {
    setFavorites(loadFavorites(user));
  }, [email]);

  function toggleFavorite(id) {
    setFavorites((old) => {
      const list = old.includes(id) ? old.filter((favId) => favId !== id) : [...old, id];
      try {
        localStorage.setItem(keyFor(user), JSON.stringify(list));
      } catch (error) {
      }
      return list;
    });
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

export function useFavorites() {
  return useContext(FavoritesContext);
}
