// ------------------------------------------------------------
// User Dashboard — /dashboard
// Welcome, quick access to AI tools, recently viewed, favourite
// categories, recommendations, collections and saved artworks.
// ------------------------------------------------------------
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import artworks, { getArtwork } from '../data/artworks';
import { collections } from '../data/siteData';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth, firstNameOf } from '../context/AuthContext';
import { getRecommendations } from '../utils/fakeAI';
import { getRecentlyViewed } from '../utils/recentlyViewed';
import './Dashboard.css';

function Dashboard() {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const saved = artworks.filter((art) => favorites.includes(art.id));
  const recommended = getRecommendations(favorites, 3);
  // Every painting this user opened (saved by the Artwork Details page).
  const viewed = getRecentlyViewed()
    .map((item) => getArtwork(item.id))
    .filter(Boolean);
  const recentlyViewed = viewed.slice(0, 5); // the last 5 for this page

  // Favourite categories = share of the paintings you viewed or saved,
  // shown as "42% of views" (biggest first).
  const categoryCounts = {};
  [...viewed, ...saved].forEach((art) => {
    categoryCounts[art.category] = (categoryCounts[art.category] || 0) + 1;
  });
  const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  const categoryShares = Object.entries(categoryCounts)
    .map(([category, count]) => [category, Math.round((count / total) * 100)])
    .sort((a, b) => b[1] - a[1]);

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>Welcome back, {firstNameOf(user.name)}.</h1>
          <p className="muted">
            You have {saved.length} saved paintings. {recommended.length} new AI picks are waiting for you.
          </p>
        </div>
        <Link to="/ai/recommendations" className="btn btn-dark">
          View new picks <Icon name="arrowRight" size={14} />
        </Link>
      </div>

      <div className="quick-access">
        {[
          ['search', 'Smart Search', 'Describe what you want to see', '/ai/search'],
          ['image', 'Image Recognition', 'Identify a painting from a photo', '/ai/recognition'],
          ['robot', 'Art Assistant', 'Ask about styles and artists', '/ai/assistant'],
        ].map(([icon, title, text, link]) => (
          <Link key={title} to={link} className="quick-card">
            <span className="quick-icon">
              <Icon name={icon} />
            </span>
            <div>
              <strong>{title}</strong>
              <p className="muted small">{text}</p>
            </div>
            <Icon name="arrowRight" size={16} />
          </Link>
        ))}
      </div>

      <section>
        <div className="section-header">
          <div>
            <p className="eyebrow">Pick up where you left off</p>
            <h3>Recently viewed</h3>
          </div>
          <Link to="/recently-viewed" className="link-arrow">
            History <Icon name="arrowRight" size={14} />
          </Link>
        </div>
        {recentlyViewed.length > 0 ? (
          <div className="grid-5">
            {recentlyViewed.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        ) : (
          <p className="muted">
            Paintings you open will show up here. <Link to="/explore">Start exploring →</Link>
          </p>
        )}
      </section>

      <div className="dashboard-two">
        <section className="fav-categories">
          <h4>Favorite categories</h4>
          {categoryShares.length === 0 && <p className="muted small">View or save some paintings to see your favourite categories.</p>}
          {categoryShares.map(([category, percent]) => (
            <div key={category} className="bar-row">
              <div className="bar-label">
                <span>{category}</span>
                <span className="mono muted">{percent}% of views</span>
              </div>
              <div className="bar-track">
                <span style={{ width: percent + '%' }} />
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="section-header">
            <div>
              <p className="eyebrow">Recommended for you</p>
              <h3>Fresh picks</h3>
            </div>
            <Link to="/ai/recommendations" className="link-arrow">
              See all <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="grid-3">
            {recommended.map((art) => (
              <ArtworkCard key={art.id} artwork={art} tag={art.reason} />
            ))}
          </div>
        </section>
      </div>

      <section>
        <div className="section-header">
          <div>
            <p className="eyebrow">Made for you</p>
            <h3>AI-curated collections</h3>
          </div>
          <Link to="/collections" className="link-arrow">
            All collections <Icon name="arrowRight" size={14} />
          </Link>
        </div>
        <div className="grid-3">
          {collections.slice(0, 3).map((collection) => (
            <Link to={`/collections/${collection.id}`} key={collection.id} className="mosaic-card">
              <div className="mosaic">
                {collection.artworkIds.slice(0, 3).map((id) => (
                  <img key={id} src={getArtwork(id).image} alt="" />
                ))}
              </div>
              <h4>{collection.title}</h4>
              <p className="mono muted">{collection.artworkIds.length} works · AI-curated</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <div>
            <p className="eyebrow">Your favourites</p>
            <h3>Saved artworks</h3>
          </div>
          <Link to="/favorites" className="link-arrow">
            Open favorites <Icon name="arrowRight" size={14} />
          </Link>
        </div>
        {saved.length > 0 ? (
          <div className="grid-5">
            {saved.slice(0, 5).map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        ) : (
          <p className="muted">No saved artworks yet — tap the heart on any painting.</p>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
