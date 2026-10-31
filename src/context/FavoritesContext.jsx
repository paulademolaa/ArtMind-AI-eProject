// ------------------------------------------------------------
// FavoritesContext
// Keeps the list of saved (favourite) artwork ids so that ANY page
// can read or change it — the heart on a card, the Favorites page,
// the Dashboard, etc.
//
// Each account has its OWN list, saved in the browser (localStorage)
// under a key with the account's email, e.g.
//   artmind-favorites:paul@example.com
// A new account starts with an empty list. Visitors (not signed in)
// get their own "guest" list.
// ------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

// The storage key for one account's favourites.
function keyFor(user) {
  return 'artmind-favorites:' + (user ? user.email : 'guest');
}

// Read an account's saved favourites (an empty list if there are none).
function loadFavorites(user) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(user))) || [];
  } catch (error) {
    return []; // localStorage can be blocked (e.g. private mode)
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(() => loadFavorites(user));

  // When someone signs in, signs out or switches account, load THEIR list.
  const email = user ? user.email : 'guest';
  useEffect(() => {
    setFavorites(loadFavorites(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Save the list for the current account. (Called whenever it changes.)
  function save(list) {
    setFavorites(list);
    try {
      localStorage.setItem(keyFor(user), JSON.stringify(list));
    } catch (error) {
      // ignore
    }
  }

  // Add the id if it is not saved yet, remove it if it is.
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      save(favorites.filter((favId) => favId !== id));
    } else {
      save([...favorites, id]);
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
