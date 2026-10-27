// ------------------------------------------------------------
// Favorites & Collections — /favorites
// Shows saved paintings (grid or list view), a "remove" confirmation,
// an empty state, and the AI-curated collections.
// ------------------------------------------------------------
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import { useFavorites } from '../context/FavoritesContext';
import './Dashboard.css';
import './Favorites.css';

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [toRemove, setToRemove] = useState(null); // artwork waiting for confirmation

  const saved = artworks.filter((art) => favorites.includes(art.id));

  function confirmRemove() {
    toggleFavorite(toRemove.id);
    setToRemove(null);
  }

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Favorites</h1>
          <p className="muted">
            {saved.length} saved paintings · {collections.length} collections
          </p>
        </div>
        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view">
            <Icon name="grid" size={18} />
          </button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
            <Icon name="layers" size={18} />
          </button>
        </div>
      </div>

      {/* ---- Empty state ---- */}
      {saved.length === 0 && (
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
      )}

      {/* ---- Grid view ---- */}
      {saved.length > 0 && view === 'grid' && (
        <div className="grid-4">
          {saved.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      )}

      {/* ---- List view ---- */}
      {saved.length > 0 && view === 'list' && (
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
            {saved.map((art) => (
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

      <section>
        <div className="section-header">
          <h3>Collections</h3>
          <Link to="/collections" className="link-arrow">
            All collections <Icon name="arrowRight" size={14} />
          </Link>
        </div>
        <div className="grid-4">
          {collections.map((collection) => (
            <Link to={`/collections/${collection.id}`} key={collection.id} className="mosaic-card">
              <div className="mosaic">
                {collection.artworkIds.slice(0, 3).map((id) => (
                  <img key={id} src={getArtwork(id).image} alt="" />
                ))}
              </div>
              <h4>{collection.title}</h4>
              <p className="mono muted">
                {collection.artworkIds.length} works · {collection.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Remove confirmation (a simple modal) ---- */}
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
