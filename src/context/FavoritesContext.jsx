import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();


function loadFavorites() {
  try {
    const saved = localStorage.getItem('artmind-favorites');
    if (saved) return JSON.parse(saved);
  } catch (error) {
    
  }
  return ['water-lily-pond', 'two-sisters-on-the-terrace', 'the-herring-net'];
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  
  useEffect(() => {
    try {
      localStorage.setItem('artmind-favorites', JSON.stringify(favorites));
    } catch (error) {
     
    }
  }, [favorites]);


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

export function useFavorites() {
  return useContext(FavoritesContext);
}
