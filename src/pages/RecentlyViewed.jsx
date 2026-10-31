import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ArtworkCard from '../components/ArtworkCard';
import Icon from '../components/Icon';
import { getArtwork } from '../data/artworks';
import { getRecentlyViewed, clearRecentlyViewed, timeAgo } from '../utils/recentlyViewed';
import './Dashboard.css';
import './Favorites.css';

function RecentlyViewed() {
  const [history, setHistory] = useState(() => getRecentlyViewed().filter((item) => getArtwork(item.id)));

  function handleClear() {
    clearRecentlyViewed();
    setHistory([]);
  }

  return (
    <DashboardLayout>
      <div className="welcome">
        <div>
          <h1>Recently viewed</h1>
          <p className="muted">{history.length} paintings you opened recently</p>
        </div>
        {history.length > 0 && (
          <button className="btn btn-outline" onClick={handleClear}>
            <Icon name="trash" size={16} /> Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-favorites">
          <span className="quick-icon">
            <Icon name="clock" size={26} />
          </span>
          <h3>Nothing here yet</h3>
          <p className="muted">Paintings you open will appear here, so you can find them again easily.</p>
          <Link to="/explore" className="btn btn-dark">
            Explore artworks <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid-4">
          {history.map((item) => (
            <ArtworkCard key={item.id} artwork={getArtwork(item.id)} label={`Viewed ${timeAgo(item.time).toLowerCase()}`} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default RecentlyViewed;
