// ------------------------------------------------------------
// Collections — /collections
// Your own collection (saved paintings) plus the AI-curated
// collections. Click a card to open it.
// ------------------------------------------------------------
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import { useFavorites } from '../context/FavoritesContext';
import './Dashboard.css';
import './Collections.css';

function Collections() {
  const { favorites } = useFavorites();

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Collections</h1>
          <p className="muted">
            {collections.length + 1} collections · groups of paintings that belong together
          </p>
        </div>
      </div>

      {/* ---- Your own collection ---- */}
      <section>
        <div className="section-header">
          <h3>Your collection</h3>
        </div>
        <Link to="/favorites" className="collection-row">
          <div className="mosaic">
            {favorites.length > 0 ? (
              favorites.slice(0, 3).map((id) => <img key={id} src={getArtwork(id).image} alt="" />)
            ) : (
              <span className="collection-empty-art">
                <Icon name="heart" size={28} />
              </span>
            )}
          </div>
          <div>
            <p className="eyebrow">Saved by you</p>
            <h3>My Favorites</h3>
            <p className="muted">
              {favorites.length} {favorites.length === 1 ? 'painting' : 'paintings'} · Tap the heart on any painting to add it here.
            </p>
            <span className="link-arrow">
              Open <Icon name="arrowRight" size={14} />
            </span>
          </div>
        </Link>
      </section>

      {/* ---- AI-curated collections ---- */}
      <section>
        <div className="section-header">
          <h3>AI-curated collections</h3>
        </div>
        <div className="grid-2">
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
              <p className="muted small">{collection.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Collections;
