// ------------------------------------------------------------
// Favorites — /favorites  (matches Figma "Desktop / 11")
// Tabs: Saved paintings · Collections · AI-curated · Favorite categories
// - Saved paintings: category chips, masonry grid or list, remove (with confirm)
// - Collections: your own collections ("New collection" makes one)
// - AI-curated: the curated collections
// - Favorite categories: categories of your saved paintings, with a follow heart
// Your own collections and followed categories are saved in the browser.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork, getByCategory } from '../data/artworks';
import { categories, collections } from '../data/siteData';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import './Favorites.css';

const tabs = ['Saved paintings', 'Collections', 'AI-curated', 'Favorite categories'];

// Read / save a list in the browser.
function loadList(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}
function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  // Each account keeps its own collections and followed categories.
  const collectionsKey = 'artmind-my-collections:' + user.email;
  const followedKey = 'artmind-followed-categories:' + user.email;
  const [tab, setTab] = useState('Saved paintings');
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [category, setCategory] = useState('All');
  const [toRemove, setToRemove] = useState(null); // artwork waiting for confirmation

  // Your own collections, e.g. [{ name: 'For my living room' }]
  const [myCollections, setMyCollections] = useState(() => loadList(collectionsKey, []));
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  // Categories you follow (the heart on "Favorite categories")
  // A new account follows no categories yet.
  const [followed, setFollowed] = useState(() => loadList(followedKey, []));

  const saved = artworks.filter((art) => favorites.includes(art.id));
  const savedCategories = [...new Set(saved.map((art) => art.category))];
  const shown = category === 'All' ? saved : saved.filter((art) => art.category === category);

  function confirmRemove() {
    toggleFavorite(toRemove.id);
    setToRemove(null);
  }

  function createCollection(event) {
    event.preventDefault();
    if (!newName.trim()) return;
    const list = [...myCollections, { name: newName.trim() }];
    setMyCollections(list);
    saveList(collectionsKey, list);
    setNewName('');
    setCreating(false);
    setTab('Collections');
  }

  function toggleFollow(name) {
    const list = followed.includes(name) ? followed.filter((item) => item !== name) : [...followed, name];
    setFollowed(list);
    saveList(followedKey, list);
  }

  // Categories shown in "Favorite categories": followed ones + ones you saved from.
  const favoriteCategories = [...new Set([...followed, ...savedCategories])];
  // Nothing followed or saved yet? Show all categories so the user can follow some.
  const categoriesToShow = favoriteCategories.length > 0 ? favoriteCategories : categories.map((cat) => cat.name);

  // ---- Small pieces used in more than one tab ----
  const collectionsBlock = (list) => (
    <div className="grid-4">
      {list.map((collection) => (
        <Link to={`/collections/${collection.id}`} key={collection.id} className="collection-tile">
          <img src={getArtwork(collection.artworkIds[0]).image} alt="" />
          <h4>{collection.title}</h4>
          <p className="mono muted">{collection.artworkIds.length} works</p>
        </Link>
      ))}
    </div>
  );

  const categoriesBlock = (
    <div className="grid-3">
      {categoriesToShow.map((name) => {
        const inCategory = getByCategory(name);
        const savedCount = saved.filter((art) => art.category === name).length;
        return (
          <div key={name} className="fav-category">
            <img src={inCategory[0].image} alt="" />
            <div>
              <h4>{name}</h4>
              <p className="muted small">
                {savedCount} saved · {inCategory.length} in the collection
              </p>
            </div>
            <button
              className={followed.includes(name) ? 'fav-follow active' : 'fav-follow'}
              onClick={() => toggleFollow(name)}
              aria-label={followed.includes(name) ? `Unfollow ${name}` : `Follow ${name}`}
            >
              <Icon name="heart" size={16} filled={followed.includes(name)} />
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Favorites</h1>
          <p className="muted">
            {saved.length} saved paintings · {collections.length + myCollections.length} collections
          </p>
        </div>
        <button className="btn btn-outline" onClick={() => setCreating(true)}>
          New collection
        </button>
      </div>

      {/* ---- Tabs ---- */}
      <div className="settings-tabs fav-tabs" role="tablist">
        {tabs.map((name) => (
          <button key={name} role="tab" className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>
            {name}
          </button>
        ))}
      </div>

      {/* ================= SAVED PAINTINGS ================= */}
      {tab === 'Saved paintings' && (
        <>
          {saved.length === 0 ? (
            <div className="empty-favorites">
              <span className="quick-icon">
                <Icon name="heart" size={26} />
              </span>
              <h3>No saved artworks yet</h3>
              <p className="muted">Tap the heart on any painting to keep it here. We’ll use your saves to sharpen recommendations.</p>
              <Link to="/explore" className="btn btn-dark">
                Explore artworks <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          ) : (
            <>
              <div className="fav-toolbar">
                <div className="fav-chips">
                  {['All', ...savedCategories].map((name) => (
                    <button key={name} className={category === name ? 'chip active' : 'chip'} onClick={() => setCategory(name)}>
                      {name}
                    </button>
                  ))}
                </div>
                <div className="view-toggle">
                  <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view">
                    <Icon name="grid" size={18} />
                  </button>
                  <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
                    <Icon name="menu" size={18} />
                  </button>
                </div>
              </div>

              {view === 'grid' ? (
                // Masonry grid: each painting keeps its own shape
                <div className="fav-masonry">
                  {shown.map((art) => (
                    <ArtworkCard key={art.id} artwork={art} />
                  ))}
                </div>
              ) : (
                <table className="fav-table">
                  <thead>
                    <tr>
                      <th>Artwork</th>
                      <th>Category</th>
                      <th>Medium</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((art) => (
                      <tr key={art.id}>
                        <td>
                          <Link to={`/artwork/${art.id}`} className="fav-table-art">
                            <img src={art.image} alt="" />
                            <div>
                              <strong>{art.title}</strong>
                              <p className="muted small">
                                {art.artist} · {art.date}
                              </p>
                            </div>
                          </Link>
                        </td>
                        <td>{art.category}</td>
                        <td className="muted">{art.medium}</td>
                        <td>
                          <button className="text-button" onClick={() => setToRemove(art)}>
                            <Icon name="trash" size={16} /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Collections + favourite categories under the saved paintings (as in Figma) */}
          <section>
            <div className="section-header">
              <div>
                <p className="eyebrow">Your collections</p>
                <h3>Collections</h3>
              </div>
              <Link to="/collections" className="link-arrow">
                Manage <Icon name="arrowRight" size={14} />
              </Link>
            </div>
            {collectionsBlock(collections)}
          </section>

          <section>
            <div className="section-header">
              <div>
                <p className="eyebrow">Followed categories</p>
                <h3>Favorite categories</h3>
              </div>
              <button className="link-arrow" onClick={() => setTab('Favorite categories')}>
                Edit <Icon name="arrowRight" size={14} />
              </button>
            </div>
            {categoriesBlock}
          </section>
        </>
      )}

      {/* ================= YOUR COLLECTIONS ================= */}
      {tab === 'Collections' && (
        <section>
          {myCollections.length === 0 ? (
            <div className="empty-favorites">
              <span className="quick-icon">
                <Icon name="layers" size={26} />
              </span>
              <h3>No collections of your own yet</h3>
              <p className="muted">Group paintings that belong together — for a room, a mood or a project.</p>
              <button className="btn btn-dark" onClick={() => setCreating(true)}>
                New collection
              </button>
            </div>
          ) : (
            <div className="grid-4">
              {myCollections.map((item) => (
                <div key={item.name} className="collection-tile my-collection">
                  <span className="collection-tile-empty">
                    <Icon name="layers" size={28} />
                  </span>
                  <h4>{item.name}</h4>
                  <p className="mono muted">0 works · Your collection</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ================= AI-CURATED ================= */}
      {tab === 'AI-curated' && <section>{collectionsBlock(collections)}</section>}

      {/* ================= FAVORITE CATEGORIES ================= */}
      {tab === 'Favorite categories' && (
        <section>
          <p className="muted small fav-note">Tap the heart to follow or unfollow a category. Followed categories shape your recommendations.</p>
          {categoriesBlock}
        </section>
      )}

      {/* ---- "New collection" pop-up ---- */}
      {creating && (
        <div className="modal-backdrop" onClick={() => setCreating(false)}>
          <form className="modal" onClick={(event) => event.stopPropagation()} onSubmit={createCollection} role="dialog" aria-modal="true">
            <h3>New collection</h3>
            <label className="field">
              Name
              <input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Paintings for my living room" />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setCreating(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-dark">
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---- Remove confirmation ---- */}
      {toRemove && (
        <div className="modal-backdrop" onClick={() => setToRemove(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Remove from Favorites?</h3>
            <p className="muted">“{toRemove.title}” will be removed from your saved paintings.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setToRemove(null)}>
                Keep it
              </button>
              <button className="btn btn-dark" onClick={confirmRemove}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Favorites;
